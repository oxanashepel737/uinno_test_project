export const getToken = () => localStorage.getItem("token");

export const setToken = (token?: string) => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
};
