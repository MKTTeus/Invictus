import {readFileSync,existsSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {pages} from '../src/site.mjs';
const root=resolve(import.meta.dirname,'../dist');
let errors=[];
const paths=new Set(pages.map(p=>p.path));
for(const page of pages){
 const file=join(root,page.path,'index.html');
 if(!existsSync(file)){errors.push('Missing page '+page.path);continue;}
 const html=readFileSync(file,'utf8');
 if(!html.includes('<h1'))errors.push('Missing H1 '+page.path);
 if(!html.includes('<meta name="description"'))errors.push('Missing description '+page.path);
 if(!html.includes('application/ld+json'))errors.push('Missing JSON-LD '+page.path);
 if(!html.includes('lang="pt-BR"'))errors.push('Missing language '+page.path);
 const anchors=[...html.matchAll(/href="(\/[^"#?]*)"/g)];
 for(const match of anchors){
  const path=match[1].split('?')[0];
  if(path.endsWith('.png')||path.endsWith('.css')||path.endsWith('.js'))continue;
  if(!paths.has(path))errors.push('Broken internal link '+page.path+' => '+path);
 }
}
if(!existsSync(join(root,'robots.txt')))errors.push('Missing robots');
if(!existsSync(join(root,'site.css')))errors.push('Missing styles');
if(!existsSync(join(root,'site.js')))errors.push('Missing scripts');
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log('Validation passed: '+pages.length+' pages, metadata, navigation, assets.');
