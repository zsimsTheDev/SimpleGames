import Card from './Card'
import Player from './Player'
import DeckData from './DeckData.json'
import { SignalDispatcher } from "strongly-typed-events"


class Deck{
    private _Cards: Card[] = []
    private _OnDeckDealt = new SignalDispatcher()

    constructor(){
        let Deck = DeckData.BaseDeck
        Deck.suits.forEach(
            (suit) => {
                Deck.ranks.forEach(
                    (rank) => {
                        this._Cards.push(new Card(rank.name, suit, rank.value))
                    }, this
                )
            }, this
        )
    }

    public get OnDeckDealt(){
        return this._OnDeckDealt.asEvent()
    }

    Shuffle() {
        var currentIndex = this._Cards.length, temporaryValue, randomIndex

        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex)
          currentIndex -= 1

          temporaryValue = this._Cards[currentIndex]
          this._Cards[currentIndex] = this._Cards[randomIndex]
          this._Cards[randomIndex] = temporaryValue
        }

        return this._Cards
    }

    DealCards(PlayerOne: Player, PlayerTwo: Player){
        this.Shuffle()

        this._Cards.forEach(
            ( card, index ) => {
                switch (index % 2){
                    case 0:
                        PlayerOne.GiveCard(card)
                        break
                    case 1:
                        PlayerTwo.GiveCard(card)
                        break
                    default:
                        break
                }
            }
        )
        this._OnDeckDealt.dispatch()
    }
}

export default Deck