// Theme Toggle Functionality
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
let currentTheme = localStorage.getItem("theme") || "light";

// Set initial theme
if (currentTheme === "dark") {
  body.setAttribute("data-theme", "dark");
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
  body.removeAttribute("data-theme");
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Toggle theme
themeToggle.addEventListener("click", () => {
  if (body.hasAttribute("data-theme")) {
    body.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
});

// Mobile Navigation Toggle
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links li");

burger.addEventListener("click", () => {
  // Toggle nav
  nav.classList.toggle("active");
  burger.classList.toggle("open");

  // Animate nav items
  navItems.forEach((item, index) => {
    if (item.style.animation) {
      item.style.animation = "";
    } else {
      item.style.animation = `navLinkFade 0.5s ease forwards ${
        index / 7 + 0.3
      }s`;
    }
  });
});

// Close mobile menu when clicking on a link
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    nav.classList.remove("active");
    burger.classList.remove("open");
  });
});

// Add animation to navbar on scroll
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      });
    }
  });
});

// Skills progress bars animation
const skillBars = document.querySelectorAll(".progress");

function animateSkills() {
  skillBars.forEach((skill) => {
    const width = skill.getAttribute("data-width");
    if (width) {
      skill.style.width = "0";
      setTimeout(() => {
        skill.style.width = width;
      }, 100);
    }
  });
}

// Add CSS animation for nav links
const style = document.createElement("style");
style.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Projects filter functionality - FIXED VERSION
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".card[data-category]"); // Changed to select cards with data-category

  // Add click event listener to each filter button
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Get the filter value from data-filter attribute
      const filterValue = this.getAttribute("data-filter");

      // Filter projects based on selected category
      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");

        // Check if project matches the filter or if filter is 'all'
        if (filterValue === "all" || category === filterValue) {
          // Show the card with animation
          card.style.opacity = "0";
          card.style.transform = "scale(0.8)";
          card.style.display = "block";

          // Trigger reflow
          void card.offsetWidth;

          // Animate in
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
            card.style.transition = "all 0.3s ease";
          }, 50);
        } else {
          // Hide the card
          card.style.opacity = "0";
          card.style.transform = "scale(0.8)";
          card.style.transition = "all 0.3s ease";

          // Hide after animation completes
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Initialize with "All" filter active
  const allButton = document.querySelector('.filter-btn[data-filter="all"]');
  if (allButton) {
    allButton.click();
  }
});

// Contact form submission with Formspree
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

if (form && status) {
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        status.style.display = "block";
        status.style.color = "green";
        status.textContent = "✅ Message Sent Successfully!";
        form.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          status.style.display = "none";
        }, 5000);
      } else {
        throw new Error("Network response not ok");
      }
    } catch (error) {
      status.style.display = "block";
      status.style.color = "red";
      status.textContent = "❌ Oops! Something went wrong. Please try again.";

      // Hide error message after 5 seconds
      setTimeout(() => {
        status.style.display = "none";
      }, 5000);
    }
  });
}

// Initialize animations on load
window.addEventListener("load", () => {
  animateSkills();
});
