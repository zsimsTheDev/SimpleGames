import SceneComponent from 'babylonjs-hook'
import { Scene, HemisphericLight,  ArcRotateCamera, Vector3 } from '@babylonjs/core'
import { useEffect } from "react"
import { AdvancedDynamicTexture} from "babylonjs-gui"
import { SignalDispatcher } from "strongly-typed-events"

import Gamestate from '../../model/Game'

let CurrentGameState: Gamestate
let GameUI: AdvancedDynamicTexture
let Canvas
let OnViewReady: SignalDispatcher = new SignalDispatcher()

const onSceneReady = (scene: Scene) => {
    console.log('I am setting up the scene for the game')
    
    Canvas = scene.getEngine().getRenderingCanvas()
    GameUI = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene)

    //Camera and light
    new ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 4, 60,  Vector3.Zero(), scene).attachControl(Canvas, true)
    new HemisphericLight("Light", new Vector3(5, 10, 0), scene)

    //Begin game loop
    CurrentGameState = new Gamestate(OnViewReady.asEvent())
    CurrentGameState.OnGameStateChange.subscribe((gameState) =>{
        console.log('The game state has changed into: ' + gameState + '\nUpdating the view now')
        OnViewReady.dispatch()
    })
    OnViewReady.dispatch()
}

const onRender = (scene: Scene) => {

}

const MatchScene: React.FC = (props) => {
    useEffect(() =>{
        return () => {
            CurrentGameState.Dispose()
        }
    }, [])

    return (
        <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
    )
}

export default MatchScene