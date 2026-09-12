// server.js
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

import { getOrganizations } from './data/organizations.js';
import { getProjects } from './data/projects.js';
import { getCategories } from './data/categories.js';

// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/**
 * Configure Express middleware
 */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));

/**
 * Routes
 */
app.get('/', async (req, res) => {
  const title = 'Home';
  res.render('home', { title });
});

app.get('/organizations', async (req, res) => {
  const title = 'Organizations';
  const organizations = await getOrganizations();
  res.render('organizations', { title, organizations });
});

app.get('/projects', async (req, res) => {
  const title = 'Service Projects';
  const projects = await getProjects();
  res.render('projects', { title, projects });
});

app.get('/categories', async (req, res) => {
  const title = 'Categories';
  const categories = await getCategories();
  res.render('categories', { title, categories });
});

// Catch-all 404 handler for any route not defined above
app.use(async (req, res) => {
  const title = 'Page Not Found';
  res.status(404).render('404', { title });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});
