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
        rl.question(textConsole, (identifiant) => {
            let textConsole = `saisissez votre mdp
> `;
            rl.question(textConsole, (mdp) => {
                service.apiAuthentification(identifiant, mdp)
                    .then((response) => {
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
                    .catch((error) => {
                        // Request failed due to technical reasons...
                        console.log(error.statusCode, 'error');
                        start();
                    });


            });

        });
    }
    recupLogin();
}






function menu() {

    let nom;
    let prenom;
    let dateDeNaissance;


    let menuString = `
---- MENU ----
1. Rechercher un collègue
2. Créer un collègue;
3. Modifier l'email
4. Modifier la photo
99. Sortir
`
    console.log(menuString);

    // récupération de la saisie utilisateur
    rl.question('choix > ', (saisie) => {

        switch (saisie) {
            case "1":
                console.log('saisissez un nom')
                rl.question('> ', (nom) => {

                    service.rechercherMatriculeCollegueParNom(nom)
                        .then((response) => {

                            let nbrCollegues = response.length;
                            console.log(`\n${nbrCollegues} collègues trouvé(s)`);
                            let nb = 0;
                            response.forEach(element => {
                                nb += 1;
                                console.log(`${nb} ->`, element.nom, element.prenom, element.ddn)
                            });
                            menu();
                        }).catch((error) => {
                            console.log('error.message : ', error.message);
                            menu();
                        });
                });
                break;

            case "2":
                let aff2 = `**Création d'un nouveau collegue**
Saisissez un nom :`
                console.log(aff2);

                rl.question('> ', (nom) => {
                    console.log('Saisissez un prenom :');
                    rl.question('> ', (prenom) => {
                        console.log('Saisissez un email :');
                        rl.question('> ', (email) => {
                            console.log('saisissez une date de naissance (annee-mois-jour)');
                            rl.question('> ', (ddn) => {
                                console.log("saisissez l'url d'une photo");
                                rl.question('> ', (photoUrl) => {
                                    service.creerCollegue(nom, prenom, email, ddn, photoUrl)
                                        .then((response) => {

                                            console.log(response.body);
                                            menu();
                                        })
                                        .catch((error) => {
                                            console.log(error.message);
                                            menu();
                                        });
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
                rl.question('> ', (matricule) => {
                    console.log("Saisissez le nouvel email :");
                    rl.question('> ', (email) => {
                        service.modifierEmail(email, matricule)
                            .then((response) => {
                                let nom = response.body.nom;
                                let prenom = response.body.prenom;
                                let email = response.body.email
                                console.log(`\nl'email de ${nom} ${prenom} a bien été modifé (nouvel email : ${email})`);
                                menu();
                            }).catch((error) => {
                                console.log(error.message);
                                menu();
                            });
                    });
                });
                break;


            case "4":
                let aff4 = `**Modification  de la photo**
Saisissez le matricule :`
                console.log(aff4);

                rl.question('> ', (matricule) => {
                    console.log("Saisissez l'url pour la nouvelle photo :");
                    rl.question('> ', (photo) => {
                        service.modifierPhoto(photo, matricule)
                            .then((response) => {
                                let nom = response.body.nom;
                                let prenom = response.body.prenom;
                                let photo = response.body.photoUrl
                                console.log(`\nla photo de ${nom} ${prenom} a bien été modifé (nouvelle photo : ${photo})`);

                            }).catch((error) => {
                                console.log(error.message);
                                menu();
                            });
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
