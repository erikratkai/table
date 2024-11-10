/**
 * 
 * @param {'td'|'th'} tagName 
 * @param {string} innerHTML 
 * @param {HTMLTableRowElement} parentElement 
 */
 // Függvény cellák készítéséhez
 function createTableCell(tagName, innerHTML, parentElement){
    const tablecell  = document.createElement(tagName); // Egy cellát hozunk létre
    tablecell.innerHTML = innerHTML; // A cellához hozzárendeljük a tartalmat
    parentElement.appendChild(tablecell); // A cellát hozzáadjuk a szülő elemhez
    return tablecell; // Visszatérünk a cellával
}

// Függvény, amely az HTML elementeket id-vel hoz létre
function createHTMLelement(tag, id, parent){
    const HTML_element = document.createElement(tag);
    HTML_element.id = id;
    parent.appendChild(HTML_element);
}

// Függvény, amely az HTML elementet hoz létre egy parent id alapján
function create_HTML_element_with_parent_id(tag, id, parentid){
    const parent_element = document.getElementById(parentid); // A parent elementet lekérdezzük id alapján
    if(parent_element != undefined){ // Ha a parent_element létezik, akkor
        createHTMLelement(tag, id, parent_element); // Létrehozzuk az új elemet
    }
}

// A táblázat headerjének elkészítése
function createTableHeaderCells() {
    const tr_element = document.getElementById('person_tr'); 
    
    // Vezetéknév fejléc cella
    createTableCell("th", "Vezetéknév", tr_element);
    
    // Keresztnév fejléc cella, majd azonnal beállítjuk a colSpan értéket
    const keresztnev = createTableCell("th", "Keresztnév", tr_element);
    keresztnev.colSpan = 2; // Két oszlopot összevonunk
    
    // Háziállat és Házastárs fejléc cellák
    createTableCell("th", "Háziállat", tr_element);
    createTableCell("th", "Házastárs", tr_element);
}


function renderTable(person_array) {
    const tbody = document.getElementById('person_tbody');
    tbody.innerHTML = ''; // Töröljük a tbody tartalmát

    for (const pers of person_array) { // Iterálunk a person_array elemein
        const tbody_tr = document.createElement('tr'); // Létrehozzuk a tr-t
        tbody.appendChild(tbody_tr); // A tr-t hozzáadjuk a tbody-hoz

        // Vezetéknév cella
        createTableCell('td', pers.lastname, tbody_tr);

        // Első keresztnév cella
        createTableCell('td', pers.firstname1, tbody_tr);

        // Második keresztnév cella (ha létezik)
        if (pers.firstname2 !== undefined && pers.firstname2 !== "") {
            createTableCell('td', pers.firstname2, tbody_tr); // Második keresztnév cella
        } else {
            createTableCell('td', '', tbody_tr); // Üres cella, ha nincs második keresztnév
        }

        // Háziállat cella
        createTableCell('td', pers.pet, tbody_tr);

        // Házas státusz cella
        createTableCell('td', pers.married ? 'Igen' : 'Nem', tbody_tr);

        // A sor kijelölése
        tbody_tr.addEventListener('click', function(e) {
            const selectedRow = tbody.querySelector('.selected'); // Megkeressük az éppen kijelölt sort
            if (selectedRow) {
                selectedRow.classList.remove('selected'); // Eltávolítjuk a kijelölést a korábbi sorról
            }
            e.currentTarget.classList.add('selected'); // Kijelöljük az aktuálisan kiválasztott sort
        });
    }
}



// A mezők validálása
function validateFields(lastname, firstname1, pet){
    let valid = true;
    
    if(!validateElement(lastname)){
        valid = false;
    }
    if(!validateElement(firstname1)){
        valid = false;
    }
    if(!validateElement(pet)){
        valid = false;
    }
    return valid;
}

// Az egyes mezők validálása
function validateElement(field){
    const parentElement = field.parentElement;
    const error = parentElement.querySelector('.error');
    
    if(field.value === ""){
        error.innerHTML = 'Kötelező'; // Ha üres a mező, akkor hibaüzenetet írunk ki
        return false;
    }
    
    error.innerHTML = ''; // Ha van érték, eltávolítjuk a hibát
    return true;
}
