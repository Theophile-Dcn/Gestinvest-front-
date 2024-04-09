import { useParams } from 'react-router-dom';
import { BaseURL, header } from './API-info';

const GetDashboard = async (uuid: string) => {
  try {
    const response = await fetch(`${BaseURL}/dashboard/${uuid}`, {
      method: 'GET',
      headers: header,
    });

    const dataGetdashboard = await response.json();
    if (!response.ok) {
      throw new Error(dataGetdashboard.errorMessage);
    }
    console.log(dataGetdashboard);
    return dataGetdashboard;
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    throw error;
  }
};

export default GetDashboard;
