import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("mypage/terms/page", () => {
  it("약관 전문(mockTerms)이 화면에 노출된다", () => {
    render(<Page />);
    expect(screen.getByText(/제1조 \(목적\)/)).toBeInTheDocument();
    expect(screen.getByText(/제13조 \(회원 탈퇴 및 자격 상실\)/)).toBeInTheDocument();
    expect(screen.getByText(/O2O 지역 기반 랜덤박스 커머스 플랫폼/)).toBeInTheDocument();
    expect(
      screen.getByText(/회원 탈퇴 시 해당 회원의 개인정보는 개인정보처리방침에 따라 처리/),
    ).toBeInTheDocument();
  });
});
