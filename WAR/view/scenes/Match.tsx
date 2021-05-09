import SceneComponent from 'babylonjs-hook'
import { Scene, HemisphericLight,  ArcRotateCamera, Vector3 } from '@babylonjs/core'
import { useEffect } from "react";
import { AdvancedDynamicTexture} from "babylonjs-gui"

import Gamestate from '../../model/Game'

let CurrentGameState: Gamestate
let GameUI: AdvancedDynamicTexture
let Canvas

const onSceneReady = (scene: Scene) => {
    console.log('I am setting up the scene for the game')
    
    CurrentGameState = new Gamestate()
    Canvas = scene.getEngine().getRenderingCanvas()
    GameUI = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene)

    //Camera and light
    new ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 4, 60,  Vector3.Zero(), scene).attachControl(Canvas, true)
    new HemisphericLight("Light", new Vector3(5, 10, 0), scene)

    //Begin game loop
    CurrentGameState.GameLoop()
}

const onRender = (scene: Scene) => {


}

const MatchScene: React.FC = () => {
    useEffect(() =>{
        return () => {
            CurrentGameState.Dispose()
        }
    }, [])

    return (
        <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
    )
}

export default MatchScene;