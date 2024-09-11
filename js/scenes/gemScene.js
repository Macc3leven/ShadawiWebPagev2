import { THREE, GLTFLoader } from "./threeWrapper.js";
const loader = new GLTFLoader();

// ==================== GEMS ==================== //
var gemScene, gemCamera, gemRenderer;
var currentGem = {color: "#de6969"};
var paused = false;

// Set up the gemScene
async function initGems(elementId) {
  const aspr = window.innerWidth / window.innerHeight;
  gemScene = new THREE.Scene();
  gemCamera = new THREE.PerspectiveCamera(75, aspr, 0.1, 1000);
  gemCamera.position.z = 5;
  gemRenderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById(elementId),
    alpha: true,
  });
  gemRenderer.setClearColor("#98fb98", 0); // background color
  gemRenderer.setSize(window.innerWidth, window.innerHeight);

  // Create a gemPrefab and add to the gemScene
  updateGem();
  animate()
}

function animate() {
  requestAnimationFrame(animate);
  if (paused) return;

  // Rotate the gemPrefab
  if (currentGem.scene) {
    currentGem.scene.rotation.x += 0.01;
    currentGem.scene.rotation.y += 0.01;
  }

  gemRenderer.render(gemScene, gemCamera);
}

// Handle window resize
window.addEventListener("resize", function () {
  var width = window.innerWidth;
  var height = window.innerHeight;
  gemRenderer.setSize(width, height);
  gemCamera.aspect = width / height;
  gemCamera.updateProjectionMatrix();
});

async function updateGem(url) {
  // delete gemData if any
  if (currentGem.scene) {
    console.log({ gemScene, l: currentGem.scene });
    gemScene.remove(currentGem.scene);
  }

  // add gem prefab
  if (url) {
    const model = await loader.loadAsync(url);
    currentGem.url = url;
    currentGem.scene = model.scene;
  } else {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: currentGem.color });
    currentGem.scene = new THREE.Mesh(geometry, material);
  }

  gemScene.add(currentGem.scene);
}

function clearScene() {
 // Stop the animation loop
  paused = true;

  // Traverse all children of the scene and dispose of geometries and materials
  gemScene.traverse((object) => {
    if (object.geometry) object.geometry.dispose();
    if (object.material) {
      if (Array.isArray(object.material)) {
        object.material.forEach((mat) => mat.dispose());
      } else {
        object.material.dispose();
      }
    }
  });

  // Clear the scene
  gemScene.clear();

  // Optionally reset the renderer to free up resources
  gemRenderer.renderLists.dispose(); // Clears internal render lists for optimization

}

export { initGems, updateGem, clearScene };
