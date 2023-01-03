import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  env: {
    REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
  },
};
