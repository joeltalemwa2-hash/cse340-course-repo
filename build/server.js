// server.js
import express from 'express';
import session from 'express-session';
import { fileURLToPath } from 'url';
import path from 'path';

import { testConnection } from './src/models/db.js';
import flash from './src/middleware/flash.js';
import router from './src/routes.js';

// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

// Session secret, used to sign the session ID cookie
const SESSION_SECRET = process.env.SESSION_SECRET;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/**
 * Configure Express middleware
 */

// Set up session management
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // Session expires after 1 hour of inactivity
}));

// Use flash message middleware (must come after session, before routes)
app.use(flash);

// Allow Express to receive and process common POST data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

// Environment middleware -- makes isDevelopment available to every EJS view
app.use((req, res, next) => {
    res.locals.isDevelopment = NODE_ENV === 'development';
    next();
});

/**
 * Routes
 */
app.use('/', router);

// Catch-all 404 handler -- runs when no route above matched the request
app.use((req, res) => {
    const title = 'Page Not Found';
    res.status(404).render('404', { title });
});

// Central error handler -- runs when next(error) is called anywhere in the app
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
