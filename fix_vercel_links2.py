import json, urllib.request, subprocess

with open('/Users/rn/Library/Application Support/com.vercel.cli/auth.json') as f:
    token = json.load(f)['token']

team = 'team_6xuOmJL3MoIFarDpy9odi175'
cred_id = 'cred_7e9788e07da829f6838531cc4811d1ffe48bed4d'
v_headers = {'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'}

def v_post(path, data):
    body = json.dumps(data).encode()
    req = urllib.request.Request(f'https://api.vercel.com{path}', data=body, headers=v_headers, method='POST')
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        return {'error': e.code, 'msg': e.read().decode()}

# Link psychonaut-bookworm and entheogen-atlas to GitHub using correct endpoint
links = [
    ('psychonaut-bookworm', 'prj_IAWhDxG7xPNgN9I4D49shEqpQHKW', 1285876773),
    ('entheogen-atlas',     'prj_Hwb4mRDqcsooFWeTXk3V409dZ3zT', 1285876600),
]

for name, proj_id, repo_id in links:
    result = v_post(f'/v9/projects/{proj_id}/link?teamId={team}', {
        'type': 'github',
        'repo': f'rn-collins/{name}',
        'repoId': repo_id,
        'gitCredentialId': cred_id,
        'productionBranch': 'main'
    })
    if 'error' in result and isinstance(result.get('error'), int):
        print(f'{name} LINK ERROR: {result}')
    else:
        link = result.get('link', {})
        print(f'{name} linked: repo={link.get("repo")} repoId={link.get("repoId")}')

print('Done. Deployments will auto-trigger on next git push (or when rate limit resets).')
