export const SERVER_PORT = process.env.SERVER_PORT || 8080;
export const DB_URI = process.env.DB_URI;
export const DB_NAME = process.env.NODE_ENV == "development" ? process.env.DB_NAME_TEST : process.env.DB_NAME;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;