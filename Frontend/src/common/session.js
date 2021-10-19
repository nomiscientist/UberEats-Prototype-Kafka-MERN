
import Cookies from "js-cookie";

export const getSessionCookie = () => {
  const sessionCookie = Cookies.get("session");
  if (sessionCookie) {
    try {
      return JSON.parse(sessionCookie);
    } catch (exception) {
      Cookies.remove("session");
      alert(exception);
    }
    return {};
  } else {
    return {};
  }
};

export const setSessionCookie = (session) => {
  Cookies.remove("session");
  Cookies.set("session", session, { expires: 1 / 6 });
};
