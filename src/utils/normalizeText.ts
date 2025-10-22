export function normalizeText(text: string): string {
  return text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[ぁ-ん]/g, s =>
      String.fromCharCode(s.charCodeAt(0) + 0x60)
    );
}
//表記の揺れを直す「入力を正規化」