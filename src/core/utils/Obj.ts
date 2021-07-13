export const get = (object: any, path = '') => {
  const steps = path ? path.split('.') : [];
  return steps.reduce((traversed, part) => {
    if (typeof traversed !== 'object' || traversed === null)
      return null;
    return traversed[part] ?? null;
  }, object);
};

export const pickBy = (object, picker) => {
  const result = {};

  for (const [key, value] of Object.entries(object)) {
    if (picker(value, key)) {
      result[key] = value;
    }
  }

  return result;
};
