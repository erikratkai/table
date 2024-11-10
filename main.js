let array = [
    {
        firstname1: 'Géza',
        firstname2: 'Ferenc',
        lastname: 'Kocsis',
        married: true,
        pet: 'kutya'
    },
    {
        firstname1: 'Mária',
        firstname2: 'Júlia',
        lastname: 'Horváth',
        married: false,
        pet: 'macska'
    },
    {
        firstname1: 'Ferenc',
        lastname: 'Balogh',
        married: false,
        pet: 'teknős'
    },
    {
        firstname1: 'Gábor',
        firstname2: 'Attila',
        lastname: 'Horváth',
        married: true,
        pet: 'macska'
    },
];

// Függvények meghívása a táblázat előkészítéséhez
createHTMLelement('table', 'person_table', document.body);
create_HTML_element_with_parent_id('thead', 'person_thead', 'person_table');
create_HTML_element_with_parent_id('tr', 'person_tr', 'person_thead');
createTableHeaderCells();
create_HTML_element_with_parent_id('tbody', 'person_tbody', 'person_table');

// Form submit esemény kezelése
const form = document.getElementById('form');
form.addEventListener('submit', function(e){
    e.preventDefault(); // Megakadályozza az alapértelmezett form elküldést
    
    const firstname1 = document.getElementById('firstname1');
    const firstname2 = document.getElementById('firstname2');
    const lastname = document.getElementById('lastname');
    const married = document.getElementById('married');
    const pet = document.getElementById('pet');

    // Mezők validálása
    if (validateFields(lastname, firstname1, pet)){
        const newperson = {
            firstname1: firstname1.value,
            firstname2: firstname2.value,
            lastname: lastname.value,
            married: married.checked,
            pet: pet.value
        };

        array.push(newperson); // Új személy hozzáadása a tömbhöz
        renderTable(array); // Táblázat frissítése
        form.reset(); // A form visszaállítása
    }
});

// Kezdeti táblázat renderelés
renderTable(array);
