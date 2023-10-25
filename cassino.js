// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check is teh user won
// 6. Give the user their winnings
// 7. Play again

const prompt = require('prompt-sync')();
const ROWS = 3
const COLS = 3

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOLS_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2 
}

const deposit = () => {
    while(true){
        const depositAmount = prompt('Insira o valor de deposito: ')
        const numberDepositAmount = parseFloat(depositAmount)
    
        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log('Valor inserido invalido, tente novamente.')
        }else{
            return numberDepositAmount
        }
    }
}

const getNumberOfLines = () => {
    while(true){
        const lines = prompt('Digite o número de linhas em que deseja apostar (1-3): ')
        const numberOfLines = parseFloat(lines)
    
        if(isNaN(numberOfLines) || numberOfLines < 1 || numberOfLines > 3){
            console.log('Numero de linha invalido, tente novamente.')
        }else{
            return numberOfLines
        }
    }
}

const getBet = (balance, numberOfLines) => {
    while(true){
        const bet = prompt('Digite o valor de aposta para cada linha: ')
        const numberBet = parseFloat(bet)

        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / numberOfLines){
            console.log('Aposta invalida, tente novamente.')
        }else{
            return numberBet
        }
    }
}


const spin = () => {
    const symbols = []
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol)
        }
    }
    
    const reels = []
    for(let i = 0; i < COLS; i++){
        reels.push([])
        const reelSymbols = [...symbols]
        for(let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length)
            const selectedSymbol = reelSymbols[randomIndex]
            reels[i].push(selectedSymbol)
            reelSymbols.splice(randomIndex, 1)
        }
    }
    return reels
}

const transpose = (reels) => {
    const rows = []

    for(let i = 0; i < ROWS; i++){
        rows.push([])
        for(let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows
}

const printRows = (rows) => {
    for (const row of rows){
        let rowString = ""
        for(const [i, symbol] of row.entries()){
            rowString += symbol
            if(i != row.length - 1){
                rowString += " | "
            }
        }
        console.log(rowString)
    }
}

const getWinnings = (rows, bet, lines) => {
    let winngins = 0

    for(let row = 0; row < lines; row++){
        const symbols = rows[row]
        let allSame = true

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false
                break;
            }
        }

        if(allSame){
            winngins += bet * SYMBOLS_VALUES[symbols[0]]
        }
    }

    return winngins
}

const game = () => {
    let balance = deposit()

    while(true){
        console.log("Você tem um saldo de $" + balance)
        const numberOfLines = getNumberOfLines()
        const bet = getBet(balance, numberOfLines)
        balance -= bet * numberOfLines
        const reels = spin()
        const rows = transpose(reels)
        printRows(rows)
        const winngins = getWinnings(rows, bet, numberOfLines)
        balance += winngins
        console.log("Voce ganhou $" + winngins.toString())

        if(balance <= 0){
            console.log("Você não tem saldo disponivel")
            break
        }

        const playAgain = prompt("Você deseja jogar novamente (s/n)?")

        if(playAgain != "s") break
    }
}

game()
