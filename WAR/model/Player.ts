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

    DrawCard(): Card { 
        return this._PlayerHand.DrawCard()
    }

    HasCardsLeft(): boolean {
        return (this._PlayerHand.CardCount() > 0)
    }

}

export default Player