var divModal = document.getElementById('modal')
var divModalResponsive = document.querySelector('.scrollModal')
var divModalRent = document.querySelector('.no-modalRent')
var divModalReturn = document.querySelector('.no-modalReturn')
var divScrollModalReturn = document.querySelector('.scrollModalReturn')
var divModalDelete = document.querySelector('.no-modalDelete')
var divModalInactive = document.querySelector('.no-modalInactive')
var divScrollModalInactive = document.querySelector('.scrollModalInactive')
var divModalHistoric = document.querySelector('.no-modalHistoric')
var saveChange;
var book = localStorage.getItem('book')

function checkBook(index) {
    var rentHistory = data.books[index].rentHistory

    if(book){
        saveChange = true;
    }

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
    } else {
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
    if (saveChange == true) {
        localStorage.removeItem('book')
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
    var divInformations = document.createElement('div')
    buttonConstructor("btnClose", "X", closeModal, "", modal)
    firstPartModal(index, modal, divInformations)
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
function firstPartModal(index, modal, divInformations){
    var img = document.createElement('img');
    img.src = data.books[index].image;
    modal.appendChild(img);
    var title = document.createElement('h2')
    var titleContent = document.createTextNode(data.books[index].tittle)
    title.appendChild(titleContent)
    divInformations.appendChild(title)
    modal.appendChild(divInformations)
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
    if (btnFunction) {
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
    if (saveChange == true) {
        localStorage.removeItem('book')
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
    if(saveChange){
        localStorage.setItem('book', JSON.stringify(data.books[index]))
    }
    localStorage.setItem('index', index);
    window.location.href = '../Html/editBook.html'
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

function inactivateBook(i) {
    saveChange = true;
    var descriptionDelete = document.getElementById('descriptionDelete')
    data.books[i].status.isActive = false;
    data.books[i].status.description = descriptionDelete.value;
    openModalInactive(i)
}

function openModalInactive(i) {
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
    buttonConstructor("btnRentInactive", "Emprestar", null, i, modalBook)
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
    var subCategory = document.createTextNode('Motivo')
    sub.appendChild(subCategory)
    inactivationInformations.appendChild(sub)
    var subContent = document.createElement('p')
    var subText = document.createTextNode(data.books[i].status.description)
    subContent.appendChild(subText)
    inactivationInformations.appendChild(subContent)
    modal.appendChild(inactivationInformations)
}

function closeModalInactive() {
    divModalInactive.classList.remove('modalInactive')
    divModalInactive.classList.add('no-modalInactive')
    if (saveChange == true) {
        localStorage.removeItem('book')
        saveNewData()
        saveChange = false;
    }
}

function closeModalDelete() {
    divModalDelete.classList.remove('modalDelete')
    divModalDelete.classList.add('no-modalDelete')
}

function activeBook(i) {
    saveChange = true;
    data.books[i].status.isActive = true;
    data.books[i].status.description = " ";
    divModalInactive.classList.remove('modalInactive')
    divModalInactive.classList.add('no-modalInactive')
    checkBook(i)
}

var table = document.querySelector('.tableHistoric')
var scrollModalHistoric = document.querySelector('.scrollModalHistoric')

function historicBook(index) {
    divModalHistoric.classList.remove('no-modalHistoric')
    divModalHistoric.classList.add('modalHistoric')
    divModalReturn.classList.remove('modalReturn')
    divModalReturn.classList.add('no-modalReturn')
    divModalInactive.classList.remove('modalInactive')
    divModalInactive.classList.add('no-modalInactive')
    divModal.classList.remove('modal')
    divModal.classList.add('no-modal')

    buttonConstructor("btnCloseHistoric", "X", closeModalHistoric, index, scrollModalHistoric)
    table.textContent = ' '
    var lineTable = document.createElement('tr')
    lineTable.classList.add('titleTable')
    table.appendChild(lineTable)
    firstBarTableConstructor('Aluno', lineTable)
    firstBarTableConstructor('Turma', lineTable)
    firstBarTableConstructor('Data da Retirada', lineTable)
    firstBarTableConstructor("Data da Entrega", lineTable)
    var filter = document.createElement('tr')
    var dataHistoric = data.books[index].rentHistory
    filterConstructor(filter, dataHistoric, table, "studentName")
    filterConstructor(filter, dataHistoric, table, "class")
    filterConstructor(filter, dataHistoric, table, "withdrawalDate")
    filterConstructor(filter, dataHistoric, table, "deliveryDate")
    table.appendChild(filter)

    for (var i = 0; i < dataHistoric.length; i++) {
        tableConstructor(dataHistoric[i], table)
    }
}

function firstBarTableConstructor(nameCol, lineTable) {
    var name = document.createElement('th')
    var nameContent = document.createTextNode(nameCol)
    name.appendChild(nameContent)
    lineTable.appendChild(name)
}

function filterConstructor(filter, dataHistoric, table, category) {
    var colFilter = document.createElement('th')
    var divFilter = document.createElement('div')
    filter.appendChild(colFilter)
    var imgFilter = document.createElement('img')
    imgFilter.src = ('../assets/imgAdd/Caminho147.svg')
    imgFilter.classList.add('imgFilter')
    var entryFilter = document.createElement('input')
    entryFilter.type = 'text'
    entryFilter.classList.add('textFilter')
    entryFilter.classList.add(category)
    entryFilter.addEventListener('keyup', function () {
        applyFilters(dataHistoric, table);
    });
    divFilter.appendChild(imgFilter)
    divFilter.appendChild(entryFilter)
    colFilter.appendChild(divFilter)
}

function tableConstructor(item, modal) {
    var lineTable = document.createElement('tr')
    lineTable.classList.add('dataStudent')
    var name = document.createElement('th')
    var nameContent = document.createTextNode(item.studentName)
    name.appendChild(nameContent)
    lineTable.appendChild(name)
    var classStudent = document.createElement('th')
    var classContent = document.createTextNode(item.class)
    classStudent.appendChild(classContent)
    lineTable.appendChild(classStudent)
    var withdrawalDate = document.createElement('th')
    var withdrawalDateContent = document.createTextNode(item.withdrawalDate)
    withdrawalDate.appendChild(withdrawalDateContent)
    lineTable.appendChild(withdrawalDate)
    var deliveryDate = document.createElement('th')
    var deliveryDateContent = document.createTextNode(item.deliveryDate)
    deliveryDate.appendChild(deliveryDateContent)
    lineTable.appendChild(deliveryDate)
    modal.appendChild(lineTable)
}

function applyFilters(dataHistoric, table) {

    var filteredList = applyFilter(dataHistoric, "studentName")
    filteredList = applyFilter(filteredList, "class")
    filteredList = applyFilter(filteredList, "withdrawalDate")
    filteredList = applyFilter(filteredList, "deliveryDate")

    displayTable(filteredList, table)
}

function applyFilter(dataHistoric, category) {
    var entryFilter = document.querySelector("." + category)
    var filteredList = []
    var entrySearch = new RegExp(entryFilter.value, 'i')

    for (var i = 0; i < dataHistoric.length; i++) {
        var compareEntry = entrySearch.test(dataHistoric[i][category]);

        if (compareEntry) {
            filteredList.push(dataHistoric[i])
        }
    }

    return filteredList
}

function displayTable(dataToShow, table) {
    while (table.lastChild.className == 'dataStudent') {
        table.removeChild(table.lastChild)
    }
    if (scrollModalHistoric.lastChild.nodeName == "DIV") {
        scrollModalHistoric.removeChild(scrollModalHistoric.lastChild)
    }

    if (!dataToShow.length) {
        var feedback = document.createElement('div')
        var feedbackContent = document.createTextNode("Nenhum resultado.")
        feedback.appendChild(feedbackContent)
        scrollModalHistoric.appendChild(feedback)
    } else {
        for (var i = 0; i < dataToShow.length; i++) {
            tableConstructor(dataToShow[i], table)
        }
    }
}

function closeModalHistoric(i) {
    divModalHistoric.classList.remove('modalHistoric')
    divModalHistoric.classList.add('no-modalHistoric')
    checkBook(i)
}