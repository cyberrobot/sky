import fetchIntercept from 'fetch-intercept';

export const registerApiInterceptors = () => {
  fetchIntercept.register({
    request: function (url, requestConfig) {
      requestConfig = requestConfig || {};
      // There may be more API sources in the future
      if (requestConfig.headers && url.includes(config.apiUrl)) {
        requestConfig.headers.Authorization =
          requestConfig.headers.Authorization || requestConfig.token;
      } else {
        requestConfig.headers = {
          Authorization: config.apiToken,
        };
      }
      return [url, requestConfig];
    },
  });
};

export const config = {
  apiUrl: 'https://api.themoviedb.org/3',
  apiToken:
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjNkODU4MzU2ODgxZTQwYzdlZGMwODg1ZTJmZmMwMSIsInN1YiI6IjY0MzEzNmVkMWI3Mjk0MDBmMWUyMzY0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bWUvPGhOJfx8QqaTG3TanX6MZ4HeTuS7imDpusDvPO4',
};
