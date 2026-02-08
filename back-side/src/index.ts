import "dotenv/config";
import Koa from "koa";
import { routesBind } from "./route";
import server from "koa-static";
import path from "node:path";

const app = new Koa();
app.use(server(path.join(__dirname, "../", "asserts")));
routesBind(app);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Koa server listening on port (http://localhost:${PORT})`);
});
