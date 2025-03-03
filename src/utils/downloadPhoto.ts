export default function downloadPhoto(url: string, filename?: string) {
  try {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "downloaded-image";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error("Download error:", error);
  }
}
