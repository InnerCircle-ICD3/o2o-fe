import accountsHandlers from "./accounts";
import exampleHandlers from "./example";
import ordersHandlers from "./orders";
import recommendationsHandlers from "./recommendations";
import searchMapHandlers from "./search/location";
import searchStoreHandlers from "./search/store";
import subscribeHandlers from "./subscribe";

import storesHandlers from "./stores";

export const handlers = [
  ...exampleHandlers,
  ...recommendationsHandlers,
  ...storesHandlers,
  ...ordersHandlers,
  ...searchMapHandlers,
  ...searchStoreHandlers,
  ...accountsHandlers,
  ...subscribeHandlers,
];
