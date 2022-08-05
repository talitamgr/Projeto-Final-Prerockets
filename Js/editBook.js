var tittleBook= document.getElementById('tittle')
var nameAuthor= document.getElementById('nameAuthor')
var genreSelect= document.getElementById('select')
var dateInput= document.getElementById('date')
var synopsis= document.getElementById('synopsis')
var fileDisplayArea = document.querySelector('#cover');

let data;

fetch('../data.json').then(response => {
    data = response.json()
    return data
}).then(body => {
    data = body.data
   editThisBook()
})

function editThisBook(){
    var i = localStorage.getItem('index');
    var tittleBook= document.getElementById('tittle')
    var nameAuthor= document.getElementById('nameAuthor')
    var genreSelect= document.getElementById('select')
    var dateInput= document.getElementById('date')
    var synopsis= document.getElementById('synopsis')
    var fileDisplayArea = document.querySelector('#cover');
    
    var item= data.books[i] 
    tittleBook.value = item.tittle;
    nameAuthor.value= item.author;
    synopsis.value= item. synopsis;
    genreSelect.value= item.genre;
    dateInput.value = formatDate(item.systemEntryDate);
    img = new Image();
    img.src = item.image;
    img.style.width="172px";
    img.style.height="206px";
    img.style.position= 'absolute';
    img.style.pointerEvents="none";
    fileDisplayArea.appendChild(img);
 
        
   
}
 
function backToLibrary(){
    window.location.href ='../Html/library.html'
}

function showCover() {
    var file = coverBook.files[0];
    var imageType = /image.*/;

    if (file.type.match(imageType)) {
        var reader = new FileReader();

        reader.onload = function() {
            
            img = new Image();
            img.src = reader.result;
            img.style.width="172px";
            img.style.height="206px";
            img.style.position= 'absolute';
            fileDisplayArea.appendChild(img);
        }

        reader.readAsDataURL(file);
        
    } else {
        fileDisplayArea.innerHTML = "File not supported!"
    }
    
};

function saveData(){
    var date = new Date(dateInput.value)
    date.setHours(date.getHours() + 3);
    var day = date.getDate();
    day = day.toString().padStart(2,0);       
    var month = (date.getMonth() + 1);
    month = month.toString().padStart(2,0);       
    var year = date.getFullYear();       
    date = day + '/' + month + '/' + year;
    
    if(tittleBook==" " || nameAuthor.value == '' || genreSelect.value=='' || synopsis.value == '' || dateInput.value==''){
        alert('Preencha todos os campos')
    }else{
    data.books.push({
        'tittle': tittleBook.value,
        'author': nameAuthor.value,
        "genre": genreSelect.value,
        "status": {
          "isActive": true,
          "description": ""
        },
        "image": img.src,
        "systemEntryDate": date,
        "synopsis": synopsis.value,
        "rentHistory": []
    })
    
    var file = new Blob([JSON.stringify({data})], {type: "text/plain"});

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
            alert('Livro Atualizado')
            const writable = await handle.createWritable()
            await writable.write(blob)
            await writable.close()

            return handle
        } catch (err) {
            console.error(err.name, err.message)
        }
    }
    saveFile(file)
    window.location.href ='../Html/library.html'
}}