import {IP_URL} from '@env';

export const fetchVideoKey = async ({type, id, token}) => {
  if (!token) return null;

  try {
    const response = await fetch(`${IP_URL}/${type}/${id}/trailers`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (result.success && result.trailers.length > 0) {
      return result.trailers[0].key;
    }
  } catch (error) {
    console.error('Error fetching trailer:', error);
  }

  return null;
};
