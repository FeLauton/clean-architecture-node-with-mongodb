import fg from "fast-glob";
import { Express, Router } from "express";

export default (app: Express): void => {
  const router = Router();
  app.use("/api", router);
  fg.sync("**/src/main/routes/**routes.ts").map(async (file) =>
    (await import(`../../../${file}`)).default(router)
  );
};
