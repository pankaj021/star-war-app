let express = require('express');
let {EXPIRES_IN, getAllPageResult, validateCredential, generateJwtToken, checkToken, sendNotAuthorizedRes, sendInternalServerError} = require('../helper/loginHelper');
let router = express.Router();

router.get('/', checkToken, (req, res, next) => {
    res.render('index', {username: req.username});
});

router.post('/login', async (req, res, next) => {
    let {username, password} = req.body;
    new Promise((resolve, reject) => {
        getAllPageResult(`https://swapi.co/api/people/?page=1&search=${username}`, [], resolve, reject);
    })
    .then( result => {
        let person = validateCredential(result, username, password);
        if(person) {
            let token = generateJwtToken({username});
            res.cookie('token', token, { maxAge: EXPIRES_IN, httpOnly: true });
            res.cookie('username', username, { maxAge: EXPIRES_IN, httpOnly: true });
            new Promise((resolve, reject) => {
                getAllPageResult(`https://swapi.co/api/planets`, [], resolve, reject);
            })
            .then( planets => {
                res.status(200).json({            
                    status: true,
                    error: null,
                    data: {planets, person}
                });
            })
            .catch((error) => sendInternalServerError(res, error));
        } else {
            sendNotAuthorizedRes(res);
        }
    })
    .catch((error) => sendInternalServerError(res, error));
});

module.exports = router;
