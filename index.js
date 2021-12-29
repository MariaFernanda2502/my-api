const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

const usersRouter = require('./users');

app.use(bodyParser.json());
app.use(cors());

app.get('/users/:userId', (req, res) => {
    let { userId, message } = req.params;
    res.send(`Hello!! this is tour user id: ${userId}
    and your message is ${message}`);
});

app.use('/users', usersRouter);

app.get('/users', (req, res) => {
    res.send(process.env.DB_USER);
});

app.get('/', (req, res, next) => {
    let date = new Date()
    res.status(200).json({ 
        name: 'Fernanda',
        greeting: 'Hello Humans!',
        date
     })
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	return res.status(500).json({
		"name": err.name,
		"message": `${err.message}, ${err.original ? err.original : ':('}`,
	})
})

app.listen(port, () => {
    console.log(`Hello world! the server is running in port ${port}`)
});