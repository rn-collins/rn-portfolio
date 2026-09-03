import './active-exhibition.css';
import ExperienceRouter from './_components/ExperienceRouter';

export default function HundredBuildsLayout({children}:{children:React.ReactNode}){
 return <>
  <a className="buildSkipLink" href="#build-main-content">Skip to main content</a>
  <div id="build-main-content" tabIndex={-1}>
   <ExperienceRouter>{children}</ExperienceRouter>
  </div>
 </>;
}
