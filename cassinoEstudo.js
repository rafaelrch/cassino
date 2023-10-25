const prompt = require('prompt-sync')()
const ROWS = 3
const COLS = 3

const SYMBOLS_COUNT = {
    'A': 2,
    'B': 4,
    'C': 6,
    '8': 8
}

const SYMBOLS_VALUES = {
    'A': 5,
    'B': 4,
    'C': 3,
    'D': 2
}

const deposit = () => {
    while(true){
        const depositAmount = prompt('Insira um valor de deposito: ')
        const numberDepositAmount = parseFloat(depositAmount)

        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log('Valor invalido, por favor tente noavamente')
        }else{
            return numberDepositAmount
        }
    }
}

const getNumberOfLines = () => {
    while(true){
        const lines = prompt('Insira quantas linhas deseja apostar (1-3): ')
        const numberOfLines = parseFloat(lines)

        if(isNaN(numberOfLines) || numberOfLines < 1 || numberOfLines > 3){
            console.log('Número de linhas inválido, tente novamente')
        }else{
            return numberOfLines
        }
    }
}

const getBet = (deposit, numberOfLines) => {
    while(true){
        const bet = prompt('Insira o valor de aposta para cada linha: ')
        const numberBet = parseFloat(bet)

        if(isNaN(numberBet) || numberBet <= 0 || numberBet > deposit / numberOfLines){
            console.log('Valor da aposta inválido')
        }else{
            return numberBet
        }
    }
}

deposit()
getNumberOfLines()
getBet()

