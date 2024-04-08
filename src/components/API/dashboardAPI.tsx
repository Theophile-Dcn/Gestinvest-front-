import { useParams } from 'react-router-dom';

const uuid = useParams();

export const headers = {
  'Content-Type': 'application/json',
};

export const GetDashboard = async (uuid) => {
  try {
    // Récupérer le token à l'intérieur de la fonction GetDashboard
    const token = localStorage.getItem('token');
    // Ajouter le token aux en-têtes
    headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${BaseURLDashboard}dashboard/user/${uuid}`, {
      method: 'GET',
      headers: headers,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.errorMessage);
    }

    return data;
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    throw error;
  }
};
