let axios = require('axios');
let jwt = require('jsonwebtoken');
const SECRET_KEY = 'My Secret Key';
const EXPIRES_IN = '' + 5 * 60 * 1000;

function getAllPageResult(url, result, resolve, reject) {
    axios.get(url)
    .then(response => {
        let allResult = result.concat(response.data.results);
        if(response.data.next){ 
            getAllPageResult(response.data.next, allResult, resolve, reject);
        } else {
            resolve(allResult);
        }
    })
    .catch((err) => reject(err));
}

function validateCredential(people, username, password) {
    const matchedPerson = people.filter( person => (person.name === username && person.birth_year === password));
    if(matchedPerson.length) return matchedPerson[0];
    return false;
}

function generateJwtToken(payload){
    return jwt.sign(payload, SECRET_KEY, { expiresIn:  EXPIRES_IN}); // Signing the token
}

function checkToken(req, res, next) {
    const token = req.cookies.token;
    jwt.verify(token, SECRET_KEY, (err, payload) => {
        if (err) {
            res.clearCookie('token');
            res.clearCookie('username');
            next();
        } else {
            req.username = payload.username;
            next()
        }
    })
}

function sendNotAuthorizedRes(res) {
    res.status(401).json({            
        status: false,
        error: 'Unauthorized',
        data: null
    });
}

function sendInternalServerError(res, error) {
    res.status(500).json({            
        status: false,
        error: error.message,
        data: null
    });
}

module.exports = {
    getAllPageResult,
    validateCredential,
    generateJwtToken,
    checkToken,
    sendNotAuthorizedRes,
    sendInternalServerError,
    EXPIRES_IN
}
