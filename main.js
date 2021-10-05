"use strict";



const imagens = [
    "img/ant-man_and.jpg",
    "img/captain-america.jpg",
    "img/deadpool.jpg",
    "img/homem-de-ferro.jpg",
    "img/hulk.jpg",
    "img/loki.jpg",
    "img/spiderman.jpg",
    "img/wanda.jpg"
]

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


carregarGaleria(imagens)



carregarSlide(imagens)