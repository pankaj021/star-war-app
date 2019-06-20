let express = require('express');
let {getAllPageResult, checkToken, sendNotAuthorizedRes, sendInternalServerError} = require('../helper/loginHelper');
let router = express.Router();

router.get('/', checkToken, (req, res, next) => {
    if(req.username) {
        new Promise((resolve, reject) => {
            getAllPageResult(`https://swapi.co/api/planets`, [], resolve, reject);
        })
        .then( planets => {
            res.status(200).json({            
                status: true,
                error: null,
                data: {planets, person: {name: req.username}}
            });
        })
        .catch((error) => sendInternalServerError(res, error));
    } else {
        res.redirect('/');
    }
});

module.exports = router;
