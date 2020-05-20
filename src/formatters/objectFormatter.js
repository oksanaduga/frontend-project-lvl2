import { isPlainObject, keys, values } from 'lodash';

const typeValue = (value, indent) => {
  if (isPlainObject(value)) {
    const output = `{\n${indent.repeat(2)}${keys(value)}: ${values(value)}\n${indent}  }`;
    return output;
  }
  return value;
};

const addString = (res) => `{\n${res}\n}\n`;

const objectFormatter = (diffTree) => {
  const iter = (diff, depth = 1) => {
    const indent = ' '.repeat((depth * 2) + (depth - 1) * 2);
    const closeIndent = ' '.repeat((depth * 2) + (depth - 1) * 2 + 2);
    const output = diff.reduce((acc, node) => {
      const {
        settingName,
        type,
        from,
        to,
        children,
      } = node;
      const typeOfNode = {
        removed: `${indent}- ${settingName}: ${typeValue(from, indent)}`,
        added: `${indent}+ ${settingName}: ${typeValue(to, indent)}`,
        change: `${indent}- ${settingName}: ${typeValue(from, indent)}\n${indent}+ ${settingName}: ${typeValue(to, indent)}`,
        notChange: `${indent}  ${settingName}: ${typeValue(to, indent)}`,
        scope: `${indent}  ${settingName}: {\n${iter(children, depth + 1)}\n${closeIndent}}`,
      };
      return [...acc, typeOfNode[type]];
    }, []);
    return output.join('\n');
  };
  return addString(iter(diffTree));
};

export default objectFormatter;
/*
[
  {
    "settingName": "common",
    "type": "insert setting",
    "children": [
      {
        "settingName": "setting1",
        "type": "setting",
        "from": "Value 1",
        "to": "Value 1"
      },
      {
        "settingName": "setting2",
        "type": "setting",
        "from": "200"
      },
      {
        "settingName": "setting3",
        "type": "setting",
        "from": true,
        "to": {
          "key": "value"
        }
      },
      {
        "settingName": "setting6",
        "type": "insert setting",
        "children": [
          {
            "settingName": "key",
            "type": "setting",
            "from": "value",
            "to": "value"
          },
          {
            "settingName": "ops",
            "type": "setting",
            "to": "vops"
          }
        ]
      },
      {
        "settingName": "follow",
        "type": "setting",
        "to": false
      }
    ]
  }
]


{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
          + ops: vops
        }
      + follow: false
    }
}
*/
