import os
import re
import json

repo = '/home/widifirmaan/javascript-aio-tools'
results = []

ignore_domains = [
    'widifirmaan.web.id',
    'w3.org',
    'web.dev',
    'github.com/twbs',
    'icons.getbootstrap.com',
    'getbootstrap.com',
    'github.com'
]

for root, dirs, files in os.walk(repo):
    if any(p in root for p in ['node_modules', '.git', 'screenshots', 'raw_screenshots']):
        continue
    for file in files:
        if file.endswith(('.html', '.js', '.css', '.mjs')):
            if 'scripts/find-externals.py' in file:
                continue
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            urls = re.findall(r'https?://[^\s"\'<>`]+', content)
            for u in urls:
                if not any(trusted in u for trusted in ignore_domains):
                    results.append({'file': os.path.relpath(path, repo), 'url': u})

print(json.dumps(results, indent=2))
