import Player from './Player'
import Card from './Card'

const CompareCards = (PlayerOne: Player, PlayerTwo: Player) => {
    let PlayerOneCard = PlayerOne.DrawCard()
    let PlayerTwoCard = PlayerTwo.DrawCard()
    let CompareResult: number = PlayerOneCard.CompareToCard(PlayerTwoCard)
    if( CompareResult > 0){
        console.log('Player one wins with a ' + PlayerOneCard.PrintString + ' vs a ' + PlayerTwoCard.PrintString)
        //Player One wins
        PlayerOne.GiveCard(PlayerOneCard)
        PlayerOne.GiveCard(PlayerTwoCard)
    }
    else if(CompareResult < 0){
        console.log('Player two wins with a ' + PlayerTwoCard.PrintString + ' vs a ' + PlayerOneCard.PrintString)
        //Player Two wins
        PlayerTwo.GiveCard(PlayerOneCard)
        PlayerTwo.GiveCard(PlayerTwoCard)
    }
    else{
        let PlayerOneWARCards: Card[] = []
        let PlayerTwoWARCards: Card[] = []
        while(CompareResult === 0){
            let PlayerOneCardsLeft: number = PlayerOne.CountCardsLeft()
            let PlayerTwoCardsLeft: number = PlayerTwo.CountCardsLeft()
            if(PlayerOneCardsLeft < 3){
                //Player one loses because they cant fight the battle
                while(PlayerOne.HasCardsLeft()){
                    PlayerOneWARCards.push(PlayerOne.DrawCard())
                }
                CompareResult = -1
            }
            else if(PlayerTwoCardsLeft < 3){
                //Player two loses because they cant fight the battle
                while(PlayerTwo.HasCardsLeft()){
                    PlayerTwoWARCards.push(PlayerTwo.DrawCard())
                }
                CompareResult = 1
            }
            else{
                //If both players have cards availabe then draw 3 cards and compare the third cards
                PlayerOneWARCards.push(PlayerOne.DrawCard())
                PlayerOneWARCards.push(PlayerOne.DrawCard())
                let PlayerOneWarCard: Card = PlayerOne.DrawCard()
                PlayerOneWARCards.push(PlayerOneWarCard)

                PlayerTwoWARCards.push(PlayerTwo.DrawCard())
                PlayerTwoWARCards.push(PlayerTwo.DrawCard())
                let PlayerTwoWarCard: Card = PlayerTwo.DrawCard()
                PlayerTwoWARCards.push(PlayerTwoWarCard)
                
                CompareResult = PlayerOneWarCard.CompareToCard(PlayerTwoWarCard)
                if(CompareResult === 0)
                    console.log("WAR IS NEVERENDING")
            }
        }
        if( CompareResult > 0){
            let CardsWon: string = " "
            PlayerTwoWARCards.forEach(
                (card) => {
                    CardsWon += card.PrintString + " "
                }
            )
            let WinningCard: string = PlayerOneWARCards[PlayerOneWARCards.length-1]?.PrintString || " "
            let LosingCard: string = PlayerTwoWARCards[PlayerTwoWARCards.length-1]?.PrintString || " "
            let CardsWonCount: number = PlayerTwoWARCards.length || 0
            console.log('Player two wins the war with a ' + WinningCard + ' vs a ' + LosingCard + '\nThey win the following ' + CardsWonCount + ' cards: ' + CardsWon)
            //Player One wins
            PlayerOne.GiveCard(PlayerOneCard)
            PlayerOne.GiveCard(PlayerTwoCard)
            PlayerTwoWARCards.forEach(
                (card) => {
                    PlayerOne.GiveCard(card)
                }, this
            )
            PlayerOneWARCards.forEach(
                (card) => {
                    PlayerOne.GiveCard(card)
                }, this
            )
        }
        else{
            let CardsWon: string = " "
            PlayerOneWARCards.forEach(
                (card) => {
                    CardsWon += card.PrintString + " "
                }
            )
            let WinningCard: string = PlayerTwoWARCards[PlayerTwoWARCards.length-1]?.PrintString || " "
            let LosingCard: string = PlayerOneWARCards[PlayerOneWARCards.length-1]?.PrintString || " "
            let CardsWonCount: number = PlayerOneWARCards.length  || 0
            console.log('Player two wins the war with a ' + WinningCard + ' vs a ' + LosingCard + '\nThey win the following ' + CardsWonCount + ' cards: ' + CardsWon)
            //Player Two wins
            PlayerTwo.GiveCard(PlayerOneCard)
            PlayerTwo.GiveCard(PlayerTwoCard)
            PlayerOneWARCards.forEach(
                (card) => {
                    PlayerTwo.GiveCard(card)
                }, this
            )
            PlayerTwoWARCards.forEach(
                (card) => {
                    PlayerTwo.GiveCard(card)
                }, this
            )
        }
    }
}

export default CompareCards