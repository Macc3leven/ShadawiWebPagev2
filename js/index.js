// NAVBAR ANIMATIONS
const navbar = document.getElementById("navbar");
const overlay = document.getElementById("navOverlay");
const overlayCloseBtn = document.getElementById("overlayCloseBtn");
let navStatus = false;

// TOGGLE NAV BUTTONS
function toggleNav() {
  if (navStatus) {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    navStatus = false;
  } else {
    navbar.classList.add("active");
    overlay.classList.add("active");
    navStatus = true;
  }
}

navbar.addEventListener("click", toggleNav);
overlayCloseBtn.addEventListener("click", toggleNav);

// SECTION ANIMATIONS
const viewportHeight = window.innerHeight;
const sections = document.querySelectorAll(".section-container");
let currentSectionIndex = 0; // Keeps track of the currently active section

function animateSection(section, progress) {
  // progress is a value between 0 and 1
  // 0 means fully in view, 1 means fully out of view (either up or down)
  section.style.transform = `translateY(${-progress * 1000}px) scale(1)`;
  section.style.opacity = 1;
}

function broadcastSectionChange(previousIndex, newIndex) {
  const event = new CustomEvent("sectionChange", {
    detail: { newIndex, previousIndex },
  });

  console.log("CHANGE bROADcASTED");
  window.dispatchEvent(event);
}

function handleSectionScroll() {
  const scrollY = window.scrollY;
  const scrollProgress = scrollY / viewportHeight;
  const newIndex = Math.floor(scrollProgress);
  if (currentSectionIndex != newIndex) {
    broadcastSectionChange(currentSectionIndex, newIndex);
    currentSectionIndex = newIndex;
  }

  // remove boarders after 1 second

  // dismantle frames upon slide away

  // play audio

  sections.forEach((section, i) => {
    const rect = section.getBoundingClientRect();
    const relativePosition = rect.top / viewportHeight; // relative position in the viewport
    const progress = Math.abs(currentSectionIndex - scrollProgress);
    const isLastSection = currentSectionIndex == sections.length - 1;
    if (i === currentSectionIndex && !isLastSection) {
      // Section is currently in view
      animateSection(section, progress); // handle animation based on progress
    } // else section.style.transform = `translateY(0) scale(1)`;
  });
}

// LETTER ANIMATIONS
// const sletters = document.querySelectorAll(".s-letter");
// function handleLetterAnim() {
//   const scrollY = window.scrollY;

//   sletters.forEach((slet, i) => {
//     const rect = slet.getBoundingClientRect();
//     const relativePosition = rect.top / viewportHeight;

//     var rotation = relativePosition;
//     var translate = -relativePosition * 100;
//     // console.log({i, translate, rotation});
//     slet.style.transform = `translateX(${translate})px) rotate(${rotation}deg)`;
//   });
// }

window.addEventListener("scroll", () => {
  handleSectionScroll();
//   handleLetterAnim();
});

handleSectionScroll();

document.addEventListener("keydown", (event) => {
  if (event.key === "f" || event.key === "F") {
    console.log('The "F" key was pressed.');
    // test runtime code

    const frames = document.querySelectorAll(".frame-title");
    // window.alert("frames: "+frames.length);
    frames.forEach(f=>{
        f.classList.add("active");
    })
  }
});
