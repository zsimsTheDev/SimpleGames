import Card from './Card'

class Hand{
    private _Cards: Card[] = [];

    constructor(){
    }

    AddCardToHand(Card: Card){
        this._Cards.push(Card)
    }
}

export default Hand