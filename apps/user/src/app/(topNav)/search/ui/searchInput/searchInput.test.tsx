import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import SearchInput from "./index";

const mockSetInputValue = vi.fn();
const mockSetIsFocused = vi.fn();
const mockHandleKeyDown = vi.fn();
const mockOnSearchChange = vi.fn();

const searchState = {
  inputValue: "",
  setInputValue: mockSetInputValue,
  setIsFocused: mockSetIsFocused,
  handleKeyDown: mockHandleKeyDown,
};

vi.mock("@/providers/search", () => ({
  useSearch: () => searchState,
}));

vi.mock("@/stores/useFilterTab", () => ({
  useFilterTab: () => ({
    onSearchChange: mockOnSearchChange,
  }),
}));

describe("SearchInput", () => {
  afterEach(() => {
    vi.clearAllMocks();
    searchState.inputValue = "";
  });

  it("input과 버튼이 렌더링된다", () => {
    render(<SearchInput onSubmit={vi.fn()} />);
    expect(screen.getByPlaceholderText("검색어를 입력해주세요.")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("input에 값 입력 시 setInputValue가 호출된다", () => {
    render(<SearchInput onSubmit={vi.fn()} />);
    const input = screen.getByPlaceholderText("검색어를 입력해주세요.");
    fireEvent.change(input, { target: { value: "테스트" } });
    expect(mockSetInputValue).toHaveBeenCalledWith("테스트");
  });

  it("input focus/blur 시 setIsFocused가 호출된다", () => {
    render(<SearchInput onSubmit={vi.fn()} />);
    const input = screen.getByPlaceholderText("검색어를 입력해주세요.");
    fireEvent.focus(input);
    expect(mockSetIsFocused).toHaveBeenCalledWith(true);
    fireEvent.blur(input);
    expect(mockSetIsFocused).toHaveBeenCalledWith(false);
  });

  it("input에서 keydown 발생 시 handleKeyDown이 호출된다", () => {
    render(<SearchInput onSubmit={vi.fn()} />);
    const input = screen.getByPlaceholderText("검색어를 입력해주세요.");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(mockHandleKeyDown).toHaveBeenCalled();
  });

  it("inputValue가 공백이 아니면 버튼 클릭 시 onSearchChange와 onSubmit이 호출된다", () => {
    const mockOnSubmit = vi.fn();
    searchState.inputValue = "테스트 ";
    render(<SearchInput onSubmit={mockOnSubmit} />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockOnSearchChange).toHaveBeenCalledWith("테스트");
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("inputValue가 공백이면 버튼 클릭 시 아무것도 호출되지 않는다", () => {
    const mockOnSubmit = vi.fn();
    searchState.inputValue = "   ";
    render(<SearchInput onSubmit={mockOnSubmit} />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockOnSearchChange).not.toHaveBeenCalled();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
