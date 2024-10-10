// Luodaan uusi taulukkoja tBody
var t = document.createElement('table')
t.id = "todoTable"
let tBody = document.createElement('tbody')

// Taulukko näkyviin bodyyn
document.body.appendChild(t)

// Lisää taulukkoon otsikkorivit
let headerRow = t.insertRow(0)
headerRow.insertCell(0).innerHTML = "Tila"
headerRow.insertCell(1).innerHTML = "Tehtävä"

// Funktio joka validoi kentät, ilmoittaa joko tyhjästä kentästä, tai yli 100 merkin pituisesta syötteestä.
function validoiKentat(){
    let itemElement = document.querySelector('#item')
    let itemValue = itemElement.value

    if (itemValue === "" || itemValue.length > 100){
        itemElement.classList.add("virhe")
        alert("Virheellinen syöttö, tehtävä on tyhjä tai yli 100 merkin pituinen");
        return false;
    } else {
        itemElement.classList.remove("virhe");
        return true;
        }
}

// Funktio, joka päivittää laskurin eikä laske header-riviä
function paivitaLaskuri() {
    let totalTasks = document.querySelectorAll('#todoTable tr:not(:first-child)') 
    let activeTasks = document.querySelectorAll('#todoTable tr:not(.tehty):not(:first-child)')
    document.querySelector('#laskuri').innerHTML = `Tehtäviä jäljellä: ${activeTasks.length} / ${totalTasks.length}`
}

// Funktio, millä lisätään rivejä tauluun
function insertRows(){
    if (!validoiKentat()) return;

    // Viitataan luotuun taulukkoon todoTable
    let tBody = document.querySelector('#todoTable tbody')

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