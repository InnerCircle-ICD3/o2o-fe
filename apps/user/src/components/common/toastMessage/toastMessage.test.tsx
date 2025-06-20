import { useToastStore } from "@/stores/useToastStore";
import { act, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { ToastMessage } from ".";

describe("ToastMessage", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    useToastStore.setState({
      message: "",
      isVisible: false,
      isError: false,
      hideToast: () => {},
    });
  });

  it("isVisible가 true일 때 useToastStore에 전달된 message가 렌더링 된다.", () => {
    useToastStore.setState({
      message: "테스트 메세지",
      isVisible: true,
      isError: false,
      hideToast: () => {},
    });

    render(<ToastMessage />);
    expect(screen.getByText("테스트 메세지")).toBeInTheDocument();
  });

  it("isVisible가 false일 때 ToastMessage가 렌더링되지 않는다.", () => {
    useToastStore.setState({
      message: "테스트 메세지",
      isVisible: false,
      isError: false,
      hideToast: () => {},
    });

    render(<ToastMessage />);
    expect(screen.queryByText("테스트 메세지")).not.toBeInTheDocument();
  });

  it("isError가 true일 때 errorToast 클래스가 적용된다.", () => {
    useToastStore.setState({
      message: "테스트 메세지",
      isVisible: true,
      isError: true,
      hideToast: () => {},
    });

    render(<ToastMessage />);
    const toast = screen.getByText("테스트 메세지");
    expect(toast.className).toContain("errorToast");
    expect(toast.className).not.toContain("successToast");
  });

  it("isError가 false일 때 successToast 클래스가 적용된다.", () => {
    useToastStore.setState({
      message: "테스트 메세지",
      isVisible: true,
      isError: false,
      hideToast: () => {},
    });

    render(<ToastMessage />);
    const toast = screen.getByText("테스트 메세지");
    expect(toast.className).toContain("successToast");
    expect(toast.className).not.toContain("errorToast");
  });

  it("2초 후에 fadeOut 클래스가 적용된다.", () => {
    useToastStore.setState({
      message: "테스트 메세지",
      isVisible: true,
      isError: false,
      hideToast: () => {},
    });

    render(<ToastMessage />);
    const toast = screen.queryByText("테스트 메세지");
    expect(toast?.className).toContain("fadeIn");
    expect(toast?.className).not.toContain("fadeOut");

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(toast?.className).toContain("fadeOut");
    expect(toast?.className).not.toContain("fadeIn");
  });

  it("2.3초 후에 hideToast가 호출되고 ToastMessage가 완전히 사라진다.", () => {
    const hideToast = () => {
      useToastStore.setState({ isVisible: false });
    };

    useToastStore.setState({
      message: "테스트 메세지",
      isVisible: true,
      isError: false,
      hideToast,
    });

    render(<ToastMessage />);
    expect(screen.queryByText("테스트 메세지")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2300);
    });

    expect(screen.queryByText("테스트 메세지")).not.toBeInTheDocument();
  });
});
