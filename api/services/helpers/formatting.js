export const fromCamelCase = (str) => {
  let result = str[0].toUpperCase();
  for (let i = 1; i < str.length; i++) {
    const [curr, prev] = [str[i], str[i-1]];
    if (curr.toUpperCase() == curr && prev.toUpperCase() !== prev) {
      result += " ";
    } 
    result += curr;
  }
  return result;
}