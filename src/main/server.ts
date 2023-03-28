import { MongoHelper } from "../infra/db/mongodb/mongo-helpers";

import env from "./config/env";

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import("./config/app")).default;
    app.listen(env.port, () =>
      console.log(`"Running on http://localhost:${env.port}`)
    );
  })
  .catch(console.error);
