# 3D OBJECT TRANSFORMATION ENGINE FOR SPATIAL COMPUTING

## Overview

The **3D Object Transformation Tool** is an interactive web-based application that enables users to import, place, move, rotate, and scale 3D objects within a scene. The tool features an intuitive sidebar UI for precise transformations and allows saving and loading scenes. It is built with a focus on robust user interaction, leveraging advanced controls for smooth camera movement and direct object manipulation.

## Features

- **Model Upload:** Import and place 3D models in `.glb` or `.gltf` formats.
- **Object Transformation:** Move, rotate, and scale objects via an easy-to-use sidebar interface.
- **User Interaction Enhancements:**
  - **OrbitControls:** Provides smooth camera navigation, allowing users to explore the scene intuitively.
  - **TransformControls:** Enables direct manipulation of selected objects (translation, rotation, and scaling) using a gizmo. When a model is loaded, TransformControls are automatically attached so that users can manipulate it with mouse interactions while still retaining access to the sidebar controls.
- **Scene Management:** Save and load scenes in JSON format for persistence.
- **Grid-Based Layout:** A grid helper provides spatial context and accurate positioning.

## Technologies Used

- [Three.js](https://threejs.org/) for 3D rendering.
- [GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader) for model loading.
- **OrbitControls** and **TransformControls** for enhanced user interactions.
- HTML, CSS, and JavaScript for UI and functionality.

## Getting Started

### Installation

1. Clone this repository:
   ```sh
   git clone https://github.com/yourusername/threejs-object-placement-tool.git
   cd threejs-object-placement-tool

### Installation
1. Clone this repository:
   ```sh
   git clone https://github.com/yourusername/threejs-object-placement-tool.git
   cd threejs-object-placement-tool
   ```
Open index.html in your browser (using a local server is recommended).

### Usage
    - Click "➕ Add Model" to upload a .glb or .gltf file.
    - Adjust position, rotation, and scale using the sidebar    controls.
    - Use OrbitControls (mouse drag and scroll) to navigate the scene.
    - Directly manipulate objects with TransformControls via the attached gizmo.
    - Save the current scene with "💾 Save Scene" and load it with "📂 Load Scene".

## File Structure
```
threejs-object-placement-tool/
│── index.html     # Main HTML file
│── script.js      # Core functionality
│── style.css      # UI styling
│── assets/        # (Optional) Store sample models here
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits
CC Attribution: *"Mr. Jones armchair"* ([Sketchfab](https://skfb.ly/6Y8AK)) by Free_model is licensed under [Creative Commons Attribution](http://creativecommons.org/licenses/by/4.0/).

## Contributing
Pull requests and feature enhancements are welcome! Feel free to fork this repository and submit improvements.

## Contact
For questions or collaboration, contact: `aloopat51@gmail.com.com`
