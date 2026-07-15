import re, shutil, subprocess

with open('/Users/rn/psychonaut-bookworm/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

print('Original file size:', len(html))

# Boundaries
script_open_tag = '<script>'
script_close_tag = '</script>'
script_tag_start = html.index(script_open_tag)
script_content_start = script_tag_start + len(script_open_tag)
script_end = html.rindex(script_close_tag)

js_block = html[script_content_start:script_end]
print('JS block length:', len(js_block))

# The footer is at the end of the js_block — find it
footer_offset = js_block.find('<footer ')
print('Footer at JS offset:', footer_offset)
print('Footer preview:', repr(js_block[footer_offset:footer_offset+80]))

# Split: JS (before footer) and HTML footer (from footer onwards)
js_only = js_block[:footer_offset].rstrip()
footer_html = js_block[footer_offset:].strip()

print('JS-only length:', len(js_only))
print('Footer HTML length:', len(footer_html))
print('JS ends with:', repr(js_only[-60:]))
print('Footer starts with:', repr(footer_html[:80]))

# The after_script content (should just be </body></html>)
after_script = html[script_end + len(script_close_tag):]
print('After script:', repr(after_script))

# Verify JS is valid
with open('/tmp/bookworm_js_check.js', 'w') as f:
    f.write(js_only)
result = subprocess.run(['node', '--check', '/tmp/bookworm_js_check.js'], capture_output=True, text=True)
print('\nNode check result:', result.returncode, result.stderr[:200])

if result.returncode == 0:
    print('\n✅ JS is valid — proceeding with fix')
    # Backup original
    shutil.copy('/Users/rn/psychonaut-bookworm/index.html',
                '/Users/rn/psychonaut-bookworm/index.html.bak')

    # Reconstruct: [head HTML] + <script> + [JS only] + </script> + [footer HTML] + [after]
    head_html = html[:script_content_start]  # includes <script>
    new_html = head_html + '\n' + js_only + '\n' + script_close_tag + '\n' + footer_html + after_script

    with open('/Users/rn/psychonaut-bookworm/index.html', 'w', encoding='utf-8') as f:
        f.write(new_html)

    print('New file size:', len(new_html))
    print('✅ File written. Verifying script count...')

    # Verify
    opens = new_html.count('<script>')
    closes = new_html.count('</script>')
    footer_pos = new_html.find('<footer ')
    script_end_pos = new_html.rindex('</script>')
    print(f'Script opens: {opens}, closes: {closes}')
    print(f'Footer at: {footer_pos}, </script> at: {script_end_pos}')
    print('Footer is AFTER </script>:', footer_pos > script_end_pos)
else:
    print('❌ JS still has errors — not writing file')
