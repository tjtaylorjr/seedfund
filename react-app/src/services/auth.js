export const authenticate = async () => {
  const response = await fetch("/users/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const login = async (email, password) => {
  const response = await fetch("/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return await response.json();
};

export const logout = async () => {
  const response = await fetch("/users/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const signUp = async (username, email, password) => {
  const response = await fetch("/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  return await response.json();
};
