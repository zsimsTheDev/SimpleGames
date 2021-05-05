import React from "react";
import { ArcRotateCamera, Color4, Vector3, HemisphericLight, MeshBuilder} from "@babylonjs/core";
import SceneComponent from 'babylonjs-hook';

const onSceneReady = (scene) => {
    const canvas = scene.getEngine().getRenderingCanvas()

    var camera = new ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 4, 60,  Vector3.Zero(), scene)
    camera.attachControl(canvas, true)
    new HemisphericLight("hemiLight", new Vector3(5, 10, 0), scene)

    var faceColors = []
    var box_base = MeshBuilder.CreateBox("box", {width: 10, height: 10, depth: 10}, scene)  
    
    scene.onPointerDown = function (ev, pickResult) {                
    if (pickResult.hit) {
            box_base.dispose()
            var face = Math.floor(pickResult.faceId / 2)
            faceColors[face] = new Color4((face + 1) / 6, (6 - face) / 6, 0, 1)
            box_base = MeshBuilder.CreateBox("box", {width: 10, height: 10, depth: 10, faceColors:faceColors}, scene)
            box_base.position.y = 5
        }
    }
};

const onRender = (scene) => {

};

export default () => (
  <div>
    <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
  </div>
);