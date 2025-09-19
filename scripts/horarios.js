 // === NAVBAR HAMBURGUER ===
 const hamburger = document.getElementById('hamburger');
 const nav = document.getElementById('nav');
 hamburger.addEventListener('click', () => {
   hamburger.classList.toggle('active');
   nav.classList.toggle('active');
 });

 // === HORARIOS ===
 const horariosModalidades = {
   'muay-thai-kids': { nome: 'Muay Thai - Kids', horarios: { 'Terça': ['17:00'], 'Quinta': ['17:00'] } },

   'muay-thai-misto': { nome: 'Muay Thai - Misto', horarios: { 'Segunda': ['09:00','15:00','17:00','19:00'], 'Terça': ['15:00','19:00'], 'Quarta': ['09:00','15:00','17:00','19:00'], 'Quinta': ['09:00','15:00','19:00'], 'Sexta': ['09:00','15:00','17:00','19:00'] } },

   'muay-thai-feminino': { nome: 'Muay Thai - Feminino', horarios: { 'Segunda': ['07:00','08:00','16:00','18:00'], 'Terça': ['07:00','08:00','16:00','18:00'], 'Quarta': ['07:00','08:00','16:00','18:00'], 'Quinta': ['07:00','08:00','16:00','18:00'], 'Sexta': ['07:00','08:00','16:00','18:00'] } },

   'jiu-jitsu': { nome: 'Jiu Jitsu', horarios: { 'Segunda': ['20:00'], 'Quarta': ['20:00'], 'Sexta': ['20:00'] } },

   'individual': { nome: 'Treino Individual', horarios: { 'Segunda': ['Consultar disponibilidade'], 'Terça': ['Consultar disponibilidade'], 'Quarta': ['Consultar disponibilidade'], 'Quinta': ['Consultar disponibilidade'], 'Sexta': ['Consultar disponibilidade'] } }
 };

 function criarTabelaHorarios(modalidade) {
   const dados = horariosModalidades[modalidade];
   if (!dados) return '';
   let tabela = `<div class="tabela-horarios"><h4>Horários - ${dados.nome}</h4><table><thead><tr><th>Dia da Semana</th><th>Horários</th></tr></thead><tbody>`;
   Object.keys(dados.horarios).forEach(dia => {
     tabela += `<tr><td>${dia}</td><td>${dados.horarios[dia].join(', ')}</td></tr>`;
   });
   tabela += '</tbody></table></div>';
   return tabela;
 }

 const botoes = document.querySelectorAll('.botao-aula');
 const divHorarios = document.querySelector('.horarios');

 botoes.forEach(botao => {
   botao.addEventListener('click', () => {
     botoes.forEach(b => b.classList.remove('selecionado'));
     botao.classList.add('selecionado');
     const modalidade = botao.getAttribute('data-modalidade');
     divHorarios.innerHTML = criarTabelaHorarios(modalidade);
   });
 });