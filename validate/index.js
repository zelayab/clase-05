const AWS = require('aws-sdk');
const Schemy = require('schemy');

AWS.config.update({
	region: "us-west-1",
	endpoint: "http://localhost:8000"
});

const userSchema = new Schemy({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: false,
        default: 'pepe'
    },
    userId: {
        type: String,
        required: true
    }
});

async function validateAndCreate(event, context) {
	const DocumentClient = new AWS.DynamoDB.DocumentClient();

    // Obtener payload
	const Item = (typeof event.body === 'string') ? JSON.parse(event.body) : event.body;

    // Agregarle nuevo Id
    Item.userId = Date.now().toString();

    // Validar
    if (!userSchema.validate(Item)) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                messages: userSchema.getValidationErrors()
            })
        };
    }

    await DocumentClient.put({
        TableName: process.env.USERS || 'users',
        Item
    }).promise();

	return {
		statusCode: 200,
		body: JSON.stringify(Item)
	};
}

module.exports = { validateAndCreate };