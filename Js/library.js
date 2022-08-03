var cards= document.querySelector('.cardsBooks')
var divModal = document.querySelector('.no-modal')
var inputSearch= document.querySelector("#searchTitle")
var inputSelect = document.querySelector('select')
var divModal = document.getElementById('modal')
var divModalResponsive = document.querySelector('.scrollModal')
let data;
fetch('../data.json').then(response=>{
    data= response.json()
    return data
}).then(body=>{
    data = body.data
    var books = data.books
    for(var i = 0; i < books.length; i++){
        showElements(books[i], i)
    }   
})

function showElements(item, index){
var card = document.createElement('div')
card.classList.add('card')
var img = document.createElement('img');
img.src=item.image
card.appendChild(img);
card.onclick = ()=>openModal(index)
var p = document.createElement('p')
var title = document.createTextNode(item.tittle)
p.appendChild(title)
card.appendChild(p)
cards.appendChild(card)
}        
function searchBook(){
    cards.textContent= " "
    var noMatch= true;
    var entrySearch= new RegExp(inputSearch.value, 'i')
    if(inputSelect.value){
        var filterToUse = inputSelect.value;
        for(var i=0;i < data.books.length; i++){
            var compared = entrySearch.test(data.books[i][filterToUse]);
            if(compared){
                showElements(data.books[i])
                noMatch = false;
            }}
    }else{
    for(var i=0;i < data.books.length; i++){
    var compareTitle = entrySearch.test(data.books[i].tittle);
    var compareGenre= entrySearch.test(data.books[i].genre);
    var compareAuthor = entrySearch.test(data.books[i].author);
    var compareDate = entrySearch.test(data.books[i].systemEntryDate)
    if(compareTitle || compareAuthor || compareGenre || compareDate){
        showElements(data.books[i])
        noMatch = false;
    }
    }}
        
    if(noMatch){
        cards.textContent= " Título não encontrado"
    }

}

function closeModal(){
    divModal.classList.remove('modal')
    divModal.classList.add('no-modal')
}

function openModal(index){
    divModal.classList.remove('no-modal')
    divModal.classList.add('modal')
    divModalResponsive.textContent= ''
    var modal = document.createElement('div')
    modal.classList.add('modalElements')
    buttonConstructor("btnClose", "X", closeModal, "", modal)
    var img = document.createElement('img');
    img.src=data.books[index].image
    modal.appendChild(img);
    var divInformations = document.createElement('div')
    var title = document.createElement('h2')
    var titleContent = document.createTextNode(data.books[index].tittle)
    title.appendChild(titleContent)
    divInformations.appendChild(title)
    modal.appendChild(divInformations)

    modalConstructor('Sinopse', 'synopsis', index, divInformations)
    modalConstructor('Autor', 'author', index, divInformations)
    modalConstructor('Gênero', 'genre', index, divInformations)
    modalConstructor('Data de entrada', 'systemEntryDate', index, divInformations)
    buttonConstructor("btnRent", "Emprestar", rentBook, index, modal)
    buttonConstructor("btnEdit", "Editar", editBook, index, modal)
    buttonConstructor("btnDelete", "Inativar", deleteBook, index, modal )
    buttonConstructor("btnHistoric", "Histórico", historicBook, index, modal)
    
    divModalResponsive.appendChild(modal)
}
    function modalConstructor(subtitle, item, index, modal){
        var sub = document.createElement('h4')
        var subCategory = document.createTextNode(subtitle)
        sub.appendChild(subCategory)
        modal.appendChild(sub)
        var subContent = document.createElement('p')
        var subText = document.createTextNode(data.books[index][item])
        subContent.appendChild(subText)
        modal.appendChild(subContent)
    }

    function buttonConstructor(btnClass, btnName, btnFunction, index, modal){
        var btn = document.createElement('button')
        btn.classList.add(btnClass)
        var btnName = document.createTextNode(btnName)
        btn.appendChild(btnName)
        btn.onclick = ()=> btnFunction(index)
        modal.appendChild(btn)
    }

    function rentBook(index){
        divModal.classList.remove('modal')
        divModal.classList.add('no-modal')
    }
    function editBook(index){
        divModal.classList.remove('modal')
        divModal.classList.add('no-modal')
    }
    function deleteBook(index){

    }
    function historicBook(index){

    }