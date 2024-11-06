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
    }
];

const table = document.createElement('table');
document.body.appendChild(table);

const thead = document.createElement('thead');
table.appendChild(thead);

const headerRow = document.createElement('tr');
thead.appendChild(headerRow);

const th_married = createTableElement('th', 'Házas-e', headerRow);

const th_pet = createTableElement('th', 'Háziállat', headerRow);

const th_lastname = createTableElement('th', 'Vezetéknév', headerRow);

const th_firstname = createTableElement('th', 'Keresztnév', headerRow);
th_firstname.colSpan = 2;

const tbody = document.createElement('tbody');
table.appendChild(tbody);

const form = document.getElementById('form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateFields()) {  
        const lastname = document.getElementById('lastname').value;
        const firstname1 = document.getElementById('firstname1').value;
        const firstname2 = document.getElementById('firstname2').value;
        const married = document.getElementById('married').checked;
        const pet = document.getElementById('pet').value;

        const newPerson = {
            firstname1: firstname1,
            firstname2: firstname2 || undefined,
            lastname: lastname,
            married: married,
            pet: pet
        };

        array.push(newPerson);
        rendertable();
    }
});

function validateFields() {
    let result = true;

    const errorMessages = document.querySelectorAll('.error');
    errorMessages.forEach(error => {
        error.innerHTML = '';
    });

    const lastname = document.getElementById('lastname');
    if (lastname.value === "") {
        const error = lastname.parentElement.querySelector('.error');
        error.innerHTML = 'Kötelező';
        result = false;
    }

    const firstname1 = document.getElementById('firstname1');
    if (firstname1.value === "") {
        const error = firstname1.parentElement.querySelector('.error');
        error.innerHTML = 'Kötelező';
        result = false;
    }

    const pet = document.getElementById('pet');
    if (pet.value === "") {
        const error = pet.parentElement.querySelector('.error');
        error.innerHTML = 'Kötelező';
        result = false;
    }

    return result;
}

function rendertable() {
    tbody.innerHTML = "";
    for (const pers of array) {
        const tbody_tr = document.createElement('tr');
        tbody.appendChild(tbody_tr);

        createTableElement('td', pers.married ? 'igen' : 'nem', tbody_tr);
        createTableElement('td', pers.pet, tbody_tr);
        createTableElement('td', pers.lastname, tbody_tr);

        const firstname1Cell = createTableElement('td', pers.firstname1, tbody_tr);

        if (pers.firstname2 !== undefined) {
            createTableElement('td', pers.firstname2, tbody_tr);
        } else {
            firstname1Cell.colSpan = 2;
        }

        tbody_tr.addEventListener('click', function(e) {
            const selectedRow = tbody.querySelector('.selected');
            if (selectedRow) {
                selectedRow.classList.remove('selected');
            }
            e.currentTarget.classList.add('selected');
        });
    }
}

/**
 * @param {'td' | 'th'} cellTag
 * @param {string} innerHTML
 * @param {HTMLTableRowElement} parentElement
 * @returns {HTMLTableCellElement}
 */

function createTableElement(cellTag, innerHTML, parentElement) {
    const element = document.createElement(cellTag);
    element.innerHTML = innerHTML;
    parentElement.appendChild(element);
    return element;
}

rendertable();