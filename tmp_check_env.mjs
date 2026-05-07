import dotenv from 'dotenv';
import fs from 'fs';
const envPath = new URL('./.env', import.meta.url);
console.log('envFileExists=', fs.existsSync(envPath));
dotenv.config({ path: envPath.pathname });
console.log('OPENAI_API_KEY=', process.env.OPENAI_API_KEY);
console.log('length=', process.env.OPENAI_API_KEY?.length);
console.log('startsWith=', process.env.OPENAI_API_KEY?.startsWith('sk-'));
