const FALLBACK_SITE_URL='https://rn-portfolio.vercel.app';

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
