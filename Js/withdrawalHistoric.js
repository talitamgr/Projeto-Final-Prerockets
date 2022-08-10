var table = document.querySelector('.tableHistoric')
var divWithdrawalHistoric = document.querySelector('.withdrawalHistoric')
var dataHistoric = [];
let data;

fetch('../data.json').then(response => {
    data = response.json()
    return data
}).then(body => {
    data = body.data
    var books = data.books
    showTitleTable()
    showFilterBar(books)
    for (var i = 0; i < books.length; i++) {
        historicBook(books, i)
    }
})

function showTitleTable() {
    var lineTable = document.createElement('tr')
    lineTable.classList.add('titleTable')
    table.appendChild(lineTable)
    firstBarTableConstructor('Aluno', lineTable)
    firstBarTableConstructor('Turma', lineTable)
    firstBarTableConstructor('Livro', lineTable)
    firstBarTableConstructor('Data da Retirada', lineTable)
    firstBarTableConstructor("Data da Entrega", lineTable)
}

function showFilterBar(books) {
    var filter = document.createElement('tr')
    for (var i = 0; i < books.length; i++) {
        dataHistoric = dataHistoric.concat(books[i].rentHistory.map(rent => {
            var completeRent = {
                book: books[i].tittle,
                ...rent
            }
            return completeRent
        }))
    }
    filterConstructor(filter, dataHistoric, books, table, "studentName")
    filterConstructor(filter, dataHistoric, books, table, "class")
    filterConstructor(filter, dataHistoric, books, table, "book")
    filterConstructor(filter, dataHistoric, books, table, "withdrawalDate")
    filterConstructor(filter, dataHistoric, books, table, "deliveryDate")
    table.appendChild(filter)
}


function historicBook(books, index) {
    dataHistoric = books[index].rentHistory

    for (var i = 0; i < dataHistoric.length; i++) {
        tableConstructor(dataHistoric[i], table, books[index].tittle)
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
    imgFilter.src = ('../ImgAdd/Caminho 147.svg')
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

function tableConstructor(item, modal, title) {
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
    var titleBook = document.createElement('th')
    var titleBookContent = document.createTextNode(title)
    titleBook.appendChild(titleBookContent)
    lineTable.appendChild(titleBook)
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
    filteredList = applyFilter(filteredList, "book")
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
    if (divWithdrawalHistoric.lastChild.nodeName == "DIV") {
        divWithdrawalHistoric.removeChild(divWithdrawalHistoric.lastChild)
    }

    if (!dataToShow.length) {
        var feedback = document.createElement('div')
        var feedbackContent = document.createTextNode("Nenhum resultado.")
        feedback.appendChild(feedbackContent)
        divWithdrawalHistoric.appendChild(feedback)
    } else {
        for (var i = 0; i < dataToShow.length; i++) {
            tableConstructor(dataToShow[i], table, dataToShow[i].book)
        }
    }
}