const axios = require('axios');

export const commonAxios = axios.create({
  baseURL: 'http://localhost:8086/'
});

commonAxios.interceptors.response.use(
  function(response) {
    const { data } = response;
    if (data.code !== 1) {
      const error = new Error(data.message || 'Uknown error.');
      error.data = data.data;
      throw error;
    }
    return data.data;
  },
  function(error) {
    return Promise.reject(error);
  }
);
