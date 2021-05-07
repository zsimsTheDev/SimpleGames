import Player from './Player'
import Deck from './Deck'

import { Scene, HemisphericLight,  ArcRotateCamera, Vector3, int } from '@babylonjs/core'

enum EGameState{
    Setup = "Setup",
    Deal = "Deal",
    Play = "Play",
    End = "End"
}

class Game{
    private _Player1: Player
    private _Player2: Player

    private _Deck: Deck
    private _GameScene!: Scene

    private _GameState: EGameState = EGameState.Setup

    private _HasPlayBegun: boolean = false
    private _PlayTimer!: NodeJS.Timeout

    private _HasDealBegun: boolean = false
    private _HasEndBegun: boolean = false

    MaxRounds: int = 5
    private _CurrentRound: int = 0
    
    constructor(){
        console.log('I am constructing a game')
        this._Deck = new Deck()
        this._Player1 = new Player()
        this._Player2 = new Player()
    }

    Setup(scene: Scene){
        console.log('I am setting up the scene for the game')
        this._GameScene = scene;
        const canvas = scene.getEngine().getRenderingCanvas()

        var camera = new ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 4, 60,  Vector3.Zero(), this._GameScene)
        camera.attachControl(canvas, true)

        new HemisphericLight("Light", new Vector3(5, 10, 0), this._GameScene)
    }

    private NextGameState(){
        console.log('I am changing the game state')
        switch (this._GameState){
            case EGameState.Setup:
                this._GameState = EGameState.Deal
                break
            case EGameState.Deal:
                this._HasDealBegun = false
                this._GameState = EGameState.Play
                break
            case EGameState.Play:
                this.ResetPlayState()
                this._GameState = EGameState.End
                break
            case EGameState.End:
                this.ResetMatchState()
                this._GameState = EGameState.Setup
                break
            default:
                this._GameState = EGameState.Setup
        }

    }

    private DealPlayers(){
        console.log('I am dealing the players in')
        this.NextGameState()
    }

    private NextRound(){
        console.log('I am running a new round. This is round' + (this._CurrentRound+1))
        if(this._CurrentRound >= this.MaxRounds){
            this.NextGameState()
        }
        else{
            this._CurrentRound += 1
        }
    }

    private MatchResults(){
        console.log('I am announcing the match results')
        //this.NextGameState()
    }

    private ResetPlayState(){
        console.log('I am resetting the play state')
        this._CurrentRound = 0;
        clearInterval(this._PlayTimer)
        this._HasPlayBegun = false
    }

    private ResetMatchState(){
        console.log('I am ressting the match state')
        this._HasEndBegun = false
    }

    GameLoop(){
        switch (this._GameState){
            case EGameState.Setup:
                this.NextGameState()
                break
            case EGameState.Deal:
                if(!this._HasDealBegun){
                    this.DealPlayers()
                    this._HasDealBegun = true
                }
                break
            case EGameState.Play:
                if(!this._HasPlayBegun){
                    this._PlayTimer = setInterval(this.NextRound.bind(this), 1000)
                    this._HasPlayBegun = true
                }
                break
            case EGameState.End:
                if(!this._HasEndBegun){
                    this.MatchResults()
                    this._HasEndBegun = true
                }
                break
            default:
                this._GameState = EGameState.Setup
                this._GameScene.dispose()
        }
    }
}


export default Game