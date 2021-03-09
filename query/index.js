const AWS = require('aws-sdk');

AWS.config.update({
	region: "us-west-1",
	endpoint: "http://localhost:8000"
});

async function getUserById(event, context) {
	const DocumentClient = new AWS.DynamoDB.DocumentClient();

	const { Items } = await DocumentClient.query({
		TableName: process.env.USERS || 'users',
		KeyConditionExpression: '#id = :id',
		ExpressionAttributeNames: {
			'#id': 'userId'
		},
		ExpressionAttributeValues: {
			':id': 'userPepeId'
		}
	}).promise();

	return {
		statusCode: 200,
		body: JSON.stringify(Items)
	};
}

module.exports = { getUserById };