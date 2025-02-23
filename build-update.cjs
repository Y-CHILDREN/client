const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const distDir = path.resolve(__dirname, 'dist');
const indexPath = path.join(distDir, 'index.html');
const assetsDir = path.join(distDir, 'assets');

// 🔹 최신 빌드된 index.html을 유지하기 위한 파일명
const latestIndexPath = path.join(distDir, 'index-latest.html');

function getHashedFile(originalName) {
  const files = fs.readdirSync(assetsDir);
  const regex = new RegExp(`^${originalName}-[a-zA-Z0-9]+\\.(js|css)$`);
  return files.find((file) => regex.test(file));
}

if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');

  // 🔹 index.html 내부의 JS/CSS 파일명을 해시 포함된 파일명으로 변경
  const jsFile = getHashedFile('index');
  if (jsFile) {
    content = content.replace(
      /\/assets\/index-[a-zA-Z0-9]+\.js/,
      `/assets/${jsFile}`,
    );
  }

  const cssFile = getHashedFile('index');
  if (cssFile) {
    content = content.replace(
      /\/assets\/index-[a-zA-Z0-9]+\.css/,
      `/assets/${cssFile}`,
    );
  }

  // 🔹 index.html 파일 자체의 해시 생성
  const hash = crypto
    .createHash('md5')
    .update(content)
    .digest('hex')
    .slice(0, 8);
  const newIndexPath = path.join(distDir, `index-${hash}.html`);

  // 🔹 최신 index.html을 index-latest.html로 유지
  fs.writeFileSync(newIndexPath, content, 'utf8');
  fs.writeFileSync(latestIndexPath, content, 'utf8');

  console.log(`✅ index.html → index-${hash}.html 으로 변경됨!`);
  console.log(`✅ 최신 index.html은 index-latest.html로 유지됨!`);
} else {
  console.log('❌ index.html을 찾을 수 없음.');
}
