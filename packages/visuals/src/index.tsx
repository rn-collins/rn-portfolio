'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

const scenes=[
  {key:'promise',duration:3000,label:'The promise'},
  {key:'drift',duration:3200,label:'The missing human'},
  {key:'too-late',duration:3800,label:'The timing problem'},
  {key:'no-power',duration:3400,label:'The authority problem'},
  {key:'architecture',duration:4200,label:'The control'}
] as const;
const totalDuration=scenes.reduce((sum,s)=>sum+s.duration,0);
const architectureNodes={
  TRIGGER:'What causes a human review to happen?',
  EVIDENCE:'What can the reviewer actually see and verify?',
  'HUMAN REVIEW':'A qualified person gets enough time and context to challenge the output.',
  DECISION:'The consequential action should follow—not outrun—meaningful review.',
  OVERRIDE:'The reviewer can reject, revise, stop, or reverse the outcome.',
  ESCALATE:'Uncertainty or disagreement has a defined next destination.',
  RECORD:'The review leaves evidence: what was seen, decided, changed, and why.'
} as const;

type NodeKey=keyof typeof architectureNodes;

export function HumanLoopReveal(){
  const [elapsed,setElapsed]=useState(0);
  const [playing,setPlaying]=useState(true);
  const [promiseMode,setPromiseMode]=useState<'slogan'|'control'>('slogan');
  const [humanPlaced,setHumanPlaced]=useState(false);
  const [reviewEarly,setReviewEarly]=useState(false);
  const [authority,setAuthority]=useState(false);
  const [activeNode,setActiveNode]=useState<NodeKey>('HUMAN REVIEW');
  const startedAt=useRef<number|null>(null);
  const frozenAt=useRef(0);

  const sceneInfo=useMemo(()=>{
    let cursor=0;
    for(let i=0;i<scenes.length;i++){
      const end=cursor+scenes[i].duration;
      if(elapsed<end || i===scenes.length-1)return {index:i,key:scenes[i].key,local:(elapsed-cursor)/scenes[i].duration};
      cursor=end;
    }
    return {index:scenes.length-1,key:scenes.at(-1)!.key,local:1};
  },[elapsed]);

  useEffect(()=>{
    if(!playing)return;
    let raf=0;
    const tick=(now:number)=>{
      if(startedAt.current===null)startedAt.current=now-frozenAt.current;
      const next=now-startedAt.current;
      if(next>=totalDuration){setElapsed(totalDuration-1);setPlaying(false);frozenAt.current=totalDuration-1;startedAt.current=null;return;}
      setElapsed(next);frozenAt.current=next;raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);return()=>cancelAnimationFrame(raf);
  },[playing]);

  const pauseForInteraction=()=>{frozenAt.current=elapsed;startedAt.current=null;setPlaying(false)};
  const seek=(index:number)=>{const next=scenes.slice(0,index).reduce((sum,s)=>sum+s.duration,0)+40;setElapsed(next);frozenAt.current=next;startedAt.current=null;setPlaying(false)};
  const restart=()=>{setElapsed(0);frozenAt.current=0;startedAt.current=null;setPromiseMode('slogan');setHumanPlaced(false);setReviewEarly(false);setAuthority(false);setActiveNode('HUMAN REVIEW');setPlaying(true)};
  const toggle=()=>{startedAt.current=null;setPlaying(v=>!v)};
  const pct=Math.max(0,Math.min(100,(elapsed/totalDuration)*100));

  return <section className="motion-piece" aria-label="001-B Human in the Loop motion reveal">
    <div className={`motion-frame scene-${sceneInfo.key}`}>
      <div className="motion-grain" aria-hidden="true"/>
      <div className="motion-topline"><span>001-B / VISUAL BUILD</span><span>{String(sceneInfo.index+1).padStart(2,'0')} / 05</span></div>

      <div className="motion-scene promise-scene" aria-hidden={sceneInfo.key!=='promise'}>
        <div className="motion-kicker">AI GOVERNANCE / THE PROMISE</div>
        <button className={`promise-interaction ${promiseMode==='control'?'is-control':''}`} type="button" onClick={()=>{pauseForInteraction();setPromiseMode(v=>v==='slogan'?'control':'slogan')}} aria-label="Test whether human in the loop means meaningful control">
          <span className="promise-words"><span className="human-word">HUMAN</span><span className="in-the-word">IN THE</span><span className="loop-word">LOOP</span></span>
          <span className="loop-ring" aria-hidden="true"/>
        </button>
        <div className="interactive-readout"><strong>{promiseMode==='slogan'?'Tap the phrase.':'Presence is only the beginning.'}</strong><span>{promiseMode==='slogan'?'Does the slogan tell us who can act, when, or with what power?':'A control needs timing, evidence, authority, escalation, and a record.'}</span></div>
      </div>

      <div className="motion-scene drift-scene" aria-hidden={sceneInfo.key!=='drift'}>
        <div className="motion-kicker">THE MISSING HUMAN</div>
        <div className="drift-stage">
          <button type="button" className={`drifting-human ${humanPlaced?'is-placed':''}`} onClick={()=>{pauseForInteraction();setHumanPlaced(v=>!v)}}>{humanPlaced?'REVIEWER':'HUMAN'}</button>
          <div className="loop-system"><span>WORKFLOW</span><div className="system-ring"/></div>
          <div className="annotation annotation-human">WHO?</div><div className="annotation annotation-place">WHERE?</div>
        </div>
        <div className="interactive-readout"><strong>{humanPlaced?'A named reviewer is better. Still not enough.':'Put the human somewhere real.'}</strong><span>{humanPlaced?'Now ask what they see, when they arrive, and whether they can change the outcome.':'Tap HUMAN to place a reviewer into the workflow.'}</span></div>
      </div>

      <div className="motion-scene late-scene" aria-hidden={sceneInfo.key!=='too-late'}>
        <div className="motion-kicker">THE TIMING PROBLEM</div>
        <div className="late-title">WHEN DO<br/>THEY SEE IT?</div>
        <div className={`decision-track ${reviewEarly?'review-is-early':''}`} aria-label="Model to action timeline"><span className="track-label start">MODEL</span><span className="decision-dot"/><button type="button" className="review-gate" onClick={()=>{pauseForInteraction();setReviewEarly(v=>!v)}}>HUMAN<br/>REVIEW</button><span className="track-label end">ACTION</span></div>
        <div className={`outcome-chip ${reviewEarly?'good':'bad'}`}>{reviewEarly?'REVIEW BEFORE ACTION':'TOO LATE'}</div>
        <div className="interactive-readout"><strong>{reviewEarly?'Timing changed the safeguard.':'Move the review.'}</strong><span>{reviewEarly?'The reviewer now gets a chance to intervene before consequence.':'Tap HUMAN REVIEW to move it before the consequential action.'}</span></div>
      </div>

      <div className="motion-scene power-scene" aria-hidden={sceneInfo.key!=='no-power'}>
        <div className="motion-kicker">THE AUTHORITY PROBLEM</div>
        <div className="power-question">CAN THEY<br/>SAY <span>NO?</span></div>
        <button type="button" className={`no-button ${authority?'has-authority':''}`} onClick={()=>{pauseForInteraction();setAuthority(v=>!v)}}>NO</button>
        <div className={`decision-status ${authority?'stopped':'continues'}`}>{authority?'DECISION STOPPED':'DECISION CONTINUES →'}</div>
        <div className="interactive-readout"><strong>{authority?'Now “no” changes what happens.':'A button is not authority.'}</strong><span>{authority?'The reviewer has practical power to stop or change the outcome.':'Tap NO. Then give the reviewer actual authority.'}</span></div>
      </div>

      <div className="motion-scene architecture-scene" aria-hidden={sceneInfo.key!=='architecture'}>
        <div className="motion-kicker">THE CONTROL / EXPLORE IT</div>
        <div className="architecture-map" aria-label="Interactive meaningful human review architecture">
          {(['TRIGGER','EVIDENCE','HUMAN REVIEW','DECISION'] as NodeKey[]).map((node,i)=><span key={node} className="architecture-inline"><button type="button" className={`node ${node==='HUMAN REVIEW'?'hero-node':''} ${activeNode===node?'active':''}`} onClick={()=>{pauseForInteraction();setActiveNode(node)}}>{node}</button>{i<3&&<span className="arrow">→</span>}</span>)}
          <span className="architecture-stack">{(['OVERRIDE','ESCALATE','RECORD'] as NodeKey[]).map((node,i)=><span key={node} className="stack-item">{i===0&&<span className="down">↓</span>}<button type="button" className={`node ${activeNode===node?'active':''}`} onClick={()=>{pauseForInteraction();setActiveNode(node)}}>{node}</button>{i<2&&<span className="down">↓</span>}</span>)}</span>
        </div>
        <div className="node-explainer"><strong>{activeNode}</strong><span>{architectureNodes[activeNode]}</span></div>
        <div className="build-reveal"><strong>001-A</strong><span>Human Review Design Framework</span></div>
      </div>

      <div className="motion-progress" aria-hidden="true"><span style={{width:`${pct}%`}}/></div>
    </div>

    <div className="motion-controls">
      <button onClick={toggle}>{playing?'Pause':'Play'}</button><button onClick={restart}>Replay</button>
      <div className="motion-dots" aria-label="Jump to scene">{scenes.map((s,i)=><button key={s.key} onClick={()=>seek(i)} aria-label={`${s.label}, scene ${i+1}`} aria-current={sceneInfo.index===i?'step':undefined}/>)}</div>
      <span>{playing?'playing automatically':'paused for exploration'} · silent-first</span>
    </div>
  </section>
}
