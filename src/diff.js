import { has, isPlainObject } from 'lodash';

const diff = (objBefore, objAfter) => {
  const arrOfKeys = Object.keys({ ...objBefore, ...objAfter });

  return arrOfKeys.reduce((acc, key) => {
    let newAcc = [];
    if (has(objBefore, [key]) && has(objAfter, [key])) {
      if (isPlainObject(objBefore[key]) && isPlainObject(objAfter[key])) {
        newAcc = [...acc, {
          key,
          value: diff(objBefore[key], objAfter[key]),
        }];
      } else if (objBefore[key] === objAfter[key]) {
        newAcc = [...acc, {
          key,
          value: objAfter[key],
        }];
      } else {
        newAcc = [
          ...acc,
          { sign: '+', key, value: objAfter[key] },
          { sign: '-', key, value: objBefore[key] },
        ];
      }
    } else if (has(objBefore, [key])) {
      newAcc = [...acc, {
        sign: '-',
        key,
        value: objBefore[key],
      }];
    } else {
      newAcc = [...acc, {
        sign: '+',
        key,
        value: objAfter[key],
      }];
    }
    return newAcc;
  }, []);
};

export default diff;
