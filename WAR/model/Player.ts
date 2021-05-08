import Hand from './Hand'
import Card from './Card'

class Player{
    private _PlayerHand!: Hand
    
    constructor(){
        this._PlayerHand = new Hand()
    }

    GiveCard(Card: Card){
        this._PlayerHand.AddCardToHand(Card)
    }

}

export default Player