let theme = document.querySelector('.theme-toggle');
let select = document.querySelector('#region-filter');
let searchInput = document.querySelector('input');
let countries = document.querySelector('.countries');
let outerData;

let name = document.querySelector("#details-content > div.container.country-details > div.details > h2");
let img = document.querySelector("#details-content > div.container.country-details > div.flag > img");
let nativeName = document.querySelector("#details-content > div.container.country-details > div.details > div.info > div:nth-child(1) > p:nth-child(1) > span");
let region = document.querySelector("#details-content > div.container.country-details > div.details > div.info > div:nth-child(1) > p:nth-child(3) > span");
let sub = document.querySelector("#details-content > div.container.country-details > div.details > div.info > div:nth-child(1) > p:nth-child(4) > span");
let capital = document.querySelector("#details-content > div.container.country-details > div.details > div.info > div:nth-child(1) > p:nth-child(5) > span");
let currency = document.querySelector("#details-content > div.container.country-details > div.details > div.info > div:nth-child(2) > p:nth-child(2) > span");
let population = document.querySelector("#details-content > div.container.country-details > div.details > div.info > div:nth-child(1) > p:nth-child(2) > span");
let language = document.querySelector("#details-content > div.container.country-details > div.details > div.info > div:nth-child(2) > p:nth-child(3) > span");
let border = document.querySelectorAll("div.border-countries > div > span");
let domain = document.querySelector("#details-content > div.container.country-details > div.details > div.info > div:nth-child(2) > p:nth-child(1) > span");
let h3 = document.querySelector('.border-countries h3')
theme.addEventListener('click', () => {
    document.querySelector('body').classList.toggle('dark-mode');
});
async function fetchCountries() {
    try {
        let result = await fetch(`https://restcountries.com/v3.1/all`).then(res => res.json());
        result.forEach(country => {
            // Create country card
            let card = document.createElement('div');
            card.classList.add('country-card');
            card.innerHTML = `
                <img src=${country.flags.png} alt="Country Flag">
                <div class="card-content">
                    <h2>${country.name.common}</h2>
                    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Region:</strong> ${country.region}</p>
                    <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                </div>
            `;
            countries.append(card);

            // Add event listener for details view
            card.addEventListener('click', async () => {
                populateDetails(country);
                showDetails();
            });
        });
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

async function populateDetails(country) {
    try {
        // Set country details
        population.textContent = country.population.toLocaleString();
        name.textContent = country.name.common;
        img.src = country.flags.png;
        nativeName.textContent = country.name.nativeName ? Object.values(country.name.nativeName)[0].official : 'N/A';
        region.textContent = country.region;
        sub.textContent = country.subregion || 'N/A';
        capital.textContent = country.capital ? country.capital[0] : 'N/A';
        domain.textContent = country.tld ? country.tld[0] : 'N/A';
        currency.textContent = country.currencies ? Object.values(country.currencies)[0].name : 'N/A';
        language.textContent = country.languages ? Object.values(country.languages).join(', ') : 'N/A';

        // Fetch and display borders
        let borderCountries = country.borders || [];
        for (let i = 0; i < border.length; i++) {
            if (i < borderCountries.length) {
                let borderName = await getCountryNameByCode(borderCountries[i]);
                border[i].textContent = borderName;
                border[i].style.display = 'inline-block';
            } else {
                border[i].style.display = 'none';
h3.innerHTML = 'Border-countries : N/A'
            }
        }
    } catch (error) {
        console.error('Error populating details:', error);
    }
}

async function getCountryNameByCode(code) {
    try {
        let response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        if (!response.ok) throw new Error('Country not found');
        let data = await response.json();
        return data[0]?.name.common || 'N/A';
    } catch (error) {
        console.error(`Error fetching country name for code ${code}:`, error);
        return 'N/A';
    }
}

searchInput.addEventListener('input', () => {
    const searchQuery = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.country-card');

    cards.forEach(card => {
        const countryName = card.querySelector('.card-content h2').textContent.toLowerCase();
        card.style.display = countryName.includes(searchQuery) ? '' : 'none';
    });
});

select.addEventListener('change', () => {
    const selectedRegion = select.value;
    const cards = document.querySelectorAll('.country-card');

    cards.forEach(card => {
        const regionText = card.querySelector('.card-content p:nth-child(3)').textContent.split(':')[1].trim();
        card.style.display = selectedRegion === '' || regionText === selectedRegion ? '' : 'none';
    });
});

function showDetails() {
    document.querySelector('#main-content').classList.add('hidden');
    document.querySelector('#details-content').classList.remove('hidden');
}
function showMain() {
    document.querySelector('#main-content').classList.remove('hidden');
    document.querySelector('#details-content').classList.add('hidden');
}
fetchCountries();
