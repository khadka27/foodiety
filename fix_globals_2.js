const fs = require('fs');

const cssPath = 'app/globals.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Replace multi-line linear-gradients
css = css.replace(/background:\s*linear-gradient\([^;]+;/g, 'background: rgba(249, 115, 22, 0.1);');
css = css.replace(/linear-gradient\([^)]+\)/g, 'rgba(249, 115, 22, 0.05)');

fs.writeFileSync(cssPath, css);
console.log('Fixed globals.css again');
