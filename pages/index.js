import { useState } from "react";

const styles = {
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  login: {
    marginTop: "1rem",
  },
  error: {
    background: "red",
  },
  user: {
    background: "green",
  },
  getUser: {
    marginTop: "2rem",
  },
};

export default function Home() {
  const [username, usernameSet] = useState("");
  const [password, passwordSet] = useState("");
  const [user, userSet] = useState(null);
  const [error, errorSet] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const json = await resp.json();
    if (resp.status !== 200) {
      console.log({ json });
      errorSet(json.message);
      userSet(null);
      return;
    }
    userSet(json.message);
    errorSet(null);
  };

  const getUser = async () => {
    const resp = await fetch("/api/user", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const json = await resp.json();
    console.log({ json });
  };

  const logout = async () => {
    const resp = await fetch("/api/auth/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const json = await resp.json();
    console.log({ json });
  };

  return (
    <div style={styles.container}>
      <div style={styles.error}>{error}</div>
      <div style={styles.user}>{user}</div>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={(e) => usernameSet(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => passwordSet(e.target.value)}
        />
        <button type="submit" style={styles.login}>
          Login
        </button>
        <button type="button" style={styles.getUser} onClick={logout}>
          Logout
        </button>
      </form>
      <button style={styles.getUser} onClick={getUser}>
        Get User
      </button>
    </div>
  );
}
