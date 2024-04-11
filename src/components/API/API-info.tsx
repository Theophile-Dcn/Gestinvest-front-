// API info est un fichier qui me permet de transmettre les viariable d'environnement a plusieurs fichier en meme temps
// Récupérer le token à l'intérieur de la fonction GetDashboard
const token = localStorage.getItem('token');

export const header = {
  'Content-Type': 'application/json',
  // Placer le token dans les autorisations
  Authorization: `Bearer ${token}`,
};
// Test sur local BDD
// export const BaseURL = 'http://localhost:3000/api/';

// Server deploy
export const BaseURL = 'https://gestinvest-1-c6d9743eb2ea.herokuapp.com/api/';

