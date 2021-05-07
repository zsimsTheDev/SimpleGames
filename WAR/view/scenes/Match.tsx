import SceneComponent from 'babylonjs-hook'
import { Scene } from '@babylonjs/core'

import Gamestate from '../../model/Game'

let CurrentGameState: Gamestate;

const onSceneReady = (scene: Scene) => {
    CurrentGameState = new Gamestate()

    CurrentGameState.Setup(scene)
    scene.getEngine().runRenderLoop(CurrentGameState.GameLoop.bind(CurrentGameState))
}

const MatchScene = () =>( <SceneComponent antialias onSceneReady={onSceneReady} id="my-canvas" /> )

export default MatchScene;