const addString = (res) => `${res}\n`;

const json = (diff) => {
  const output = JSON.stringify(diff);
  const outputWithEmptyString = addString(output);
  return outputWithEmptyString;
};

export default json;
