// ============================================
// 1. PAGE TRANSITION
// Purple overlay slides up when page loads
// ============================================
window.addEventListener("load", function () {
  // CSS animation handles the slide-up
  // After 1s remove the element so it doesn't block clicks
  setTimeout(function () {
    const overlay = document.getElementById("page-transition");
    if (overlay) overlay.remove();
  }, 1100);
});

// ============================================
// 2. TYPING EFFECT
// Cycles through different developer roles
// ============================================
const roles = [
  "Java Full Stack Developer",
  "Spring Boot Developer",
  "MCA Student @ Shivaji University",
  "Open to Work 🚀",
];

let rIdx = 0,
  cIdx = 0,
  deleting = false;

function typeIt() {
  const el = document.getElementById("typing");
  if (!el) return;

  const role = roles[rIdx];

  if (!deleting) {
    el.textContent = role.substring(0, cIdx + 1);
    cIdx++;
    if (cIdx === role.length) {
      setTimeout(() => {
        deleting = true;
      }, 1800);
    }
  } else {
    el.textContent = role.substring(0, cIdx - 1);
    cIdx--;
    if (cIdx === 0) {
      deleting = false;
      rIdx = (rIdx + 1) % roles.length;
    }
  }
  setTimeout(typeIt, deleting ? 42 : 76);
}
typeIt();

// ============================================
// 3. SCROLL REVEAL
// Sections fade + slide up when scrolled into view
// ============================================
const reveals = document.querySelectorAll(".reveal");

function doReveal() {
  reveals.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) {
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", doReveal);
doReveal();

// ============================================
// 4. SKILL PROGRESS BARS
// Fill up with animation when skills section appears
// ============================================
let barsRan = false;

function runBars() {
  if (barsRan) return;
  const skillsSection = document.getElementById("skills");
  if (!skillsSection) return;

  const top = skillsSection.getBoundingClientRect().top;
  if (top < window.innerHeight - 50) {
    document.querySelectorAll(".bar-fill").forEach((bar) => {
      bar.style.width = bar.getAttribute("data-w") + "%";
    });
    barsRan = true;
  }
}
window.addEventListener("scroll", runBars);
runBars();

// ============================================
// 5. ANIMATED COUNTERS
// Numbers count up when About section is visible
// ============================================
let countersRan = false;

function runCounters() {
  if (countersRan) return;
  const about = document.getElementById("about");
  if (!about) return;

  const top = about.getBoundingClientRect().top;
  if (top < window.innerHeight - 80) {
    document.querySelectorAll(".counter-num").forEach((el) => {
      const target = parseInt(el.getAttribute("data-target"));
      const duration = 1800; // total ms
      const step = target / (duration / 16); // increment per frame
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current);
        }
      }, 16);
    });
    countersRan = true;
  }
}
window.addEventListener("scroll", runCounters);
runCounters();

// ============================================
// 6. NAVBAR — scrolled style + active link
// ============================================
const navbar = document.getElementById("navbar");
const navAs = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  // Add shadow when scrolled
  navbar.classList.toggle("scrolled", window.scrollY > 60);

  // Highlight active nav link
  let cur = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 100) cur = s.id;
  });
  navAs.forEach((a) => {
    a.style.color = a.getAttribute("href") === "#" + cur ? "#7c3aed" : "";
  });
});

// ============================================
// 7. BACK TO TOP BUTTON
// ============================================
const topBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  topBtn.classList.toggle("show", window.scrollY > 400);
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ============================================
// 8. HAMBURGER MENU — mobile
// ============================================
const hburger = document.getElementById("hamburger");
const navList = document.getElementById("navLinks");
let mobileOpen = false;

hburger.addEventListener("click", () => {
  mobileOpen = !mobileOpen;

  if (mobileOpen) {
    Object.assign(navList.style, {
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      top: "62px",
      left: "0",
      right: "0",
      background: "rgba(255,255,255,0.97)",
      padding: "22px 6%",
      gap: "18px",
      borderBottom: "1px solid #e8e2f8",
      backdropFilter: "blur(20px)",
      zIndex: "998",
      boxShadow: "0 8px 24px rgba(124,58,237,0.1)",
    });
  } else {
    navList.style.display = "none";
  }
});

// Close menu when link clicked on mobile
navAs.forEach((a) => {
  a.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      navList.style.display = "none";
      mobileOpen = false;
    }
  });
});

// ============================================
// 9. SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ============================================
// 10. 3D CARD TILT EFFECT
// Cards tilt towards mouse direction on hover
// ============================================
document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // mouse X inside card
    const y = e.clientY - rect.top; // mouse Y inside card
    const mx = rect.width / 2;
    const my = rect.height / 2;

    // Tilt angles — max 6 degrees
    const tiltX = ((y - my) / my) * 5;
    const tiltY = ((x - mx) / mx) * -5;

    card.style.transform = `
      perspective(800px)
      rotateX(${tiltX}deg)
      rotateY(${tiltY}deg)
      translateY(-6px)
    `;

    // Move a subtle purple glow to follow the mouse
    card.style.background = `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(124,58,237,0.04) 0%,
        #fff 60%
      )
    `;
  });

  card.addEventListener("mouseleave", () => {
    // Smoothly reset
    card.style.transform = "";
    card.style.background = "";
    card.style.transition = "transform 0.5s ease, background 0.5s ease";
    setTimeout(() => {
      card.style.transition = "";
    }, 500);
  });
});

// ============================================
// 11. CONTACT FORM
// Validates and shows success message
// ============================================
function sendMsg() {
  const name = document.getElementById("fname").value.trim();
  const email = document.getElementById("femail").value.trim();
  const subject = document.getElementById("fsubject").value.trim();
  const msg = document.getElementById("fmessage").value.trim();

  // Validation
  if (!name || !email || !subject || !msg) {
    alert("⚠️ Please fill in all fields!");
    return;
  }
  if (!email.includes("@") || !email.includes(".")) {
    alert("⚠️ Please enter a valid email address!");
    return;
  }

  // Show success message
  const ok = document.getElementById("form-ok");
  ok.style.display = "block";

  // Clear form
  ["fname", "femail", "fsubject", "fmessage"].forEach((id) => {
    document.getElementById(id).value = "";
  });

  // Auto hide after 5 seconds
  setTimeout(() => {
    ok.style.display = "none";
  }, 5000);
}

// ============================================
// 12. SKILL CHIPS — glow on hover
// Each chip gets a tiny purple shadow on hover
// ============================================
document.querySelectorAll(".chip:not(.learning)").forEach((chip) => {
  chip.addEventListener("mouseenter", () => {
    chip.style.boxShadow = "0 4px 14px rgba(124,58,237,0.2)";
  });
  chip.addEventListener("mouseleave", () => {
    chip.style.boxShadow = "";
  });
});
