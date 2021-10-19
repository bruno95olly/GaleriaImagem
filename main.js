"use strict";

// const imagens = [
//     "img/ant-man_and.jpg",
//     "img/captain-america.jpg",
//     "img/deadpool.jpg",
//     "img/homem-de-ferro.jpg",
//     "img/hulk.jpg",
//     "img/loki.jpg",
//     "img/spiderman.jpg",
//     "img/wanda.jpg"
// ]


// const nomes = ["Marta", "Joao", "Mario"]
// const notas = [9, 7, 5]

// console.log(`o aluno ${nomes[0]} obteve a nota ${notas[1]}`)

// const aluno1 ={
//     'nome': 'mariana', 
//     'idade': 18, 
//     'nota': 6
// }

// console.log(`o aluno ${aluno1.nome} obteve a nota ${aluno1.nota}`)

// const alunos = [
//     {'nome': 'felipe', 'notas': [0, 5, 9]},
//     {'nome': 'Miguel', 'nota': 10},
//     {'nome': 'Joaquim', 'nota': 5}
// ]

// console.log(`o aluno ${alunos[0].nome} obteve a nota ${alunos[0].notas[1]}`)

const limparElementos = (elemento) => {
    while (elemento.firstChild){
        elemento.removeChild(elemento.lastChild)
    }
}

const pesquisarImagens = async (evento) =>{
    console.log(evento)
    if(evento.key === 'Enter'){
        const raca = evento.target.value
        const url = `https://dog.ceo/api/breed/${raca}/images`
        const imagensResposta = await fetch(url)
        if(imagensResposta.ok){
            const imagens = await imagensResposta.json()

            limparElementos(document.querySelector('.galeria-container'))
            limparElementos(document.querySelector('.slide-container'))
            carregarGaleria(imagens.message)
            carregarSlide(imagens.message)
            console.log(imagens)
        }
        else{
            alert('raça nao encontrada')
        }
    }
    
}

const filtrarId = (url) => {
    const ultimaBarra = url.lastIndexOf("/") + 1;
    const ultimoPonto = url.lastIndexOf('.')
    return url.substring(ultimaBarra, ultimoPonto)
}

const criarItem = (urlImagem) => {
    const container = document.querySelector(".galeria-container")
    const novolink = document.createElement("a")

    novolink.href = `#${filtrarId(urlImagem)}`
    novolink.classList.add("galeria-itens")
    novolink.innerHTML = `<img src="${urlImagem}" alt=""></img>`
    container.append(novolink);

    // container.innerHTML += `<a href="#ant-man" class="galeria-itens">
    // <img src="${urlImagem}" alt="">
    // </a>`

}





const criarSlide = (urlImagem, indice, array) => {
    const container = document.querySelector(".slide-container")
    const novaDiv = document.createElement("div")
    novaDiv.classList.add("slide")
    novaDiv.id = filtrarId(urlImagem)

    const indiceAnterior = indice == 0 ? array.length - 1 : indice - 1

    const indiceProximo = indice == array.length - 1 ? 0 : indice + 1

    const slideAnterior =filtrarId(array[indiceAnterior])


    const slideSeguinte =filtrarId(array[indiceProximo])

    novaDiv.innerHTML = `
        <div class="imagem-container">
            <a href="" class="fechar">&#10006;</a>
            <a href="#${slideAnterior}" class="navegacao anterior">&#171;</a>
            <img src="${urlImagem}" alt="">
            <a href="#${slideSeguinte}" class="navegacao proximo">&#187;</a>
        </div>
    `
    container.appendChild(novaDiv);


}


const carregarGaleria = (imgs) => imgs.forEach(criarItem)
const carregarSlide = (imgs) => imgs.forEach(criarSlide)


document.querySelector('.pesquisa input')
    .addEventListener('keypress', pesquisarImagens)