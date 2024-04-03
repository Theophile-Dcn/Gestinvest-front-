import React from 'react';
// Import ReactDOM qui permet d'injecter notre application dans le DOM
import ReactDOM from 'react-dom/client';
// Import de notre composant principal App
import App from './components/App/App';
// Import de notre fichier de style global
import './styles/index.scss';

// Création d'un "root" pour notre application (à partir d'un élément HTML)
// puis injection de notre application dans le DOM (.render())
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
