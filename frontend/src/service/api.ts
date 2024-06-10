import axios from 'axios';

export const calculate = async (expression: string) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/calculation`, { expression: expression});

    return response.data
  } catch (e) {
    console.log('Cannot get', e);
  }
};