import axios from 'axios';

export const firebaseInstance = token =>
  axios.create({
    baseURL: 'https://pita-weather.firebaseio.com/',
    params: {
        auth: token
    }
  });
