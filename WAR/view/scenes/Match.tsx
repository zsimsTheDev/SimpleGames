import SceneComponent from 'babylonjs-hook'
import { Scene, HemisphericLight,  ArcRotateCamera, Vector3 } from '@babylonjs/core'
import { AdvancedDynamicTexture, Button as GUIButton} from "babylonjs-gui"

import Gamestate from '../../model/Game'

let CurrentGameState: Gamestate
let GameUI: AdvancedDynamicTexture

const onSceneReady = (scene: Scene) => {
    console.log('I am setting up the scene for the game')
    
    CurrentGameState = new Gamestate()
    var Canvas = scene.getEngine().getRenderingCanvas()
    GameUI = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene)

    // //Camera and light
    var Camera = new ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 4, 60,  Vector3.Zero(), scene)
    Camera.attachControl(Canvas, true)
    new HemisphericLight("Light", new Vector3(5, 10, 0), scene)

    // //UI setup
    var button1 = GUIButton.CreateSimpleButton("but1", "Click Me")
    button1.width = "150px"
    button1.height = "40px";
    button1.color = "white";
    button1.cornerRadius = 20;
    button1.background = "green";
    GameUI.addControl(button1);
    
    //Begin game loop
    CurrentGameState.GameLoop()
}

const onRender = (scene: Scene) => {


}

const MatchScene = () =>( <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" /> )

export default MatchScene;