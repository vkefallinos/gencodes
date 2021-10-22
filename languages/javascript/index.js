
const id = 'javascript';
const displayName = 'JavaScript';
const mimeTypes = ['text/javascript'];
const fileExtensions = [
  'js',
  'jsx',
  'ts',
  'tsx'
];
const parsers = [
  'babylon',
  'flow',
  'typescript'
];
const detectParser = (text, filePath) => {
  return 'typescript';
  const extension = filePath.split('.').pop();
  if (extension === 'jsx' || extension === 'js') {
    return 'babylon';
  }
  if (extension === 'tsx' || extension === 'ts') {
  }
  return 'flow';
}
module.exports = {
  id, 
  displayName, 
  mimeTypes, 
  fileExtensions, 
  parsers,
  detectParser
};