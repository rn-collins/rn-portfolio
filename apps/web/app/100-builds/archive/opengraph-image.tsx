import {ImageResponse} from 'next/og';

export const size={width:1200,height:630};
export const contentType='image/png';
export const alt='The 100 — Program Archive: the durable system of record behind the build sequence';

// next.config sets output:'export'.
export const dynamic='force-static';

// Same palette and structure as [id]/record/opengraph-image.tsx, so the archive
// card reads as part of the same set rather than a second design. The left rail
// carries the coverage range instead of a build number, because this page is
// the map of the sequence rather than one entry in it.
const BG='#F6F3EC';
const INK='#2A3D35';
const TEAL='#1B7A68';
const ACID='#b8ff5a';
const MUTED='#5C6B63';
const BORDER='#D9D4CA';

export default function Image(){
 return new ImageResponse(
  (
   <div style={{width:'100%',height:'100%',display:'flex',background:BG,fontFamily:'Georgia, serif'}}>
    <div style={{width:250,height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:TEAL,color:ACID}}>
     <div style={{display:'flex',fontSize:26,letterSpacing:6,fontFamily:'Arial, sans-serif'}}>THE</div>
     <div style={{display:'flex',fontSize:132,fontWeight:700,lineHeight:1.05,fontFamily:'Arial, sans-serif'}}>100</div>
    </div>

    <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'58px 62px 46px'}}>
     <div style={{display:'flex',flexDirection:'column'}}>
      <div style={{display:'flex',fontSize:21,letterSpacing:4,color:TEAL,fontFamily:'Arial, sans-serif',fontWeight:700}}>
       PROGRAM ARCHIVE
      </div>
      <div style={{display:'flex',fontSize:58,lineHeight:1.16,color:INK,marginTop:22,fontWeight:700}}>
       The work does not live in chat.
      </div>
     </div>

     <div style={{display:'flex',flexDirection:'column'}}>
      <div style={{display:'flex',gap:16,fontSize:20,color:MUTED,fontFamily:'Arial, sans-serif',letterSpacing:2}}>
       <span>RESEARCH</span><span>·</span><span>CREATION</span><span>·</span><span>DECISIONS</span><span>·</span><span>AUDIT</span><span>·</span><span>PLAN</span>
      </div>
      <div style={{display:'flex',borderTop:`2px solid ${BORDER}`,marginTop:20,paddingTop:18,fontSize:21,color:MUTED,fontFamily:'Arial, sans-serif'}}>
       The public map of records currently certified for release
      </div>
     </div>
    </div>
   </div>
  ),
  size,
 );
}
