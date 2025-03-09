// Select the canvas
const canvas = document.getElementById("three-canvas");

// Initialize Scene, Camera & Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Ground Plane
const gridHelper = new THREE.GridHelper(5000, 2000, 0x00ffcc, 0x004488);
gridHelper.material.transparent = true;
gridHelper.material.opacity = 0.5;
gridHelper.position.y = -10;
scene.add(gridHelper);

// Camera Position
camera.position.set(0, 0, 30);
camera.lookAt(0, 0, 0);

// File Input for Model Uploading
const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.style.display = "none";
fileInput.accept = ".glb,.gltf";
document.body.appendChild(fileInput);

let selectedObject = null;

// Function to load models
fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function () {
            const loader = new THREE.GLTFLoader();
            loader.parse(reader.result, "", function (gltf) {
                const model = gltf.scene;
                model.position.set(0, 0, 0);
                scene.add(model);
                selectedObject = model;
            });
        };
    }
});

// Sidebar UI for Transformations
const sidebar = document.createElement("div");
sidebar.style.position = "absolute";
sidebar.style.left = "10px";
sidebar.style.top = "10px";
sidebar.style.width = "220px";
sidebar.style.background = "rgba(20, 20, 20, 0.9)";
sidebar.style.color = "white";
sidebar.style.padding = "15px";
sidebar.style.borderRadius = "10px";
sidebar.style.display = "flex";
sidebar.style.flexDirection = "column";
sidebar.style.gap = "10px";
sidebar.style.fontFamily = "Arial, sans-serif";
sidebar.style.boxShadow = "0 0 10px rgba(0,255,255,0.5)";

const createButton = (id, text, bgColor) => {
    let btn = document.createElement("button");
    btn.id = id;
    btn.innerText = text;
    btn.style.padding = "10px";
    btn.style.border = "none";
    btn.style.borderRadius = "5px";
    btn.style.cursor = "pointer";
    btn.style.fontWeight = "bold";
    btn.style.transition = "0.3s";
    btn.style.background = bgColor;
    btn.style.color = "#fff";
    btn.onmouseover = () => btn.style.transform = "scale(1.1)";
    btn.onmouseout = () => btn.style.transform = "scale(1)";
    return btn;
};

sidebar.appendChild(createButton("addModel", "➕ Add Model", "#007bff"));
sidebar.appendChild(document.createElement("hr"));

const moveInputs = `
    <label>Move:</label>
    X <input type='number' id='moveX' value='0'>
    Y <input type='number' id='moveZ' value='0'>
    Z <input type='number' id='moveY' value='0'>
`;
sidebar.innerHTML += moveInputs;
sidebar.appendChild(createButton("applyMove", "📌 Apply Move", "#28a745"));

const rotateInputs = `
    <label>Rotate:</label>
    X <input type='number' id='rotateX' value='0'>
    Y <input type='number' id='rotateY' value='0'>
    Z <input type='number' id='rotateZ' value='0'>
`;
sidebar.innerHTML += rotateInputs;
sidebar.appendChild(createButton("applyRotate", "🔄 Apply Rotate", "#ffc107"));

const scaleInput = `
    <label>Resize:</label>
    <input type='number' id='scale' value='50'>
`;
sidebar.innerHTML += scaleInput;
sidebar.appendChild(createButton("applyScale", "📏 Apply Scale", "#dc3545"));

sidebar.appendChild(document.createElement("hr"));
sidebar.appendChild(createButton("saveScene", "💾 Save Scene", "#17a2b8"));
sidebar.appendChild(createButton("loadScene", "📂 Load Scene", "#6f42c1"));

document.body.appendChild(sidebar);


// Event Listeners for UI
sidebar.querySelector("#addModel").addEventListener("click", () => fileInput.click());
sidebar.querySelector("#applyMove").addEventListener("click", () => {
    if (selectedObject) {
        selectedObject.position.set(
            parseFloat(sidebar.querySelector("#moveX").value),
            parseFloat(sidebar.querySelector("#moveY").value),
            parseFloat(sidebar.querySelector("#moveZ").value)
        );
    }
});
sidebar.querySelector("#applyRotate").addEventListener("click", () => {
    if (selectedObject) {
        selectedObject.rotation.set(
            THREE.MathUtils.degToRad(parseFloat(sidebar.querySelector("#rotateX").value)),
            THREE.MathUtils.degToRad(parseFloat(sidebar.querySelector("#rotateY").value)),
            THREE.MathUtils.degToRad(parseFloat(sidebar.querySelector("#rotateZ").value))
        );
    }
});
sidebar.querySelector("#applyScale").addEventListener("click", () => {
    if (selectedObject) {
        const scale = parseFloat(sidebar.querySelector("#scale").value);
        selectedObject.scale.set(scale, scale, scale);
    }
});

// Fix unwanted white space
document.body.style.margin = "0";
document.body.style.overflow = "hidden";
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";

function saveScene() {
    const objectsToSave = scene.children.filter(obj => !obj.isLight && obj !== camera && obj !== gridHelper);
    const saveData = JSON.stringify(objectsToSave.map(obj => obj.toJSON()));
    const blob = new Blob([saveData], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "scene.json";
    a.click();
}

function loadSceneFromFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            const loader = new THREE.ObjectLoader();
            const objects = JSON.parse(reader.result);

            // Clear only models, keep lights, camera, grid
            scene.children = scene.children.filter(obj => obj.isLight || obj === camera || obj === gridHelper);

            objects.forEach(objData => {
                const loadedObj = loader.parse(objData);
                scene.add(loadedObj);
            });

            alert("Scene loaded successfully!");
        };
    }
}

const fileInputLoad = document.createElement("input");
fileInputLoad.type = "file";
fileInputLoad.accept = ".json";
fileInputLoad.style.display = "none";
document.body.appendChild(fileInputLoad);
fileInputLoad.addEventListener("change", loadSceneFromFile);

sidebar.querySelector("#saveScene").addEventListener("click", saveScene);
sidebar.querySelector("#loadScene").addEventListener("click", () => fileInputLoad.click());

// Render Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
