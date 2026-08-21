# Live Classroom Rebuild — Contract Spec

Authoritative for the live-class rebuild. Every implementation task must match this exactly — it is
the only thing tying the parallel pieces together. Do not invent alternate field names, routes, or
env vars not listed here.

## Already done (do not re-touch, do not re-derive — just import/use)

- `src/lib/serverAuth.ts` exports `async function requireUser(request: Request): Promise<AuthedUser>`
  and `async function getUserByToken(token: string): Promise<AuthedUser | null>`.
  ```ts
  interface AuthedUser {
    id: string; email: string; name: string; role: "student" | "instructor" | "admin";
  }
  ```
  `requireUser` reads `Authorization: Bearer <token>` from the request, looks the user up, and throws
  an `Error` with `.status = 401` if missing/invalid. Callers wrap it in try/catch and return
  `NextResponse.json({ success:false, error: e.message }, { status: e.status || 401 })`.
- `src/lib/livekitClient.ts` exports:
  - `getRoomServiceClient(): RoomServiceClient`
  - `getEgressClient(): EgressClient`
  - `mintAccessToken(opts: { identity: string; name: string; room: string; isInstructor: boolean; canPublishMic?: boolean }): Promise<string>`
    — returns a signed JWT. Instructor grant: `roomAdmin: true, roomRecord: true, canPublish: true,
    canSubscribe: true, canPublishData: true`. Non-instructor grant: `canSubscribe: true,
    canPublishData: true`, plus if `canPublishMic` is true also `canPublishSources: [TrackSource.MICROPHONE]`
    (import `TrackSource` from `livekit-server-sdk`) — students can unmute for the doubt queue but
    never get a bare `canPublish: true` (that would allow camera/screen-share too).
  - All three throw a clear `Error` (not a silent fallback) if `LIVEKIT_API_KEY` / `LIVEKIT_API_SECRET`
    / `LIVEKIT_HTTP_URL` (server clients) or `LIVEKIT_URL` (client-facing wss URL, for the token
    payload only) are unset. **No hardcoded `devkey`/dev-secret/`meetings.thewebvale.com` fallback
    values anywhere** — those already exist correctly in `.env.local`.
- `src/app/api/live/token/route.ts` — POST, requires bearer auth. Body: `{ roomId: string }` (nothing
  else is trusted from the client — no `isInstructor`, no `participantId`). Server derives instructor
  status from `user.role` (`"instructor"` or `"admin"`) and, for students, checks the `live_classes`
  doc's `targetBatches`/`selectedStudents` against the student's `enrollments` (same matching rule
  `api/live/classes` GET already uses for `enrolledSlugs`). Returns
  `{ success, token, wsUrl, identity: user.id, roomId, isInstructor }` or 403
  `{ success:false, error: "You are not enrolled in this class" }` if a student doesn't match.
- `src/app/api/live/classes/route.ts` — GET unchanged in shape but the empty-collection dummy-seed
  insert is removed (empty stays empty). POST/PATCH/DELETE now require `requireUser` with role
  `instructor` or `admin`.
- `src/lib/auth.ts` — `UserProfile` interface gained `token?: string`. Nothing else in this file
  changed; `AuthContext.tsx` already round-trips `data.user` (which includes `token`) into the stored
  session, so `useAuth().user?.token` is available anywhere client-side with no further changes.
- `src/lib/mongodb.ts` — no more hardcoded connection-string fallback; throws if `MONGODB_URI` unset.

## Env vars (already in `.env.local`, reference only — do not add fallback literals for these)

`LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `LIVEKIT_URL` (wss://…, client connect), `LIVEKIT_HTTP_URL`
(https://…, server SDK clients). Recording additionally needs `GCS_RECORDINGS_BUCKET` and
`GCS_SERVICE_ACCOUNT_JSON` (a raw JSON string) — not yet set; code must fail with a clear thrown
error/API error message when missing, never silently no-op or write to a fake bucket.

## Client fetch convention

Every live-related client fetch to a route that calls `requireUser` sends:
```ts
fetch(url, { headers: { Authorization: `Bearer ${user?.token ?? ""}`, "Content-Type": "application/json" }, ... })
```
`user` comes from `useAuth()` (`@/components/auth/AuthContext`).

## Mongo collections

### `live_classes` (existing shape, unchanged) — key fields used below
`roomId, title, subject, targetClass, targetBatches: string[], selectedStudents: string[], instructor,
instructorEmail?, status: "LIVE_NOW"|"UPCOMING"|"ENDED", scheduledTime`.

### `recordings` (new shape — this replaces the old ad-hoc shape entirely)
```ts
interface RecordingDoc {
  _id: ObjectId;
  roomId: string;
  liveClassTitle: string;      // snapshot from live_classes at start time
  subject: string;
  targetClass: string;
  targetBatches: string[];     // copied from live_classes, so Past Lectures can filter by enrollment
  instructor: string;
  instructorEmail?: string;
  egressId: string;
  status: "recording" | "processing" | "ready" | "failed";
  gcsPath?: string;            // object path inside the bucket, set once known (at start)
  durationSec?: number;        // set on "ready"
  sizeBytes?: number;          // set on "ready"
  error?: string;              // set on "failed"
  startedBy: string;           // user id/email of the instructor who started it
  startedAt: Date;
  endedAt?: Date;
}
```

## New lib modules (Task 1 writes these)

### `src/lib/gcsRecording.ts`
```ts
export function buildRecordingPath(roomId: string, startedAt: number = Date.now()): string
// `${roomId}/${startedAt}.mp4` — sanitize roomId to [a-zA-Z0-9_-] same as webverse's buildRecordingPath did.

export async function startRecording(roomId: string): Promise<{ egressId: string; gcsPath: string }>
// Throws if GCS_RECORDINGS_BUCKET or GCS_SERVICE_ACCOUNT_JSON unset. Uses getEgressClient() (from
// livekitClient.ts) .startRoomCompositeEgress(roomId, { file: new EncodedFileOutput({ filepath,
// output: { case: 'gcp', value: new GCPUpload({ bucket, credentials: GCS_SERVICE_ACCOUNT_JSON }) } }),
// layout: 'speaker' }) — import EncodedFileOutput/GCPUpload from 'livekit-server-sdk' (re-exported
// from @livekit/protocol, confirmed present in this repo's installed version).

export async function stopRecording(egressId: string): Promise<void>
// getEgressClient().stopEgress(egressId)

export async function pollUntilDone(egressId: string, opts?: { intervalMs?: number; maxAttempts?: number }):
  Promise<{ status: "ready" | "failed"; durationSec?: number; sizeBytes?: number; error?: string }>
// Poll getEgressClient().listEgress({ egressId }) (returns an array; take [0]) until info.status is
// EGRESS_COMPLETE (-> "ready", read duration/size off info.fileResults[0]) or EGRESS_FAILED / ABORTED
// (-> "failed", info.error). Default interval 3000ms, maxAttempts 40 (~2 min cap); on timeout return
// "failed" with error "Recording still processing after timeout".
```

### `src/lib/gcsSignedUrl.ts`
```ts
export async function getSignedRecordingUrl(gcsPath: string): Promise<string>
// new Storage({ credentials: JSON.parse(process.env.GCS_SERVICE_ACCOUNT_JSON!) }).bucket(GCS_RECORDINGS_BUCKET)
//   .file(gcsPath).getSignedUrl({ action: 'read', expires: Date.now() + 60*60*1000 }) — v4 default in
// current @google-cloud/storage. Throws the same clear error as gcsRecording.ts if env vars unset.
```

## Recording routes (Task 1)

### `POST /api/live/recordings/start` — body `{ roomId }`, `requireUser`, role must be
`instructor`/`admin` AND must be the `live_classes` doc's own instructor (match by `instructorEmail`
against `user.email`) or `admin`. Calls `startRecording(roomId)`, inserts a `RecordingDoc` with
`status: "recording"`, snapshotting title/subject/targetClass/targetBatches/instructor off the
`live_classes` doc. Returns `{ success, recordingId, egressId }`. If a `recording`/`processing` doc
already exists for this `roomId`, return the existing one instead of starting a second egress (409 is
fine — `{ success:false, error: "Recording already in progress for this room" }`).

### `POST /api/live/recordings/stop` — body `{ roomId }`, same auth as start. Finds the
`status:"recording"` doc for `roomId`, sets it to `"processing"`, calls `stopRecording(egressId)`, then
`await pollUntilDone(egressId)` and updates the doc to its final state (`"ready"` + duration/size, or
`"failed"` + error). Returns `{ success, recording: <final doc> }`.

### `GET /api/live/recordings` (rewrite in place) — query params: `roomId?`, `enrolledSlugs?` (comma
list, same convention as `api/live/classes` GET), `instructorEmail?`. No `roomId`/filter → all,
sorted `startedAt desc`. For every row with `status === "ready"`, replace `gcsPath` in the response
with a fresh `videoUrl` from `getSignedRecordingUrl(gcsPath)` (don't persist the signed URL). Response:
`{ success, count, recordings: [...] }` where each item has `videoUrl` instead of raw `gcsPath` when
ready, and no `videoUrl` field when not ready yet (client shows status pill instead).

### `POST /api/live/recordings` (old handler) — **delete it**. Recording docs are only created by
`/start`.

## `useLiveKitRoom` hook contract (Task 2 writes it; Task 3's components consume the callback shape)

`src/components/live/useLiveKitRoom.ts`:
```ts
interface UseLiveKitRoomOpts { roomId: string; wsUrl: string; token: string; isInstructor: boolean; }
interface UseLiveKitRoomResult {
  connectionState: "connecting" | "connected" | "disconnected" | "failed";
  localVideoEl: (el: HTMLVideoElement | null) => void;   // ref-callback to attach local cam track
  remoteParticipants: { identity: string; name: string; attachVideo: (el: HTMLVideoElement | null) => void; isSpeaking: boolean }[];
  isCameraOn: boolean; isMicOn: boolean; isScreenSharing: boolean;
  toggleCamera: () => void; toggleMic: () => void; toggleScreenShare: () => void;
  isRecording: boolean;             // from RoomEvent.RecordingStatusChanged
  sendData: (topic: string, payload: unknown) => void;   // JSON-encodes, room.localParticipant.publishData(bytes, { reliable: true, topic })
  onData: (topic: string, handler: (payload: unknown, fromIdentity: string) => void) => () => void; // returns unsubscribe
  disconnect: () => void;
}
export function useLiveKitRoom(opts: UseLiveKitRoomOpts): UseLiveKitRoomResult
```
Internals: `new Room()`, `room.connect(wsUrl, token)`, `room.localParticipant.setCameraEnabled(true)` /
`setMicrophoneEnabled(true)` on connect (instructor) — students start with both off (they only ever
publish mic, and only once granted `canPublishMic`+ they explicitly raise-hand-unmute; camera stays
off for students always, no UI control for it). Subscribe to `RoomEvent.TrackSubscribed` /
`TrackUnsubscribed` / `ParticipantConnected` / `ParticipantDisconnected` /
`RecordingStatusChanged` / `DataReceived` (decode topic+JSON payload, fan out to `onData` handlers) /
`Disconnected` (set connectionState "disconnected"). Clean up (`room.disconnect()`) on unmount.

## Data-channel message shapes (Task 3 sends/receives exactly these via `sendData`/`onData`)

```ts
// topic "whiteboard"
type WhiteboardMsg =
  | { type: "stroke"; tool: "pen"|"highlighter"|"eraser"; color: string; size: number; points: [number, number][] }
  | { type: "clear" };

// topic "chat"
type ChatMsg = { id: string; sender: string; isInstructor: boolean; text: string; time: string };

// topic "doubt-queue"
type DoubtQueueMsg =
  | { type: "raise-hand"; id: string; name: string; topic: string }
  | { type: "lower-hand"; name: string }
  | { type: "approve-speaker"; name: string }
  | { type: "mute-speaker" }
  | { type: "mode-switch"; mode: "lecture" | "doubt"; secondsRemaining: number };  // instructor-only, broadcast on toggle
```
Only the instructor's client applies `type: "stroke"`/`"clear"` it did NOT originate to the canvas —
i.e. every client renders whatever arrives on `whiteboard`, but only the instructor's local input
loop calls `sendData("whiteboard", …)`. Same asymmetry for `mode-switch` (instructor's toggle button
broadcasts; students only ever receive it and render the countdown from the received
`secondsRemaining`, no independent local timer that could drift/disagree between participants — each
client still ticks the received value down locally between broadcasts to avoid re-render storms, but
resyncs whenever a fresh `mode-switch` arrives).

## Component prop contracts (Task 3)

```ts
// WhiteboardCanvas.tsx
interface WhiteboardProps {
  isInstructor: boolean; roomId: string;
  sendData: (topic: string, payload: unknown) => void;
  onData: (topic: string, handler: (payload: unknown) => void) => () => void;
}
// LiveChatDrawer.tsx
interface LiveChatProps {
  currentUserName: string; isInstructor: boolean;
  sendData: (topic: string, payload: unknown) => void;
  onData: (topic: string, handler: (payload: unknown) => void) => () => void;
}
// DoubtQueueManager.tsx
interface DoubtQueueProps {
  isInstructor: boolean; currentUserName: string;
  sendData: (topic: string, payload: unknown) => void;
  onData: (topic: string, handler: (payload: unknown) => void) => () => void;
}
```
No hardcoded seed messages/queue entries — both start empty (`LiveChatDrawer`'s two seed messages and
`DoubtQueueManager`'s two seed queue entries are deleted). Keep every existing visual/animation/style
exactly as-is — only the state source changes (broadcast/receive instead of local-only `useState`
init).

## `src/app/live/[roomId]/page.tsx` (Task 2 rewrites; consumes Task 1's routes and Task 3's component
props per this spec, but Task 1 and Task 3's actual files don't need to exist yet to write this
correctly — the contracts above are final)

Flow: get `user` from `useAuth()` → redirect to login if absent (unchanged behavior) → `GET
/api/live/classes?roomId=` for the class doc (404 → "Class not found or has ended" screen, replacing
the old assumption that every roomId is valid) → if not instructor, `GET
/api/enrollments?email={user.email}` and confirm the class's `targetBatches`/`selectedStudents` allow
this student (mirror the server-side check — this is UX only, the token route is the real gate) → if
enrolled, `POST /api/live/token` with `Authorization` header (per "Client fetch convention" above),
body `{ roomId }` → on success `useLiveKitRoom({ roomId, wsUrl, token, isInstructor })`. On a 403 from
the token route, show "You are not enrolled in this class" instead of entering. Instructor sees a
"Start Recording"/"Stop Recording" control calling `/api/live/recordings/start` and `/stop` (per
"Client fetch convention"); the REC badge and timer reflect `isRecording` from the hook, not a local
fake timer. "End Live Class" (instructor) calls `/stop` if a recording is active, then
`PATCH /api/live/classes` `{ roomId, status: "ENDED" }`, then navigates to `/instructor/dashboard`.
Video tiles: local self-view via `localVideoEl` ref-callback; one tile per `remoteParticipants` entry
via its `attachVideo` ref-callback — replaces the single fake "Simulated Instructor Live Broadcast
Feed" block entirely. Pass `sendData`/`onData` from the hook straight through to
`WhiteboardCanvas`/`LiveChatDrawer`/`DoubtQueueManager` per their contracts above.

## IMPORTANT — `live_classes` POST now sets `instructor`/`instructorEmail` from the caller

`instructor`/`instructorEmail` on a newly created live class are now taken from the authenticated
user (`requireUser`), not the request body — Task 4's create-live-class modal no longer needs to send
either field (harmless if it still does; they're ignored). This is what lets
`/api/live/recordings/start` verify the caller owns the class.

## IMPORTANT — existing calls that now need the Authorization header

`POST`/`PATCH`/`DELETE /api/live/classes` now call `requireUser` + `requireInstructor` (already done,
see above) and will 401 without a bearer token. `src/app/instructor/dashboard/page.tsx` already has a
`POST /api/live/classes` call (create-live-class modal submit) and a `DELETE /api/live/classes?roomId=`
call (the trash-icon handler on each live-class card) that predate this and currently send no
Authorization header — Task 4 must add the header (per "Client fetch convention" above) to both, or
they will silently start failing with 401 after this rebuild.

## Dashboard / instructor-dashboard / `/live` index (Task 4)

- `src/app/dashboard/page.tsx`: delete the hardcoded `/live/room-maths-10-quadratics` quick-action
  link and the dummy live-class fallback array in the "live" tab (render "No live class scheduled
  right now" when `liveClasses.length === 0` instead). Add a **Past Lectures** tab: same nav-button
  visual pattern as the other 6 tabs in the sidebar `<nav>`, fetches `GET /api/live/recordings` with
  `enrolledSlugs` built the same way the existing live-classes fetch already builds it (reuse that
  logic/pattern — search this file for how it currently calls `/api/live/classes?enrolledSlugs=`).
  Each row: title, subject/class, instructor, date, and — if `status === "ready"` — a `<video controls
  src={videoUrl}>` (or a "Watch Recording" button revealing the player), else a status pill
  (`recording`/`processing`/`failed`) with no player.
- `src/app/instructor/dashboard/page.tsx`: same dummy-array deletion in the "live" tab. Add a
  **Recordings** tab (same nav pattern) listing this instructor's own recordings
  (`GET /api/live/recordings?instructorEmail=`), showing status honestly (no player until `"ready"`).
- `src/app/live/page.tsx`: remove the hardcoded redirect. If the user has bearer auth and exactly one
  live class where they're the instructor or an enrolled student, redirect to `/live/{roomId}`;
  otherwise redirect to `/dashboard` (student) or `/instructor/dashboard` (instructor/admin) with tab
  query hint `?tab=live` if that pattern already exists in this file, else just the base path.

## What NOT to change

`src/app/classroom/[roomId]/page.tsx` (the alias) — no change needed, it already re-exports the page
Task 2 rewrites. Don't touch `docs/` other than reading this file. Don't touch
`test_live_meetings.py`.
