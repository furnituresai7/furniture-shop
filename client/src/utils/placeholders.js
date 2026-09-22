// True for unfilled values like '[SHOP_ADDRESS]'
export function isPlaceholder(value) {
  return typeof value === 'string' && value.trim().startsWith('[')
}