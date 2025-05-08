// config/loadEnv.js
import dotenv from 'dotenv';
import { resolve } from 'path';

const env = process.env.NODE_ENV || 'production';
const envFile = env === 'development' ? 'dev.env' : '.env';

dotenv.config({ path: resolve(process.cwd(), envFile) });
