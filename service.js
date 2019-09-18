

// création d'une requête avec activation de suivi de Cookies.
var request = require('request').defaults({ jar: true });

const urlApi = 'https://kseguineau-collegues-api.herokuapp.com/';


function initPost(loginUser, mdpUser, callbackFn) {
    //console.log("TCL: initPost -> loginUser, mdpUser", loginUser, mdpUser)


    request(urlApi + 'auth',
        {
            method: 'POST',
            json: true,
            body: {
                login: loginUser,
                mdp: mdpUser
            }
        },
        function (err, res) {
            callbackFn(err, res);
        }
    );
}



function rechercherCollegueParNom(nomCollegue, callbackFn) {
    request(urlApi + 'collegues?nom=' + nomCollegue,
        {
            method: 'GET',
            json: true

        },
        function (err, res, matricule) {
            var nbr = matricule.length;

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



            //callbackFn(err, res, body);

        }
    );
}

function creerCollegue(nom, prenom, email, ddn, photoUrl, callbackFn) {



    request(urlApi + 'collegues',
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


function modifierEmail(nouvEmail, matricule, callbackFn) {

    request(urlApi + 'collegues/' + matricule,
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

function modifierPhoto(nouvPhoto, matricule, callbackFn) {

    request(urlApi + 'collegues/' + matricule,
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



module.exports = {
    initPost: initPost,
    rechercherCollegueParNom: rechercherCollegueParNom,
    creerCollegue: creerCollegue,
    modifierEmail: modifierEmail,
    modifierPhoto: modifierPhoto

}