export default function snakeToCamelCase(str: string) {
  return str ? str.replace(/(_\w)/g, match => match[1].toUpperCase()) : str;
}
