

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
        ).then(function (response) {
            return response;
        });
    }

    apiRechercherCollegueParNom(nomCollegue, callbackFn) {
        const urlReq = urlApi + 'collegues?nom=' + nomCollegue;
        request(urlReq,
            {
                method: 'GET',
                json: true

            },
            function (err, res, matricule) {
                let nbr = matricule.length;

                if (res.statusCode === 200 && matricule[0] != undefined) {
                    for (let index = 0; index < nbr; index++) {
                        request(urlApi + 'collegues/' + matricule[index],
                            {
                                method: 'GET',
                                json: true
                            },
                            function (err, res, body) {
                                callbackFn(err, res, body);
                            }
                        );
                    }
                } else {
                    console.log('nom inconnu')
                }
            }
        );
    }

    creerCollegue(nom, prenom, email, ddn, photoUrl, callbackFn) {
        const urlReq = urlApi + 'collegues';
        request(urlReq,
            {
                method: 'POST',
                json: true,
                body: {
                    "nom": nom,
                    "prenom": prenom,
                    "email": email,
                    "ddn": ddn,
                    "photoUrl": photoUrl
                }
            },
            function (err, res, body) {
                callbackFn(err, res, body);
            }
        );
    }

    modifierEmail(nouvEmail, matricule, callbackFn) {
        const urlReq = urlApi + 'collegues/' + matricule
        request(urlReq,
            {
                method: 'PATCH',
                json: true,
                body: {
                    "email": nouvEmail
                }
            },
            function (err, res, body) {
                console.log(res.statusCode, res.statusMessage)
                if (res.statusCode === 200) {
                    callbackFn(err, res, body);
                } else {
                    console.log('error')
                }
            }
        );
    }

    modifierPhoto(nouvPhoto, matricule, callbackFn) {
        const urlReq = urlApi + 'collegues/' + matricule
        request(urlReq,
            {
                method: 'PATCH',
                json: true,
                body: {
                    "photoUrl": nouvPhoto
                }
            },
            function (err, res, body) {
                console.log(res.statusCode, res.statusMessage)
                if (res.statusCode === 200) {
                    callbackFn(err, res, body);
                } else {
                    console.log('error')
                }
            }
        );
    }

}

exports.Service = Service;