
const dataUsers = [];
const usersPerPage = 10;
let currentPage = 1;

const recupereData = async (url) => {
    try {
        const response = await fetch(url);
        // if (!response.ok) {
        //     throw new Error ("Oups, ca s'est mal passé.")
        // }
        const datas = await response.json();
        console.log(response);
        // Ajoute les données récupérées au tableau dataUsers
        dataUsers.push(...datas);

        //Pagination
        //Affichons la première page des etudiants
        afficherUsers(dataUsers, currentPage);

        createPagination(dataUsers.length, usersPerPage);

        return datas     
    } catch (error) {
        console.log(error);
        return null ;
    }
} ;


const afficherUsers = (users, page) => {
    const usersTableBody = document.querySelector('body > table > tbody');
    usersTableBody.innerHTML = "";

    const start = (page -1) * usersPerPage ;
    const end = start + usersPerPage ;
    const paginatedUsers = users.slice(start, end);

    paginatedUsers.forEach(user => {
        const row = document.createElement('tr');

        const nom = document.createElement('td');
        nom.textContent = user.first_name;
        row.appendChild(nom)

        const prenom = document.createElement('td');
        prenom.textContent = user.last_name;
        row.appendChild(prenom)

        const email = document.createElement('td');
        email.textContent = user.email;
        row.appendChild(email)




        usersTableBody.appendChild(row);
    });
}

const createPagination = (totalItems, itemsPerPage) => {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = "" ;

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let index = 1 ; index <= totalPages; index++) {
        const button = document.createElement('button');
        button.textContent = index ;
        button.addEventListener('click', () => {
            currentPage = index;
            afficherUsers(dataUsers, currentPage)
        })
        
        paginationContainer.appendChild(button)
    }
}

recupereData('./data/data.json')