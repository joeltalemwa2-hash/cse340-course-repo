// server.js
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

import { testConnection } from './src/models/db.js';
import router from './src/routes/index.js';

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.use((req, res, next) => {
    res.locals.isDevelopment = NODE_ENV === 'development';
    next();
});

app.use('/', router);

app.use((req, res) => {
    const title = 'Page Not Found';
    res.status(404).render('404', { title });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    const title = 'Server Error';
    res.status(500).render('500', { title });
});

app.listen(PORT, async () => {
    try {
        await testConnection();
        console.log(`Server is running at http://127.0.0.1:${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});