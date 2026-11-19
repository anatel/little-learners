// Hosts allowed to open the dev server (e.g. the tablet opening the laptop's
// Wi-Fi address). Set DEV_HOST to the laptop's address; see README.
export function devOrigins(env: Record<string, string | undefined> = process.env): string[] {
  const host = env.DEV_HOST?.trim();
  return host ? [host] : [];
}
