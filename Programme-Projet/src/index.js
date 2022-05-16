//IMPORTS
import './index.css';
import * as d3 from 'd3';
import { count } from 'd3';
import data from '../data/DisneyMoviesDataset.csv';

// console.log(data);


// déclaration des tableaux des films Disney ou Pixar
let Pixar = []
let Disney = []
let filmsAComparer = []

// différenciation des films Disney et Pixar
let stringDisney1 = "Walt Disney Animation Studios"
let stringDisney2 = 'Walt Disney Feature Animation'
let stringPixar = "Pixar Animation Studios"

//Ranger chaque film dans la famile Disney ou Pixar
data.forEach(film => {

    let producteurFilm = film["Production company"]

    if (producteurFilm != null) {

        if (producteurFilm.indexOf(stringDisney1) > -1 || producteurFilm.indexOf(stringDisney2) > -1) {
            Disney.push(film)
        }
        if (producteurFilm.indexOf(stringPixar) > -1) {
            Pixar.push(film)
        }
    }
})


// calcul des pourcentages des films 
let nmbFilmDisney = Disney.length
let nmbFilmPixar = Pixar.length

let totalFilmAnimation = nmbFilmDisney + nmbFilmPixar
let pourcentageDisney = nmbFilmDisney / totalFilmAnimation * 100
let pourcentagePixar = nmbFilmPixar / totalFilmAnimation * 100



// calcul des pourcentages des budgets
let budgetFilmDisney = 0
let budgetFilmPixar = 0

for (const film of Disney) {
    budgetFilmDisney = budgetFilmDisney + film["Budget (float)"]
}
for (const film of Pixar) {
    budgetFilmPixar = budgetFilmPixar + film["Budget (float)"]
}

let totalBudget = budgetFilmDisney + budgetFilmPixar
let pourcentageBudgetDisney = budgetFilmDisney / totalBudget * 100
let pourcentageBudgetPixar = budgetFilmPixar / totalBudget * 100

console.log("budget des film Disney " + budgetFilmDisney + " cela représente " + pourcentageBudgetDisney + "%");
console.log("budget des film Pixar " + budgetFilmPixar + " cela représente " + pourcentageBudgetPixar + "%");



//Afficher tous les films d'animation par dates
let filmsAnimation = []
filmsAnimation.push(...Disney, ...Pixar)
filmsAnimation.sort((film1, film2) =>
    film2["Release date (datetime)"] - film1["Release date (datetime)"]

)



//BoxOffice
let boxOfficeDisney = 0
let boxOfficePixar = 0

for (const film of Disney) {
    boxOfficeDisney = boxOfficeDisney + (film["Box office (float)"] / 1000000)
}
for (const film of Pixar) {
    boxOfficePixar = boxOfficePixar + (film["Box office (float)"] / 1000000)
}

// console.log("Box Office des films Disney :" + boxOfficeDisney);
// console.log("Box Office des films Pixar :" + boxOfficePixar);
let totalBoxOffice = boxOfficeDisney + boxOfficePixar
// console.log("total Box Office : " + totalBoxOffice);
let pourcentageBoxOfficeDisney = boxOfficeDisney / totalBoxOffice * 100
// console.log("pourcentage BO Disney : " + pourcentageBoxOfficeDisney);
let pourcentageBoxOfficePixar = boxOfficePixar / totalBoxOffice * 100
// console.log("pourcentage BO Pixar : " + pourcentageBoxOfficePixar);



//IMDB
filmsAnimation.sort((film1, film2) =>
    film1["imdb"] - film2["imdb"]
)

let moyenneImdbDisney = 0
Disney.forEach(film => {
    moyenneImdbDisney = moyenneImdbDisney + film.imdb
})
moyenneImdbDisney = moyenneImdbDisney / Disney.length


let moyenneImdbPixar = 0
Pixar.forEach(film => {
    moyenneImdbPixar = moyenneImdbPixar + film.imdb
})
moyenneImdbPixar = moyenneImdbPixar / Pixar.length



//metascore
filmsAnimation.sort((film1, film2) =>
    film1["metascore"] - film2["meatscore"]
)
// console.log("Film le mieux noté sur metascore : " + filmsAnimation[filmsAnimation.length-1].title + " avec une note de : " + filmsAnimation[filmsAnimation.length-1].metascore);

let moyenneMetascoreDisney = 0
Disney.forEach(film => {
    moyenneMetascoreDisney = moyenneMetascoreDisney + film.metascore
})

moyenneMetascoreDisney = moyenneMetascoreDisney / Disney.length
// console.log(moyenneMetascoreDisney);

let moyenneMetascorePixar = 0
Pixar.forEach(film => {
    moyenneMetascorePixar = moyenneMetascorePixar + film.metascore
})
moyenneMetascorePixar = moyenneMetascorePixar / Pixar.length
// console.log(moyenneMetascorePixar);


//rottentomatoes
filmsAnimation.sort((film1, film2) =>
    film1["rotten_tomatoes"] - film2["rotten_tomatoes"]
)
// console.log("Film le mieux noté sur rotten_tomatoes : " + filmsAnimation[filmsAnimation.length-1].title+ " avec une note de : " + filmsAnimation[filmsAnimation.length-1].rotten_tomatoes);




//SIEGES

//Event Listeners sur les boutons
let pourcentageSieges = pourcentageDisney
document.getElementById('NmbFilms').addEventListener('click', function () {
    pourcentageSieges = pourcentageDisney
    dessinerSieges(pourcentageSieges);
    console.log(pourcentageSieges);
});
document.getElementById('BudgetFilms').addEventListener('click', function () {
    pourcentageSieges = pourcentageBudgetDisney
    dessinerSieges(pourcentageSieges);
    console.log(pourcentageSieges);
});
document.getElementById('BoxOfficeFilms').addEventListener('click', function () {
    pourcentageSieges = pourcentageBoxOfficeDisney
    dessinerSieges(pourcentageSieges);
    console.log(pourcentageSieges);
});



//Canva
let sieges = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
let g = sieges.append("g");
let siege = d3.select('.siegeTemplate')

//dessiner les sièges
function dessinerSieges(pourcentageSieges) {
    sieges.select("g").remove()
console.log("hello");

    d3.selectAll('.siege').remove()
    //clone
    let iX = 0;
    let iY = 0.5;
    for (let i = 0; i < 100; i++) {
        let chaqueSiege = siege.clone(true)
            .attr("transform", "translate(" + translateX(i) + ", " + translateY(i) + ")")
            .attr('style', 'display: block')
            .attr('class', () => {
                if (i < pourcentageSieges) {
                    return 'disney siege';
                } else if (i => pourcentageSieges) { //= pourcentage pixar
                    return 'pixar siege';
                } else {
                    return 'empty siege';
                }
            })
    }

    function translateX(i) {
        let positionX = 0;
        if (i % 10 == 0) {
            iX = 0;
        } else {
            iX++;
        }
        positionX = iX * 80;

        return positionX
    }

    function translateY(i) {
        let positionY = 0;
        if (i % 10 == 0) {
            iY++;
        }
        positionY = iY * 75 - 80;

        return positionY
    }

    d3.select("#legendeDisney p").html("Films Disney = " + Math.round(pourcentageSieges) + "%" )
    d3.select("#legendePixar p").html("Films Pixar = " + (100-Math.round(pourcentageSieges)) + "%")

}

//chargement de la page
dessinerSieges(pourcentageSieges)


//Boutons déroulants

//Disney
let selectDisney = document.createElement("select")
selectDisney.name = "Disney";
selectDisney.id = "dropdownDisney"


for (const filmDisney of Disney) {
    let option = document.createElement("option")
    option.value = filmDisney.title
    option.text = filmDisney.title
    selectDisney.appendChild(option);
}

let labelDisney = document.createElement("label");
labelDisney.innerHTML = "Choisir un film Disney : <br>"
labelDisney.htmlFor = "Film Disney";

document.getElementById("dropdown-list-Disney").appendChild(labelDisney).appendChild(selectDisney)
document.getElementById('dropdown-list-Disney').addEventListener('change', function () {
    filmsAComparer[0] = Disney.find(element => element.title == selectDisney.options[selectDisney.selectedIndex].value)
    console.log(filmsAComparer);
    dessinerBarres(filmsAComparer);
    ecrireTextesComparaison();
});


//Pixar
let selectPixar = document.createElement("select");
selectPixar.name = "Pixar";
selectPixar.id = "dropdownPixar"

for (const filmPixar of Pixar) {
    let option = document.createElement("option")
    option.value = filmPixar.title
    option.text = filmPixar.title
    selectPixar.appendChild(option);
}

let labelPixar = document.createElement("label");
labelPixar.innerHTML = "Choisir un film Pixar : <br> "
labelPixar.htmlFor = "Film Pixar";

document.getElementById("dropdown-list-Pixar").appendChild(labelPixar).appendChild(selectPixar)
document.getElementById('dropdown-list-Pixar').addEventListener('change', function () {
    filmsAComparer[1] = Pixar.find(element => element.title == selectPixar.options[selectPixar.selectedIndex].value)
    console.log(filmsAComparer);
    ecrireTextesComparaison();
    dessinerBarres(filmsAComparer);
});



// Graphique bâton

let margin = { top: 20, right: 0, bottom: 100, left: 0 };
let width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

filmsAComparer[0] = Disney.find(element => element.title == selectDisney.options[selectDisney.selectedIndex].value)
filmsAComparer[1] = Pixar.find(element => element.title == selectPixar.options[selectPixar.selectedIndex].value)
console.log(filmsAComparer);


// svg
d3.select("body")
    .append("div")
    .attr('id', 'barres')
let svg = d3.select("#barres")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

filmsAComparer[0] = Disney[0]
filmsAComparer[1] = Pixar[0]
dessinerBarres(filmsAComparer);


//canva
function dessinerBarres(filmsAComparer) {
    svg.select("g").remove()

    let barres = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    //Axe X
    let x = d3.scaleBand()
        .domain(filmsAComparer.map(function (d) {
            return d.title;
        }))
        .range([0, 500]);

    //Axe y
    let y = d3.scaleLinear()
        .domain([0, 10])
        .range([height, 0]);

    //Dessiner les axes
    let xAxis = d3.axisBottom(x);
    let yAxis = d3.axisLeft(y)

    barres.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + 250 + ", 0 )")
        .call(yAxis);

    barres.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
    //Dessiner les barres
    barres.selectAll("bars")
        .data(filmsAComparer)
        .enter()
        .append("rect")
        .attr("x", function (d) {
            return x(d.title) + 115;
        })
        .attr("y", function (d) {
            return y(d.imdb);
        })
        .attr("width", "20px")
        .attr("height", function (d) {
            return height - y(d.imdb);
        })
        .attr("fill", "#000000")
        .attr('class', (d, i) => {
            return "rectangle" + (i)
        })
    //domaine de l'axe X
    x.domain(filmsAComparer.map(function (d) { return d.title; }));
    //Domaine de l'axe Y
    y.domain(filmsAComparer.map(function (d) { return d.imdb; }));

}



// Ecrire les textes descriptifs des films 
function ecrireTextesComparaison() {
    //Disney
    d3.select("#texteDisney p").html("<strong>Titre : </strong><br> " + filmsAComparer[0].title + "<br>" +
        "<strong>Date de sortie : </strong> <br>" + filmsAComparer[0]["Release date (datetime)"] + "<br>" +
        "<strong>Budget : </strong><br>" + filmsAComparer[0].Budget + "<br>" +
        "<strong>Box Office : </strong><br>" + filmsAComparer[0]["Box office"] + "<br>" +
        "<strong>Note sur imdb : </strong><br>" + filmsAComparer[0].imdb + "<br>"
    );
    //Pixar
    d3.select("#textePixar p").html("<strong>Titre : </strong><br>" + filmsAComparer[1].title + "<br>" +
        "<strong>Date de sortie : </strong><br>" + filmsAComparer[1]["Release date (datetime)"] + "<br>" +
        "<strong>Budget : </strong><br>" + filmsAComparer[1].Budget + "<br>" +
        "<strong>Box Office : </strong><br>" + filmsAComparer[1]["Box office"] + "<br>" +
        "<strong>Note sur imdb : </strong><br>" + filmsAComparer[1].imdb + "<br>"
    );
}

ecrireTextesComparaison();

