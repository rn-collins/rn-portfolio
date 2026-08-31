import {ImageResponse} from 'next/og';
import {records} from './page';

export const size={width:1200,height:630};
export const contentType='image/png';
export const alt='RN Builds — public build record';

// next.config sets output:'export', so this route is prerendered for exactly
// the ids the record page itself publishes.
export const dynamic='force-static';
export function generateStaticParams(){return Object.keys(records).map(id=>({id}))}

// Palette from apps/web/app/globals.css
const BG='#F6F3EC';
const INK='#2A3D35';
const TEAL='#1B7A68';
const ACID='#b8ff5a';
const MUTED='#5C6B63';
const BORDER='#D9D4CA';

export default async function Image({params}:{params:Promise<{id:string}>}){
 const {id}=await params;
 const record=records[id];
 const title=record?.title??'Public build record';

 return new ImageResponse(
  (
   <div style={{width:'100%',height:'100%',display:'flex',background:BG,fontFamily:'Georgia, serif'}}>
    <div style={{width:250,height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:TEAL,color:ACID}}>
     <div style={{display:'flex',fontSize:26,letterSpacing:6,fontFamily:'Arial, sans-serif'}}>BUILD</div>
     <div style={{display:'flex',fontSize:132,fontWeight:700,lineHeight:1.05,fontFamily:'Arial, sans-serif'}}>{id}</div>
    </div>

    <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'58px 62px 46px'}}>
     <div style={{display:'flex',flexDirection:'column'}}>
      <div style={{display:'flex',fontSize:21,letterSpacing:4,color:TEAL,fontFamily:'Arial, sans-serif',fontWeight:700}}>
       PUBLIC BUILD RECORD
      </div>
      <div style={{display:'flex',fontSize:title.length>62?48:58,lineHeight:1.16,color:INK,marginTop:22,fontWeight:700}}>
       {title.length>150?title.slice(0,147)+'…':title}
      </div>
     </div>

     <div style={{display:'flex',flexDirection:'column'}}>
      <div style={{display:'flex',gap:16,fontSize:20,color:MUTED,fontFamily:'Arial, sans-serif',letterSpacing:2}}>
       <span>MAKING</span><span>·</span><span>METHOD</span><span>·</span><span>EVIDENCE</span><span>·</span><span>LIMITS</span>
      </div>
      <div style={{display:'flex',borderTop:`2px solid ${BORDER}`,marginTop:20,paddingTop:18,fontSize:21,color:MUTED,fontFamily:'Arial, sans-serif'}}>
       RN Builds — what changed, what travels, what supports it, and what it cannot claim
      </div>
     </div>
    </div>
   </div>
  ),
  size,
 );
}
