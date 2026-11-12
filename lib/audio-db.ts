"use client";

const DB_NAME = "english-activation";
const STORE = "recordings";
const VERSION = 1;

export type AudioRecord = {
  key: string;
  blob: Blob;
  createdAt: number;
  mimeType: string;
  duration?: number;
};

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "key" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error("IndexedDB 打开失败"));
  });
}

export async function saveAudio(key: string, blob: Blob, duration?: number): Promise<void> {
  const db = await openDb();
  const rec: AudioRecord = {
    key,
    blob,
    createdAt: Date.now(),
    mimeType: blob.type || "audio/webm",
    duration,
  };
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("保存录音失败"));
    tx.objectStore(STORE).put(rec);
  });
  db.close();
}

export async function getAudio(key: string): Promise<AudioRecord | undefined> {
  const db = await openDb();
  const rec = await new Promise<AudioRecord | undefined>((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).get(key);
    req.onsuccess = () => resolve(req.result as AudioRecord | undefined);
    req.onerror = () => reject(req.error ?? new Error("读取录音失败"));
  });
  db.close();
  return rec;
}

export async function deleteAudio(key: string): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("删除录音失败"));
    tx.objectStore(STORE).delete(key);
  });
  db.close();
}

export async function listAudio(prefix?: string): Promise<AudioRecord[]> {
  const db = await openDb();
  const all = await new Promise<AudioRecord[]>((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).getAll();
    req.onsuccess = () => resolve((req.result as AudioRecord[]) ?? []);
    req.onerror = () => reject(req.error ?? new Error("列出录音失败"));
  });
  db.close();
  const rows = prefix ? all.filter((r) => r.key.startsWith(prefix)) : all;
  return rows.sort((a, b) => a.createdAt - b.createdAt);
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error("读取失败"));
    reader.readAsDataURL(blob);
  });
}

function dataUrlToBlob(dataUrl: string, mimeType: string): Blob {
  const [, data] = dataUrl.split(",");
  const bytes = atob(data ?? "");
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new Blob([arr], { type: mimeType || "audio/webm" });
}

export async function exportAudio(): Promise<
  { key: string; mimeType: string; dataUrl: string; createdAt: number; duration?: number }[]
> {
  const all = await listAudio();
  const out = [];
  for (const rec of all) {
    out.push({
      key: rec.key,
      mimeType: rec.mimeType,
      dataUrl: await blobToDataUrl(rec.blob),
      createdAt: rec.createdAt,
      duration: rec.duration,
    });
  }
  return out;
}

export async function importAudio(
  rows: { key: string; mimeType: string; dataUrl: string; createdAt: number; duration?: number }[],
) {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("导入录音失败"));
    const store = tx.objectStore(STORE);
    for (const row of rows) {
      const rec: AudioRecord = {
        key: row.key,
        blob: dataUrlToBlob(row.dataUrl, row.mimeType),
        createdAt: row.createdAt,
        mimeType: row.mimeType,
        duration: row.duration,
      };
      store.put(rec);
    }
  });
  db.close();
}

export async function clearAudio() {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("清空录音失败"));
    tx.objectStore(STORE).clear();
  });
  db.close();
}

export function audioSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof navigator !== "undefined" &&
    !!navigator.mediaDevices?.getUserMedia &&
    typeof MediaRecorder !== "undefined"
  );
}

export function pickMimeType(): string | undefined {
  if (typeof MediaRecorder === "undefined") return undefined;
  const types = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"];
  return types.find((t) => MediaRecorder.isTypeSupported(t));
}
