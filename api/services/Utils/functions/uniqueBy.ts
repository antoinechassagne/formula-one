export default function uniqueBy<T>(array: T[], propertyName: keyof T): T[] {
  return array.filter((item, index, fullArray) => {
    return fullArray.findIndex(i => i[propertyName] === item[propertyName]) === index;
  });
}
