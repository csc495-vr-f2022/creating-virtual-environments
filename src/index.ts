/* CSC-495 Virtual Reality Creating Virtual Environments, Fall 2022
 * Author: Regis Kopper
 *
 * Based on
 * CSC 5619 Lecture 4, Fall 2020
 * Author: Evan Suma Rosenberg
 * 
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import { Color3, float, HemisphericLight, MeshAssetTask, SceneLoader, SpotLight, StandardMaterial, Texture, UniversalCamera, Vector3 } from "@babylonjs/core";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import "@babylonjs/loaders/glTF";


// Required to populate the Create methods on the mesh class. 
// Without this, the bundle would be smaller,
// but the createXXX methods from mesh would not be accessible.
import {MeshBuilder} from  "@babylonjs/core/Meshes/meshBuilder";
import "@babylonjs/core/Materials/standardMaterial"

// Import debug layer
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

/******* Add the Game class with a static CreateScene function ******/
class Game 
{ 
    public static CreateScene(engine: Engine, canvas: HTMLCanvasElement): Scene 
    {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new Scene(engine);

        // This creates and positions a first-person camera (non-mesh)
        var camera = new UniversalCamera("camera1", new Vector3(0, 5, -10), scene);

        // This targets the camera to scene origin
        camera.setTarget(Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 1.0;

        SceneLoader.ImportMesh("","assets/models/","mustang.babylon", scene);

        SceneLoader.ImportMesh("", "assets/models/", "dragonite.obj", scene, (meshes) => {
            meshes[0].name = "Dragonite";
            meshes[0].position = new Vector3(-75, -22, -50);

            meshes.forEach((mesh) => {
                console.log("Loaded mesh: " + mesh.name)
            })
        });

        // // Our built-in 'sphere' shape.
        // var sphere = MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);

        // // Move the sphere upward 1/2 its height
        // sphere.position.y = 1;

        // // Our built-in 'ground' shape.
        var ground = MeshBuilder.CreateGround("ground", {width: 100, height: 100}, scene);

        // // Import a grid texture and set it to be tiled
        // var gridTexture = new Texture("textures/grid.png", scene);
        // gridTexture.uScale = 100;
        // gridTexture.vScale = 100;

        // // Create a ground material and assign it to the ground object
        // var groundMaterial = new StandardMaterial("groundMaterial", scene);
        // groundMaterial.diffuseTexture = gridTexture;
        // ground.material = groundMaterial;

        // Show the debug scene explorer and object inspector
        // You should comment this out when you build your final program 
        scene.debugLayer.show();

        return scene;
    }
}
/******* End of the Game class ******/   
 

// Get the canvas element 
const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

// Generate the BABYLON 3D engine
const engine = new Engine(canvas, true); 

// Call the createScene function
const scene = Game.CreateScene(engine, canvas);

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () 
{ 
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () 
{ 
    engine.resize();
});
