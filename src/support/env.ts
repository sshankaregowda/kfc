import dotenv from "dotenv";

const env = process.env.ENV || "uat";

// Load once
dotenv.config({ path: `.env.${env}` });

export const config = {
  baseUrl: process.env.BASE_URL as string,
  browser: process.env.BROWSER || "chrome"
};