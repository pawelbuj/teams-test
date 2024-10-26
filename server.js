const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware CORS
app.use(cors({
  origin: '*', // Możesz ograniczyć do adresów URL Teams, jeśli chcesz większe bezpieczeństwo
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serwuj pliki statyczne z katalogu głównego
app.use(express.static(path.join(__dirname)));

// Obsługa stron głównych
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
