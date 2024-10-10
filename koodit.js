// Luodaan uusi taulukko
var t = document.createElement('table')
t.id = "todoTable"

// Lisää taulukkoon otsikkorivit
let headerRow = t.insertRow(0)
headerRow.insertCell(0).innerHTML = "Tila"
headerRow.insertCell(1).innerHTML = "Tehtävä"

// Taulukko näkyviin bodyyn
document.body.appendChild(t)

// Funktio joka validoi kentät
function validoiKentat(){
    let itemElement = document.querySelector('#item')
    let itemValue = itemElement.value

    if (itemValue === ""){
        itemElement.classList.add("virhe")
        alert("Tehtäväkenttä ei saa olla tyhjä");
        return false;
    } else {
        itemElement.classList.remove("virhe");
        return true;
        }
}

// Funktio, joka päivittää laskurin
function paivitaLaskuri() {
    let totalTasks = document.querySelectorAll('#todoTable tr:not(:first-child)') 
    let activeTasks = document.querySelectorAll('#todoTable tr:not(.tehty):not(:first-child)')
    document.querySelector('#laskuri').innerHTML = `Tehtäviä jäljellä: ${activeTasks.length} / ${totalTasks.length}`
}


// Funktio, millä lisätään rivejä tauluun
function insertRows(){
    if (!validoiKentat()) return;

    // Viitataan luotuun taulukkoon todoTable
    let t = document.querySelector('#todoTable tbody')

    // Lisätään uusi rivi
    let row = t.insertRow(-1)
    let cell1 = row.insertCell(0)
    let cell2 = row.insertCell(1)
    

    // Haetaan tehtävä mikä syötetty
    let item = document.querySelector('#item').value

    // Luodaan check-merkki ja liitetään klikkaukseen kuuntelija
    let checkmark = document.createElement('span')
    checkmark.innerHTML = "✔️"
    checkmark.style.cursor = "pointer"

    // Tehtävän merkitseminen tehdyksi ja laskurin päivitys
    checkmark.onclick = function(){
        row.classList.toggle('tehty')
        paivitaLaskuri()
    }

    cell1.appendChild(checkmark)
    cell2.innerHTML = item

    // Luodaan poistonappi
    let poistoNappi = document.createElement('button')
    poistoNappi.innerHTML = "Poista"
    poistoNappi.style.cursor = "pointer"
    poistoNappi.onclick = function(){
        row.parentNode.removeChild(row)
        paivitaLaskuri()
    }

    cell2.appendChild(poistoNappi)

    // Tyhjennetään kenttä lisäämisen jälkeen
    document.querySelector('#item').value = ''

    // Kun uusi tehtävä lisätään, laskuri päivittyy
    paivitaLaskuri()
}