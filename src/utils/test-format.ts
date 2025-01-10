export function testFormat(input: string) {
  console.log('test');
  return input
    .split('')
    .map(char => {
      return char.toUpperCase();
    })
    .join('');
}
