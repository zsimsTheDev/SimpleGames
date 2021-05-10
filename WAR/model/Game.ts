import Player from './Player'
import Deck from './Deck'
import BattleSystem from './Battle'
import { SimpleEventDispatcher, SignalDispatcher, ISignal } from 'strongly-typed-events'

enum EGameState{
    Setup = "Setup",
    Deal = "Deal",
    Play = "Play",
    End = "End"
}

class Game{
    private _PlayerOne: Player
    private _PlayerTwo: Player
    private _Deck: Deck

    private _GameState: EGameState = EGameState.Setup
    private _OnGameStateChange: SimpleEventDispatcher<EGameState> = new SimpleEventDispatcher<EGameState>()
    
    private _PlayTimer!: NodeJS.Timeout
    MaxRounds: number = 3000
    private _CurrentRound: number = 0
    
    constructor(OnViewReady: ISignal){
        this._Deck = new Deck()
        this._PlayerOne = new Player()
        this._PlayerTwo = new Player()

        OnViewReady.subscribe(() => {
            console.log('The View is ready, onto the next state')
            this.GameLoop()
        })
    }

    public get OnGameStateChange(){
        return this._OnGameStateChange.asEvent()
    }

    private DealPlayers(){
        this._Deck.OnDeckDealt.subscribe(() =>{
            this.NextGameState()
        })
        this._Deck.DealCards(this._PlayerOne, this._PlayerTwo)
    }
    private NextRound(){
        clearInterval(this._PlayTimer)
        if(this._CurrentRound >= this.MaxRounds){
            this.NextGameState()
            return
        }
        else if(!this._PlayerOne.HasCardsLeft() || !this._PlayerTwo.HasCardsLeft()){
            this.NextGameState()
            return
        }
        else{
            this._CurrentRound += 1
        }

        //Draw Cards and battle
        BattleSystem( this._PlayerOne , this._PlayerTwo)

        console.log('The score for round ' + this._CurrentRound + ' is:\nPlayer 1: ' + this._PlayerOne.GetPlayerScore() + '\nPlayer 2: ' + this._PlayerTwo.GetPlayerScore() + '\n')
        this._PlayTimer = setInterval(this.NextRound.bind(this), 100)
    }
    private MatchResults(){
        if(!this._PlayerOne.HasCardsLeft()){
            //Player 2 wins
        }
        else if(!this._PlayerTwo.HasCardsLeft()){
            //Player 1 wins
        }
        else{
            //Compare score and determine winner
            let PlayerOneScore: number = this._PlayerOne.GetPlayerScore()
            let PlayerTwoScore: number = this._PlayerTwo.GetPlayerScore()
            if(PlayerOneScore < PlayerTwoScore){
                console.log('Player 2 wins with a score of ' + PlayerTwoScore)
            }
            else if(PlayerOneScore > PlayerTwoScore){
                console.log('Player 1 wins with a score of ' + PlayerOneScore)
            }
            else{
                console.log('The match ends in a tie with a score of ' + PlayerOneScore)
            }
            console.log('')
        }
        this.NextGameState()
    }
    private ResetPlayState(){
        this._CurrentRound = 0
        clearInterval(this._PlayTimer)
        this._Deck = new Deck()
    }
    private ResetMatchState(){
        this.ResetPlayState()
        this._PlayerOne = new Player()
        this._PlayerTwo = new Player()
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
        this._OnGameStateChange.dispatch(this._GameState)
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
        this.ResetMatchState()
    }
}


export default Game