
export const brand = {
  name: 'Invictus Team',
  area: 'Taquaritinga, SP',
  address: 'Rua Bernardino Sampaio, 450, Taquaritinga - SP',
  phone: '(16) 99704-6896',
  phoneRaw: '5516997046896',
  instagram: 'https://www.instagram.com/invictusartesmarciais/',
  maps: 'https://www.google.com/maps/search/?api=1&query=Rua+Bernardino+Sampaio+450+Taquaritinga+SP',
  year: '2018',
};
export const whatsapp = (text = 'Olá! Conheci a Invictus Team pelo site e gostaria de agendar uma aula experimental.') =>
  'https://wa.me/' + brand.phoneRaw + '?text=' + encodeURIComponent(text);
export const modalities = [
  {
    slug:'muay-thai', name:'Muay Thai', label:'A arte das oito armas',
    image:'ModalidadesThai.jpeg', imageAlt:'Praticantes de Muay Thai em treinamento',
    subtitle:'Força, técnica e evolução a cada treino.',
    intro:'O Muay Thai é uma arte marcial tailandesa que combina socos, chutes, joelhadas e cotoveladas. Na Invictus, o treinamento trabalha condicionamento físico, técnica, disciplina e autocontrole.',
    paragraphs:[
      'É uma opção para quem quer sair do sedentarismo, desenvolver coordenação e ganhar confiança. A intensidade acompanha a experiência e os objetivos de cada praticante.',
      'Aulas em grupo aproximam alunos em fases diferentes, com aprendizado gradual dos movimentos, das combinações e da movimentação.'
    ],
    benefits:['Condicionamento e resistência','Coordenação e mobilidade','Disciplina e foco','Técnica de golpes e defesa'],
    forWhom:'Para iniciantes, praticantes recreativos e quem deseja aprimorar a técnica para competições.',
    question:'Preciso ter experiência para começar?',
    answer:'Não. Entre em contato para encontrar uma turma compatível com sua experiência e confirmar a disponibilidade.',
  },
  {
    slug:'jiu-jitsu', name:'Jiu-Jitsu', label:'A arte suave',
    image:'ModalidesJiu.jpg', imageAlt:'Praticantes de Jiu-Jitsu em treinamento no tatame',
    subtitle:'Estratégia, controle e inteligência no tatame.',
    intro:'No Jiu-Jitsu, a técnica ajuda a usar equilíbrio, alavancas e posicionamento para controlar situações no solo. É uma modalidade que estimula raciocínio, paciência e respeito.',
    paragraphs:[
      'O aprendizado passa por posições, transições, defesas e finalizações, sempre com atenção à segurança e ao nível de cada aluno.',
      'A prática frequente desenvolve percepção corporal e ajuda a manter uma rotina de exercício, concentração e evolução contínua.'
    ],
    benefits:['Controle corporal','Raciocínio e estratégia','Flexibilidade e mobilidade','Respeito e disciplina'],
    forWhom:'Para iniciantes e praticantes de diferentes níveis que desejam desenvolver técnica de solo.',
    question:'É necessário saber lutar antes da primeira aula?',
    answer:'Não. O ideal é conversar com a equipe para conhecer as turmas e receber orientações para a primeira aula.',
  },
  {
    slug:'boxe-chines', name:'Boxe Chinês', label:'Movimento e precisão',
    image:'ModalidesBoxe.jpg', imageAlt:'Treinamento de golpes de boxe e artes marciais',
    subtitle:'Agilidade, equilíbrio e potência em movimento.',
    intro:'Também conhecido como Sanda ou Sanshou, o Boxe Chinês combina técnicas de mãos, chutes e projeções em um treinamento dinâmico.',
    paragraphs:[
      'A modalidade favorece coordenação, agilidade, postura e entendimento das distâncias. O treino é construído por etapas, da movimentação às combinações.',
      'Além dos aspectos físicos, é uma prática que exige atenção, controle e capacidade de tomar decisões.'
    ],
    benefits:['Agilidade e reflexos','Equilíbrio e postura','Coordenação motora','Condicionamento'],
    forWhom:'Para quem busca um treino marcial versátil e quer desenvolver movimentação e técnica.',
    question:'Como posso conhecer o Boxe Chinês?',
    answer:'Fale com a Invictus para confirmar disponibilidade de turmas e orientações para uma aula experimental.',
  },
  {
    slug:'defesa-pessoal', name:'Defesa Pessoal', label:'Segurança e consciência',
    image:'ModalidadesDefesa.jpg', imageAlt:'Treinamento prático de defesa pessoal',
    subtitle:'Autoconfiança começa com preparo e atenção.',
    intro:'As aulas de defesa pessoal reúnem princípios de prevenção, percepção de risco, movimentação e técnicas de proteção, com foco em decisões responsáveis.',
    paragraphs:[
      'Mais do que executar movimentos, a proposta é desenvolver atenção ao ambiente, autocontrole e confiança para reagir de modo proporcional e buscar segurança.',
      'O treinamento é progressivo e a equipe pode orientar quais opções são adequadas à sua necessidade.'
    ],
    benefits:['Consciência situacional','Autocontrole','Coordenação','Confiança e prevenção'],
    forWhom:'Para quem deseja desenvolver noções práticas de proteção e consciência corporal.',
    question:'O treinamento garante segurança em qualquer situação?',
    answer:'Não. Nenhum treinamento elimina riscos. Prevenção, evitar confrontos e buscar ajuda são prioridades.',
  }
];
export const schedule = [
  {id:'muay-thai-kids',name:'Muay Thai Kids',hint:'Infantil',days:{
    'Segunda':[],'Terça':['17:00'],'Quarta':[],'Quinta':['17:00'],'Sexta':[]}},
  {id:'muay-thai-misto',name:'Muay Thai Misto',hint:'Turmas em grupo',days:{
    'Segunda':['09:00','15:00','17:00','19:00'],'Terça':['15:00','19:00'],'Quarta':['09:00','15:00','17:00','19:00'],'Quinta':['09:00','15:00','19:00'],'Sexta':['09:00','15:00','17:00','19:00']}},
  {id:'muay-thai-feminino',name:'Muay Thai Feminino',hint:'Turmas femininas',days:{
    'Segunda':['07:00','08:00','16:00','18:00'],'Terça':['07:00','08:00','16:00','18:00'],'Quarta':['07:00','08:00','16:00','18:00'],'Quinta':['07:00','08:00','16:00','18:00'],'Sexta':['07:00','08:00','16:00','18:00']}},
  {id:'jiu-jitsu',name:'Jiu-Jitsu',hint:'Treino de solo',days:{
    'Segunda':['20:00'],'Terça':[],'Quarta':['20:00'],'Quinta':[],'Sexta':['20:00']}},
  {id:'individual',name:'Treino Individual',hint:'Aulas sob consulta',days:{
    'Segunda':['Sob consulta'],'Terça':['Sob consulta'],'Quarta':['Sob consulta'],'Quinta':['Sob consulta'],'Sexta':['Sob consulta']}},
];
export const plans = [
  {id:'muay-thai',name:'Muay Thai',subtitle:'Aulas em grupo',items:[
    {name:'Essencial',freq:'1 aula por semana',price:'R$ 50',unit:'/mês',text:'Conheça os fundamentos com uma rotina semanal.'},
    {name:'Constância',freq:'2 aulas por semana',price:'R$ 90',unit:'/mês',text:'Uma boa frequência para criar consistência.'},
    {name:'Evolução',freq:'3 aulas por semana',price:'R$ 120',unit:'/mês',text:'Mais oportunidades para praticar e desenvolver técnica.',featured:true},
    {name:'Intensivo',freq:'5 aulas por semana',price:'R$ 150',unit:'/mês',text:'Uma rotina de treinos mais frequente.'},
  ]},
  {id:'personal-fight',name:'Personal Fight',subtitle:'Treinos individuais',items:[
    {name:'Individual',freq:'1 aula por semana',price:'R$ 40',unit:'/aula',text:'Acompanhamento dedicado com foco em seus objetivos.'},
    {name:'Foco',freq:'2 aulas por semana',price:'R$ 35',unit:'/aula',text:'Mais frequência no treinamento personalizado.',featured:true},
    {name:'Imersão',freq:'3 aulas por semana',price:'R$ 30',unit:'/aula',text:'Treinamento individual com rotina intensiva.'},
  ]},
  {id:'jiu-jitsu',name:'Jiu-Jitsu',subtitle:'Aulas em grupo',items:[
    {name:'Essencial',freq:'1 aula por semana',price:'R$ 50',unit:'/mês',text:'Primeiros passos no Jiu-Jitsu.'},
    {name:'Constância',freq:'2 aulas por semana',price:'R$ 90',unit:'/mês',text:'Mais tempo para praticar posições e movimentos.',featured:true},
    {name:'Evolução',freq:'3 aulas por semana',price:'R$ 120',unit:'/mês',text:'Aprofunde sua prática no tatame.'},
  ]},
  {id:'combo-mma',name:'Combo MMA',subtitle:'Muay Thai + Jiu-Jitsu',items:[
    {name:'Combo 3',freq:'3 aulas por semana',price:'R$ 140',unit:'/mês',text:'Combine duas aulas de uma modalidade e uma da outra.'},
    {name:'Combo 4',freq:'4 aulas por semana',price:'R$ 170',unit:'/mês',text:'Duas aulas de Muay Thai e duas de Jiu-Jitsu.',featured:true},
    {name:'Combo 5',freq:'5 aulas por semana',price:'R$ 200',unit:'/mês',text:'Alterne três treinos de uma modalidade e dois da outra.'},
  ]},
];
export const gallery = [
  ...Array.from({length:11},(_,i)=>({src:'Galeria'+(i+1)+'.jpeg',alt:'Registro '+(i+1)+' da equipe e dos treinos da Invictus Team'})),
  ...Array.from({length:4},(_,i)=>({src:'espaco'+(i+1)+'.jpeg',alt:'Foto '+(i+1)+' do espaço de treinamento da Invictus Team'}))
];
