const fs = require('fs');
const path = require('path');

const regex = /\b(bg-gradient-to-[a-z]+|from-[a-z0-9-]+|via-[a-z0-9-]+|to-[a-z0-9-]+|text-gradient|gradient-brand)\b/g;

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next') && !file.includes('.git')) {
        results = results.concat(walkDir(file));
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walkDir('./app').concat(walkDir('./components'));

let changedFiles = 0;
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (regex.test(content)) {
    const newContent = content.replace(regex, '').replace(/ +/g, ' '); // Clean up extra spaces
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Updated', file);
    changedFiles++;
  }
});

console.log(`Changed ${changedFiles} files.`);
