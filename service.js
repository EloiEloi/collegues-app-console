

// création d'une requête avec activation de suivi de Cookies.
const request = require('request-promise-native').defaults({ jar: true });

const urlApi = 'https://kseguineau-collegues-api.herokuapp.com/';



class Service {


    // s'authentifier sur l'api afin d'avoir les droits en lecture/écriture
    apiAuthentification(loginUser, mdpUser) {
        const urlReq = urlApi + 'auth';
        return request(urlReq,
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
        const urlReq = urlApi + 'collegues?nom=' + nomCollegue;
        return request(urlReq, { json: true })
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
        const urlReq = urlApi + 'collegues';
        return request(urlReq,
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
        const urlReq = urlApi + 'collegues/' + matricule
        return request(urlReq,
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
        const urlReq = urlApi + 'collegues/' + matricule
        return request(urlReq,
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