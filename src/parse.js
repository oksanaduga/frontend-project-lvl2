
import yaml from 'js-yaml';
import ini from 'ini';

export default (content, format) => {
  const parsers = {
    json: JSON.parse,
    yml: yaml.safeLoad,
    ini: ini.parse,
  };
  const parse = parsers[format];
  return parse(content);
};
