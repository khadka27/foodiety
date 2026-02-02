import re

# Read the file
with open('app/about/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove animation properties from div elements
# Pattern to match div opening tags with animation properties
pattern = r'<div([^>]*)\s+(initial|animate|transition|whileInView)=\{[^}]*\}([^>]*)'
while re.search(pattern, content):
    content = re.sub(pattern, r'<div\1\3', content)

# Also remove standalone animation properties
content = re.sub(r'\s+(initial|animate|transition|whileInView)=\{[^}]*\}', '', content)

# Write back to file
with open('app/about/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Animation properties removed from about page")
