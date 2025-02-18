const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const distDir = path.resolve(__dirname, 'dist');
const indexPath = path.join(distDir, 'index.html');

// index.html이 존재하는지 확인
if (fs.existsSync(indexPath)) {
  // 파일의 해시 생성
  const content = fs.readFileSync(indexPath, 'utf8');
  const hash = crypto
    .createHash('md5')
    .update(content)
    .digest('hex')
    .slice(0, 8);
  const newIndexPath = path.join(distDir, `index-${hash}.html`);

  // 파일명 변경
  fs.renameSync(indexPath, newIndexPath);
  console.log(`✅ index.html -> ${newIndexPath} 으로 변경됨!`);
} else {
  console.log('❌ index.html을 찾을 수 없음.');
}
