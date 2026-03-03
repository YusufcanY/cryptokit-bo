import axios from 'axios';

export const coingeckoApi = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
  },
});

export default coingeckoApi;
