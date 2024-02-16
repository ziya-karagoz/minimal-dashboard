export function tryParseInt(value: any) {
  var parsedValue = parseInt(value);
  return isNaN(parsedValue) ? value : parsedValue;
}
