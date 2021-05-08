class Card{
    private _Name!: string;
    private _Suit!: string;
    private _Value!: number;

    PrintString!: string;

    constructor(CardName: string, CardSuit: string, CardValue: number){
        this._Name = CardName
        this._Suit = CardSuit
        this._Value = CardValue

        this.PrintString = this._Name + " of " + this._Suit + "."
    }

    CompareToCard(OtherCard: Card){
        return this._Value - OtherCard._Value
    }
}

export default Card