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

    const texto = `Olá! Meu nome é ${nome}.\nTelefone: ${telefone}\nMensagem: ${mensagem}`;
    const numeroWhatsApp = "5516997046896";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
  });
});
