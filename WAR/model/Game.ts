import Player from './Player'
import Deck from './Deck'
import BattleSystem from './Battle'
import Card from './Card'

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

    private _GameState: EGameState = EGameState.Setup

    private _PlayTimer!: NodeJS.Timeout
    MaxRounds: number = 300
    private _CurrentRound: number = 0
    
    constructor(){
        this._Deck = new Deck()
        this._Player1 = new Player()
        this._Player2 = new Player()
    }

    private NextGameState(){
        switch (this._GameState){
            case EGameState.Setup:
                this._GameState = EGameState.Deal
                break
            case EGameState.Deal:
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
        this.GameLoop();
    }

    private DealPlayers(){
        this._Deck.DealCards(this._Player1, this._Player2)
        this.NextGameState()
    }

    private NextRound(){
        if(this._CurrentRound >= this.MaxRounds){
            this.NextGameState()
        }
        else if(!this._Player1.HasCardsLeft() || !this._Player2.HasCardsLeft()){
            this.NextGameState()
        }
        else{
            this._CurrentRound += 1
        }

        //Draw Cards and battle
        BattleSystem( this._Player1 , this._Player2)
    }

    private MatchResults(){
        console.log('I am announcing the match results')
        //this.NextGameState()
    }

    private ResetPlayState(){
        clearInterval(this._PlayTimer)
        console.log('I am resetting the play state')
        this._CurrentRound = 0;
    }

    private ResetMatchState(){
        console.log('I am ressting the match state')
    }

    GameLoop(){
        switch (this._GameState){
            case EGameState.Setup:
                this.NextGameState()
                break
            case EGameState.Deal:
                this.DealPlayers()
                break
            case EGameState.Play:
                this._PlayTimer = setInterval(this.NextRound.bind(this), 1000)
                break
            case EGameState.End:
                this.MatchResults()
                break
            default:
                this._GameState = EGameState.Setup
        }
    }
}


export default Game