const pad = (value) => String(value).padStart(2, "0");
const MONTHS = "JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC".split(" ");

export function formatDuration(totalSeconds) {
  return `${pad(Math.floor(totalSeconds / 60))}:${pad(totalSeconds % 60)}`;
}

export function formatTapeTimecode(elapsedMs) {
  const seconds = Math.floor(elapsedMs / 1000);
  const hours = pad(Math.floor(seconds / 3600));
  const mins = pad(Math.floor(seconds / 60) % 60);
  const secs = pad(seconds % 60);
  const cs = pad(Math.floor((elapsedMs % 1000) / 10));
  return `${hours}:${mins}:${secs}:${cs}`;
}

export function formatTapeTimestamp(nowMs) {
  const date = new Date(nowMs);
  const dayLine = `${MONTHS[date.getMonth()]} ${pad(date.getDate())} ${date.getFullYear()}`;
  const timeLine = `${pad(date.getHours() % 12 || 12)}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ${date.getHours() >= 12 ? "PM" : "AM"}`;
  return `${dayLine}\n${timeLine}`;
}

export function computeSyntheticEvpLevel(nowMs, isRecording, muted) {
  if (!isRecording || muted) return 0;
  return (
    2 + Math.floor((Math.sin(nowMs / 310) + 1) * 3 + (Math.sin(nowMs / 87) + 1))
  );
}
