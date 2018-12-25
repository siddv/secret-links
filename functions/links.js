import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

exports.handler = async (event) => {
  const { headers: { authorization } } = event;
  const authenticatationSuccess = bcrypt.compareSync(authorization, process.env.hash);

  const response = {
    statusCode: authenticatationSuccess ? 200 : 401,
    body: authenticatationSuccess ? JSON.stringify({
      title: process.env.title,
      links: JSON.parse(process.env.links),
    }) : '',
  };

  console.log('response', response);

  return {
    headers: {
      'content-type': 'application/json',
    },
    ...response,
  };
};
