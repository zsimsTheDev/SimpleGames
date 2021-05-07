import Hand from './Hand'

class Player{
    PlayerHand: Hand
    
    constructor(){
        console.log('I am constructing a Player')
        this.PlayerHand = new Hand()
    }

}

export default Player