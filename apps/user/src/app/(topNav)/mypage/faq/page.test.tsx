import { render } from "@testing-library/react";
import Page from "./page";

describe("FAQ Page", () => {
  it("페이지가 렌더링된다", () => {
    const { container } = render(<Page />);

    expect(container).toBeTruthy();
  });
});
