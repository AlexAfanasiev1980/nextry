export const handlerTime = (seconds: number) => {
  return new Date(seconds * 1000).toUTCString().split(/ /)[4];
};
