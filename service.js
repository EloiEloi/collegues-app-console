

// création d'une requête avec activation de suivi de Cookies.
const request = require('request-promise-native').defaults({ jar: true });

/**  l'url de l'api Collegue Api
 * @type {string}
*/
const urlApi = 'https://kseguineau-collegues-api.herokuapp.com/';


/**
 *  Class de service fournissant les méthodes d'accès aux données de l'apoi Collegue Api
 */
class Service {

    /**
     * permet de s'authentifier sur l'api afin d'avoir les droits en lecture/écriture
     */
    apiAuthentification(loginUser, mdpUser) {
        return request(`${urlApi}auth`,
            {
                method: 'POST',
                json: true,
                resolveWithFullResponse: true,
                body: {
                    login: loginUser,
                    mdp: mdpUser
                }
            }
        ).then((response) => {
            return response;
        });
    };

    rechercherMatriculeCollegueParNom(nomCollegue) {
        return request(`${urlApi}collegues?nom=${nomCollegue}`, { json: true })
            .then((tabMatricules) => {
                let listePromesses = [];
                for (let matricule of tabMatricules) {
                    const r$ = request(`${urlApi}collegues/${matricule}`, { json: true });
                    listePromesses.push(r$)
                }
                return Promise.all(listePromesses);
            });
    };


    creerCollegue(nom, prenom, email, ddn, photoUrl) {
        return request(`${urlApi}collegues`,
            {
                method: 'POST',
                json: true,
                resolveWithFullResponse: true,
                body: {
                    "nom": nom,
                    "prenom": prenom,
                    "email": email,
                    "ddn": ddn,
                    "photoUrl": photoUrl
                }
            }
        );
    };

    modifierEmail(nouvEmail, matricule) {
        return request(`${urlApi}collegues/${matricule}`,
            {
                method: 'PATCH',
                json: true,
                resolveWithFullResponse: true,
                body: {
                    "email": nouvEmail
                }
            }
        );
    };

    modifierPhoto(nouvPhoto, matricule) {
        return request(`${urlApi}collegues/${matricule}`,
            {
                method: 'PATCH',
                json: true,
                resolveWithFullResponse: true,
                body: {
                    "photoUrl": nouvPhoto
                }
            }
        );
    };

}

exports.Service = Service;