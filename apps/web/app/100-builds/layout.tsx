import './active-exhibition.css';
import ExperienceRouter,{type ExperiencePiece} from './_components/ExperienceRouter';
import {pieceLinks,releasedBuilds} from '../_release/gate';

const pieces:Record<string,ExperiencePiece>=Object.fromEntries(releasedBuilds.map(build=>[build.id,{
 id:build.id,
 purpose:build.public?.plainPurpose??build.description,
 limitations:build.limitations.slice(0,2),
 links:pieceLinks(build.id)!
}]));

export default function HundredBuildsLayout({children}:{children:React.ReactNode}){
 return <>
  <a className="buildSkipLink" href="#build-main-content">Skip to main content</a>
  <div id="build-main-content" tabIndex={-1}>
   <ExperienceRouter pieces={pieces}>{children}</ExperienceRouter>
  </div>
 </>;
}
