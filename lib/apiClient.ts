import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_FACEIT_URL,
  isServer = typeof window === 'undefined',
  API_KEY = process.env.NEXT_PUBLIC_API_FACEIT_KEY;

const httpClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
});

export default httpClient;
