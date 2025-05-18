import exampleHandlers from "./example";
import recommendationsHandlers from "./recommendations";
import { searchMapHandlers } from "./search/location";

export const handlers = [
  ...exampleHandlers,
  ...recommendationsHandlers,
  ...searchMapHandlers,
];
