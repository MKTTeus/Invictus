import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Check,
  ChevronLeft, ChevronRight, Clock3, Instagram, MapPin,
  Menu, MessageCircle, ShieldCheck, Target, Trophy, X
} from 'lucide-react';

const MEDIA = 'https://raw.githubusercontent.com/MKTTeus/Invictus/main/images/';
const img = (file) => MEDIA + file;
const PHONE = '5516997046896';
const whatsapp = (message) => 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(message);
const defaultMessage = 'Olá! Conheci o site da Invictus Team e gostaria de agendar uma aula experimental.';
const whatsappDefault = whatsapp(defaultMessage);
const instagram = 'https://www.instagram.com/invictusartesmarciais';
const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Rua+Bernardino+Sampaio+450+Taquaritinga+SP';

const modalities = [
  { number: '01', title: 'Muay Thai', subtitle: 'A arte das oito armas', text: 'Potência, resistência e precisão. Evolua com treinos que trabalham corpo e mente.', image: 'ModalidadesThai.jpeg', className: 'thai' },
  { number: '02', title: 'Jiu-Jitsu', subtitle: 'Técnica acima da força', text: 'Controle, estratégia e autoconfiança em cada movimento, do início à evolução.', image: 'ModalidesJiu.jpg', className: 'jiu' },
  { number: '03', title: 'Boxe Chinês', subtitle: 'Movimento e explosão', text: 'O Sanda combina socos, chutes e projeções para desenvolver agilidade e equilíbrio.', image: 'ModalidesBoxe.jpg', className: 'boxe' },
  { number: '04', title: 'Defesa Pessoal', subtitle: 'Confiança na prática', text: 'Técnica, atenção e preparo para reconhecer riscos e desenvolver segurança.', image: 'ModalidadesDefesa.jpg', className: 'defesa' }
];

const schedules = [
  { id:'kids', label:'Muay Thai Kids', subtitle:'Infantil', times: { 'Segunda':[], 'Terça':['17:00'], 'Quarta':[], 'Quinta':['17:00'], 'Sexta':[] } },
  { id:'misto', label:'Muay Thai Misto', subtitle:'Turmas gerais', times: { 'Segunda':['09:00','15:00','17:00','19:00'], 'Terça':['15:00','19:00'], 'Quarta':['09:00','15:00','17:00','19:00'], 'Quinta':['09:00','15:00','19:00'], 'Sexta':['09:00','15:00','17:00','19:00'] } },
  { id:'feminino', label:'Muay Thai Feminino', subtitle:'Turmas femininas', times: { 'Segunda':['07:00','08:00','16:00','18:00'], 'Terça':['07:00','08:00','16:00','18:00'], 'Quarta':['07:00','08:00','16:00','18:00'], 'Quinta':['07:00','08:00','16:00','18:00'], 'Sexta':['07:00','08:00','16:00','18:00'] } },
  { id:'jiu', label:'Jiu-Jitsu', subtitle:'Tatame', times: { 'Segunda':['20:00'], 'Terça':[], 'Quarta':['20:00'], 'Quinta':[], 'Sexta':['20:00'] } },
  { id:'personal', label:'Treino Individual', subtitle:'Sob consulta', times: { 'Segunda':['Sob consulta'], 'Terça':['Sob consulta'], 'Quarta':['Sob consulta'], 'Quinta':['Sob consulta'], 'Sexta':['Sob consulta'] } },
];

const planGroups = [
  { id:'muay', label:'Muay Thai', subtitle:'Aulas em grupo', plans:[
    { title:'Essencial', sessions:'1 aula / semana', price:'R$ 50', period:'/ mês', desc:'Um primeiro passo para descobrir o Muay Thai.', features:['Treino em grupo','1 aula semanal'] },
    { title:'Evolução', sessions:'2 aulas / semana', price:'R$ 90', period:'/ mês', desc:'Constância e técnica para construir uma boa base.', features:['Treino em grupo','2 aulas semanais'] },
    { title:'Performance', sessions:'3 aulas / semana', price:'R$ 120', period:'/ mês', desc:'Mais frequência para acelerar sua evolução.', features:['Treino em grupo','3 aulas semanais'], popular:true },
    { title:'Intensivo', sessions:'5 aulas / semana', price:'R$ 150', period:'/ mês', desc:'Para quem busca uma rotina de treino consistente.', features:['Treino em grupo','5 aulas semanais'] }
  ]},
  { id:'personal', label:'Personal Fight', subtitle:'Aulas individuais', plans:[
    { title:'Individual', sessions:'1 aula / semana', price:'R$ 40', period:'/ aula', desc:'Acompanhamento individual conforme seus objetivos.', features:['Treino personalizado','1 aula semanal'] },
    { title:'Foco', sessions:'2 aulas / semana', price:'R$ 35', period:'/ aula', desc:'Mais frequência com atenção exclusiva.', features:['Treino personalizado','2 aulas semanais'], popular:true },
    { title:'Imersão', sessions:'3 aulas / semana', price:'R$ 30', period:'/ aula', desc:'Um ritmo intensivo com acompanhamento próximo.', features:['Treino personalizado','3 aulas semanais'] }
  ]},
  { id:'jiu', label:'Jiu-Jitsu', subtitle:'Aulas em grupo', plans:[
    { title:'Essencial', sessions:'1 aula / semana', price:'R$ 50', period:'/ mês', desc:'Contato semanal com os fundamentos da arte suave.', features:['Treino em grupo','1 aula semanal'] },
    { title:'Evolução', sessions:'2 aulas / semana', price:'R$ 90', period:'/ mês', desc:'Reforce a técnica e melhore seu condicionamento.', features:['Treino em grupo','2 aulas semanais'], popular:true },
    { title:'Performance', sessions:'3 aulas / semana', price:'R$ 120', period:'/ mês', desc:'Treinamento mais frequente para sua evolução.', features:['Treino em grupo','3 aulas semanais'] }
  ]},
  { id:'mma', label:'Combo MMA', subtitle:'Muay Thai + Jiu-Jitsu', plans:[
    { title:'Combo 3', sessions:'3 aulas / semana', price:'R$ 140', period:'/ mês', desc:'Combine duas aulas de uma modalidade e uma da outra.', features:['Muay Thai + Jiu-Jitsu','3 aulas semanais'] },
    { title:'Combo 4', sessions:'4 aulas / semana', price:'R$ 170', period:'/ mês', desc:'Duas aulas de Muay Thai e duas de Jiu-Jitsu.', features:['Muay Thai + Jiu-Jitsu','4 aulas semanais'], popular:true },
    { title:'Combo 5', sessions:'5 aulas / semana', price:'R$ 200', period:'/ mês', desc:'Escolha entre três treinos de Muay Thai e dois de Jiu-Jitsu, ou vice-versa.', features:['Muay Thai + Jiu-Jitsu','5 aulas semanais'] }
  ]}
];
const gallery = [
  { image:'Galeria1.jpeg', alt:'Equipe da Invictus Team reunida em treino' },
  { image:'Galeria3.jpeg', alt:'Atletas e equipe Invictus' },
  { image:'Galeria5.jpeg', alt:'Registro de atividades da Invictus' },
  { image:'Galeria6.jpeg', alt:'Treinamento da equipe Invictus' },
  { image:'espaco1.jpeg', alt:'Interior do espaço de treinamento' },
  { image:'espaco3.jpeg', alt:'Estrutura para as aulas de artes marciais' }
];

function SectionHeading({ tag, title, accent, description, dark=false }) {
  return <div className={'section-heading' + (dark ? ' heading-dark' : '')}>
    <span className="eyebrow"><span className="eyebrow-line" />{tag}</span>
    <h2>{title} <em>{accent}</em></h2>
    {description && <p>{description}</p>}
  </div>;
}

function AppHeader() {
  const [menuOpen,setMenuOpen] = useState(false);
  const [scrolled,setScrolled] = useState(false);
  useEffect(()=>{
    const update=()=>setScrolled(window.scrollY>24);
    update(); window.addEventListener('scroll',update,{passive:true});
    return ()=>window.removeEventListener('scroll',update);
  },[]);
  useEffect(()=>{
    if(!menuOpen) return;
    const key=(e)=>{if(e.key==='Escape')setMenuOpen(false);};
    document.addEventListener('keydown',key);
    return ()=>document.removeEventListener('keydown',key);
  },[menuOpen]);
  const navItems = [['#inicio','Início'],['#modalidades','Modalidades'],['#sobre','Nossa equipe'],['#horarios','Horários'],['#planos','Planos'],['#contato','Contato']];
  return <>
    <div className="topline"><span>INVICTUS TEAM <span className="topline-symbol">✳</span> TAQUARITINGA, SP</span><span>DISCIPLINA. RESPEITO. SUPERAÇÃO.</span></div>
    <header className={'site-header'+(scrolled?' is-scrolled':'')}>
      <div className="container header-inner">
        <a className="brand" href="#inicio" aria-label="Invictus Team — início" onClick={()=>setMenuOpen(false)}>
          <img src={img('logoInv.png')} alt="" />
          <span className="brand-name">INVICTUS <small>TEAM / ARTES MARCIAIS</small></span>
        </a>
        <nav id="primary-navigation" className={'nav-links'+(menuOpen?' nav-open':'')} aria-label="Navegação principal">
          {navItems.map(([href,label])=><a key={href} href={href} onClick={()=>setMenuOpen(false)}>{label}</a>)}
          <a className="nav-mobile-cta" href={whatsappDefault} target="_blank" rel="noopener noreferrer" onClick={()=>setMenuOpen(false)}>Agendar aula <ArrowUpRight size={18}/></a>
        </nav>
        <div className="header-actions">
          <a className="header-cta" href={whatsappDefault} target="_blank" rel="noopener noreferrer">Aula experimental <ArrowUpRight size={17}/></a>
          <button type="button" className="menu-toggle" aria-label={menuOpen?'Fechar menu':'Abrir menu'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X size={24}/>:<Menu size={24}/>}</button>
        </div>
      </div>
    </header>
  </>;
}

function Hero() {
  return <section className="hero" id="inicio">
    <div className="hero-photo" role="img" aria-label="Treino de artes marciais da Invictus Team" />
    <div className="hero-overlay" />
    <div className="container hero-inner">
      <div className="hero-content">
        <div className="hero-kicker"><span className="pulse-dot"/> SUA JORNADA COMEÇA AQUI <span className="kicker-sep">/</span> DESDE 2018</div>
        <h1>FORÇA PARA<br/><span className="hero-outline">LUTAR.</span><br/><span className="hero-green">CORAGEM</span> PARA<br/>EVOLUIR.</h1>
        <p>Mais do que uma academia. Um lugar para descobrir do que você é capaz — dentro e fora do tatame.</p>
        <div className="hero-buttons">
          <a className="button button-primary" href={whatsappDefault} target="_blank" rel="noopener noreferrer">Agende sua aula <ArrowUpRight size={19}/></a>
          <a className="button button-outline" href="#modalidades">Explorar modalidades <ArrowDown size={18}/></a>
        </div>
      </div>
      <div className="hero-side-note"><span>01 / 04</span><i/> <span>ARTES MARCIAIS COM PROPÓSITO</span></div>
    </div>
    <div className="hero-bottom">
      <div className="container hero-bottom-inner"><span>TAQUARITINGA <b>·</b> SÃO PAULO</span><span>SEU PRÓXIMO NÍVEL COMEÇA NO TREINO.</span><a href="#sobre" aria-label="Saiba mais sobre a Invictus"><ArrowDown size={20}/></a></div>
    </div>
  </section>;
}

function Ticker() {
  return <div className="ticker" aria-label="Disciplina, técnica, respeito e superação"><div className="ticker-track" aria-hidden="true">{Array.from({length:4}).map((_,i)=><span key={i}>DISCIPLINA <b>✳</b> TÉCNICA <b>✳</b> RESPEITO <b>✳</b> SUPERAÇÃO <b>✳</b> </span>)}</div></div>;
}

function Modalities() {
  return <section className="section modalities-section" id="modalidades">
    <div className="container">
      <div className="heading-row">
        <SectionHeading tag="ESCOLHA SEU CAMINHO" title="ENCONTRE SUA" accent="LUTA." description="Para seu primeiro treino ou para um novo desafio: existe uma modalidade para você."/>
        <a className="text-link" href="#horarios">Ver horários <ArrowUpRight size={18}/></a>
      </div>
      <div className="modalities-grid">{modalities.map((m)=><article className={'modality-card modality-'+m.className} key={m.number}>
        <img src={img(m.image)} alt={'Aula de '+m.title} loading="lazy" />
        <div className="modality-shade"/>
        <div className="modality-top"><span>{m.number} / MODALIDADE</span><ArrowUpRight size={23}/></div>
        <div className="modality-info"><span>{m.subtitle}</span><h3>{m.title}</h3><p>{m.text}</p><a href={whatsapp('Olá! Gostaria de saber mais sobre as aulas de '+m.title+' da Invictus Team.')} target="_blank" rel="noopener noreferrer">Quero conhecer <ArrowRight size={16}/></a></div>
      </article>)}</div>
    </div>
  </section>;
}

function About() {
  return <section className="section about-section" id="sobre">
    <div className="container about-grid">
      <div className="about-visual">
        <img className="about-image" src={img('Galeria1.jpeg')} alt="Alunos e integrantes da equipe Invictus Team" loading="lazy" />
        <div className="about-year"><span>DESDE</span><strong>2018</strong><small>EVOLUINDO JUNTOS</small></div>
        <span className="about-photo-label">INVICTUS TEAM / TAQUARITINGA</span>
      </div>
      <div className="about-copy">
        <SectionHeading dark tag="ESSA É A NOSSA ESSÊNCIA" title="NÃO É SÓ SOBRE" accent="LUTAR."/>
        <p className="about-lead">É sobre ir além do que você acreditava ser possível.</p>
        <p>Desde 2018, a Invictus Team reúne alunos e atletas em Taquaritinga. Nossa proposta combina técnica, condicionamento e uma cultura de respeito — seja qual for seu ponto de partida.</p>
        <div className="values-grid">
          <div><Target size={25}/><h3>EVOLUÇÃO REAL</h3><p>Passo a passo, no seu ritmo.</p></div>
          <div><ShieldCheck size={25}/><h3>RESPEITO SEMPRE</h3><p>Um ambiente para aprender.</p></div>
          <div><Trophy size={25}/><h3>MENTALIDADE FORTE</h3><p>Disciplina que vai além do treino.</p></div>
        </div>
        <a className="button button-primary about-button" href="#galeria">Conheça a equipe <ArrowUpRight size={18}/></a>
      </div>
    </div>
  </section>;
}

function Schedule() {
  const [active,setActive] = useState('misto');
  const current=schedules.find(s=>s.id===active);
  return <section className="section schedule-section" id="horarios">
    <div className="container">
      <div className="heading-row schedule-title">
        <SectionHeading tag="ENCONTRE SEU MOMENTO" title="O HORÁRIO É" accent="SEU." description="Selecione uma turma para conferir os horários anunciados pela equipe."/>
        <span className="schedule-decoration"><Clock3 size={35}/></span>
      </div>
      <div className="schedule-layout">
        <div className="schedule-tabs" role="tablist" aria-label="Modalidades e turmas">
          <span className="schedule-tabs-label">ESCOLHA UMA TURMA</span>
          {schedules.map(s=><button type="button" role="tab" aria-selected={active===s.id} key={s.id} className={'schedule-tab'+(active===s.id?' active':'')} onClick={()=>setActive(s.id)}>
            <span><strong>{s.label}</strong><small>{s.subtitle}</small></span><ArrowUpRight size={18}/>
          </button>)}
        </div>
        <div className="schedule-panel" role="tabpanel">
          <div className="schedule-panel-top"><div><span>GRADE SEMANAL</span><h3>{current.label}</h3></div><CalendarDays size={34}/></div>
          <div className="time-list">{Object.entries(current.times).map(([day,times])=><div className="time-row" key={day}><strong>{day}</strong><div>{times.length?times.map(time=><span className={'time-chip'+(time==='Sob consulta'?' time-muted':'')} key={time}>{time}</span>):<span className="time-none">Sem aula</span>}</div></div>)}</div>
          <div className="schedule-panel-bottom"><span>Horários sujeitos a alteração. Confirme com a equipe antes de comparecer.</span><a href={whatsapp('Olá! Gostaria de confirmar os horários de '+current.label+' e saber sobre uma aula experimental.')} target="_blank" rel="noopener noreferrer">Confirmar horário <ArrowUpRight size={17}/></a></div>
        </div>
      </div>
    </div>
  </section>;
}

function Plans() {
  const [active,setActive]=useState('muay');
  const group=planGroups.find(p=>p.id===active);
  return <section className="section plans-section" id="planos">
    <div className="container">
      <div className="heading-row plans-heading">
        <SectionHeading dark tag="DÊ O PRIMEIRO PASSO" title="INVISTA EM" accent="VOCÊ." description="Escolha uma modalidade e descubra as opções para começar."/>
        <span className="plans-note-top">PLANOS / INVICTUS TEAM</span>
      </div>
      <div className="plans-tabs" role="tablist" aria-label="Categorias de planos">{planGroups.map(p=><button key={p.id} role="tab" type="button" aria-selected={active===p.id} className={'plans-tab'+(active===p.id?' active':'')} onClick={()=>setActive(p.id)}>{p.label}<span>{p.subtitle}</span></button>)}</div>
      <div className={'plans-grid'+(group.plans.length===4?' four-plans':'')} role="tabpanel">{group.plans.map(p=><article className={'plan-card'+(p.popular?' plan-popular':'')} key={p.title}>
        {p.popular&&<span className="popular-label">MAIS ESCOLHIDO</span>}
        <div className="plan-card-top"><span>INVICTUS / {group.label.toUpperCase()}</span><ArrowUpRight size={20}/></div>
        <h3>{p.title}</h3><p className="plan-sessions">{p.sessions}</p>
        <div className="plan-price"><strong>{p.price}</strong><small>{p.period}</small></div>
        <p className="plan-description">{p.desc}</p>
        <div className="plan-features">{p.features.map(f=><span key={f}><Check size={15}/>{f}</span>)}</div>
        <a className={'button '+(p.popular?'button-primary':'button-plan')} href={whatsapp('Olá! Tenho interesse no plano '+p.title+' ('+group.label+', '+p.sessions+') e gostaria de confirmar condições e valores.')} target="_blank" rel="noopener noreferrer">Consultar este plano <ArrowUpRight size={18}/></a>
      </article>)}</div>
      <p className="price-disclaimer">* Valores reproduzidos do site anterior da Invictus, sujeitos a atualização e confirmação diretamente com a equipe. Não há contratação ou pagamento online.</p>
    </div>
  </section>;
}

function Gallery() {
  const [lightbox,setLightbox]=useState(null);
  const dialog=useRef(null);
  useEffect(()=>{
    if(!dialog.current) return;
    if(lightbox!==null&&!dialog.current.open)dialog.current.showModal();
    if(lightbox===null&&dialog.current.open)dialog.current.close();
  },[lightbox]);
  const change=(n)=>setLightbox(v=>(v+n+gallery.length)%gallery.length);
  useEffect(()=>{
    if(lightbox===null)return;
    const key=e=>{if(e.key==='ArrowRight')change(1);if(e.key==='ArrowLeft')change(-1);};
    window.addEventListener('keydown',key);
    return ()=>window.removeEventListener('keydown',key);
  },[lightbox]);
  return <section className="section gallery-section" id="galeria"><div className="container">
    <div className="heading-row"><SectionHeading tag="A VIDA NO TATAME" title="NOSSO UNIVERSO" accent="EM IMAGENS." description="A energia de quem escolheu evoluir junto com a Invictus."/><a className="text-link" href={instagram} target="_blank" rel="noopener noreferrer">Siga no Instagram <Instagram size={18}/></a></div>
    <div className="gallery-grid">{gallery.map((item,index)=><button className={'gallery-item gallery-item-'+index} type="button" onClick={()=>setLightbox(index)} key={item.image} aria-label={'Ampliar foto: '+item.alt}><img src={img(item.image)} loading="lazy" alt={item.alt}/><span className="gallery-hover"><ArrowUpRight size={22}/></span></button>)}</div>
  </div>
  <dialog className="gallery-dialog" ref={dialog} aria-label="Visualização de fotografia" onClose={()=>setLightbox(null)} onClick={e=>{if(e.target===dialog.current)setLightbox(null);}}>
    {lightbox!==null&&<div className="gallery-dialog-inner">
      <button className="lightbox-close" onClick={()=>setLightbox(null)} aria-label="Fechar imagem" type="button"><X size={22}/></button>
      <img src={img(gallery[lightbox].image)} alt={gallery[lightbox].alt} />
      <div className="lightbox-controls"><button type="button" onClick={()=>change(-1)} aria-label="Foto anterior"><ChevronLeft/></button><span>{String(lightbox+1).padStart(2,'0')} / {String(gallery.length).padStart(2,'0')}</span><button type="button" onClick={()=>change(1)} aria-label="Próxima foto"><ChevronRight/></button></div>
    </div>}
  </dialog>
  </section>;
}

function Contact() {
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const [interest,setInterest]=useState('');
  const [message,setMessage]=useState('');
  const submit=(e)=>{
    e.preventDefault();
    const parts=['Olá, Invictus Team! Gostaria de entrar em contato pelo site.','Nome: '+name.trim(),'Telefone: '+phone.trim()];
    if(interest)parts.push('Interesse: '+interest);
    if(message.trim())parts.push('Mensagem: '+message.trim());
    window.open(whatsapp(parts.join('\n')),'_blank','noopener,noreferrer');
  };
  return <section className="section contact-section" id="contato"><div className="container contact-grid">
    <div className="contact-copy"><span className="eyebrow"><span className="eyebrow-line"/> O PRÓXIMO PASSO É SEU</span><h2>PRONTO PARA<br/><em>COMEÇAR?</em></h2><p>Você não precisa ter experiência. Só precisa dar o primeiro passo. Fale com a equipe e venha conhecer a Invictus.</p>
      <div className="contact-details">
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer"><span><MapPin size={22}/></span><span><small>NOS ENCONTRE</small><strong>Rua Bernardino Sampaio, 450<br/>Taquaritinga, SP</strong></span><ArrowUpRight size={19}/></a>
        <a href={whatsappDefault} target="_blank" rel="noopener noreferrer"><span><MessageCircle size={22}/></span><span><small>FALE PELO WHATSAPP</small><strong>(16) 99704-6896</strong></span><ArrowUpRight size={19}/></a>
        <a href={instagram} target="_blank" rel="noopener noreferrer"><span><Instagram size={22}/></span><span><small>ACOMPANHE A EQUIPE</small><strong>@invictusartesmarciais</strong></span><ArrowUpRight size={19}/></a>
      </div>
    </div>
    <form className="contact-form" onSubmit={submit}>
      <div className="form-topline"><span>VAMOS CONVERSAR</span><span>01 — 04</span></div>
      <h3>Seu próximo treino<br/>começa por aqui.</h3>
      <label htmlFor="contact-name">SEU NOME <span>*</span></label><input id="contact-name" type="text" maxLength="100" required placeholder="Como podemos chamar você?" value={name} onChange={e=>setName(e.target.value)}/>
      <label htmlFor="contact-phone">SEU WHATSAPP <span>*</span></label><input id="contact-phone" type="tel" inputMode="tel" maxLength="30" required placeholder="(16) 99999-9999" value={phone} onChange={e=>setPhone(e.target.value)}/>
      <label htmlFor="contact-interest">MODALIDADE DE INTERESSE</label><select id="contact-interest" value={interest} onChange={e=>setInterest(e.target.value)}><option value="">Quero conhecer as opções</option>{modalities.map(m=><option key={m.title} value={m.title}>{m.title}</option>)}<option value="Treino Individual">Treino Individual</option><option value="Combo MMA">Combo MMA</option></select>
      <label htmlFor="contact-message">SUA MENSAGEM</label><textarea id="contact-message" rows="3" maxLength="1000" placeholder="Conte pra gente o que você procura..." value={message} onChange={e=>setMessage(e.target.value)}/>
      <button className="button button-primary contact-submit" type="submit">Enviar pelo WhatsApp <ArrowUpRight size={19}/></button>
      <small className="form-note">Ao enviar, uma conversa será aberta no WhatsApp. Nenhum dado é armazenado neste site.</small>
    </form>
  </div></section>;
}

function Footer() {
  return <footer className="footer">
    <div className="container footer-main">
      <div className="footer-brand"><img src={img('logoInv.png')} alt="" /><strong>INVICTUS TEAM</strong><p>A força de uma equipe. A evolução de cada pessoa.</p></div>
      <div className="footer-links"><span>EXPLORE</span><a href="#modalidades">Modalidades</a><a href="#sobre">Nossa história</a><a href="#horarios">Horários</a><a href="#planos">Planos</a></div>
      <div className="footer-links"><span>CONTATO</span><a href={whatsappDefault} target="_blank" rel="noopener noreferrer">WhatsApp</a><a href={instagram} target="_blank" rel="noopener noreferrer">Instagram</a><a href={mapsUrl} target="_blank" rel="noopener noreferrer">Como chegar</a></div>
      <a className="back-top" href="#inicio" aria-label="Voltar ao topo"><ArrowUpRight size={25}/></a>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} INVICTUS TEAM. TODOS OS DIREITOS RESERVADOS.</span><span>TAQUARITINGA — SP <b>✳</b> DESDE 2018</span></div>
  </footer>;
}

export default function App() {
  return <><a className="skip-link" href="#modalidades">Pular para o conteúdo</a><AppHeader/><main><Hero/><Ticker/><Modalities/><About/><Schedule/><Plans/><Gallery/><Contact/></main><Footer/></>;
}
