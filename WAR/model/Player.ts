import Hand from './Hand'
import Card from './Card'

class Player{
    private _PlayerHand!: Hand
    private _PlayerScore: number = 0
    
    constructor(){
        this._PlayerHand = new Hand()
    }

    GiveCard(Card: Card){
        this._PlayerHand.AddCardToHand(Card)
        this._PlayerScore++
    }

    DrawCard(): Card { 
        this._PlayerScore--
        return this._PlayerHand.DrawCard()
    }

    HasCardsLeft(): boolean {
        return (this._PlayerHand.CardCount() > 0)
    }

    CountCardsLeft(): number {
        return this._PlayerHand.CardCount()
    }

    GetPlayerScore(): number {
        return this._PlayerScore
    }
}

export default Player