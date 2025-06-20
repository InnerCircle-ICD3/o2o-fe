import { render, screen } from "@testing-library/react";
import { LoadingMap } from ".";

describe("LoadingMap", () => {
  it("LoadingMap 컴포넌트가 렌더링되면 이미지와 텍스트가 표시된다.", () => {
    render(<LoadingMap />);
    expect(screen.getByRole("img", { name: "loading" })).toBeInTheDocument();
    expect(screen.getByText("지도를 불러오는 중입니다...")).toBeInTheDocument();
  });
});
