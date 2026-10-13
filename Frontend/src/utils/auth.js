// CodeKnot Auth Utility with Multi-Role Support & 24-Hour Auto-Sign-Out

const USERS_STORAGE_KEY = 'codeknot_registered_users';
const SESSION_STORAGE_KEY = 'codeknot_active_session';
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Initial pre-registered demo accounts for seamless evaluation
const DEFAULT_SEED_USERS = [
  {
    id: 'usr_admin_learnloop',
    name: 'Admin Supervisor',
    email: 'admin@learnloop.com',
    password: 'Admin@123',
    role: 'admin',
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: 'usr_student_1',
    name: 'Aarav Sharma',
    email: 'student@codeknot.dev',
    password: 'password123',
    role: 'student',
    createdAt: Date.now() - 86400000,
  },
  {
    id: 'usr_admin_1',
    name: 'Admin Console',
    email: 'admin@codeknot.dev',
    password: 'Admin@123',
    role: 'admin',
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'usr_mentor_1',
    name: 'Dr. K. Ramanathan',
    email: 'mentor@codeknot.dev',
    password: 'password123',
    role: 'mentor',
    createdAt: Date.now() - 86400000 * 3,
  },
];

// Helper to get all registered users
export const getRegisteredUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_SEED_USERS));
      return DEFAULT_SEED_USERS;
    }
    const list = JSON.parse(raw);
    // Ensure admin@learnloop.com is always present
    if (!list.some((u) => u.email === 'admin@learnloop.com')) {
      list.push(DEFAULT_SEED_USERS[0]);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(list));
    }
    return list;
  } catch (e) {
    return DEFAULT_SEED_USERS;
  }
};

// Check if user already exists
export const findUserByEmail = (email) => {
  const users = getRegisteredUsers();
  return users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
};

// Sign Up new user
export const registerUser = ({ name, email, password, role = 'student' }) => {
  const users = getRegisteredUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    throw new Error('An account with this email already exists. Please sign in instead.');
  }

  const newUser = {
    id: 'usr_' + Date.now(),
    name: name.trim(),
    email: normalizedEmail,
    password, // Stored locally for mock evaluation
    role,
    createdAt: Date.now(),
  };

  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

  // Automatically sign in the newly registered user with 24h validity
  return createSession(newUser);
};

// Sign In existing user
export const authenticateUser = ({ email, password, role }) => {
  const users = getRegisteredUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);

  if (!user) {
    throw new Error('No account found with this email. Please sign up first.');
  }

  if (user.password !== password) {
    throw new Error('Incorrect password. Please verify and try again.');
  }

  if (role && user.role !== role) {
    throw new Error(`This account is registered as "${user.role}", not as "${role}". Please select the correct role tab.`);
  }

  return createSession(user);
};

// Create a 24-hour persistent session
export const createSession = (user) => {
  const now = Date.now();
  const session = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token: 'jwt_mock_' + Math.random().toString(36).substring(2) + '_' + now,
    loginTime: now,
    expiresAt: now + SESSION_DURATION_MS, // 24 hours expiry
  };

  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  return session;
};

// Get current active session, enforcing 24h automatic sign-out
export const getActiveSession = () => {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;

    const session = JSON.parse(raw);
    const now = Date.now();

    // Check 24-hour expiration
    if (now >= session.expiresAt) {
      clearSession();
      return null;
    }

    return session;
  } catch (e) {
    clearSession();
    return null;
  }
};

// Clear active session (Sign Out)
export const clearSession = () => {
  localStorage.removeItem(SESSION_STORAGE_KEY);
};

// Get human readable time remaining until 24hr auto sign out
export const getSessionTimeRemaining = () => {
  const session = getActiveSession();
  if (!session) return null;

  const msLeft = session.expiresAt - Date.now();
  if (msLeft <= 0) return 'Expired';

  const hours = Math.floor(msLeft / (1000 * 60 * 60));
  const minutes = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m remaining`;
};
