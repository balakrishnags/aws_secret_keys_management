const express = require("express")
const cors = require("cors")
const getSecret = require("./aws_secret_keys")
const app = express()

app.use(cors())
app.use(express.json())

const loadAWSKeys = async () => {
    const secretName = 's3apikey';
    try {
        const secret = await getSecret(secretName);
        console.log('Secret:', secret);
    } catch (err) {
        console.error('Failed to retrieve secret:', err);
    }
};
loadAWSKeys()

app.listen(process.env.PORT, (err) => {
    if (err) throw err
    console.log("Server is running at port", process.env.PORT)

})
