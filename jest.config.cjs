/**
 * Changing the file name from  `*.js` to `*.cjs` fixes the issue of Jest
 * throwing an error when encountering ES modules.
 */
module.exports = {
  preset: 'ts-jest',
}
