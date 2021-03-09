const AWS = require('aws-sdk');

AWS.config.update({
	region: "us-west-1",
	endpoint: "http://localhost:8000"
});

async function createUser(event, context) {
	const DocumentClient = new AWS.DynamoDB.DocumentClient();
	const Item = (typeof event.body === 'string') ? JSON.parse(event.body) : event.body;
    
	await DocumentClient.put({
        TableName: process.env.USERS_TABLE || 'users',
        Item
    }).promise();

	return {
		statusCode: 200,
		body: JSON.stringify(Item)
	};
}

module.exports = { createUser };