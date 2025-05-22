import exampleHandlers from "./example";
import ordersHandlers from "./orders";
import recommendationsHandlers from "./recommendations";
import searchMapHandlers from "./search/location";

import storesHandlers from "./stores";

export const handlers = [
  ...exampleHandlers,
  ...recommendationsHandlers,
  ...storesHandlers,
  ...ordersHandlers,
  ...searchMapHandlers,
];
