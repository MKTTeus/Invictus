 // Navbar hamburger
 const hamburger = document.getElementById('hamburger');
 const nav = document.getElementById('nav');
 hamburger.addEventListener('click', () => {
   hamburger.classList.toggle('active');
   nav.classList.toggle('active');
 });

 // Formato telefone e envio WhatsApp
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