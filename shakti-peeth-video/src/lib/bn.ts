const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** 51 → "৫১" (on-screen numerals). */
export const toBn = (n: number | string): string =>
  String(n).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);

/** First part of a Bengali name, before any bracketed alias: "ত্রিস্রোতা (ভ্রামরী)" → "ত্রিস্রোতা". */
export const shortName = (s: string): string => s.split(" (")[0];
