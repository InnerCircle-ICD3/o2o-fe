import { render } from "@testing-library/react";
import LoginLink from ".";

describe("LoginLink Test", () => {
  it("로그인 정보가 있다면 사용자 이름과 이메일이 나타난다.", () => {
    const userInfo = {
      success: true,
      data: {
        name: "재완",
        email: "test@naver.com",
      },
    } as const;

    const { getByText } = render(<LoginLink userInfo={userInfo} />);

    expect(getByText(userInfo.data.name)).toBeInTheDocument();
    expect(getByText(userInfo.data.email)).toBeInTheDocument();
  });

  it("로그인 정보가 없다면 로그인 안내 문구가 나타난다.", () => {
    const userInfo = {
      success: false,
      errorCode: "NOT_LOGGED_IN",
      errorMessage: "로그인이 필요합니다.",
    } as const;

    const { getByText } = render(<LoginLink userInfo={userInfo} />);

    expect(getByText("로그인")).toBeInTheDocument();
    expect(getByText("로그인을 하면 더 많은 서비스를 이용할 수 있어요.")).toBeInTheDocument();
  });
});
