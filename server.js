import "dotenv/config";
import app from "./api/server.js";
import { PORT } from "./api/services/helpers/environment.js";


app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
