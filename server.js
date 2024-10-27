const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serwuj pliki statyczne z katalogu głównego
app.use(express.static(path.join(__dirname)));

// Dodaj specyficzną ścieżkę dla ikon
app.use('/icons', express.static(path.join(__dirname, 'icons')));

// Dodaj logowanie dla żądań ikon
app.get('/icons/:iconName', (req, res, next) => {
  console.log(`Próba dostępu do ikony: ${req.params.iconName}`);
  next();
});

// Obsługa stron głównych
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Obsługa błędów 404 dla ikon
app.use('/icons', (req, res, next) => {
  console.log('404: Nie znaleziono ikony:', req.url);
  res.status(404).send('Nie znaleziono ikony');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Ścieżka do ikon: ${path.join(__dirname, 'icons')}`);
});