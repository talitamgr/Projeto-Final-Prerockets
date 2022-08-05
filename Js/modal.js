var divModal = document.getElementById('modal')
var divModalResponsive = document.querySelector('.scrollModal')
var divModalRent = document.querySelector('.no-modalRent')
var divModalReturn = document.querySelector('.no-modalReturn')
var divScrollModalReturn = document.querySelector('.scrollModalReturn')
var divModalDelete = document.querySelector('.no-modalDelete')
var divModalInactive = document.querySelector('.no-modalInactive')
var divScrollModalInactive = document.querySelector('.scrollModalInactive')
var saveChange;

function checkBook(index) {
    var rentHistory = data.books[index].rentHistory

    if (data.books[index].status.isActive) {
        if (rentHistory.length == 0) {
            openModal(index)
        } else {
            var today = new Date();
            var date = formatDate(rentHistory[rentHistory.length - 1].deliveryDate)
            var deliveryDate = new Date(date);
            deliveryDate.setHours(deliveryDate.getHours() + 3);
            if (today < deliveryDate) {
                reshowModal(index)
            } else {
                openModal(index)
            }
        }
    }else{
        openModalInactive(index)
    }
}

function formatDate(date) {
    var separate = date.split('/')
    var newDate = separate[2] + '-' + separate[1] + '-' + separate[0]
    return newDate
}

function closeModal() {
    divModal.classList.remove('modal')
    divModal.classList.add('no-modal')
    if(saveChange==true){
        saveNewData()
        saveChange == false;
    }
}

function openModal(index) {
    divModal.classList.remove('no-modal')
    divModal.classList.add('modal')
    divModalResponsive.textContent = ''
    var modal = document.createElement('div')
    modal.classList.add('modalElements')
    buttonConstructor("btnClose", "X", closeModal, "", modal)
    var img = document.createElement('img');
    img.src = data.books[index].image;
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
    buttonConstructor("btnDelete", "Inativar", deleteBook, index, modal)
    buttonConstructor("btnHistoric", "Histórico", historicBook, index, modal)

    divModalResponsive.appendChild(modal)
}

function modalConstructor(subtitle, item, index, modal) {
    var sub = document.createElement('h4')
    var subCategory = document.createTextNode(subtitle)
    sub.appendChild(subCategory)
    modal.appendChild(sub)
    var subContent = document.createElement('p')
    var subText = document.createTextNode(data.books[index][item])
    subContent.appendChild(subText)
    modal.appendChild(subContent)
}

function buttonConstructor(btnClass, btnName, btnFunction, index, modal) {
    var btn = document.createElement('button')
    btn.classList.add(btnClass)
    var btnName = document.createTextNode(btnName)
    btn.appendChild(btnName)
    if(btnFunction){
        btn.onclick = () => btnFunction(index)
    }
    modal.appendChild(btn)
}

function rentBook(index) {
    divModal.classList.remove('modal')
    divModal.classList.add('no-modal')
    divModalRent.classList.remove('no-modalRent')
    divModalRent.classList.add('modalRent')
    var btnSaveRent = document.querySelector(".saveRent")
    btnSaveRent.onclick = () => saveRent(index)
}

function saveRent(i) {
    var nameInput = document.getElementById('nameStudent')
    var classInput = document.getElementById('classStudent')
    var dateLoan = document.getElementById('dateLoan')
    var dateDelivery = document.getElementById('dateDelivery')

    var dateL = new Date(dateLoan.value)
    var dateLoanConfig = setDate(dateL, true)
    var dateD = new Date(dateDelivery.value)
    var dateDeliveryConfig = setDate(dateD, true)
    data.books[i].rentHistory.push(
        {
            "studentName": nameInput.value,
            "class": classInput.value,
            "withdrawalDate": dateLoanConfig,
            "deliveryDate": dateDeliveryConfig
        }
    )

    saveChange = true;
    reshowModal(i)
}

function setDate(date, shouldAddHours) {
    if (shouldAddHours) {
        date.setHours(date.getHours() + 3);
    }
    var day = date.getDate();
    day = day.toString().padStart(2, 0);
    var month = (date.getMonth() + 1);
    month = month.toString().padStart(2, 0);
    var year = date.getFullYear();
    date = day + '/' + month + '/' + year;
    return date
}

function closeModalRent() {
    divModalRent.classList.remove('modalRent')
    divModalRent.classList.add('no-modalRent')
    divModal.classList.remove('no-modal')
    divModal.classList.add('modal')
}

function reshowModal(i) {
    divModalRent.classList.remove('modalRent')
    divModalRent.classList.add('no-modalRent')
    divModalReturn.classList.remove('no-modalReturn')
    divModalReturn.classList.add('modalReturn')
    divScrollModalReturn.textContent = ''
    var modal = document.createElement('div')
    modal.classList.add('modalReturnBook')
    var modalBook = document.createElement('div')
    modalBook.classList.add('modalElements')
    buttonConstructor("btnClose", "X", closeModalReturn, "", modalBook)
    var img = document.createElement('img');
    img.src = data.books[i].image
    modalBook.appendChild(img);
    var divInformations = document.createElement('div')
    var title = document.createElement('h2')
    var titleContent = document.createTextNode(data.books[i].tittle)
    title.appendChild(titleContent)
    divInformations.appendChild(title)
    modalBook.appendChild(divInformations)

    modalConstructor('Sinopse', 'synopsis', i, divInformations)
    modalConstructor('Autor', 'author', i, divInformations)
    modalConstructor('Gênero', 'genre', i, divInformations)
    modalConstructor('Data de entrada', 'systemEntryDate', i, divInformations)
    buttonConstructor("btnReturn", "Devolver", returnBook, i, modalBook)
    buttonConstructor("btnEdit", "Editar", editBook, i, modalBook)
    buttonConstructor("btnDelete", "Inativar", deleteBook, i, modalBook)
    buttonConstructor("btnHistoric", "Histórico", historicBook, i, modalBook)

    modal.appendChild(modalBook)
    divScrollModalReturn.appendChild(modal)
    var rentInformations = document.createElement('div')
    rentInformations.classList.add('rentInformations')
    var datas = document.createElement('h2')
    var datasContent = document.createTextNode('Dados do aluno')
    datas.appendChild(datasContent)
    modal.appendChild(datas)
    modal.appendChild(rentInformations)
    modalRentConstructor('Nome do aluno', 'studentName', i, rentInformations)
    modalRentConstructor('Sala', 'class', i, rentInformations)
    modalRentConstructor('Data da retirada', 'withdrawalDate', i, rentInformations)
    modalRentConstructor('Data da entrega', 'deliveryDate', i, rentInformations)
}

function modalRentConstructor(subtitle, item, index, modal) {
    var rentHistory = data.books[index].rentHistory
    var divFlex = document.createElement('div')
    divFlex.classList.add('divFlex')
    var sub = document.createElement('h4')
    var subCategory = document.createTextNode(subtitle)
    sub.appendChild(subCategory)
    divFlex.appendChild(sub)
    var subContent = document.createElement('p')
    var subText = document.createTextNode(rentHistory[rentHistory.length - 1][item])
    subContent.appendChild(subText)
    divFlex.appendChild(subContent)
    modal.appendChild(divFlex)
}

function closeModalReturn() {
    divModalReturn.classList.remove('modalReturn')
    divModalReturn.classList.add('no-modalReturn')
    if(saveChange==true){
        saveNewData()
        saveChange = false;
    }
}

function returnBook(index) {
    var today = new Date()
    var date = setDate(today, false)
    data.books[index].rentHistory[data.books[index].rentHistory.length - 1].deliveryDate = date;
    saveChange = true;
    divModalReturn.classList.remove('modalReturn')
    divModalReturn.classList.add('no-modalReturn')
    openModal(index)
}

function editBook(index) {
    localStorage.setItem('index', index);
    window.location.href ='../Html/editBook.html'
}

function deleteBook(index) {
    divModalDelete.classList.remove('no-modalDelete')
    divModalDelete.classList.add('modalDelete')
    divModalReturn.classList.remove('modalReturn')
    divModalReturn.classList.add('no-modalReturn')
    divModal.classList.remove('modal')
    divModal.classList.add('no-modal')
    var btnSaveInactivation = document.querySelector("#inactivate")
    btnSaveInactivation.onclick = () => inactivateBook(index)
}

function inactivateBook(i){
    saveChange=true;
    var descriptionDelete = document.getElementById('descriptionDelete')
    data.books[i].status.isActive = false;
    data.books[i].status.description = descriptionDelete.value;
    openModalInactive(i)
}

function openModalInactive(i){
    divModalDelete.classList.remove('modalDelete')
    divModalDelete.classList.add('no-modalDelete')
    divModalInactive.classList.remove('no-modalInactive')
    divModalInactive.classList.add('modalInactive')
    divScrollModalInactive.textContent = ''
    var modal = document.createElement('div')
    modal.classList.add('modalInactiveBook')
    var modalBook = document.createElement('div')
    modalBook.classList.add('modalElements')
    buttonConstructor("btnClose", "X", closeModalInactive, "", modalBook)
    var img = document.createElement('img');
    img.src = data.books[i].image
    modalBook.appendChild(img);
    var divInformations = document.createElement('div')
    var title = document.createElement('h2')
    var titleContent = document.createTextNode(data.books[i].tittle)
    title.appendChild(titleContent)
    divInformations.appendChild(title)
    modalBook.appendChild(divInformations)

    modalConstructor('Sinopse', 'synopsis', i, divInformations)
    modalConstructor('Autor', 'author', i, divInformations)
    modalConstructor('Gênero', 'genre', i, divInformations)
    modalConstructor('Data de entrada', 'systemEntryDate', i, divInformations)
    buttonConstructor("btnRentInactive", "Emprestar", null , i, modalBook)
    buttonConstructor("btnEdit", "Editar", editBook, i, modalBook)
    buttonConstructor("btnActive", "Ativar", activeBook, i, modalBook)
    buttonConstructor("btnHistoric", "Histórico", historicBook, i, modalBook)

    modal.appendChild(modalBook)
    divScrollModalInactive.appendChild(modal)
    var inactivationInformations = document.createElement('div')
    inactivationInformations.classList.add('inactivationInformations')
    var datas = document.createElement('h2')
    var datasContent = document.createTextNode('Informações da inativação')
    datas.appendChild(datasContent)
    modal.appendChild(datas)
    modal.appendChild(inactivationInformations)
    
    var sub = document.createElement('h4')
    var subCategory = document.createTextNode('Descrição')
    sub.appendChild(subCategory)
    inactivationInformations.appendChild(sub)
    var subContent = document.createElement('p')
    var subText = document.createTextNode(data.books[i].status.description)
    subContent.appendChild(subText)
    inactivationInformations.appendChild(subContent)
    modal.appendChild(inactivationInformations)
}

function closeModalInactive(){
    divModalInactive.classList.remove('modalInactive')
    divModalInactive.classList.add('no-modalInactive')
    if(saveChange==true){
        saveNewData()
        saveChange = false;
    }
}

function closeModalDelete(){
    divModalDelete.classList.remove('modalDelete')
    divModalDelete.classList.add('no-modalDelete')
}

function activeBook(i){
    saveChange=true;
    data.books[i].status.isActive = true;
    data.books[i].status.description = " ";
    divModalInactive.classList.remove('modalInactive')
    divModalInactive.classList.add('no-modalInactive')
    openModal(i)
}

function historicBook(index) {

}

function saveNewData(){
    var file = new Blob([JSON.stringify({ data })], { type: "text/plain" });

        const saveFile = async blob => {
            try {
                const handle = await window.showSaveFilePicker({
                suggestedName: 'data.json',
                types: [
                    {
                        description: "Json",
                        accept: { "text/plain": [".json"] },
                    },
                ],
            })

            const writable = await handle.createWritable()
            await writable.write(blob)
            await writable.close()

            return handle
        } catch (err) {
            console.error(err.name, err.message)
        }
    }
    saveFile(file)
}