'use client';
export default function LocalReset({label='RESET / START OVER'}:{label?:string}){return <button type="button" onClick={()=>window.location.reload()} style={{border:'1px solid currentColor',background:'transparent',color:'inherit',padding:'10px 12px',font:'700 11px/1.1 ui-monospace,monospace',cursor:'pointer'}}>{label}</button>}
