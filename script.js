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

    window.scrollTo({
      top: targetElement.offsetTop - 70,
      behavior: "smooth",
    });
  });
});

// Skills progress bars animation
const skillBars = document.querySelectorAll(".progress");

function animateSkills() {
  skillBars.forEach((skill) => {
    const width = skill.getAttribute("data-width");
    skill.style.width = "0";
    setTimeout(() => {
      skill.style.width = width;
    }, 100);
  });
}

// Projects filter functionality
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    projectItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(30px)";

      setTimeout(() => {
        if (filter === "all") {
          item.style.display = "block";
          setTimeout(() => {
            item.classList.add("show");
          }, 100);
        } else {
          // Check if item has the selected category
          const categories = item.getAttribute("data-category").split(" ");
          if (categories.includes(filter)) {
            item.style.display = "block";
            setTimeout(() => {
              item.classList.add("show");
            }, 100);
          } else {
            item.classList.remove("show");
            item.style.display = "none";
          }
        }
      }, 300);
    });
  });
});

// Animate projects when they come into view
function animateProjects() {
  const projectItems = document.querySelectorAll(".project-item");

  projectItems.forEach((item, index) => {
    const itemPosition = item.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (itemPosition < screenPosition) {
      setTimeout(() => {
        item.classList.add("show");
      }, index * 100);
    }
  });
}

// Contact form submission
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Create success message
  const successMsg = document.createElement("div");
  successMsg.className = "success-message";
  successMsg.textContent = "Message sent successfully!";
  document.body.appendChild(successMsg);

  // Show the message
  setTimeout(() => {
    successMsg.classList.add("show");
  }, 100);

  // Hide and remove the message
  setTimeout(() => {
    successMsg.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(successMsg);
    }, 500);
  }, 3000);

  // Reset form
  contactForm.reset();
});

// Initialize animations on load
window.addEventListener("load", () => {
  animateSkills();
  animateProjects();
});

// Animate on scroll
window.addEventListener("scroll", () => {
  animateProjects();
});

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

// Projects filter functionality
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");

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
      projectItems.forEach((item) => {
        const categories = item.getAttribute("data-category").split(" ");

        // Check if project matches the filter or if filter is 'all'
        if (filterValue === "all" || categories.includes(filterValue)) {
          // Show the project with animation
          item.style.opacity = "0";
          item.style.transform = "translateY(30px)";
          item.style.display = "block";

          // Trigger reflow
          void item.offsetWidth;

          // Animate in
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, 50);
        } else {
          // Hide the project
          item.style.opacity = "0";
          item.style.transform = "translateY(30px)";

          // Hide after animation completes
          setTimeout(() => {
            item.style.display = "none";
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

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

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
    } else {
      throw new Error("Network response not ok");
    }
  } catch (error) {
    status.style.display = "block";
    status.style.color = "red";
    status.textContent = "❌ Oops! Something went wrong. Please try again.";
  }
});
