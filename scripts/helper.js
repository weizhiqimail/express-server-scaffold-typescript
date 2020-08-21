const fs = require('fs');

function checkTargetPath(targetPath) {
  const exist = fs.existsSync(targetPath);
  if (!exist) {
    fs.mkdirSync(targetPath);
  }
}


exports.checkTargetPath = checkTargetPath;
