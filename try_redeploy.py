import json, urllib.request

with open('/Users/rn/Library/Application Support/com.vercel.cli/auth.json') as f:
    token = json.load(f)['token']

team = 'team_6xuOmJL3MoIFarDpy9odi175'
headers = {'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'}

def api_get(path):
    req = urllib.request.Request(f'https://api.vercel.com{path}', headers=headers)
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())

def api_post(path, data=None):
    body = json.dumps(data or {}).encode()
    req = urllib.request.Request(f'https://api.vercel.com{path}', data=body, headers=headers, method='POST')
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        return {'error': e.code, 'msg': e.read().decode()[:300]}

# Get latest deployment IDs for each project
projects = {
    'psychonaut-bookworm': 'prj_IAWhDxG7xPNgN9I4D49shEqpQHKW',
    'entheogen-atlas': 'prj_Hwb4mRDqcsooFWeTXk3V409dZ3zT',
    'aiapc-site': 'prj_JezysFlSTBWHIsWpu0H7eKqra0S1',
    'fadiman-atlas': 'prj_9IMhGDdLu2rAdIhGEhqiSg2ALGcI',
}

for name, proj_id in projects.items():
    # Get latest deployment
    deps = api_get(f'/v6/deployments?projectId={proj_id}&teamId={team}&limit=1&target=production')
    deployments = deps.get('deployments', [])
    if not deployments:
        print(f'{name}: no deployments found')
        continue

    dep_id = deployments[0]['uid']
    print(f'{name}: latest deployment {dep_id}')

    # Try the redeploy endpoint
    result = api_post(f'/v13/deployments/{dep_id}/redeploy?teamId={team}', {'target': 'production'})

    if result.get('id'):
        print(f'  REDEPLOYED: {result.get("url", "no url")}')
    elif 'error' in result:
        print(f'  ERROR {result["error"]}: {result["msg"][:150]}')
    else:
        print(f'  Response: {str(result)[:150]}')
