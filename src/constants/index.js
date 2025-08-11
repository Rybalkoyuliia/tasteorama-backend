import path, { resolve } from 'node:path';
export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');

export const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const getAccessTokenValidUntil = () =>
  new Date(Date.now() + 15 * 60 * 1000);

export const getRefreshTokenValidUntil = () =>
  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

export const TEMP_DIR = resolve('temp');
export const UPLOADS_DIR = resolve('uploads');

export const sortList = ['asc', 'desc'];

export const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://tasteorama-eight.vercel.app',
];
