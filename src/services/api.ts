import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
  },
});


// // interceptor for simulantion latency
// api.interceptors.request.use((config) => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(config), 1000); // 1 s delay
//   });
// });
