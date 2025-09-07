// === NAVBAR HAMBURGUER ===
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('active');
});

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
