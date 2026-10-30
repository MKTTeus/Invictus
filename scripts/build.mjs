import {mkdirSync,rmSync,writeFileSync,cpSync,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {pages,renderPage} from '../src/site.mjs';

const root=resolve(import.meta.dirname,'..');
const out=join(root,'dist');
rmSync(out,{recursive:true,force:true});
mkdirSync(out,{recursive:true});
cpSync(join(root,'public'),out,{recursive:true});
cpSync(join(root,'images'),join(out,'images'),{recursive:true});
const env=process.env;
const originRaw=env.SITE_URL||(env.VERCEL_PROJECT_PRODUCTION_URL?'https://'+env.VERCEL_PROJECT_PRODUCTION_URL:(env.VERCEL_URL?'https://'+env.VERCEL_URL:''));
const origin=originRaw.replace(/\/+$/,'');
if(origin&&!/^https:\/\/[a-z0-9.-]+(?::\d+)?$/i.test(origin))throw new Error('SITE_URL must be a valid HTTPS origin, without a path.');
const isPreview=env.VERCEL_ENV==='preview';
for(const page of pages){
 const folder=join(out,page.path);
 mkdirSync(folder,{recursive:true});
 writeFileSync(join(folder,'index.html'),renderPage(page,{origin,isPreview}),'utf8');
}
const sitemap=origin?'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+pages.map(p=>'<url><loc>'+origin+p.path+'</loc></url>').join('\n')+'\n</urlset>\n':'';
if(origin)writeFileSync(join(out,'sitemap.xml'),sitemap,'utf8');
writeFileSync(join(out,'robots.txt'),isPreview?'User-agent: *\nDisallow: /\n':'User-agent: *\nAllow: /\n'+(origin?'Sitemap: '+origin+'/sitemap.xml\n':''),'utf8');
console.log('Generated '+pages.length+' indexable pages in dist/'+(origin?' (origin '+origin+')':' (local build; set SITE_URL for absolute URLs)')+'.');
