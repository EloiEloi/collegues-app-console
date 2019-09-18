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

                    if (res.statusCode != 200) {

                        console.log(res.statusCode, 'mauvais identifiant/mdp');
                        recupLogin(null, null);
                    } else {
                        console.log(res.statusCode, ' authentification réussie');
                        menu();
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
    console.log('2. Créer un collègue');
    console.log("3. Modifier l'email");
    console.log('4. Modifier la photo');
    console.log("99. Sortir");

    // récupération de la saisie utilisateur
    rl.question('> ', function (saisie) {

        switch (saisie) {
            case "1":
                console.log('saisissez un nom')
                rl.question('> ', function (saisie) {

                    console.log('...Recherche en cours du nom  : ', saisie);
                    service.rechercherCollegueParNom(saisie,
                        function (err, res, body) {
                            console.log(res.statusCode);
                            if (res.statusCode === 200) {
                                console.log(body.length, "collegue(s)  trouvé(s) !");


                                for (const key in body) {

                                    console.log(body[key]);

                                }
                            }

                        }
                    );


                });
                break;


            case "2":
                console.log("**Création d'un nouveau collegue :**")
                console.log('Saisissez un nom :');

                rl.question('> ', function (nom) {
                    console.log('Saisissez un prenom :');
                    rl.question('> ', function (prenom) {
                        console.log('Saisissez un email :');
                        rl.question('> ', function (email) {
                            console.log('saisissez une date de naissance (annee-mois-jour');
                            rl.question('> ', function (ddn) {
                                console.log("saisissez l'url d'une photo");
                                rl.question('> ', function (photoUrl) {

                                    service.creerCollegue(nom, prenom, email, ddn, photoUrl,
                                        function (err, res, body) {
                                            console.log(res.statusCode);
                                            if (res.statusCode === 200) {
                                                console.log("collegue  ajouté !");
                                                console.log(body);
                                            }
                                        }
                                    );
                                });

                            });

                        });

                    });

                });





                break;


            case "3":
                console.log("**Modification email**")
                console.log("Saisissez le matricule :");


                rl.question('> ', function (matricule) {

                    console.log("Saisissez le nouvel email :");
                    rl.question('> ', function (email) {
                        service.modifierEmail(email, matricule,
                            function (err, res, body) {
                                console.log(res.statusCode);
                                if (res.statusCode === 200) {
                                    console.log("email modifié !");
                                    console.log(body);


                                }

                            }
                        );
                    });



                });
                break;


            case "4":
                console.log("**Modification de la photo**")
                console.log("Saisissez le matricule :");

                rl.question('> ', function (matricule) {

                    console.log("Saisissez le nouvel email :");
                    rl.question('> ', function (photo) {
                        service.modifierPhoto(photo, matricule,
                            function (err, res, body) {
                                console.log(res.statusCode);
                                if (res.statusCode === 200) {
                                    console.log("photo modifié !");
                                    console.log(body);

                                }

                            }
                        );
                    });


                });
                break;

            case "99":
                console.log('bye bye');
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

