import json, urllib.request, subprocess

# Load Vercel token
with open('/Users/rn/Library/Application Support/com.vercel.cli/auth.json') as f:
    token = json.load(f)['token']

# Get GitHub token from keychain
gh_token = subprocess.run(
    ['security', 'find-internet-password', '-s', 'github.com', '-w'],
    capture_output=True, text=True
).stdout.strip()

team = 'team_6xuOmJL3MoIFarDpy9odi175'
cred_id = 'cred_7e9788e07da829f6838531cc4811d1ffe48bed4d'

v_headers = {'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'}
gh_headers = {'Authorization': f'token {gh_token}', 'Accept': 'application/vnd.github.v3+json'}

def v_patch(path, data):
    body = json.dumps(data).encode()
    req = urllib.request.Request(f'https://api.vercel.com{path}', data=body, headers=v_headers, method='PATCH')
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        return {'error': e.code, 'msg': e.read().decode()}

def v_post(path, data):
    body = json.dumps(data).encode()
    req = urllib.request.Request(f'https://api.vercel.com{path}', data=body, headers=v_headers, method='POST')
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        return {'error': e.code, 'msg': e.read().decode()}

def gh_get(path):
    req = urllib.request.Request(f'https://api.github.com{path}', headers=gh_headers)
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())

# Get GitHub repo IDs
print("Getting GitHub repo IDs...")
repos_to_link = {
    'psychonaut-bookworm': 'prj_IAWhDxG7xPNgN9I4D49shEqpQHKW',
    'entheogen-atlas': 'prj_Hwb4mRDqcsooFWeTXk3V409dZ3zT',
}

for repo_name, proj_id in repos_to_link.items():
    info = gh_get(f'/repos/rn-collins/{repo_name}')
    repo_id = info['id']
    print(f'{repo_name}: GitHub ID = {repo_id}')

    # Link to Vercel project
    result = v_patch(f'/v9/projects/{proj_id}?teamId={team}', {
        'link': {
            'type': 'github',
            'repo': f'rn-collins/{repo_name}',
            'repoId': repo_id,
            'gitCredentialId': cred_id,
            'productionBranch': 'main'
        }
    })
    link = result.get('link', {})
    if 'error' in result:
        print(f'  ERROR: {result}')
    else:
        print(f'  Linked: {link.get("repo")} (repoId={link.get("repoId")})')

# Now trigger deployments from latest GitHub commit for all 4 projects
print("\nTriggering deployments via API...")
deploy_targets = [
    ('psychonaut-bookworm', 'prj_IAWhDxG7xPNgN9I4D49shEqpQHKW'),
    ('entheogen-atlas', 'prj_Hwb4mRDqcsooFWeTXk3V409dZ3zT'),
    ('aiapc-site', 'prj_JezysFlSTBWHIsWpu0H7eKqra0S1'),
    ('fadiman-atlas', 'prj_9IMhGDdLu2rAdIhGEhqiSg2ALGcI'),
]

for repo_name, proj_id in deploy_targets:
    # Get latest commit SHA
    commits = gh_get(f'/repos/rn-collins/{repo_name}/commits?per_page=1')
    sha = commits[0]['sha']
    print(f'{repo_name}: latest commit {sha[:8]}')

    # Trigger deployment via Vercel API
    result = v_post(f'/v13/deployments?teamId={team}&forceNew=1', {
        'name': repo_name,
        'project': proj_id,
        'target': 'production',
        'gitSource': {
            'type': 'github',
            'ref': 'main',
            'sha': sha,
            'repoId': gh_get(f'/repos/rn-collins/{repo_name}')['id']
        }
    })
    if 'error' in result and isinstance(result.get('error'), int):
        print(f'  ERROR {result}')
    elif result.get('id'):
        print(f'  Deployment triggered: {result.get("url", "no url")} (id={result["id"][:12]}...)')
    else:
        print(f'  Response: {json.dumps(result)[:200]}')
