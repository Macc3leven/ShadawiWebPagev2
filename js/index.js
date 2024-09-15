// WINDOW
function setViewportHeight() {
  // Get the viewport height and multiply it by 1% to get a value for 1vh unit
  let vh = window.innerHeight;// * 0.01;
  let vw = window.innerWidth;
  console.log(vh,vw)
  
  // Set the value in the custom property --vh
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  document.documentElement.style.setProperty('--fvh', `${vh}px`);
  document.documentElement.style.setProperty('--fvw', `${vw}px`);
}

// Set the height on page load
// setViewportHeight();
setTimeout(setViewportHeight, 3000);


// Update the height on window resize and orientation change
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);

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
  section.style.opacity = 1-progress;
}

function broadcastSectionChange(previousIndex, newIndex) {
  const event = new CustomEvent("sectionChange", {
    detail: { newIndex, previousIndex },
  });

  console.log(`CHANGE bROADcASTED ${previousIndex}->${newIndex}`);
  window.dispatchEvent(event);
}

function between(n, low=0, high=1){
  return (n > low && n < high);
}

function handleSectionScroll() {
  let scrollY = window.scrollY;
  let scrollProgress = scrollY / viewportHeight;
  // let jump = currentSectionIndex + .90;
  // if(between(scrollProgress, jump, currentSectionIndex + 1)){
  //   scrollProgress += .10;
  // }

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
    let progress = Math.abs(currentSectionIndex - scrollProgress);
    const isLastSection = currentSectionIndex == sections.length - 1;
    if (i === currentSectionIndex && !isLastSection) {
      // Section is currently in view
      animateSection(section, progress); // handle animation based on progress
    } else section.style.transform = `translateY(0) scale(1)`;
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




// THREEJS GEM SCENE
import * as CloudOgreScene from "./scenes/cloudOgreScene1.js";
import * as GemScene from "./scenes/gemScene.js";
import * as StarScene from "./scenes/gemScene.js";

GemScene.initGems("current_canvas");

document.addEventListener("keydown", (event) => {
  if (event.key === "f" || event.key === "F") {
    console.log('The "F" key was pressed.');
    
    GemScene.clearScene()




  }
});