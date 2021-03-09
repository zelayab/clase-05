const jwt = require('jwt-simple');

async function createToken(event, context) {
    const token = jwt.encode({
        userId: 'pepe'
    }, 'secret1');

    return {
        statusCode: 200,
        body: JSON.stringify({
            token
        })
    };
}

async function validateToken(event, context) {
    const token = event.headers.authorization || '';

    try {
        const user = jwt.decode(token, 'secret1');

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `Welcome user id ${user.userId}`
            })
        };
    }
    catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Could not validate token'
            })
        };
    }
}

module.exports = { createToken, validateToken };