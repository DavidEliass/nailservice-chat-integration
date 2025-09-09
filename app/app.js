import { serverClient } from "./main.js";

serverClient.listen({ port: 3000, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running!");
});

