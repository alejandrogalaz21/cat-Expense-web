import axios from 'axios';

export const getCatFact = async (): Promise<string> => {
  try {
    const res = await axios.get('https://catfact.ninja/fact');
    return res.data.fact;
  } catch (error) {
    console.error('Failed to fetch cat fact:', error);
    return 'Cats are awesome!';
  }
};
