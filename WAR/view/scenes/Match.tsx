import SceneComponent from 'babylonjs-hook';
import { Scene, HemisphericLight,  ArcRotateCamera, Vector3 } from '@babylonjs/core';

import Gamestate from '../../model/Game'

let CurrentGameState: Gamestate;

const onSceneReady = (scene: Scene) => {
    const canvas = scene.getEngine().getRenderingCanvas()

    var camera = new ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 4, 60,  Vector3.Zero(), scene)
    camera.attachControl(canvas, true)
    new HemisphericLight("hemiLight", new Vector3(5, 10, 0), scene)

    CurrentGameState = new Gamestate()

    CurrentGameState.Setup()
    scene.getEngine().runRenderLoop(CurrentGameState.GameLoop)
};

const MatchScene = () =>(
    <div>
      <SceneComponent antialias onSceneReady={onSceneReady} id="my-canvas" />
    </div>
);

export default MatchScene;