function toggleCard(card) {
    const content = card.querySelector(".conteudo");
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}

function toggleBenefit(id) {
    const p = document.getElementById(id);
    p.classList.toggle('hidden');
  }

document.addEventListener('DOMContentLoaded', function () {
  console.log("Página Muay Thai carregada com sucesso!");
  
  const botaoBeneficio = document.querySelectorAll('.muay-beneficio-titulo');
  botaoBeneficio.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.nextElementSibling.classList.toggle('ativo');
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const telefoneInput = document.getElementById("telefone");
  const form = document.getElementById("form-contato");

  telefoneInput.addEventListener("input", () => {
    let value = telefoneInput.value.replace(/\D/g, "").slice(0, 11);
    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    }
    telefoneInput.value = value;
  });

 
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    const texto = `Olá! Meu nome é ${nome}.
    \nTelefone: ${telefone}
    \nMensagem: ${mensagem}`;
    const numeroWhatsApp = "5516997046896";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
  });
});

//HORARIOS
// Sistema de horários das modalidades
const horariosModalidades = {
    'muay-thai-kids': {
        nome: 'Muay Thai - Kids',
        horarios: {
            'Terça': ['17:00'],
            'Quinta': ['17:00'],
        }
    },
    'muay-thai-misto': {
        nome: 'Muay Thai - Misto',
        horarios: {
            'Segunda': ['07:00', '08:00', '16:00', '18:00'],
            'Terça': ['07:00', '08:00', '16:00', '18:00'],
            'Quarta': ['07:00', '08:00', '16:00', '18:00'],
            'Quinta': ['07:00', '08:00', '16:00', '18:00'],
            'Sexta': ['07:00', '08:00', '16:00', '18:00']
        }
    },
    'muay-thai-feminino': {
        nome: 'Muay Thai - Feminino',
        horarios: {
            'Segunda': ['09:00', '15:00', '17:00', '19:00'],
            'Terça': ['15:00', '19:00'],
            'Quarta': ['09:00', '15:00', '17:00', '19:00'],
            'Quinta': ['09:00', '15:00', '19:00'],
            'Sexta': ['09:00', '15:00', '17:00', '19:00']
        }
    },
    'jiu-jitsu': {
        nome: 'Jiu Jitsu',
        horarios: {
            'Segunda': ['20:00'],
            'Quarta': ['20:00'],
            'Sexta': ['20:00']
        }
    },
    'individual': {
        nome: 'Treino Individual',
        horarios: {
            'Segunda': ['Consultar disponibilidade'],
            'Terça': ['Consultar disponibilidade'],
            'Quarta': ['Consultar disponibilidade'],
            'Quinta': ['Consultar disponibilidade'],
            'Sexta': ['Consultar disponibilidade']
        }
    }
};

// Função para criar a tabela de horários
function criarTabelaHorarios(modalidade) {
    const dados = horariosModalidades[modalidade];
    if (!dados) return '';

    let tabela = `
        <div class="tabela-horarios">
            <h4>Horários - ${dados.nome}</h4>
            <table>
                <thead>
                    <tr>
                        <th>Dia da Semana</th>
                        <th>Horários</th>
                    </tr>
                </thead>
                <tbody>
    `;

    // Adicionar linha para cada dia
    Object.keys(dados.horarios).forEach(dia => {
        const horarios = dados.horarios[dia];
        tabela += `
            <tr>
                <td><strong>${dia}</strong></td>
                <td>${horarios.join(' - ')}</td>
            </tr>
        `;
    });

    tabela += `
                </tbody>
            </table>
        </div>
    `;

    return tabela;
}

// Função para lidar com a seleção de modalidade
function selecionarModalidade(botao, modalidade) {
    // Remove seleção anterior
    document.querySelectorAll('.botao-aula').forEach(btn => {
        btn.classList.remove('selecionado');
    });

    // Adiciona seleção ao botão clicado
    botao.classList.add('selecionado');

    // Exibe a tabela de horários
    const containerHorarios = document.querySelector('.horarios');
    containerHorarios.innerHTML = criarTabelaHorarios(modalidade);
}

// Adicionar event listeners quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    const botoesAula = document.querySelectorAll('.botao-aula');
    
    botoesAula.forEach(botao => {
        botao.addEventListener('click', function() {
            const modalidade = this.getAttribute('data-modalidade');
            selecionarModalidade(this, modalidade);
        });
    });

    // Opcional: Selecionar a primeira modalidade por padrão
    // if (botoesAula.length > 0) {
    //     const primeiroBot ao = botoesAula[0];
    //     const modalidade = primeiroBot ao.getAttribute('data-modalidade');
    //     selecionarModalidade(primeiroBot ao, modalidade);
    // }
});

//PLANOS
document.addEventListener("DOMContentLoaded", () => {
      const tabs = document.querySelectorAll(".plan-tab");
      const slider = document.querySelector(".slider");
      const panels = document.querySelectorAll(".panel");

      let activeIndex = 0;

      function switchTo(index) {
        // move o carrossel para o painel desejado
        slider.style.transform = `translateX(-${index * 100}%)`;

        // atualiza estados visuais/ARIA das abas e painéis
        tabs.forEach((tab, i) => {
          const isActive = i === index;
          tab.classList.toggle("active", isActive);
          tab.setAttribute("aria-selected", isActive ? "true" : "false");
          tab.tabIndex = isActive ? 0 : -1;
          panels[i].setAttribute("aria-hidden", isActive ? "false" : "true");
        });

        activeIndex = index;
      }

      // clique + teclado nas abas
      tabs.forEach((tab, i) => {
        tab.addEventListener("click", () => switchTo(i));
        tab.addEventListener("keydown", (e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            switchTo((activeIndex + 1) % tabs.length);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            switchTo((activeIndex - 1 + tabs.length) % tabs.length);
          } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            switchTo(i);
          }
        });
      });

      // inicia no primeiro painel
      switchTo(0);
    });

//HISTÓRIA

// ===== SCRIPT DO CARROSSEL FLUIDO =====
const track = document.querySelector('.carousel-track');
const images = Array.from(track.children);
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');

let currentIndex = 0;
let imgWidth = 240;
let isTransitioning = false;

// Duplicar imagens para efeito infinito
track.innerHTML += track.innerHTML;
const allImages = Array.from(track.children);

function setPosition() {
  track.style.transform = `translateX(${-imgWidth * currentIndex}px)`; // removido +300
}

function updateActive() {
  allImages.forEach(img => img.classList.remove('active'));
  let middleIndex = currentIndex % images.length;
  if (middleIndex < 0) middleIndex = images.length - 1;
  allImages.forEach((img, i) => {
    if (i % images.length === middleIndex) img.classList.add('active');
  });
}

function moveToNext() {
  if (isTransitioning) return;
  isTransitioning = true;
  currentIndex++;
  track.style.transition = "transform 0.6s ease-in-out";
  setPosition();
}

function moveToPrev() {
  if (isTransitioning) return;
  isTransitioning = true;
  currentIndex--;
  track.style.transition = "transform 0.6s ease-in-out";
  setPosition();
}

track.addEventListener("transitionend", () => {
  if (currentIndex >= allImages.length - images.length) {
    track.style.transition = "none";
    currentIndex = currentIndex % images.length;
    setPosition();
  } else if (currentIndex < 0) {
    track.style.transition = "none";
    currentIndex = allImages.length - images.length + currentIndex;
    setPosition();
  }
  updateActive();
  isTransitioning = false;
});

leftArrow.addEventListener('click', moveToPrev);
rightArrow.addEventListener('click', moveToNext);

// inicialização
setPosition();
updateActive();