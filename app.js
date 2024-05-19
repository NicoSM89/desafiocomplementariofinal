require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Conectar a la base de datos
connectDB();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/admin', require('./middlewares/isAdmin'), express.static('views/admin.ejs'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
