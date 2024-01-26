import { object, string } from 'zod';

export const AppSchema = object({
  port: string().transform((arg) => (Number.isNaN(parseInt(arg, 10)) ? 3000 : Number(arg))),
  host: string().min(1),
  hostName: string().min(1),
});

export const appConfig = AppSchema.parse({
  port: process.env.PORT,
  host: process.env.HOST,
  hostName: process.env.HOST_NAME,
});
