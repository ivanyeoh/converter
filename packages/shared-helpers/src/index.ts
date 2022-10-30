export function splitOnLast(value: string, delimiter: string) {
  const t = value.lastIndexOf(delimiter);
  return t < 0 ? [value] : [value.substring(0, t), value.substring(t)];
}

export function changeFilenameExtension(filename: string, newExt: string) {
  const [name] = splitOnLast(filename, ".");
  return `${name}.${newExt}`;
}
