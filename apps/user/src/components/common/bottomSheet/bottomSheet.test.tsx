import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import BottomSheet from ".";
import * as style from "./bottomSheet.css";

describe("BottomSheet Test", () => {
  beforeEach(() => {
    const bottomElement = document.createElement("div");
    bottomElement.id = "bottom-sheet";

    document.body.appendChild(bottomElement);
  });

  afterEach(() => {
    cleanup();
    const el = document.querySelector("#bottom-sheet");
    if (el) {
      document.body.removeChild(el);
      el.remove();
    }
  });

  it("isShow=true일 때 제목과 children이 id가 bottom-sheet 요소 안에 렌더링되어야 한다", () => {
    render(
      <BottomSheet isShow={true} title="테스트 시트" onClose={() => {}}>
        <p>내용</p>
      </BottomSheet>,
    );

    const portalElement = document.getElementById("bottom-sheet") as HTMLDivElement;
    const outerElement = portalElement.firstChild as HTMLElement;

    expect(outerElement).toBeInTheDocument();
    expect(screen.getByText("테스트 시트")).toBeInTheDocument();
    expect(screen.getByText("내용")).toBeInTheDocument();
  });

  it("isShow=false일 때 숨겨진 스타일 클래스가 적용된다", () => {
    render(
      <BottomSheet isShow={false} title="숨김" onClose={() => {}}>
        <p>숨김 내용</p>
      </BottomSheet>,
    );

    const portalElement = document.getElementById("bottom-sheet") as HTMLDivElement;
    const outerElement = portalElement.firstChild as HTMLElement;

    expect(outerElement.className).toContain(style.container.hidden); // 실제 클래스 이름 대신 스타일 명칭 기반 확인
  });

  it("type이 shadow이고 isShow=true일 때 어두운 배경 버튼이 렌더링된다", () => {
    render(
      <BottomSheet isShow={true} type="shadow" title="쉐도우" onClose={() => {}}>
        <p>내용</p>
      </BottomSheet>,
    );

    // 배경(button) 요소가 존재하는지
    const backdrop = document.querySelector(`.${style.shadow}`);
    expect(backdrop).toBeInTheDocument();
  });

  it("type이 common이고 isShow=true일 때 배경 버튼이 렌더링되지 않는다", () => {
    render(
      <BottomSheet isShow={true} type="common" title="커먼" onClose={() => {}}>
        <p>내용</p>
      </BottomSheet>,
    );

    // 배경(button) 요소가 존재하지 않는지
    const backdrop = document.querySelector(`.${style.shadow}`);
    expect(backdrop).not.toBeInTheDocument();
  });

  it("닫기 버튼을 클릭하면 onClose가 호출되어야 한다", () => {
    const mockClose = vi.fn();
    render(
      <BottomSheet isShow={true} title="닫기 테스트" onClose={mockClose}>
        <p>내용</p>
      </BottomSheet>,
    );

    const closeBtn = document.querySelector(`.${style.close}`) as HTMLButtonElement;
    fireEvent.click(closeBtn);
    expect(mockClose).toHaveBeenCalled();
  });

  it("type이 shadow일 때 배경을 클릭하면 onClose가 호출되어야 한다", () => {
    const mockClose = vi.fn();
    render(
      <BottomSheet isShow={true} type="shadow" title="백드롭 테스트" onClose={mockClose}>
        <p>내용</p>
      </BottomSheet>,
    );

    const backdrop = document.querySelector(`.${style.shadow}`) as HTMLButtonElement;
    fireEvent.click(backdrop);
    expect(mockClose).toHaveBeenCalled();
  });
});
