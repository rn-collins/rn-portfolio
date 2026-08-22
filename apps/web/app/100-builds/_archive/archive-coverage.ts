import {buildArchives} from './archive-data';

export type PublicArchiveCoverage='certified-public'|'structured-public'|'retained-not-certified'|'specification-only';

const certifiedIds=new Set(['001','002','003','004','005','006']);
const retainedArchiveIds=new Set([
  ...Array.from({length:48},(_,i)=>String(i+7).padStart(3,'0')),
  ...Array.from({length:14},(_,i)=>String(i+87).padStart(3,'0'))
]);

export function publicArchiveCoverage(id:string):PublicArchiveCoverage{
  if(certifiedIds.has(id))return 'certified-public';
  if(Object.prototype.hasOwnProperty.call(buildArchives,id))return 'structured-public';
  if(retainedArchiveIds.has(id))return 'retained-not-certified';
  return 'specification-only';
}

export function publicArchiveCoverageCopy(id:string){
  const state=publicArchiveCoverage(id);
  if(state==='certified-public')return {label:'CERTIFIED PUBLIC BUILD ARCHIVE',title:'Research + creation + decisions + audits + plans',detail:'The complete structured public archive is certified for this build.',available:true} as const;
  if(state==='structured-public')return {label:'STRUCTURED PUBLIC BUILD ARCHIVE',title:'Retained record available; full certification remains open',detail:'Research, creation, decisions, audits and plans are publicly structured without claiming that every release gate is complete.',available:true} as const;
  if(state==='retained-not-certified')return {label:'ARCHIVE RETAINED · PUBLIC CERTIFICATION IN PROGRESS',title:'Repository records exist; the public archive is not yet certified',detail:'Specification and archive records are retained in the repository. They are not represented here as a complete public archive until editorial and evidence review is finished.',available:false} as const;
  return {label:'SPECIFICATION RETAINED · ARCHIVE INCOMPLETE',title:'The build exists; complete archive coverage does not',detail:'A retained specification supports the working build, but a complete research, decisions, audit and limitations archive has not been established.',available:false} as const;
}
