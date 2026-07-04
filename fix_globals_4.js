const fs = require('fs');
let cssPath = 'app/globals.css';
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace(/::-webkit-scrollbar-thumb:hover\s*\/\*/, '::-webkit-scrollbar-thumb:hover { background: rgba(249, 115, 22, 0.2); }\n\n/*');

fs.writeFileSync(cssPath, css);
console.log('Fixed scrollbar hover selector');
