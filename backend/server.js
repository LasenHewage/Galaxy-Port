// require('dotenv').config()

// const express = require('express')
// const mongoose = require('mongoose')
// const userRoutes = require('./routes/user')
// const cors = require('cors');

// // express app
// const app = express()

// app.use(cors({ origin: 'http://localhost:5173' }));

// // Parse JSON request bodies
// app.use(express.json());

// app.use((req, res, next) => {
//     console.log(req.path, req.method)
//     next()
// })

// app.use('/api/user', userRoutes)

// // connect to db
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         // listen for requests
//         app.listen(process.env.PORT, () => {
//             console.log('connected to db & listening on port', process.env.PORT)
//         })
//     })
//     .catch((error) => {
//         console.log(error)
//     })


require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const cors = require('cors');

// express app
const app = express();

// Parse JSON request bodies
app.use(express.json());

// CORS middleware
app.use(cors({ origin: 'https://galaxy-port.netlify.app' }));

// Logger middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api/user', userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });

