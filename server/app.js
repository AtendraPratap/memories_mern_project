const express = require('express');
// import bodyParser from 'body-parser';
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const postRoutes = require('./routes/posts.js');
const userRoutes = require('./routes/users.js');

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: "true" }));
app.use(express.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

// Routes
app.use('/posts', postRoutes);
app.use('/users', userRoutes);