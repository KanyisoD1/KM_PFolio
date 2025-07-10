// Typing effect
const text = ["Business Analysis", "Software Testing", "SQL, Python, Power BI, HTML, JavaScript", "Data AI"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
  if (count === text.length) count = 0;
  currentText = text[count];
  letter = currentText.slice(0, ++index);
  const typingEl = document.querySelector(".typing-text");
  if (typingEl) typingEl.textContent = letter;

  if (letter.length === currentText.length) {
    count++;
    index = 0;
    setTimeout(type, 1500);
  } else {
    setTimeout(type, 100);
  }
})();

// Particles.js config
particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    size: { value: 3 },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#000000",
      opacity: 0.4,
      width: 1
    },
    move: { enable: true, speed: 2 }
  }
});

// Entire script wrapped once — no nesting!
document.addEventListener("DOMContentLoaded", () => {
  // Scrollspy
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Carousel logic (moved out of nested listener)
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.card');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  const visibleCards = 3;
  const cardWidth = cards[0].offsetWidth + 20;
  let index = 0;

  // Clone first and last few cards for infinite loop effect
  for (let i = 0; i < visibleCards; i++) {
    const firstClone = cards[i].cloneNode(true);
    const lastClone = cards[cards.length - 1 - i].cloneNode(true);
    track.appendChild(firstClone);
    track.insertBefore(lastClone, track.firstChild);
  }

  // Update full card list after cloning
  const allCards = document.querySelectorAll('.card');
  const totalCards = allCards.length;

  // Initial position (skip the cloned cards at the start)
  index = visibleCards;
  track.style.transform = `translateX(-${index * cardWidth}px)`;

  function moveToIndex() {
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  nextBtn.addEventListener('click', () => {
    index++;
    moveToIndex();

    track.addEventListener('transitionend', () => {
      if (index >= totalCards - visibleCards) {
        index = visibleCards;
        track.style.transition = "none";
        track.style.transform = `translateX(-${index * cardWidth}px)`;
      }
    }, { once: true });
  });

  prevBtn.addEventListener('click', () => {
    index--;
    moveToIndex();

    track.addEventListener('transitionend', () => {
      if (index < visibleCards) {
        index = totalCards - visibleCards * 2;
        track.style.transition = "none";
        track.style.transform = `translateX(-${index * cardWidth}px)`;
      }
    }, { once: true });
  });
});
