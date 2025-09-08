
import { serverClient } from "./main.ts";




serverClient.listen({ port: 3000, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running!");
});
