var tittleBook = document.getElementById("tittle");
var nameAuthor = document.getElementById("nameAuthor");
var genreSelect = document.getElementById("select");
var dateInput = document.getElementById("date");
var synopsis = document.getElementById("synopsis");
var btnCancel = document.getElementById("cancel");
var btnSave = document.getElementById("save");

function backToHome() {
  window.location.href = "../Html/home.html";
}

var coverBook = document.getElementById("coverBook");
var fileDisplayArea = document.querySelector("#cover");
var img;

function showCover() {
  var file = coverBook.files[0];
  var imageType = /image.*/;

  if (file.type.match(imageType)) {
    var reader = new FileReader();

    reader.onload = function () {
      img = new Image();
      img.src = reader.result;
      img.style.width = "172px";
      img.style.height = "206px";
      img.style.position = "absolute";
      img.style.pointerEvents = "none";
      fileDisplayArea.appendChild(img);
    };

    reader.readAsDataURL(file);
  } else {
    fileDisplayArea.innerHTML = "Arquivo não suportado!";
  }
}

function saveData() {
  var date = new Date(dateInput.value);
  date.setHours(date.getHours() + 3);
  var day = date.getDate();
  day = day.toString().padStart(2, 0);
  var month = date.getMonth() + 1;
  month = month.toString().padStart(2, 0);
  var year = date.getFullYear();
  date = day + "/" + month + "/" + year;

  if (
    tittleBook == " " ||
    nameAuthor.value == "" ||
    genreSelect.value == "" ||
    synopsis.value == "" ||
    dateInput.value == ""
  ) {
    alert("Preencha todos os campos");
  } else {
    data.books.push({
      tittle: tittleBook.value,
      author: nameAuthor.value,
      genre: genreSelect.value,
      status: {
        isActive: true,
        description: "",
      },
      image: img.src,
      systemEntryDate: date,
      synopsis: synopsis.value,
      rentHistory: [],
    });

    saveNewData();

    while (fileDisplayArea.lastChild.nodeName == "IMG") {
      fileDisplayArea.removeChild(fileDisplayArea.lastChild);
    }
    tittleBook.value = "";
    nameAuthor.value = "";
    genreSelect.value = "";
    synopsis.value = "";
    dateInput.value = "";
  }
}
