const clone = (obj) => Object.assign({}, obj);

export const renameKey = (object, key, newKey) => {
  const clonedObj = clone(object);
  const targetKey = clonedObj[key];

  delete clonedObj[key];
  clonedObj[newKey] = targetKey;
  return clonedObj;
};
