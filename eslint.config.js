const globals = require('globals');
const pluginJs = require('@eslint/js');
const jestPlugin = require('eslint-plugin-jest');

module.exports = [
  { 
    files: ['**/*.js'], 
    languageOptions: { 
      sourceType: 'commonjs' 
    },
    plugins: {
      jest: jestPlugin,
    },
  },
  {
    files: ['**/tests/**/*.js', '**/*.test.js'],
  },
  { 
    languageOptions: { 
      globals: { 
        ...globals.browser, 
        ...globals.node 
      } 
    } 
  },
  pluginJs.configs.recommended,
];
