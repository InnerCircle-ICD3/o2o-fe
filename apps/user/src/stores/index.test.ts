import { useSearchHistoryStore } from "./index";

describe("stores index", () => {
  it("useSearchHistoryStore를 export 한다", () => {
    expect(useSearchHistoryStore).toBeDefined();
  });
});
