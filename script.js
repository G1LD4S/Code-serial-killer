"use strict"

let caractéristiques = ["Geek", "Gym rat", "Chad", "Normie", "Abruti"];                             // Tableau de caractéristiques
let prenoms = ["Elouan", "Charles", "Mathieu", "Louis", "Ylan"];                                    // Tableau de prénoms
let stats = [[0.1, 0.7, 0.2], [0.5, 0.3, 0.2], [0.1, 0.4, 0.5], [0.4, 0.4, 0.2], [0.2, 0.5, 0.3]];  // Tableau des sets de stats
let joueurs = [];                                                                                   // Tableau où sera ajouté les objets Personnage.
let survivantsMorts = [];                                                                           // Tableau des survivants mortes.
let tueur = ["Jason", 100];                                                                         // Variable qu définit Jason (stats et nom)
// A cause du bug qui empèche les survivants d'esquiver, il faut mettre les PV de Jason à 50 pour leur donner une chance

class Personnages {
    constructor(nom, caractéristiques, probaMort, probaDmg, probaMortdmg){
        this.nom= nom;
        this.caractéristiques= caractéristiques;
        this.probaMort= probaMort;
        this.probaDodge= probaDmg;
        this.probaMortdmg= probaMortdmg;
    }
}

//On donne un prénom, des stats et une caractéristique à chaque personnage
prenoms.forEach(nom => {
    let i= Math.floor(Math.random() * caractéristiques.length); //Nombre aléatoire entre 0 (inclus) et 4 (inclus)
    let caractéristique= caractéristiques.splice(i, 1)          //Utilise i comme index de référence pour prendre un élément dans le tableau des caractéristiques

    let j=Math.floor(Math.random() * stats.length);             //Nombre aléatoire entre 0 (inclus) et 4 (inclus)
    let statPerso= stats.splice(j, 1)                                //Utilise j comme index de référence pour prendre un élément dans le tableau des stats

    let joueur = new Personnages(nom, caractéristique, statPerso[0][0], statPerso[0][1], statPerso[0][2]);
    joueurs.push(joueur)
});

function combat() {
    let affichageMort = "";                                                          //Création de la variable affichageMort qu'on remplie au fur et à mesure avec les survivants tués

    if (joueurs.length >= 1 && tueur[1] >0) {                                        //On s'assure qu'il reste au moins un survivant et que Jason est encore en vie
        let chiffreSurvivantRandom  = Math.floor(Math.random() * joueurs.length);    //Choix aléatoire d'un survivant
        let targetSurvivant = joueurs[chiffreSurvivantRandom]
        attaqueTueur(targetSurvivant, chiffreSurvivantRandom)
        
    }else if (joueurs.length >= 1 && tueur[1] <= 0) {                                //Si il reste un ou des survivants mais que Jason est mort
        
        for(let i = 0; i < survivantsMorts.length; i++) {
            let test = survivantsMorts[i];

            if (survivantsMorts.length > 1) {                                        //Permet de faire une phrase correcte avec des virgules, un "et" et un point placés en fonction de l'index du survivant dans la variable survuvantsMorts
                if (test == survivantsMorts[survivantsMorts.length - 1]) {
                    affichageMort += `et ${test}.`;
                
                }else if (test == survivantsMorts[survivantsMorts.length - 2]) {
                    affichageMort+= `${test} `

                }else {
                    affichageMort += `${test}, `;
                }
            }
            else{
                affichageMort += `${test}`
            }
        }

        if (!affichageMort) {                                                        //Phrase au cas où il n'y a aucun mort, donc où la variable affichageMort est vide(impossible avec le bug qui empêche les survivants d'esquiver)
            console.log("Jason est mort et il n'a tué aucun survivant")
        }else{                                                                       //Cas où Jason est mort et où il a tué des survivants
            console.log("Jason est mort, mais RIP ", affichageMort + " 🪦");
        }

    }else if (joueurs.length == 0 && tueur[1] > 0) {                                 //Si Jason tue tous les survivants et survie
        console.log("Jason a réussi à tuer tous les survivants");

    }else if (joueurs.length == 0 && tueur[1] <= 0) {                                //Si Jason a tué tous les survivants mais est mort aussi
        console.log("Tout le monde est mort, RIP ", affichageMort + ".");
    }
} 

function attaqueTueur(survivantCible, chiffreSurvivantRandom) {
    let valeurAleatoire = Math.random();

    if (valeurAleatoire < survivantCible["probaMort"]) {                             //Détermine si le survivant va juste se faire assassiner sans mettre de dégâts à Jason
         console.log("Jason a assassiné", survivantCible["nom"]);
         survivantsMorts.push(survivantCible["nom"]);
         joueurs.splice(chiffreSurvivantRandom, 1);

        } else if (valeurAleatoire < survivantCible["probaMort"] + survivantCible["probaDmg"]) { //Détermine si le survivant va esquiver et mettre des dégâts à Jason !!BEUG, NE SE PASSE JAMAIS!!
         console.log(survivantCible["nom"],"arrive à esquiver et à mettre 10 dégâts à Jason !");
         tueur[1] -= 10;

        } else {
         console.log(survivantCible["nom"] ,"succombe mais arrive à mettre 15 dégâts à Jason dans sa chute."); //Dernier cas, si aucun des deux au-dessus n'arrive, le survivant meurt mais inflige 15dmg à Jason
         tueur[1] -= 15;
         survivantsMorts.push(survivantCible["nom"]);
         joueurs.splice(chiffreSurvivantRandom, 1);
    }

    console.log("Survivants morts :", survivantsMorts);                               //Affiche les survivants morts après chaque action

    combat()

};



combat()

