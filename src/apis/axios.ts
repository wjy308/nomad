import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sp-globalnomad-api.vercel.app/2-5',
});

instance.interceptors.request.use((config) => {
  const newConfig = { ...config };
  if (newConfig.headers.Authorization) return newConfig;

  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    newConfig.headers.Authorization = `Bearer ${accessToken}`;
  }
  return newConfig;
});

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refreshToken');
    if (error.response?.status === 401 && !originalRequest.retryAttempt && refreshToken) {
      const res = await instance.post(
        '/auth/tokens',
        {},
        {
          headers: { Authorization: `Bearer ${refreshToken}` },
        },
      );
      const { accessToken } = res.data;
      const nextRefreshToken = res.data.refreshToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', nextRefreshToken);
      originalRequest.retryAttempt = true;

      return instance(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default instance;
