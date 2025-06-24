import { render } from "@testing-library/react";
import LoginLink from ".";

const successUserInfo = {
  success: true,
  data: {
    id: 1,
    userAccountId: 1,
    nickname: "재완",
    createAt: "2025-01-01",
    updateAt: "2025-01-01",
  },
} as const;

const failureUserInfo = {
  success: false,
  code: "NOT_LOGGED_IN",
  errorCode: "NOT_LOGGED_IN",
  name: "로그인 안내",
  message: "로그인이 필요합니다.",
  statusCode: 401,
  timestamp: new Date(),
} as const;

describe("LoginLink Test", () => {
  it("로그인 정보가 있다면 사용자 이름과 이메일이 나타난다.", () => {
    const { getAllByText } = render(<LoginLink userInfo={successUserInfo} />);

    const headings = getAllByText(successUserInfo.data.nickname);
    expect(headings.length).toBeGreaterThan(0);
    // expect(getByText(successUserInfo.data.email)).toBeInTheDocument(); // TODO: 이메일 추가 필요
  });

  it("로그인 정보가 없다면 로그인 안내 문구가 나타난다.", () => {
    const { getByText } = render(<LoginLink userInfo={failureUserInfo} />);

    expect(getByText("로그인")).toBeInTheDocument();
    expect(getByText("로그인을 하면 더 많은 서비스를 이용할 수 있어요.")).toBeInTheDocument();
  });

  it("로그인 정보가 있다면 링크가 /mypage/complete-profile로 설정된다.", () => {
    const { container } = render(<LoginLink userInfo={successUserInfo} />);
    const linkElement = container.querySelector("a");

    expect(linkElement).toHaveAttribute("href", "/mypage/complete-profile");
  });

  it("로그인 정보가 없다면 링크가 /login으로 설정된다.", () => {
    const { container } = render(<LoginLink userInfo={failureUserInfo} />);
    const linkElement = container.querySelector("a");

    expect(linkElement).toHaveAttribute("href", "/login");
  });
});
