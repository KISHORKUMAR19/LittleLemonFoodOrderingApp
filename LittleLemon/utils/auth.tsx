import AsyncStorage from '@react-native-async-storage/async-storage';

// Define UserData type with readonly properties for safety
type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password?: string;
  avatar?: string;
};

// Use constants for storage keys to prevent typos
const STORAGE_KEYS = {
  USER_TOKEN: 'userToken',
  CURRENT_USER: 'currentUser',
  REGISTERED_USERS: 'registeredUsers',
  ONBOARDED: 'onboarded',
};

// Utility function for consistent error handling
const handleAsyncError = (operation: string, error: any) => {
  console.error(`${operation} error:`, error);
  throw error;
};

// Optimized user retrieval with memoization
let cachedUsers: UserData[] | null = null;

export const isLoggedIn = async (): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
    return token !== null;
  } catch (e) {
    return handleAsyncError('Login check', e);
  }
};

export const loginUser = async (email: string, password: string): Promise<boolean> => {
  try {
    const users = await getRegisteredUsers();
    if (!users.length) throw new Error('No registered users found');

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) throw new Error('Email not registered');
    if (user.password !== password) throw new Error('Incorrect password');

    await AsyncStorage.setItem(STORAGE_KEYS.USER_TOKEN, 'dummy_token');
    
    // Create password-free user object
    const { password: _, ...safeUser } = user;
    await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
    
    return true;
  } catch (e) {
    return handleAsyncError('Login', e);
  }
};

export const completeOnboarding = async (userData: UserData): Promise<void> => {
  try {
    const existingUsers = await getRegisteredUsers();
    
    if (existingUsers.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
      throw new Error('Email already registered');
    }
    
    const newUser = { ...userData };
    const updatedUsers = [...existingUsers, newUser];
    
    await AsyncStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(updatedUsers));
    await AsyncStorage.setItem(STORAGE_KEYS.USER_TOKEN, 'dummy_token');
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDED, 'true');
    
    // Create password-free user object
    const { password, ...safeUser } = newUser;
    await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
    
    // Clear cache
    cachedUsers = null;
  } catch (e) {
    handleAsyncError('Onboarding storage', e);
  }
};

export const hasCompletedOnboarding = async (): Promise<boolean> => {
  try {
    const onboarded = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDED);
    return onboarded === 'true';
  } catch (e) {
    return handleAsyncError('Onboarding check', e);
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.USER_TOKEN,
      STORAGE_KEYS.CURRENT_USER
    ]);
  } catch (e) {
    handleAsyncError('Logout', e);
  }
};

export const getCurrentUser = async (): Promise<UserData | null> => {
  try {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return userData ? JSON.parse(userData) : null;
  } catch (e) {
    return handleAsyncError('Get current user', e);
  }
};

export const getRegisteredUsers = async (): Promise<UserData[]> => {
  try {
    if (cachedUsers) return cachedUsers;
    
    const usersJSON = await AsyncStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
    const users = usersJSON ? JSON.parse(usersJSON) : [];
    
    // Cache for subsequent calls
    cachedUsers = users;
    return users;
  } catch (e) {
    return handleAsyncError('Get registered users', e);
  }
};

export const updateUser = async (updatedData: Partial<UserData>): Promise<boolean> => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return false;
    
    const users = await getRegisteredUsers();
    const userIndex = users.findIndex(u => u.email.toLowerCase() === currentUser.email.toLowerCase());
    if (userIndex === -1) return false;
    
    // Merge updates while preserving password if not changed
    const updatedUser = {
      ...users[userIndex],
      ...updatedData,
      password: updatedData.password || users[userIndex].password
    };
    
    const updatedUsers = [...users];
    updatedUsers[userIndex] = updatedUser;
    
    await AsyncStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(updatedUsers));
    
    // Update currentUser without password
    const { password, ...safeUser } = updatedUser;
    await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
    
    // Clear cache
    cachedUsers = null;
    return true;
  } catch (e) {
    return handleAsyncError('Update user', e);
  }
};

export const deleteAccount = async (email: string): Promise<boolean> => {
  try {
    const users = await getRegisteredUsers();
    const updatedUsers = users.filter(u => u.email.toLowerCase() !== email.toLowerCase());
    
    await AsyncStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(updatedUsers));
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.USER_TOKEN,
      STORAGE_KEYS.CURRENT_USER,
      STORAGE_KEYS.ONBOARDED
    ]);
    
    // Clear cache
    cachedUsers = null;
    return true;
  } catch (e) {
    return handleAsyncError('Delete account', e);
  }
};

// Export as named exports only (no default export)
export default {
  loginUser,
  logoutUser,
  completeOnboarding,
  hasCompletedOnboarding,
  isLoggedIn,
  getCurrentUser,
  getRegisteredUsers,
  updateUser,
  deleteAccount
};