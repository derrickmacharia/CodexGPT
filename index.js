// 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

const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const configuration = new Configuration({
    organization: "org-BLpCUtBkEkRr6XG0wrTgu3qI",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// add body parser and corrs to express
// const bodyParser = require('body-parser')
// const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

// can you please add cors to express
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

const port = 3080

app.post('/', async (req, res) =>{
    const { message, currentModel } = req.body;
    console.log(message, "message")

    const response = await openai.createCompletion({
        model: `${currentModel}`, // "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 1000,
        temperature: 0.5,
    });
    res.json({
        // data: response.data
        message: response.data.choices[0].text,
    })
});

app.get('/models', async (req, res) =>{
    const response = await openai.listEngines();
    console.log(response.data.data)
    res.json({
        models: response.data.data
    })
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
