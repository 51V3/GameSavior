const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const url = 'https://game-savior-backend.onrender.com' + event.path;
  const response = await fetch(url, {
    headers: {
      'Access-Control-Allow-Origin': 'https://gamesavior.netlify.app',
    },
  });
  const data = await response.json();

  return {
    statusCode: response.status,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
