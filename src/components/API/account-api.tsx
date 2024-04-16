import { BaseURL, header } from './API-info';

const GetAccountInfo = async () => {
  try {
    const response = await fetch(`${BaseURL}account/`, {
      method: 'GET',
      headers: header,
    });

    const dataGetAccountInfo = await response.json();
    if (!response.ok) {
      throw new Error(dataGetAccountInfo.errorMessage);
    }
    console.log(dataGetAccountInfo);
    return dataGetAccountInfo;
  } catch (error) {
    console.error('Error fetching account:', error);
    throw error;
  }
};

export default GetAccountInfo;
