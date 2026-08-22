import {buildArchives} from './archive-data';

export type PublicArchiveCoverage='certified-public'|'retained-not-certified'|'specification-only';

const retainedArchiveIds=new Set([
  ...Array.from({length:48},(_,i)=>String(i+7).padStart(3,'0')),
  ...Array.from({length:14},(_,i)=>String(i+87).padStart(3,'0'))
]);

export function publicArchiveCoverage(id:string):PublicArchiveCoverage{
  if(Object.prototype.hasOwnProperty.call(buildArchives,id))return 'certified-public';
  if(retainedArchiveIds.has(id))return 'retained-not-certified';
  return 'specification-only';
}

export function publicArchiveCoverageCopy(id:string){
  const state=publicArchiveCoverage(id);
  if(state==='certified-public')return {
    label:'COMPLETE PUBLIC BUILD ARCHIVE',
    title:'Research + creation + decisions + audits + plans',
    detail:'A structured, visitor-readable archive is available for this build.',
    available:true
  } as const;
  if(state==='retained-not-certified')return {
    label:'ARCHIVE RETAINED · PUBLIC CERTIFICATION IN PROGRESS',
    title:'Repository records exist; the public archive is not yet certified',
    detail:'Specification and archive records are retained in the repository. They are not represented here as a complete public archive until editorial and evidence review is finished.',
    available:false
  } as const;
  return {
    label:'SPECIFICATION RETAINED · ARCHIVE INCOMPLETE',
    title:'The build exists; complete archive coverage does not',
    detail:'A retained specification supports the working build, but a complete research, decisions, audit and limitations archive has not been established.',
    available:false
  } as const;
}
