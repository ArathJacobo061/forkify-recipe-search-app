import { TIMEOUT_SEC } from './config.js';

const timeout = s =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Request took too long! ⏳ (${s}s)`)), s * 1000)
  );

export const getJSON = async url => {
  const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
};

export const sendJSON = async (url, uploadData) => {
  const fetchPro = fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(uploadData),
  });
  const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
  const data = await res.json();
  if (!res.ok) throw new Error(`${data.message ?? 'Upload failed'} (${res.status})`);
  return data;
};


