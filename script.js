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
            'Segunda': ['16:00', '17:00'],
            'Terça': ['16:00'],
            'Quarta': ['16:00', '17:00'],
            'Quinta': ['16:00'],
            'Sexta': ['16:00']
        }
    },
    'muay-thai-misto': {
        nome: 'Muay Thai - Misto',
        horarios: {
            'Segunda': ['19:00', '20:00'],
            'Terça': ['19:00'],
            'Quarta': ['19:00', '20:00'],
            'Quinta': ['19:00'],
            'Sexta': ['19:00', '20:00']
        }
    },
    'muay-thai-feminino': {
        nome: 'Muay Thai - Feminino',
        horarios: {
            'Segunda': ['18:00'],
            'Terça': ['18:00', '19:30'],
            'Quarta': ['18:00'],
            'Quinta': ['18:00', '19:30'],
            'Sexta': ['18:00']
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