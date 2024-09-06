export function useFormatNumberWithDots(num: number | string): string {
  const numStr = num.toString();

  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
