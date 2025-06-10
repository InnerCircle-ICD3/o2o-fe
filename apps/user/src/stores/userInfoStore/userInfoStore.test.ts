// apps/user/src/stores/userInfoStore/index.test.ts

import { act } from "react-dom/test-utils";
import { userInfoStore } from "./index";

describe("userInfoStore", () => {
  afterEach(() => {
    userInfoStore.getState().clearUser();
  });

  it("초기 user 값은 null이어야 한다", () => {
    expect(userInfoStore.getState().user).toBeNull();
  });

  it("setUser로 user 값을 설정할 수 있다", () => {
    const user = {
      userId: "test123",
      roles: ["admin"],
      nickname: "테스터",
      customerId: 1,
    };

    act(() => {
      userInfoStore.getState().setUser(user);
    });

    expect(userInfoStore.getState().user).toEqual(user);
  });

  it("clearUser로 user 값을 null로 초기화할 수 있다", () => {
    const user = {
      userId: "test123",
      roles: ["admin"],
      nickname: "테스터",
      customerId: 1,
    };

    act(() => {
      userInfoStore.getState().setUser(user);
      userInfoStore.getState().clearUser();
    });

    expect(userInfoStore.getState().user).toBeNull();
  });
});
