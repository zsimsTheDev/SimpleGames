import Player from './Player'

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
        //Its a tie
        console.log('It was a tie')
        PlayerOne.GiveCard(PlayerOneCard)
        PlayerTwo.GiveCard(PlayerTwoCard)
    }
}

export default CompareCards