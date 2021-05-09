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
        //If the cards are matched then it goes into war mode
        //This can chain perpetually until someone is out of cards
        //If you don't have enough cards to battle then you lose the war and thus the game
        let Player1WARCards: Card[] = []
        let Player2WARCards: Card[] = []
        while(CompareResult === 0){
            let Player1CardsLeft: number = PlayerOne.CountCardsLeft()
            let Player2CardsLeft: number = PlayerTwo.CountCardsLeft()
            if(Player1CardsLeft < 3){
                //Player one loses because they cant fight the battle
                while(PlayerOne.HasCardsLeft()){
                    Player1WARCards.push(PlayerOne.DrawCard())
                }
                CompareResult = -1
            }
            else if(Player2CardsLeft < 3){
                //Player two loses because they cant fight the battle
                while(PlayerTwo.HasCardsLeft()){
                    Player2WARCards.push(PlayerTwo.DrawCard())
                }
                CompareResult = 1
            }
            else{
                //If both players have cards availabe then draw 3 cards and compare the third cards
                Player1WARCards.push(PlayerOne.DrawCard())
                Player1WARCards.push(PlayerOne.DrawCard())
                let Player1WarCard: Card = PlayerOne.DrawCard()
                Player1WARCards.push(Player1WarCard)

                Player2WARCards.push(PlayerTwo.DrawCard())
                Player2WARCards.push(PlayerTwo.DrawCard())
                let Player2WarCard: Card = PlayerTwo.DrawCard()
                Player2WARCards.push(Player2WarCard)
                
                CompareResult = Player1WarCard.CompareToCard(Player2WarCard)
                if(CompareResult === 0)
                    console.log("WAR IS NEVERENDING")
            }
        }
        if( CompareResult > 0){
            let CardsWon: string = " "
            Player2WARCards.forEach(
                (card) => {
                    CardsWon += card.PrintString + " "
                }
            )
            let WinningCard: string = Player1WARCards[Player1WARCards.length-1]?.PrintString || " "
            let LosingCard: string = Player2WARCards[Player2WARCards.length-1]?.PrintString || " "
            let CardsWonCount: number = Player2WARCards.length || 0
            console.log('Player two wins the war with a ' + WinningCard + ' vs a ' + LosingCard + '\nThey win the following ' + CardsWonCount + ' cards: ' + CardsWon)
            //Player One wins
            PlayerOne.GiveCard(PlayerOneCard)
            PlayerOne.GiveCard(PlayerTwoCard)
            Player2WARCards.forEach(
                (card) => {
                    PlayerOne.GiveCard(card)
                }, this
            )
            Player1WARCards.forEach(
                (card) => {
                    PlayerOne.GiveCard(card)
                }, this
            )
        }
        else{
            let CardsWon: string = " "
            Player1WARCards.forEach(
                (card) => {
                    CardsWon += card.PrintString + " "
                }
            )
            let WinningCard: string = Player2WARCards[Player2WARCards.length-1]?.PrintString || " "
            let LosingCard: string = Player1WARCards[Player1WARCards.length-1]?.PrintString || " "
            let CardsWonCount: number = Player1WARCards.length  || 0
            console.log('Player two wins the war with a ' + WinningCard + ' vs a ' + LosingCard + '\nThey win the following ' + CardsWonCount + ' cards: ' + CardsWon)
            //Player Two wins
            PlayerTwo.GiveCard(PlayerOneCard)
            PlayerTwo.GiveCard(PlayerTwoCard)
            Player1WARCards.forEach(
                (card) => {
                    PlayerTwo.GiveCard(card)
                }, this
            )
            Player2WARCards.forEach(
                (card) => {
                    PlayerTwo.GiveCard(card)
                }, this
            )
        }
    }
}

export default CompareCards