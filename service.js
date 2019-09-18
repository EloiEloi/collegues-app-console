

// création d'une requête avec activation de suivi de Cookies.
var request = require('request').defaults({ jar: true });

function initPost(loginUser, mdpUser, callbackFn) {
    //console.log("TCL: initPost -> loginUser, mdpUser", loginUser, mdpUser)


    request('https://kseguineau-collegues-api.herokuapp.com/auth',
        {
            method: 'POST',
            json: true,
            body: {
                login: loginUser,
                mdp: mdpUser
            }
        },
        function (err, res) {
            request('https://kseguineau-collegues-api.herokuapp.com/collegues',
                {
                    method: 'POST',
                    json: true,
                    body: {
                        login: loginUser,
                        mdp: mdpUser
                    }
                },
                function (err, res) {

                    //callbackFn(err, res);
                }
            );

            callbackFn(err, res);
        }
    );
}

module.exports = {
    initPost: initPost
}



function recupererCollegues(params) {

}
