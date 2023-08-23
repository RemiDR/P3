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
            const div= document.createElement("div")
            div.className="flex-box";

            localStorage.setItem('categoryies', JSON.stringify(data));
            categoryies.forEach((category) => 
				{
                const link = document.createElement('h3');
                link.textContent = category.name;
                link.onclick = function () 
					{
                    findByCategory(category.id);
                    link.className.replace('active', '');
               		};
                link.classList.add("subcat");
                link.setAttribute("tabindex", "0");
                div.appendChild(link);
           		});
            // const portfolio = document.getElementById('category');
            console.log(div);
            portfolio.appendChild(div);
        }) //
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

function showAll() {
    const works = JSON.parse(localStorage.getItem('worksedit'));
    createDocumentWorks(works);
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