// console.log('this is magic notes.');
showNotes();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let titleTxt = document.getElementById('titleTxt');
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    // console.log(typeof(notes));

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    if (titleTxt.value != '') {
        notesObj.push(titleTxt.value);
    }

    if (addTxt.value != '') {
        notesObj.push(addTxt.value);
    };

    localStorage.setItem('notes', JSON.stringify(notesObj));
    titleTxt.value = '';
    addTxt.value = '';

    console.log(notesObj);
    showNotes();

});

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    // console.log(typeof(notes));
    // console.log(typeof(notesObj));
    // console.log(notesObj.length);
    // console.log(notesObj[0]);
    let html = '';
    for (let index = 0; index < notesObj.length; index = index + 2) {

        html += ` <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">   ${notesObj[index]}</h5>
              <p class="card-text">${notesObj[index + 1]}</p>
              <button id='${index}' onClick="deleteNote(this.id)" class="btn btn-danger">Delete Notes <i class="fa-solid fa-trash-can"></i></button>
            </div>
          </div>`;
    };
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = 'write something..';
    }
}

// deleting a notes
function deleteNote(index) {
    console.log('i am deleting ', index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 2);
    // delete notesObj[index];
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();

}

let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {

    let inputVal = search.value;
    let lowerInputVal = inputVal.toLowerCase();
    console.log('input event fired ', inputVal)
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        let lowerCard = cardTxt.toLowerCase();
        // console.log(cardTxt);
        if (lowerCard.includes(lowerInputVal)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    });
});