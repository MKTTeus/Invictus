import {createServer} from 'node:http';
import {readFileSync,statSync,existsSync} from 'node:fs';
import {join,resolve,extname,normalize} from 'node:path';
const root=resolve(import.meta.dirname,'../dist');
const contentTypes={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.avif':'image/avif','.svg':'image/svg+xml'};
createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 const safe=normalize(pathname).replace(/^(\.\.(\/|\\|$))+/,'').replace(/^[/\\]+/,'');
 let file=join(root,safe);
 if(!file.startsWith(root)){res.writeHead(403).end();return;}
 try{if(statSync(file).isDirectory())file=join(file,'index.html');}catch{}
 if(!existsSync(file)){res.writeHead(404).end('Not Found');return;}
 const type=contentTypes[extname(file)]||'application/octet-stream';
 res.writeHead(200,{'Content-Type':type,'X-Content-Type-Options':'nosniff'}).end(readFileSync(file));
}).listen(process.env.PORT||4173,'0.0.0.0',()=>console.log('http://localhost:'+(process.env.PORT||4173)));
