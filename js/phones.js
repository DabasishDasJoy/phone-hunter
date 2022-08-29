const loadPhones = async (searchText, dataLimit) => {
    // ----start loader----
    toggleLoader(true);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    const response = await fetch(url);
    const data = await response.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = ``;
    const notFoundMsg = document.getElementById('not-found-message');
    //display if not found
    if (phones.length) {
        notFoundMsg.classList.add('d-none');
        const showAllContainer = document.getElementById('show-all-container');
        // -----Add show all button--------
        if(phones.length > 10){
            showAllContainer.classList.remove('d-none');
        }
        else{
            showAllContainer.classList.add('d-none');
        }

        // -----show phones-----
        if(dataLimit){
            phones = phones.slice(0, dataLimit);
        }
        
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
                        <button onclick="loadDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">View Details</button>
                    </div>
                </div>
            `;
            phonesContainer.appendChild(div);
        });
    }

    //display if phone found
    else{
        notFoundMsg.classList.remove('d-none');
    }

    // -------stop loader-------
    toggleLoader(false);
}

//by clicking trigger the search button
const loadSearch = (dataLimit) => {
    // ----start loader----
    toggleLoader(true);

    const inputSearch = document.getElementById('input-search');
    const searchText = inputSearch.value;
    loadPhones(searchText, dataLimit);
}
//By pressing enter in the input field trigger the search button
document.getElementById('input-search').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        //Cancel the default action if needed
        event.preventDefault();
        //Trgger the button with a click
        document.getElementById('btn-search').click();
    }
})

const toggleLoader = (isLoading) => {
    const loader = document.getElementById('loader');
    if(isLoading){
        loader.classList.remove('d-none');
    }
    else{
        loader.classList.add('d-none');
    }
}


const loadDetails = (id) =>{
    url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data=> displayDetails(data.data))
}

const displayDetails = (details) =>{
    console.log(details);
    document.getElementById('phoneTitle').innerText = details.name;

    const detailsBody = document.getElementById('phoneDetails');
    const sensorsArr = details.mainFeatures.sensors.map(sensor=> sensor);
    /* 
        since sensors is an array. So, 
        first take those array elements then make them a text to place on an element.
    */
    const sensors = sensorsArr.join(", ");
    detailsBody.innerHTML = `
        <p>Chipset: ${details.mainFeatures.chipSet} </p>
        <p>Display Size: ${details.mainFeatures.displaySize} </p>
        <p>Memory: ${details.mainFeatures.memory} </p>
        <p>Sensors: ${sensors}</p>
    `;
}

loadPhones("a");