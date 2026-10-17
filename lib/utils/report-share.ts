export type ShareChannel = "gmail" | "whatsapp" | "linkedin" | "copy";

export function shareReportChannel(
  channel: ShareChannel,
  text: string,
  url: string,
  onCopied?: () => void
): void {
  if (typeof window === "undefined") return;

  if (channel === "gmail") {
    window.open(`mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`, "_blank");
  } else if (channel === "whatsapp") {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${url}`)}`, "_blank");
  } else if (channel === "linkedin") {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(url);
    onCopied?.();
  }
}
