export const BUILD100_CLOCK='2026-08-22T12:00:00.000Z' as const;
export type Shock='PORT_INTERRUPTION'|'GRID_OUTAGE'|'STORM';
export type Intervention='RESTORE_PORT'|'MICROGRID'|'COMMUNITY_HUBS';
export type ScenarioInput={shock:Shock;intervention:Intervention;units:number;ownerConfirmed:boolean};
const SHOCKS={PORT_INTERRUPTION:{food:3,power:1,care:2},GRID_OUTAGE:{food:1,power:4,care:3},STORM:{food:3,power:3,care:4}} as const;
const FIT:Record<Shock,Intervention>={PORT_INTERRUPTION:'RESTORE_PORT',GRID_OUTAGE:'MICROGRID',STORM:'COMMUNITY_HUBS'};
export const LINEAGE=Object.freeze(['001','020','030','034','038','040','046','047','058','063','069','071','074','077','084','095','099']);
export function runScenario(input:ScenarioInput){
 const valid=Number.isInteger(input.units)&&input.units>=0&&input.units<=5;
 const gates=[{id:'VALID_ALLOCATION',pass:valid},{id:'ACCOUNTABLE_OWNER',pass:input.ownerConfirmed},{id:'MINIMUM_CAPACITY',pass:input.units>=2}];
 let stopped=false;const trace=gates.map(g=>{const status=stopped?'NOT_RUN':g.pass?'PASS':'FAIL';if(status==='FAIL')stopped=true;return Object.freeze({...g,status});});
 const base=SHOCKS[input.shock];const effective=!stopped&&FIT[input.shock]===input.intervention;
 const reduction=effective?Math.min(2,input.units-1):0;
 const consequences=Object.freeze({food:Math.max(0,base.food-reduction),power:Math.max(0,base.power-reduction),care:Math.max(0,base.care-reduction)});
 return Object.freeze({build:'100',clock:BUILD100_CLOCK,decision:stopped?'BLOCKED':'REHEARSED',shock:input.shock,intervention:input.intervention,units:input.units,fit:FIT[input.shock]===input.intervention?'DIRECT':'TRADEOFF',consequences,trace:Object.freeze(trace),lineage:LINEAGE,externalEffect:false as const,notice:'Synthetic planning rehearsal—not a forecast or emergency instruction.'});
}
export function exportScenario(input:ScenarioInput){return JSON.stringify(runScenario(input),null,2);}
