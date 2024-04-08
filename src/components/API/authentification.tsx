// Authentication.tsx

import { BaseURL } from './API-info';

export const register = async (
  email: string,
  password: string,
  confirmation: string
) => {
  try {
    const response = await fetch(`${BaseURL}auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, confirmation }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.errorMessage);
    }
    // Afficher une alerte pour le succès de l'inscription
    alert(data.successMessage);
    return data;
  } catch (error) {
    console.error('Error registering:', error);
    // Afficher une alerte pour l'erreur lors de l'inscription
    alert(error.message);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${BaseURL}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.errorMessage);
    }

    // Stocker le token JWT dans le localStorage
    localStorage.setItem('token', data.token);
    // stocker le uuid dans le localstorage
    localStorage.setItem('user', data.user);

    console.log(`je suis le code token : ${data.token}`);
    console.log(`je suis le code user : ${data.user}`);

    // Afficher une alerte pour le succès de la connexion
    alert('Login successful');
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    // Afficher une alerte pour l'erreur lors de la connexion
    alert(error.message);
    throw error;
  }
};
