module.exports = function detectParser(file, source) {
  const fileEnding = file.split('.').pop();
  switch (fileEnding) {
    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
      return 'javascript';

  }
}