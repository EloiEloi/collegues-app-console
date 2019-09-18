var service = require('./service.js');

// récupération du module "readline"
var readline = require('readline');

// création d'un objet `rl` permettant de récupérer la saisie utilisateur
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function start() {


    function recupLogin(idRl, mdpRl) {

        var identifiant = idRl;
        var mdp = mdpRl;

        //console.log("identifiant : ", idRl);
        // console.log("mdp : ", mdpRl);

        if (identifiant === null) {
            console.log("saisissez votre identifiant");
            // récupération de la saisie utilisateur
            rl.question('> ', function (saisie) {
                recupLogin(saisie);
            });
        } else if (mdp == null) {
            console.log("saisissez votre mdp");
            // récupération de la saisie utilisateur
            rl.question('> ', function (saisie) {
                recupLogin(idRl, saisie);
            });
        } else {
            service.initPost(identifiant, mdp,
                function (err, res) {
                    console.log(res.statusCode);
                    if (res.statusCode != 200) {

                        console.log('mauvais identifiant/mdp');
                        recupLogin(null, null);
                    } else {

                    }



                }
            );


        }

    }
    recupLogin(null, null);



}

function resultatConnection(params) {

}



function menu() {
    console.log("1. Rechercher un collègue");
    console.log("99. Sortir");

    // récupération de la saisie utilisateur
    rl.question('Votre choix : ', function (saisie) {

        switch (saisie) {
            case "1":
                console.log('Recherche en cours du nom xxx');
                menu();
                break;
            case "99":
                console.log('Aurevoir');
                rl.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
                break;
            default:
                console.log('mauvais choix');
                menu();
                break;
        }



    });




}
exports.start = start;

