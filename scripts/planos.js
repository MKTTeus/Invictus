    // Navbar hamburguer
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
    });

    // Abas e carrossel
    document.addEventListener("DOMContentLoaded", () => {
      const tabs = document.querySelectorAll(".plan-tab");
      const slider = document.querySelector(".slider");
      const panels = document.querySelectorAll(".panel");
      let activeIndex = 0;

      function switchTo(index) {
        slider.style.transform = `translateX(-${index * 100}%)`;
        tabs.forEach((tab, i) => {
          const isActive = i === index;
          tab.classList.toggle("active", isActive);
          tab.setAttribute("aria-selected", isActive ? "true" : "false");
          tab.tabIndex = isActive ? 0 : -1;
          panels[i].setAttribute("aria-hidden", isActive ? "false" : "true");
        });
        activeIndex = index;
      }

      tabs.forEach((tab, i) => {
        tab.addEventListener("click", () => switchTo(i));
        tab.addEventListener("keydown", e => {
          if(e.key === "ArrowRight") { e.preventDefault(); switchTo((activeIndex+1)%tabs.length); }
          else if(e.key === "ArrowLeft") { e.preventDefault(); switchTo((activeIndex-1+tabs.length)%tabs.length); }
          else if(e.key === "Enter" || e.key === " ") { e.preventDefault(); switchTo(i); }
        });
      });

      switchTo(0);
    });