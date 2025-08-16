import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module equivalents of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// The deployment environment provides the port to listen on. Fallback to 8080 for local testing.
const port = process.env.PORT || 8080;

// Serve static files from the root directory where index.html lives
app.use(express.static(path.join(__dirname, '/')));

// This catch-all route is a fallback to send index.html. This is useful for client-side routing.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running and listening on port ${port}`);
});
