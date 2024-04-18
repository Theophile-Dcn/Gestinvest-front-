import { BaseURL, header } from './API-info';

const GetDashboard = async () => {
  try {
    const response = await fetch(`${BaseURL}dashboard/`, {
      method: 'GET',
      headers: header,
    });

    const dataGetdashboard = await response.json();
    if (!response.ok) {
      throw new Error(dataGetdashboard.errorMessage);
    }
    return dataGetdashboard;
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    throw error;
  }
};

export default GetDashboard;
