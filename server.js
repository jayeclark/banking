import "dotenv/config";
import app from "./api/server.js";
import { SERVER_PORT } from "./api/services/helpers/environment.js";


app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}...`));
