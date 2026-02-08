import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { router as UserRouter } from "./routes/user.route";
import { router as FileRouter } from "./routes/file.route";

export function routesBind(app: Koa<Koa.DefaultState, Koa.DefaultContext>) {
  console.log("Binding routes...");
  bodyParser()
  app.use(UserRouter.routes());
  app.use(FileRouter.routes());
}
