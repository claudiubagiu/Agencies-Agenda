const adminRoutes = require('./routes/admin');
const agencyRoutes = require('./routes/agency');

const express = require('express');

const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const sequelize = require('./util/database');

app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(agencyRoutes);

sequelize
    .sync()
    .then(result => {
        app.listen(3000/*, '192.168.0.52'*/);
    })
    .catch(err => {
        console.log(err);
    });