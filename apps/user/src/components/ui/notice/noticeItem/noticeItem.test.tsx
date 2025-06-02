import type { Notice } from "@/types/apis/notice.type";
import { render, screen } from "@testing-library/react";
import NoticeItem from "./index";

describe("NoticeItem", () => {
  const mockNotice: Notice = {
    id: 1,
    title: "테스트 공지사항",
    createdAt: "2024-01-01T00:00:00.000Z",
  };

  it("공지사항 제목이 표시된다", () => {
    render(<NoticeItem notice={mockNotice} />);

    expect(screen.getByText("테스트 공지사항")).toBeInTheDocument();
  });

  it("공지사항 날짜가 포맷되어 표시된다", () => {
    render(<NoticeItem notice={mockNotice} />);

    // formatDate 함수의 결과에 따라 수정 필요
    expect(screen.getByText("2024-01-01")).toBeInTheDocument();
  });

  it("공지사항 상세 페이지로의 링크가 올바르게 설정된다", () => {
    render(<NoticeItem notice={mockNotice} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/mypage/notice/1");
  });

  it("화살표 아이콘이 표시된다", () => {
    render(<NoticeItem notice={mockNotice} />);

    const arrow = screen.getByAltText("");
    expect(arrow).toBeInTheDocument();
  });
});
