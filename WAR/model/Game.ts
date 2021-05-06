import Player from './Player'
import Deck from './Deck'

class Game{
    Player1: Player
    Player2: Player

    Deck: Deck

    
    constructor(){
        this.Player1 = new Player();
        this.Player2 = new Player();
        this.Deck = new Deck();
    }

    Setup(){
        console.log('Setting up the game')
    }

    GameLoop(){
        console.log('This is the game loop')
    }
}


export default Game