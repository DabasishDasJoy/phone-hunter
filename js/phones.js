const loadPhones = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    const response = await fetch(url);
    const data = await response.json();
    displayPhones(data.data);
}

const displayPhones = (phones) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = ``;
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100 p-4">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                        to additional content. This content is a little bit longer.</p>
                </div>
            </div>
        `;
        phonesContainer.appendChild(div);
    });
}

//by clicking trigger the search button
const loadSearch = ()=>{
    const inputSearch = document.getElementById('input-search');
    const searchText = inputSearch.value;
    inputSearch.value = "";
    loadPhones(searchText);
}
//By pressing enter in the input field trigger the search button
document.getElementById('input-search').addEventListener('keypress', (event)=> {
    if(event.key === 'Enter'){
        //Cancel the default action if needed
        event.preventDefault();
        //Trgger the button with a click
        document.getElementById('btn-search').click();
    }
})



loadPhones("");