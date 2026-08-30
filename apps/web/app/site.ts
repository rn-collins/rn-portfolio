// rn-portfolio.vercel.app belongs to someone else — Vercel gave this project
// the -khaki suffix because the plain name was taken. Using the bare host as
// the fallback pointed rel=canonical and og:url at a stranger's site whenever
// NEXT_PUBLIC_SITE_URL was unset.
const FALLBACK_SITE_URL='https://rn-portfolio-khaki.vercel.app';

function normalizeSiteUrl(value:string){
 const withProtocol=/^https?:\/\//i.test(value)?value:`https://${value}`;
 const url=new URL(withProtocol);
 url.pathname='/';
 url.search='';
 url.hash='';
 return url;
}

export const siteUrl=normalizeSiteUrl(
 process.env.NEXT_PUBLIC_SITE_URL||
 process.env.VERCEL_PROJECT_PRODUCTION_URL||
 FALLBACK_SITE_URL
);
