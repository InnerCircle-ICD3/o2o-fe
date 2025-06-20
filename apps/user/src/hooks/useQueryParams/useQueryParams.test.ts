import { describe, expect, it } from "vitest";
import { useQueryParams } from ".";

describe("useQueryParams", () => {
  it("setQueryParams로 쿼리 파라미터를 추가/수정할 수 있다", () => {
    const { setQueryParams, getQueryParams, queryParams } = useQueryParams();
    setQueryParams("foo", "bar");
    expect(getQueryParams("foo")).toBe("bar");
    setQueryParams("foo", "baz");
    expect(getQueryParams("foo")).toBe("baz");
    expect(queryParams.get("foo")).toBe("baz");
  });

  it("setAllQueryParams로 여러 쿼리 파라미터를 한 번에 추가할 수 있다", () => {
    const { setAllQueryParams, getQueryParams, queryParams } = useQueryParams();
    setAllQueryParams({ a: "1", b: 2, c: undefined });
    expect(getQueryParams("a")).toBe("1");
    expect(getQueryParams("b")).toBe("2");
    expect(getQueryParams("c")).toBe("");
    expect(queryParams.get("a")).toBe("1");
    expect(queryParams.get("b")).toBe("2");
    expect(queryParams.get("c")).toBe("");
  });

  it("getAllQueryParams로 동일 키의 모든 값을 조회할 수 있다", () => {
    const { setQueryParams, getAllQueryParams, queryParams } = useQueryParams();
    setQueryParams("multi", "1");
    queryParams.append("multi", "2");
    expect(getAllQueryParams("multi")).toEqual(["1", "2"]);
  });
});
