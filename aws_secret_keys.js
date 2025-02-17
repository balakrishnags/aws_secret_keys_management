const {
    SecretsManagerClient,
    GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

// Initialize the Secrets Manager client
const client = new SecretsManagerClient({ region: "us-east-1" });

async function getSecret(secretName) {
    try {
        const command = new GetSecretValueCommand({
            SecretId: secretName,
            VersionStage: "AWSCURRENT"
        });
        const response = await client.send(command);

        if (response.SecretString) {
            return response.SecretString;
        } else {
            const decodedBinarySecret = Buffer.from(response.SecretBinary, 'base64').toString('ascii');
            return decodedBinarySecret;
        }
    } catch (err) {
        console.error("Error retrieving secret:", err);
        throw err;
    }
}

module.exports = getSecret;

// Example usage
// (async () => {
//     const secretName = 's3apikey'; // Replace with your secret name
//     try {
//         const secret = await getSecret(secretName);
//         console.log('Secret:', secret);
//     } catch (err) {
//         console.error('Failed to retrieve secret:', err);
//     }
// })();
