// Progressive enhancements. All page content remains readable without JavaScript.
const header=document.querySelector('.site-header');
const nav=document.querySelector('#primary-nav');
const menu=document.querySelector('.menu-toggle');
function closeMenu(){
  if(!menu||!nav)return;
  menu.setAttribute('aria-expanded','false');
  menu.setAttribute('aria-label','Abrir menu');
  nav.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}
if(menu&&nav){
  menu.addEventListener('click',()=>{
    const open=menu.getAttribute('aria-expanded')!=='true';
    menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
    nav.classList.toggle('is-open',open);
    document.body.classList.toggle('menu-open',open);
    if(open)nav.querySelector('a')?.focus();
  });
  document.addEventListener('click',event=>{
    if(event.target.closest('.nav-links a'))closeMenu();
    else if(!event.target.closest('.nav-shell'))closeMenu();
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}
  });
  matchMedia('(min-width:921px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
}
for(const group of document.querySelectorAll('[data-tabs]')){
  const tabs=[...group.querySelectorAll('[role="tab"]')];
  const panels=tabs.map(tab=>document.getElementById(tab.getAttribute('aria-controls')));
  function select(index,focus=false){
    tabs.forEach((tab,i)=>{
      const active=i===index;
      tab.setAttribute('aria-selected',String(active));
      tab.tabIndex=active?0:-1;
      if(panels[i])panels[i].hidden=!active;
    });
    if(focus)tabs[index]?.focus();
  }
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>select(index));
    tab.addEventListener('keydown',event=>{
      let target=index;
      if(event.key==='ArrowRight')target=(index+1)%tabs.length;
      else if(event.key==='ArrowLeft')target=(index-1+tabs.length)%tabs.length;
      else if(event.key==='Home')target=0;
      else if(event.key==='End')target=tabs.length-1;
      else return;
      event.preventDefault();select(target,true);
    });
  });
  select(Math.max(0,tabs.findIndex(tab=>tab.getAttribute('aria-selected')==='true')));
}
const form=document.getElementById('contact-form');
if(form){
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const data=new FormData(form);
    const name=String(data.get('nome')||'').trim();
    const phone=String(data.get('telefone')||'').trim();
    const modality=String(data.get('modalidade')||'').trim();
    const message=String(data.get('mensagem')||'').trim();
    const text=['Olá! Gostaria de entrar em contato com a Invictus Team.','Nome: '+name,'Telefone: '+phone];
    if(modality)text.push('Interesse: '+modality);
    if(message)text.push('Mensagem: '+message);
    window.location.href='https://wa.me/5516997046896?text='+encodeURIComponent(text.join('\n'));
  });
}
const lightbox=document.getElementById('gallery-lightbox');
if(lightbox&&typeof lightbox.showModal==='function'){
  const openButtons=[...document.querySelectorAll('[data-gallery-open]')];
  const photo=lightbox.querySelector('.lightbox-image');
  const count=lightbox.querySelector('.lightbox-count');
  let index=0;
  let trigger=null;
  const show=(next)=>{
    index=(next+openButtons.length)%openButtons.length;
    const image=openButtons[index].querySelector('img');
    photo.src=image.currentSrc||image.src;
    photo.alt=image.alt;
    count.textContent=String(index+1).padStart(2,'0')+' / '+String(openButtons.length).padStart(2,'0');
  };
  openButtons.forEach((button,i)=>button.addEventListener('click',()=>{
    trigger=button;show(i);lightbox.showModal();lightbox.querySelector('.lightbox-close')?.focus();
  }));
  lightbox.querySelector('.lightbox-close')?.addEventListener('click',()=>lightbox.close());
  lightbox.querySelector('[data-gallery-previous]')?.addEventListener('click',()=>show(index-1));
  lightbox.querySelector('[data-gallery-next]')?.addEventListener('click',()=>show(index+1));
  lightbox.addEventListener('keydown',event=>{
    if(event.key==='ArrowRight'){event.preventDefault();show(index+1);}
    if(event.key==='ArrowLeft'){event.preventDefault();show(index-1);}
  });
  lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close();});
  lightbox.addEventListener('close',()=>{photo.removeAttribute('src');trigger?.focus();});
}
