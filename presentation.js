const { Service } = require('./service.js');
const service = new Service();

// récupération du module "readline"
const readline = require('readline');

// création d'un objet `rl` permettant de récupérer la saisie utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function start() {

    function recupLogin() {

        let textConsole = `
saisissez votre identifiant
> `;
        rl.question(textConsole, function (identifiant) {
            let textConsole = `saisissez votre mdp
> `;
            rl.question(textConsole, function (mdp) {
                service.apiAuthentification(identifiant, mdp)
                    .then(function (response) {
                        let statut = response.statusCode;
                        if (statut === 200) {
                            console.log(statut, 'authentification réussie !');
                            menu()
                        } else if (statut === 404) {
                            console.log(statut, `mauvaise url`);
                            start();
                        } else {
                            console.log(statut, `echec de l'authentification`);
                            start();
                        }
                    })
                    .catch(function (err) {
                        // Request failed due to technical reasons...
                        console.log(err.statusCode, 'error');
                        start();
                    });


            });

        });
    }
    recupLogin();
}






function menu() {
    let menuString = `
---- MENU ----
1. Rechercher un collègue
2. Créer un collègue;
3. Modifier l'email
4. Modifier la photo
99. Sortir`
    console.log(menuString);

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
                let aff2 = `**Création d'un nouveau collegue**
Saisissez un nom :`
                console.log(aff2);

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
                let aff3 = `**Modification email**
Saisissez le matricule :`
                console.log(aff3);

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
                let aff4 = `**Modification  de la photo**
Saisissez le matricule :`
                console.log(aff4);

                rl.question('> ', function (matricule) {
                    console.log("Saisissez l'url pour la nouvelle photo :");
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

exports.menu = menu;
