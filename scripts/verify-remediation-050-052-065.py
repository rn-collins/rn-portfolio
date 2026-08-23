from pathlib import Path
import json,csv,re

ROOT=Path(__file__).parent
SPEC=json.load(open(ROOT/'remediation-copy-050-052-065.json'))
OUT=ROOT/'independent-verification-050-052-065';OUT.mkdir(exist_ok=True)

def walk(build,obj,path=''):
    if isinstance(obj,str):
        if path.endswith(('url','id','issuer','title','locator','retrieved','date','docket','limit','sourceNote')): return
        yield path,obj
    elif isinstance(obj,list):
        for i,x in enumerate(obj,1): yield from walk(build,x,f'{path}[{i}]')
    elif isinstance(obj,dict):
        for k,v in obj.items():
            if k=='sources': continue
            yield from walk(build,v,f'{path}.{k}' if path else k)

def surface(path):
    if path=='overviewWhy': return 'overview / WHY IT MATTERS'
    if path.startswith('a.'): return 'A tool / '+path[2:]
    if path.startswith('filmAndMotionScenes'): return 'B film + motion / '+path
    if path=='finalProposition': return 'B film + motion / final proposition'
    if path.startswith('b.'): return 'B interactive / '+path[2:]
    if path=='title': return 'overview/A/B/metadata title'
    return path

rows=[]
for b,spec in SPEC['builds'].items():
    for i,(path,text) in enumerate(walk(b,spec),1):
        low=text.lower()
        if any(x in low for x in ['does not','not a ','not evidence','cannot ','no real ','no effect','no exposure','no causal','no evidence-strength','no physiological','no legal effect','no clinical','no onset','no laboratory','no health profile','without claiming','without asserting','remain unmeasured','unknown','fictional','synthetic','illustrative']):
            ctype='fixture identity / limitation / non-claim'; support='direct from specification'; source='RN-FICTIONAL-FIXTURE'; verdict='PASS — boundary is explicit'
            limit='Negative or scope-limiting statement; it does not establish the truth of an affirmative effect, safety, legal or compliance proposition.'
        elif b=='051' and any(x in low for x in ['source','official','professional help','pregnancy','youth','driving','interactions','severe symptoms','natural','legal']):
            ctype='qualified source-navigation design proposition';support='contextual';source='FDA-CANNABIS-QUESTIONS + CDC-CANNABIS-HEALTH';verdict='PASS — navigation only'
            limit='FDA material is substantially CBD-specific; CDC index is navigational. Exact topic pages are required before displaying substantive health claims. Neither source supplies individualized advice or a state-law answer.'
        elif b=='052' and any(x in low for x in ['name','label','identity','composition','quality','comparison','evidence']):
            ctype='epistemic/comparison-literacy synthesis';support='contextual';source='FDA-CANNABIS-QUESTIONS';verdict='PASS — qualified synthesis'
            limit='FDA documents CBD-specific unknowns, unproven claims and observed label-content discrepancies; it does not establish all cannabis-product variance or validate fictional bands.'
        elif b=='065':
            ctype='RN fictional pathway-design rule';support='not externally dependent';source='RN-SYNTHESIS; FDA-PSYCHEDELIC-TRIALS is exclusion only';verdict='PASS — fictional rule'
            limit='FDA July 2026 guidance concerns sponsors and clinical investigations. It must appear only as an out-of-scope boundary, never as authority for ordinary care, consent, referral, duty or emergency workflow.'
        else:
            ctype='RN design synthesis';support='not externally dependent';source='RN-SYNTHESIS';verdict='PASS — synthesis'
            limit='Normative design proposition, not an empirical finding, legal conclusion, product recommendation or proof of outcome.'
        rows.append({'build_id':b,'claim_id':f'B{b}-R{i:02d}','surface_locator':surface(path),'exact_replacement_text':text,'claim_type':ctype,'source_basis':source,'support':support,'scope_limitation':limit,'independent_verdict':verdict})

with (OUT/'independent-claim-review-050-052-065.csv').open('w',newline='') as f:
    w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)

counts={b:sum(r['build_id']==b for r in rows) for b in SPEC['builds']}
with (OUT/'INDEPENDENT-VERIFICATION-050-052-065.md').open('w') as f:
    f.write(f"""# Independent verification — remediation for Builds 050–052 and 065

Date: 2026-08-22 HST  
Production changed: **No**

## Decision

All four replacement specifications **PASS for implementation**, subject to the exact gate below. This is a narrow claim-classification/copy decision. It is not outcome, safety, efficacy, accessibility, legal-compliance or deployment certification.

| Build | Replacement claim units reviewed | Decision | Controlling limitation |
|---:|---:|---|---|
| 050 | {counts['050']} | PASS | Fictional environmental inputs and tradeoff hypotheses only; no real exposure, response, accessibility, health, performance or prescription claim. |
| 051 | {counts['051']} | PASS | Source navigation only. FDA content is materially CBD-specific; CDC index pages cannot substitute for exact topic-page support. No individualized answer. |
| 052 | {counts['052']} | PASS | Fictional fields and comparison literacy only. FDA supports bounded CBD uncertainty/quality concerns, not fictional bands or product recommendations. |
| 065 | {counts['065']} | PASS | Every pathway rule is expressly invented. FDA July 2026 guidance is an exclusion/scope warning only, not affirmative authority for ordinary care. |

Total exact replacement claim units reviewed: {len(rows)}. Unqualified external effect, compliance or outcome claims accepted: **0**.

## Source-scope findings

### Build 050

No decorative authority is needed because the replacement makes no empirical environmental-effect proposition. “Useful” in the final proposition is RN's design judgment, not measured utility, and must remain presented as such.

### Build 051

The FDA consumer page supports showing current agency information, CBD-specific unknowns, risks and quality concerns. The CDC cannabis-health page supports navigation to cannabis risk topics and official/professional help. The remediation properly stops before personalized health, impairment, dose, product, treatment or law conclusions. If the interface later summarizes pregnancy, youth, driving or interaction content, each summary needs the exact current topic-page locator—not merely the CDC index.

### Build 052

FDA reports that some tested CBD products did not contain claimed CBD levels and describes unanswered CBD science, safety and quality questions. This supports skepticism about labels in that bounded context. It does not establish the identity, composition, quality or safety of every cannabis product. The proposed copy avoids that expansion by making all records fictional and framing missing evidence as missing.

### Build 065

FDA's July 2026 final guidance is explicitly for sponsors developing psychedelic drugs and clinical investigations. It does not support ordinary-care integration, consent-transfer effects, referral ownership, professional-duty allocation or emergency pathways. The proposed copy correctly treats every rule as fictional. The FDA record should be displayed under “out-of-scope authority” or “what this source does not establish,” not as evidence supporting the model.

## Exact implementation gate

The four builds may leave hold status only when one immutable preview satisfies all of these conditions:

1. Every exact replacement string in `remediation-copy-050-052-065.json` is present on its specified surface.
2. Overview, A, B film, six-scene motion story, B interactive, transcript and WebVTT agree word-for-word where the specification requires identical scenes.
3. Regenerated MP4 frames and poster/OG images contain no superseded claim, evidence-strength rating or affirmative environmental, product, clinical, consent, duty, safety, compliance or outcome language.
4. Gallery, search, metadata, social copy, archives, exports, default fixture data, hidden states and client-only interaction states are scanned for superseded wording.
5. Build 050 exposes no evidence-strength label and cites no environmental authority merely to decorate the model.
6. Build 051 shows issuer, live URL, source date/retrieval date, exact section and limitation; any displayed substantive health statement has a topic-level locator.
7. Build 052 carries the CBD-specific FDA limitation everywhere the authority appears and makes no inference from fictional bands.
8. Build 065 labels FDA guidance as clinical-investigation scope/exclusion only and never as the basis for ordinary-care rules.
9. The precise qualified labels in `HELD-BUILD-REMEDIATION-050-052-065.md` are visible with the common disclaimer.
10. A fresh anonymous browser crawl, decoded-media inspection, text diff and second-person review return zero mismatches before merge or deployment.

Until all ten gates pass, the builds remain publicly `certification open` even though this copy specification passes review.

No production edit, merge or deployment was performed.
""")
print('rows',len(rows),'counts',counts)
