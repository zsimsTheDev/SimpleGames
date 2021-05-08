import Card from './Card'

class Hand{
    private _Cards: Card[] = []

    constructor(){
    }

    DrawCard(): Card{
        if(this._Cards.length <= 0)
            return new Card("Invalid", "Invalid", 0)
        else{
            let CardDrawn = this._Cards[this._Cards.length-1]
            this._Cards.pop()
            return CardDrawn
        }
    }

    AddCardToHand(Card: Card){
        this._Cards.unshift(Card)
    }

    CardCount(): number{
        return this._Cards.length
    }
}

export default Hand