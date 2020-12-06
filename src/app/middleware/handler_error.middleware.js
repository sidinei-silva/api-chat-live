import 'dotenv/config';

import Youch from 'youch';

import AppError from '../shared/errors/AppError';

export default async function handlerError(err, req, res) {
  if (err instanceof AppError) {
    const { statusCode, message, errors } = err;
    return res.status(statusCode).json({
      status: 'error',
      message,
      errors,
    });
  }

  if (process.env.NODE_ENV === 'development') {
    const errors = await new Youch(err, req).toJSON();

    return res.status(500).json(errors);
  }

  return res.status(500).json({ error: 'Internal Server Error' });
}
