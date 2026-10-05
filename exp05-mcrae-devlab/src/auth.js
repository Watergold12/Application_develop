const USERS_KEY = "mcrae_users";
const SESSION_KEY = "mcrae_session";


function getUsers() {
  return JSON.parse(
    localStorage.getItem(USERS_KEY) || "[]"
  );
}


export function registerUser(user) {

  const users = getUsers();

  const emailExists = users.some(
    existing =>
      existing.email.toLowerCase() === user.email.toLowerCase()
  );

  if (emailExists) {
    throw new Error("An account with this email already exists.");
  }

  const usernameExists = users.some(
    existing =>
      existing.username.toLowerCase() === user.username.toLowerCase()
  );

  if (usernameExists) {
    throw new Error("Username is already taken.");
  }

  const newUser = {
    username: user.username,
    email: user.email.toLowerCase(),
    password: user.password,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );
}


export function loginUser(email, password) {

  const users = getUsers();

  const user = users.find(
    existing =>
      existing.email === email.toLowerCase() &&
      existing.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const session = {
    username: user.username,
    email: user.email,
    loginAt: new Date().toISOString()
  };

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(session)
  );

  return session;
}