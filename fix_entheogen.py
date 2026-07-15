import re, subprocess

with open('/Users/rn/entheogen-atlas/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

print('File size:', len(html))

# Find all script open/close tags with line numbers
lines = html.split('\n')
print('Total lines:', len(lines))

# Find all <script and </script> with positions
opens = [(i+1, lines[i].strip()[:80]) for i, l in enumerate(lines) if '<script' in l]
closes = [(i+1, lines[i].strip()[:80]) for i, l in enumerate(lines) if '</script>' in l]
print('Script opens:', opens)
print('Script closes:', closes)

# Extract the MAIN script (not schema.org)
# Find the script that's NOT type="application/ld+json"
import re
main_scripts = re.findall(r'<script(?! type)[^>]*>(.*?)</script>', html, re.DOTALL)
print('\nMain script blocks found:', len(main_scripts))
for i, s in enumerate(main_scripts):
    print(f'Script {i}: {len(s)} chars, preview: {repr(s.strip()[:100])}')
    print(f'  tail: {repr(s.strip()[-100:])}')

# Try node check on main script
if main_scripts:
    # Find the largest script (main JS)
    main_js = max(main_scripts, key=len)
    with open('/tmp/entheogen_check.js', 'w') as f:
        f.write(main_js)
    result = subprocess.run(['node', '--check', '/tmp/entheogen_check.js'], capture_output=True, text=True)
    print('\nNode check:', result.returncode, result.stderr[:300])
