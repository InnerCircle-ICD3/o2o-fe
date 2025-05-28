import { SOCIAL_PROVIDERS } from "@/constants/login";
import { fireEvent, render, screen } from "@testing-library/react";
import type { ImageProps } from "next/image";
import React from "react";
import Login from "./index";

// Next.js의 Image 컴포넌트를 모킹
jest.mock("next/image", () => ({
  esModule: true,
  default: (props: ImageProps) =>
    React.createElement("img", { ...props, alt: props.alt || "image" }),
}));

describe("Login Component", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_API_URL: "http://test-api.com",
    };
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.clearAllMocks();
  });

  it("모든 UI 요소가 올바르게 렌더링되어야 합니다", () => {
    render(<Login />);

    expect(screen.getByAltText("loading")).toBeInTheDocument();
    expect(screen.getByAltText("loading")).toBeInTheDocument();

    for (const { label } of Object.values(SOCIAL_PROVIDERS)) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("소셜 로그인 버튼 클릭 시 올바른 OAuth URL로 리다이렉트되어야 합니다", () => {
    const mockLocation = { href: "" };
    Object.defineProperty(window, "location", {
      value: mockLocation,
      writable: true,
    });

    render(<Login />);

    const kakaoButton = screen.getByText(SOCIAL_PROVIDERS.kakao.label);
    fireEvent.click(kakaoButton);

    expect(window.location.href).toBe(
      `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`,
    );
  });

  it("환경 변수가 설정되지 않은 경우 에러 메시지를 출력해야 합니다", () => {
    process.env.NEXT_PUBLIC_API_URL = undefined;
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    render(<Login />);

    const kakaoButton = screen.getByText(SOCIAL_PROVIDERS.kakao.label);
    fireEvent.click(kakaoButton);

    expect(consoleSpy).toHaveBeenCalledWith("환경변수 NEXT_PUBLIC_API_URL이 설정되지 않았습니다.");

    consoleSpy.mockRestore();
  });
});
