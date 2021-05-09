import Player from './Player'
import Deck from './Deck'
import BattleSystem from './Battle'

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
    MaxRounds: number = 3000
    private _CurrentRound: number = 0
    
    constructor(){
        this._Deck = new Deck()
        this._Player1 = new Player()
        this._Player2 = new Player()
    }

    private DealPlayers(){
        this._Deck.DealCards(this._Player1, this._Player2)
        this.NextGameState()
    }
    private NextRound(){
        clearInterval(this._PlayTimer)
        if(this._CurrentRound >= this.MaxRounds){
            this.NextGameState()
            return
        }
        else if(!this._Player1.HasCardsLeft() || !this._Player2.HasCardsLeft()){
            this.NextGameState()
            return
        }
        else{
            this._CurrentRound += 1
        }

        //Draw Cards and battle
        BattleSystem( this._Player1 , this._Player2)

        console.log('The score for round ' + this._CurrentRound + ' is:\nPlayer 1: ' + this._Player1.GetPlayerScore() + '\nPlayer 2: ' + this._Player2.GetPlayerScore() + '\n')
        this._PlayTimer = setInterval(this.NextRound.bind(this), 100)
    }
    private MatchResults(){
        console.log('I am announcing the match results')
        //this.NextGameState()
    }

    private ResetPlayState(){
        this._CurrentRound = 0
        this._Deck = new Deck()
    }
    private ResetMatchState(){
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
    GameLoop(){
        switch (this._GameState){
            case EGameState.Setup:
                this.NextGameState()
                break
            case EGameState.Deal:
                this.DealPlayers()
                break
            case EGameState.Play:
                this._PlayTimer = setInterval(this.NextRound.bind(this), 100)
                break
            case EGameState.End:
                this.MatchResults()
                break
            default:
                this._GameState = EGameState.Setup
        }
    }

    Dispose(){
        clearInterval(this._PlayTimer)
        this.ResetPlayState()
        this.ResetMatchState()
    }
}


export default Game