export const validate = (value: any, pattern: RegExp) => {
   return pattern.test(value)
}