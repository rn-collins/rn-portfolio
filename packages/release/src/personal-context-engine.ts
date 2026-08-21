export type Setting='HOME'|'WORK'|'TRAVEL'|'SOCIAL';
export type Goal='FOCUS'|'REST'|'CONNECT'|'RECOVER';
export type Level=0|1|2|3;
export type SensoryProfile={fixtureId:'SYNTHETIC-CONTEXT-01';setting:Setting;goal:Goal;light:Level;sound:Level;crowding:Level;temperature:Level;pastResponses:readonly PastResponse[]};
export type PastResponse={cue:string;response:'HELPED'|'NEUTRAL'|'HARDER'};
export type ContextResult={status:'SUPPORTED'|'MIXED'|'HIGH FRICTION'|'INVALID';friction:number;constellation:readonly {axis:string;value:number}[];supports:readonly string[];questions:readonly string[];engineVersion:string};
export const PERSONAL_CONTEXT_ENGINE_VERSION='049.1.0';
const enums={setting:['HOME','WORK','TRAVEL','SOCIAL'],goal:['FOCUS','REST','CONNECT','RECOVER'],response:['HELPED','NEUTRAL','HARDER']}as const;
const level=(n:number)=>Number.isInteger(n)&&n>=0&&n<=3;
const unique=(a:readonly PastResponse[])=>a.length<=8&&new Set(a.map(x=>x.cue.trim().toLocaleLowerCase())).size===a.length;
export function profileContext(input:SensoryProfile):ContextResult{
 const invalid=input.fixtureId!=='SYNTHETIC-CONTEXT-01'||!enums.setting.includes(input.setting)||!enums.goal.includes(input.goal)||![input.light,input.sound,input.crowding,input.temperature].every(level)||!Array.isArray(input.pastResponses)||!unique(input.pastResponses)||input.pastResponses.some(x=>!x.cue||x.cue.trim()!==x.cue||!enums.response.includes(x.response));
 if(invalid)return{status:'INVALID',friction:0,constellation:[],supports:[],questions:['INVALID SYNTHETIC INPUT'],engineVersion:PERSONAL_CONTEXT_ENGINE_VERSION};
 const axes=[['LIGHT',input.light],['SOUND',input.sound],['CROWDING',input.crowding],['TEMPERATURE',input.temperature]]as const;
 let friction=axes.reduce((n,[,v])=>n+v*8,0)+(input.setting==='TRAVEL'?10:input.setting==='SOCIAL'?6:0)+(input.goal==='REST'?4:0);
 for(const item of input.pastResponses)friction+=item.response==='HARDER'?8:item.response==='HELPED'?-6:0;
 friction=Math.max(0,Math.min(100,friction));
 const supports:string[]=[];if(input.sound>=2)supports.push('QUIETER OPTION');if(input.light>=2)supports.push('ADJUSTABLE LIGHT');if(input.crowding>=2)supports.push('LOW-CROWD WINDOW');if(input.temperature>=2)supports.push('TEMPERATURE CHOICE');if(input.goal==='FOCUS')supports.push('PROTECTED FOCUS BLOCK');if(input.goal==='REST')supports.push('LOW-DEMAND PAUSE');
 return{status:friction>=70?'HIGH FRICTION':friction>=35?'MIXED':'SUPPORTED',friction,constellation:axes.map(([axis,value])=>({axis,value})),supports:[...new Set(supports)],questions:['What changed in this setting?','Which support should be tested first?'],engineVersion:PERSONAL_CONTEXT_ENGINE_VERSION};
}
