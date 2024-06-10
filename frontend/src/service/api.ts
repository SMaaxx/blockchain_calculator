import axios from 'axios';

export const calculate = async (expression: string) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/calculation`, { expression: expression });


    console.log('response.data -> ', response.data);
    return response.data
  } catch (e) {
    return {
      history: ['Ошибка'],
      result: 'Ошибка'
    }
  }
};