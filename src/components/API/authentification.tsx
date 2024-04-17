/* eslint-disable no-alert */
// Authentication.tsx

import { toast } from 'react-toastify';
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
      toast.error(data.errorMessage);
      // throw new Error(data.errorMessage);
    }
    // Afficher une alerte pour le succès de l'inscription
    toast.success(
      'Inscription réussie, veuillez vous connecter pour continuer'
    );
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      // Afficher une alerte pour l'erreur lors de la connexion
      // alert(error.message);
      toast.error(error.message);
    }
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
      // throw new Error(data.errorMessage);
      toast.error(data.errorMessage);
    }

    // Stocker le token JWT dans le localStorage
    localStorage.setItem('token', data.token);

    // Afficher une alerte pour le succès de la connexion
    // alert('Login successful');
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      // Afficher une alerte pour l'erreur lors de la connexion
      // alert(error.message);
      toast.error(error.message);
    }

    throw error;
  }
};
