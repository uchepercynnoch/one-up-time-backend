const isObjectEmpty = (object) => {
  for (const objectKey in object)
    if (object.hasOwnProperty(objectKey)) return false;
  return true;
};

module.exports = isObjectEmpty;
