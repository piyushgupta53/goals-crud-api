const express = require('express');
const app = express();
const goalRoutes = require('./backend/routes/goalsRoutes');
const userRoutes = require('./backend/routes/usersRoutes');
require('dotenv').config();

const connectDB = require('./backend/config/db');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);

app.listen(3000, () => {
    console.log(`Server listening on port 3000`);
});
