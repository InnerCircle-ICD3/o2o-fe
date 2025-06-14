import exampleHandlers from "./example";
import sseHandlers from "./sse";

export const handlers = [...exampleHandlers, ...sseHandlers];
