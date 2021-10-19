import { getSessionCookie, setSessionCookie } from "./session";
import Cookies from "js-cookie";

describe("testing getting cookie session value", () => {
  it("should pass", () => {
    const getSpy = jest.spyOn(Cookies, "get").mockReturnValueOnce("123");
    const cookieName = "session";
    getSessionCookie();
    expect(getSpy).toBeCalledWith(cookieName);
    getSpy.mockRestore();
  });
});

describe("testing getting cookie session value as empty because set session is not called", () => {
  it("should pass", () => {
    const getSpy = jest.spyOn(Cookies, "set").mockReturnValueOnce("123");
    expect(getSessionCookie()).toStrictEqual({});
    getSpy.mockRestore();
  });
});

describe("testing setting cookie session value", () => {
  it("should pass", () => {
    const getSpy = jest.spyOn(Cookies, "set").mockReturnValueOnce("123");
    setSessionCookie("session");
    expect(getSpy).toBeCalledTimes(1);
    getSpy.mockRestore();
  });
});
