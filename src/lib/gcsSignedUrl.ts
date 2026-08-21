import { Storage } from "@google-cloud/storage";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `${name} is not set. Add it to .env.local — playback needs a GCS bucket + service-account key.`
    );
  }
  return value;
}

let cachedStorage: Storage | null = null;

function getStorage(): Storage {
  if (cachedStorage) return cachedStorage;

  const raw = requiredEnv("GCS_SERVICE_ACCOUNT_JSON");
  let credentials: Record<string, unknown>;
  try {
    credentials = JSON.parse(raw);
  } catch {
    throw new Error("GCS_SERVICE_ACCOUNT_JSON is not valid JSON.");
  }

  cachedStorage = new Storage({ credentials });
  return cachedStorage;
}

/** Mints a short-lived (1 hour) v4 signed read URL for a recording object. Never persist the result
 * — always regenerate one per request, since it expires. */
export async function getSignedRecordingUrl(gcsPath: string): Promise<string> {
  const bucket = requiredEnv("GCS_RECORDINGS_BUCKET");
  const storage = getStorage();

  const [url] = await storage
    .bucket(bucket)
    .file(gcsPath)
    .getSignedUrl({ version: "v4", action: "read", expires: Date.now() + 60 * 60 * 1000 });

  return url;
}
