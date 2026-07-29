'use strict';

document.addEventListener("DOMContentLoaded", function () {
  // element toggle function
  const elementToggleFunc = function (elem) {
    elem.classList.toggle("active");
  };

  // sidebar variables
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  if (sidebarBtn) {
    sidebarBtn.addEventListener("click", function () {
      elementToggleFunc(sidebar);
    });
  }

  // testimonials modal logic
  const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  const testimonialsModalFunc = function () {
    if (modalContainer && overlay) {
      modalContainer.classList.toggle("active");
      overlay.classList.toggle("active");
    }
  };

  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      if (modalImg && modalTitle && modalText) {
        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
        modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
        testimonialsModalFunc();
      }
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  }

  if (overlay) {
    overlay.addEventListener("click", testimonialsModalFunc);
  }

  // custom select variables
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-select-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");

  if (select) {
    select.addEventListener("click", function () {
      elementToggleFunc(this);
    });
  }

  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }

 const filterItems = document.querySelectorAll("[data-filter-item]");

function filterFunc(selectedValue) {
  const normalizedValue = selectedValue.trim().toLowerCase();

  filterItems.forEach(item => {
    const itemCategory = item.dataset.category.trim().toLowerCase();

    if (normalizedValue === "all" || normalizedValue === itemCategory) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);
      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }

  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form && form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }

  

  // project detail modal logic
  const projectItems = document.querySelectorAll(".project-item");
  const projModalContainer = document.querySelector("[data-project-modal-container]");
  const projModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
  const projOverlay = document.querySelector("[data-project-overlay]");
  const projModalImg = document.querySelector("[data-project-modal-img]");
  const projModalTitle = document.querySelector("[data-project-modal-title]");
  const projModalCategory = document.querySelector("[data-project-modal-category]");
  const projModalText = document.querySelector("[data-project-modal-text]");
  const projModalLink = document.querySelector("[data-project-modal-link]");

  const toggleProjModal = function () {
    if (projModalContainer && projOverlay) {
      projModalContainer.classList.toggle("active");
      projOverlay.classList.toggle("active");
    }
  };

  projectItems.forEach(item => {
    item.addEventListener("click", function (e) {
      const link = this.querySelector("a");
      const href = link ? link.getAttribute("href") : null;
      
      // If project has an external PDF or Instagram link, allow modal preview with link
      e.preventDefault();

      const img = this.querySelector(".project-img img");
      const title = this.querySelector(".project-title");
      const categories = this.querySelectorAll(".project-category");

      if (img && projModalImg) {
        projModalImg.src = img.src;
        projModalImg.alt = img.alt || "Project preview";
      }

      if (title && projModalTitle) {
        projModalTitle.innerText = title.innerText;
      }

      let categoryText = "Project";
      let descText = "";

      if (categories.length > 1) {
        descText = categories[0].innerText;
        categoryText = categories[1].innerText;
      } else if (categories.length === 1) {
        categoryText = categories[0].innerText;
        descText = title ? title.innerText : "";
      }

      if (projModalCategory) projModalCategory.innerText = categoryText;
      if (projModalText) projModalText.innerText = descText;

      if (projModalLink) {
        if (href && href !== "#" && href !== "") {
          projModalLink.href = href;
          projModalLink.style.display = "inline-flex";
        } else {
          projModalLink.style.display = "none";
        }
      }

      toggleProjModal();
    });
  });

  if (projModalCloseBtn) projModalCloseBtn.addEventListener("click", toggleProjModal);
  if (projOverlay) projOverlay.addEventListener("click", toggleProjModal);

  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  navigationLinks.forEach((navLink) => {
    navLink.addEventListener("click", function () {
      const targetPage = navLink.innerText.toLowerCase();
      pages.forEach((page) => {
        if (page.dataset.page === targetPage) {
          page.classList.add("active");
        } else {
          page.classList.remove("active");
        }
      });
      navigationLinks.forEach((link) => link.classList.remove("active"));
      navLink.classList.add("active");
      window.scrollTo(0, 0);
    });
  });

  // Interactive Mouse Cursor Radial Glow & Cosmic Starlight Particle Trail
  const canvas = document.getElementById("bg-glow-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let particles = [];

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener("mousemove", (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;

      // Spawn subtle starlight particles along cursor movement
      if (Math.random() < 0.6) {
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          radius: Math.random() * 2 + 1,
          alpha: 0.6,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          color: Math.random() > 0.4 ? "255, 217, 102" : "56, 189, 248" // Warm gold or cyan
        });
      }
    });

    function animateGlow() {
      ctx.clearRect(0, 0, width, height);

      // Smooth inertia lerp for cursor spotlight
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Draw subtle ambient radial spotlight centered at mouse position
      const gradientRadius = 380;
      const gradient = ctx.createRadialGradient(
        mouseX,
        mouseY,
        0,
        mouseX,
        mouseY,
        gradientRadius
      );
      gradient.addColorStop(0, "rgba(255, 217, 102, 0.12)"); // Starlight gold center
      gradient.addColorStop(0.35, "rgba(56, 189, 248, 0.05)"); // Cosmic cyan aura
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, gradientRadius, 0, Math.PI * 2);
      ctx.fill();

      // Render and update cosmic particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.015;
        p.radius *= 0.97;

        if (p.alpha <= 0 || p.radius <= 0.2) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animateGlow);
    }

    animateGlow();
  }
});