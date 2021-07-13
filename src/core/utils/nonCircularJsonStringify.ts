export const nonCircularJsonStringify = function (
  data,
  callback = null,
  indentation = 0,
) {
  const cache = [];
  return JSON.stringify(
    data,
    function (key, value) {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    },
    indentation,
  );
};
