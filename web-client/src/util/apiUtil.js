const axios = require("axios");

export const commonAxios = axios.create({
  baseURL: "http://localhost:8086/",
  timeout: 3000
});

function sleep(delay, value) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay, value);
  });
}
commonAxios.interceptors.response.use(
  function (response) {
    const { data } = response;
    console.log(response);

    if (data.code !== 1) {
      const error = new Error(data.message || "Uknown error.");
      error.data = data.data;
      throw error;
    }
    return sleep(1000, data.data);
  },
  function (error) {
    return Promise.reject(error);
  }
);
