const fs = require('fs');

const cssPath = 'app/globals.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Replace linear-gradients
css = css.replace(/background:\s*linear-gradient\([^)]+\);/g, (match) => {
    if (match.includes('scrollbar-thumb')) {
        return 'background: hsl(48, 97%, 60%);';
    } else if (match.includes('divider-gradient')) {
        return 'background: rgba(249, 115, 22, 0.3);';
    } else if (match.includes('category-tab.active')) {
        return 'background: #EBC63C;';
    }
    return 'background: rgba(249, 115, 22, 0.1);';
});

// Also fix any syntax errors caused by previous regex removing .gradient-brand and .text-gradient
// Let's just manually search and replace any leftover dots.
css = css.replace(/\. \{\s*\}/g, ''); // empty class
css = css.replace(/\,\s*\{/g, '{'); // comma followed by brace
css = css.replace(/\.\s*\{/g, '{'); // dot space brace

fs.writeFileSync(cssPath, css);
console.log('Fixed globals.css');
