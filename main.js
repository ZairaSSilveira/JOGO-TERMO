// Selecionando os elementos HTML
const divisao = document.querySelector(".divisao")
const apagaEnter = document.querySelector("#apagar-e-enter")
const primeiraLinha = document.querySelector("#primeira-linha")
const segundaLinha = document.querySelector("#segunda-linha")
const terceiraLinha = document.querySelector("#terceira-linha")

// Definindo as teclas
const teclaPrimeiraLinha = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const teclaSegundaLinha = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const teclaTerceiraLinha = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

// Definindo as variáveis do jogo
const linha = 6
const coluna = 5
let linhaAtual = 0
let colunaAtual = 0

// Definindo o array de palavras
let palavras = ['UTERO', 'TRETA', 'MOUSE', 'VERSO', 'SAGAZ', 'ETICA', 'MORAL', 'EXITO', 'ESTAR', 'MUTUA', 'TENUE', 'VIGOR', 'JUSTO', 'HONRA', 'SONHO', 'ICONE', 'ANEXO', 'SENAI', 'EXPOR', 'TEMPO']

// Seleciona uma palavra aleatória dentro do Array palavras e guarda na variável palavra
let palavra = palavras[Math.floor(Math.random() * palavras.length)]

let palavraMapa = {}
console.log(palavra)


for(let i = 0; i < palavra.length; i++) {
// Separa as letras da palavra
    palavraMapa[palavra[i]] = i //Separa cada letra em uma posição do palavra Mapa -- palavraMapa['S', 'E', 'N', 'A', 'I']
}
const tentativas = []

// Criando a grade de caixas de texto
for(let linhaIndex = 0; linhaIndex < linha; linhaIndex++) {
// Vai montar as linhas
    tentativas[linhaIndex] = new Array(coluna) //Cria um novo array com o número total de colunas
    const divisaoLinha = document.createElement('div') //Cria um nova div
    divisaoLinha.setAttribute('id', 'linha'+linhaIndex) //Define o atributo ID
    divisaoLinha.setAttribute('class', 'div-linha')
    for(let colunaIndex = 0; colunaIndex < coluna; colunaIndex++) {
    // Vai montar as colunas
        const divisaoColuna = document.createElement('div')
        divisaoColuna.setAttribute('id', 'linha'+linhaIndex+'coluna'+colunaIndex)
        let classColuna;
        if (linhaIndex === 0) {
            classColuna = 'div-coluna digitando'
        } else {
            classColuna = 'div-coluna desativado'
        }
        divisaoColuna.setAttribute('class', classColuna)
        divisaoLinha.append(divisaoColuna) //Adiciona a coluna como filho da linha
        tentativas[linhaIndex][colunaIndex] = '' //A tentativa começa vazia
    }
    divisao.append(divisaoLinha) //Adiciona a linha como filho da divisao
}

const checkTentativa = () => {
    const tentativa = tentativas[linhaAtual].join("") //Cria um objeto a partir do Array 'tentativas' usando o metodo join
    if(tentativa.length !== coluna) {
    //Verifica se já foi colocando uma letra (tentativa) na coluna
        return
    }
    let atColuna = document.querySelectorAll('.digitando')
    for(let i = 0; i<coluna; i++) {
        const letra = tentativa[i] //Seleciona a letra correspondente a coluna atual
        if(palavraMapa[letra] === undefined) {
        // Verifica se a letra atual não existe no palavraMap
            atColuna[i].classList.add('errado')
        } else {
            if(palavraMapa[letra] === i) {
                atColuna[i].classList.add('certo')

            } else {
                atColuna[i].classList.add('deslocado')
            }
        }
    }
    if(tentativa === palavra) {
        window.alert('Parabéns, você conseguiu!')
        return
    } else {
        if (linhaAtual === linha-1) {
        //Verifica se todas as linhas já foram
            window.alert('Errou!')
        } else {
            proximaLinha()
        }
    }
}

const proximaLinha = () => {
    let digColuna = document.querySelectorAll('.digitando')
    // Seleciona todos os elementos com a classe digitando
    for(let i = 0; i<digColuna.length; i++) {
        digColuna[i].classList.remove('digitando')
        digColuna[i].classList.add('desativado')
    }
    linhaAtual++
    colunaAtual = 0
    // linhaAtual++ para ir para a proxima linha e a coluna volta a ser 0 para ser a primeira caixinha da linha

    const linhaAtualElemento = document.querySelector('#linha'+linhaAtual)
    let atColuna = linhaAtualElemento.querySelectorAll('.div-coluna')
    for(let i = 0; i<atColuna.length; i++) {
        atColuna[i].classList.remove('desativado')
        atColuna[i].classList.add('digitando')
    }
}

//Vai pegar as teclas digitadas -- key é uma palavra para keyboard, as teclas do teclado
const tecladoOnClick = key => {
    if(colunaAtual === coluna) {
    // Verifica se acabou as colunas
        return
    }
    const divAtual = document.querySelector('#linha'+linhaAtual+'coluna'+colunaAtual)
    divAtual.textContent = key //O conteudo do texto será igual a tecla digitada
    tentativas[linhaAtual][colunaAtual] = key
    colunaAtual++
}

const criarLinhaTeclado = (keys, linhaTeclado) => {
    keys.forEach(key => {
    // Vai ler todas as teclas
    let botaoELemento = document.createElement('button') //vai criar os botões
    botaoELemento.textContent = key
    botaoELemento.setAttribute('id', key)
    botaoELemento.addEventListener('click', () => tecladoOnClick(key))
    linhaTeclado.append(botaoELemento)
    })
}

criarLinhaTeclado(teclaPrimeiraLinha, primeiraLinha)
criarLinhaTeclado(teclaSegundaLinha, segundaLinha)
criarLinhaTeclado(teclaTerceiraLinha, terceiraLinha)

const backspace = () => {
    if(colunaAtual === 0) {
        return
    }
    colunaAtual--
    tentativas[linhaAtual][colunaAtual] = '' //o quadrado volta a ficar vazio
    const div = document.querySelector('#linha'+linhaAtual+'coluna'+colunaAtual)
    div.textContent = ''
}

// Criar o botao de apagar e enter
const backspaceBotao = document.createElement('button')
backspaceBotao.addEventListener('click', backspace)
backspaceBotao.textContent = '<x'
apagaEnter.append(backspaceBotao)

const enterBotao = document.createElement('button')
enterBotao.addEventListener('click', checkTentativa)
enterBotao.textContent = 'ENTER'
apagaEnter.append(enterBotao)

document.onkeydown = function(evt) {
    evt = evt || window.evt
    if (evt.key === 'Enter') {
        checkTentativa()
    } else if (evt.key === 'Backspace') {
        backspace()
    } else {
        tecladoOnClick(evt.key.toUpperCase())
    }
   
}