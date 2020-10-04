const plato = require('es6-plato');
const { inspect } = require('./main');
const { adapt } = require('../utils/platoOptionsAdapter');
const { DEFAULT_OUTPUT_DIR, DEFAULT_TITLE, FILE_PATTERN } = require('../config/constants');

jest.mock('es6-plato');
const spy = jest.spyOn(plato, 'inspect');

describe('Testing main.inspect', () => {
  test('Should call the plato inspect method passing the expected args', () => {
    const src = './src';
    const args = {
      dir: './output',
      title: 'report',
    };
    const expectedArgs = {
      src: `${src}${FILE_PATTERN}`,
      outputDir: `${args.dir}/${args.title}`,
      options: adapt(args),
    };

    inspect(src, args);

    expect(spy).toBeCalledWith(expectedArgs.src, expectedArgs.outputDir, expectedArgs.options);
  });

  test('Should call the plato inspect passing the default values when the args are not provided',
    () => {
      const src = './src';
      const args = {};
      const expectedArgs = {
        src: `${src}${FILE_PATTERN}`,
        outputDir: `${src}${DEFAULT_OUTPUT_DIR}/${DEFAULT_TITLE}`,
        options: adapt(args),
      };

      inspect(src, args);

      expect(spy).toBeCalledWith(expectedArgs.src, expectedArgs.outputDir, expectedArgs.options);
    });
});