/* RN Builds — 80 Builds canonical registry
   IMPORTANT: slots 002–080 are intentionally unlabelled until the previously approved
   canonical master list is imported. We do not invent or silently rename builds. */
const RN80_PHASES = [
  {id:1,name:'Foundations',range:[1,12]},
  {id:2,name:'Mapping Systems',range:[13,22]},
  {id:3,name:'Decision Systems',range:[23,30]},
  {id:4,name:'Evidence Systems',range:[31,38]},
  {id:5,name:'Intelligence Systems',range:[39,47]},
  {id:6,name:'Workflow Systems',range:[48,55]},
  {id:7,name:'Agentic Systems',range:[56,63]},
  {id:8,name:'Networked Systems',range:[64,70]},
  {id:9,name:'Integrated Systems',range:[71,76]},
  {id:10,name:'Longitudinal Systems',range:[77,80]}
];

function phaseFor(sequence){return RN80_PHASES.find(p=>sequence>=p.range[0]&&sequence<=p.range[1]);}
function emptyBuild(sequence){
  const id=String(sequence).padStart(3,'0');
  const phase=phaseFor(sequence);
  return {
    id, sequence, title:null, slug:null, phase:phase.id, phaseName:phase.name,
    ecosystem:null, artifactType:null, complexity:null, status:'Planned', version:'0.0',
    functional:{status:'Planned',url:null,summary:null},
    visual:{status:'Planned',url:null,concept:null,mechanism:null},
    observation:null, missingSystem:null, description:null,
    usesInfrastructure:[], createsInfrastructure:[], relatedBuilds:[],
    buildLog:[], limitations:[], learnings:[]
  };
}

const RN80_BUILDS=Array.from({length:80},(_,i)=>emptyBuild(i+1));
Object.assign(RN80_BUILDS[0],{
  title:'Human Review Design Framework',
  slug:'001-human-review-design-framework',
  ecosystem:'Regulated Work & AI Governance',
  artifactType:'Framework → Interactive Tool',
  complexity:1,
  status:'Building',
  version:'0.1',
  observation:'“Human in the loop” is often treated as if the presence of a person automatically creates meaningful oversight.',
  missingSystem:'A practical way to specify who reviews an AI-assisted decision, what they review, against which standard, at what point, and what happens when review fails.',
  description:'An interactive framework for turning vague human-oversight claims into an explicit review design.',
  functional:{status:'Building',url:'/80-builds/001-a.html',summary:'Design a human-review checkpoint and generate a structured review protocol.'},
  visual:{status:'Building',url:'/80-builds/001-b.html',concept:'HUMAN IN THE LOOP fractures into the unanswered questions hidden inside the phrase.',mechanism:'A staged editorial reveal that moves from slogan to governance architecture to the paired build.'},
  usesInfrastructure:[],
  createsInfrastructure:['RN Form Engine v1','RN Conditional Logic v1','RN Results Renderer v1'],
  relatedBuilds:[],
  buildLog:[{version:'0.1',label:'Architecture and first interactive prototype'}],
  limitations:['The generated protocol is a design aid, not a substitute for legal, clinical, safety, or domain-specific review requirements.'],
  learnings:[]
});
window.RN80_PHASES=RN80_PHASES;
window.RN80_BUILDS=RN80_BUILDS;