function getCategory()
{
    const urlCat = 'http://localhost:5678/api/categories';
    fetch(urlCat)
    .then((response) => 
		{
        	return response.json();
        })
        .then((data) => 
			{
            console.log("Début");
            const fragment = document.createDocumentFragment();
            let categoryies = data;
            const categoryFilter = document.createElement("div")
            categoryFilter.className = "flex-box";
            categoryFilter.id = "category";

            // ON UTILISE PAS localStorage POUR GÉRER LE DOM, DAILLEURS TU NE RÉUTILISE JAMAIS CETTE ENTRÉE 'categoryies'
            // JE COMMENTE LES UTILISATION DE localStorage
            // localStorage.setItem('categoryies', JSON.stringify(data));

            const tous= document.createElement("h3")
            tous.textContent = 'Tous'
            tous.classList.add("subcat");
            tous.onclick = function () {
                showAll()
                // tous.className.replace('active', '');
            };
            categoryFilter.appendChild(tous)
            categoryies.forEach((category) => {
                const link = document.createElement('h3');
                link.textContent = category.name;
                link.onclick = function () {
                    showByCategory(category.id);
                    // link.className.replace('active', '');
                };
                link.classList.add("subcat");
                link.setAttribute("tabindex", "0");
                categoryFilter.appendChild(link);
            });

            // J'UTILISE PLUTOT LE h2 DANS #portfolio
            document.querySelector("#portfolio h2").after(categoryFilter);
            // const portfolio = document.getElementById('category');

        })
}

function getWorks() {
    const urlWork = 'http://localhost:5678/api/works';

    fetch(urlWork)
        .then((response) => 
		{
            return response.json();
        })
        .then((data) => 
		{
            const fragment = document.createDocumentFragment();
            let works = data;
            localStorage.setItem('worksedit', JSON.stringify(data));
            createDocumentWorks(works);
        })
}

function createDocumentWorks(works) {
    const fragment = document.createDocumentFragment();
    const gallery = document.getElementsByClassName('gallery')[0];

    gallery.innerHTML = ''; 
    works.forEach((work) => {
        const figure = document.createElement('figure');

        // JE RAJOUTE UN ATTRIBUT data-set À LA BALISE FIGURE CI-DESSOUS
        figure.dataset.workCategoryId = work.category.id

        const div = document.createElement('div');
        const img = document.createElement('img');//ajouter balise figure et figcaption

        img.src = work.imageUrl;
        img.crossOrigin = 'anonymous';

        const caption = document.createElement('figcaption')
        caption.textContent = work.title;
        fragment.appendChild(figure);
        figure.appendChild(div);
        div.appendChild(img);
        div.appendChild(caption);
    })
    gallery.appendChild(fragment);
}

function showByCategory(id) {
    alert(id)

    showAll()
    // ICI IL FAUT QUE TU RECHERCHES ET AFFICHES LES                "works"         QUI ONT UN      work.category.id == id
    // OU ENCORE IL FAUT QUE TU RECHERCHES ET RENDES INVISIBLE LES  "works"         QUI ONT UN      work.category.id != id
    // 2ND OPTION, CI-DESSOUS JE REND INVISIBLE LES works QUI ONT UN work.category.id != id
    const works = document.querySelectorAll(".gallery>figure:not([data-work-category-id='" + id + "'])")
    console.log(works);
    works.forEach(elt => {
        elt.classList.add("off")
    })
}

function showAll() {
    // JE COMMENTE LES UTILISATION DE localStorage
    // const works = JSON.parse(localStorage.getItem('worksedit'));
    const works = document.querySelectorAll(".gallery>figure")
    console.log(works);


    // JE SUPPRIME TOUS LES ATTRIBUTS class SUR LES BALISES figure
    // createDocumentWorks(works);
    works.forEach(elt => {
        elt.classList.remove("off")
    })
}

/*const tmp=`
<div class="flex-box">
			<h3>Tous</h3>
			<h3>Objets</h3>
			<h3>Appartements</h3>
			<h3>Hôtels & restaurants</h3>
		</div>
`*/
// portfolio.insertAdjacentHTML("beforeend",tmp)

getCategory();
getWorks();


