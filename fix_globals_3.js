const fs = require('fs');
let cssPath = 'app/globals.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Fix empty selectors
css = css.replace(/{\s*background:\s*rgba\(249,\s*115,\s*22,\s*0\.1\);\s*}/g, '');
css = css.replace(/{\s*background:\s*rgba\(249,\s*115,\s*22,\s*0\.1\);\s*-webkit-background-clip:\s*text;\s*-webkit-text-fill-color:\s*transparent;\s*background-clip:\s*text;\s*}/g, '');
css = css.replace(/\.-soft\s*{\s*background:\s*rgba\(249,\s*115,\s*22,\s*0\.1\);\s*}/g, '');
css = css.replace(/\.gradient-warm\s*{\s*background:\s*rgba\(249,\s*115,\s*22,\s*0\.1\);\s*}/g, '');
css = css.replace(/\.dark\s*\.gradient-warm\s*{\s*background:\s*rgba\(249,\s*115,\s*22,\s*0\.1\);\s*}/g, '');

// Fix bg-grid-pattern
css = css.replace(/\.bg-grid-pattern\s*{\s*background-image:[^}]+}/g, '.bg-grid-pattern { background-color: rgba(249, 115, 22, 0.02); }');
css = css.replace(/\.dark\s*\.bg-grid-pattern\s*{\s*background-image:[^}]+}/g, '.dark .bg-grid-pattern { background-color: rgba(249, 115, 22, 0.02); }');

// Clean up any remaining empty selectors
css = css.replace(/^[ \t]*{\s*}/gm, '');

fs.writeFileSync(cssPath, css);
console.log('Fixed globals.css syntax errors');
