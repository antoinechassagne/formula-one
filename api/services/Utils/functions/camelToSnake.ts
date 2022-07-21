export default function camelToSnake(str: string) {
  return str ? str.replace(/([A-Z])/g, (_, group) => `_${group.toLowerCase()}`).replace(/^_/, "") : str;
}
