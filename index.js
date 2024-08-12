//░█▀▄░█▀▀░█▀█░█▀▀░█▀█░█▀▄░█▀▀░█▀█░█▀▀░▀█▀░█▀█░█▀▀
//░█░█░█▀▀░█▀▀░█▀▀░█░█░█░█░█▀▀░█░█░█░░░░█░░█▀█░▀▀█
//░▀▀░░▀▀▀░▀░░░▀▀▀░▀░▀░▀▀░░▀▀▀░▀░▀░▀▀▀░▀▀▀░▀░▀░▀▀▀

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const helmetConfig = require('./scripts/helmet-config');

//░█▀▀░█▀█░█▀█░█▀▀░▀█▀░█▀▀
//░█░░░█░█░█░█░█▀▀░░█░░█░█
//░▀▀▀░▀▀▀░▀░▀░▀░░░▀▀▀░▀▀▀

const app = express();
app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(helmetConfig);

const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan(':date[web] :method :url :status :response-time ms :remote-addr', { stream: logStream }));

//░█▀▄░█▀█░█░█░▀█▀░█▀▀░█▀▄
//░█▀▄░█░█░█░█░░█░░█▀▀░█▀▄
//░▀░▀░▀▀▀░▀▀▀░░▀░░▀▀▀░▀░▀

const execRoutes = require('./routes/exec');
const formsRoutes = require('./routes/forms');
const figletRoutes = require('./routes/api-figlet');
const filesRoutes = require('./routes/upload');
const ejemploApi = require('./routes/ejemplo-api');
const ejemploAuth = require('./routes/ejemplo-auth');

app.use(execRoutes);
app.use(formsRoutes);
app.use(figletRoutes);
app.use(filesRoutes);
app.use(ejemploAuth);
app.use("/apiv1",ejemploApi);

//░█▀▀░█▀█░█▀▄░█▀█░█▀█░▀█▀░█▀█░▀█▀░█▀▀
//░█▀▀░█░█░█░█░█▀▀░█░█░░█░░█░█░░█░░▀▀█
//░▀▀▀░▀░▀░▀▀░░▀░░░▀▀▀░▀▀▀░▀░▀░░▀░░▀▀▀

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/contenido.html');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

module.exports = app;

