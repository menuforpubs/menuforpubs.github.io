import size from 'lodash/fp/size';

export const getHashCode = (str) => {
  let hash = 0,
    i,
    chr;
  if (size(str) === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
