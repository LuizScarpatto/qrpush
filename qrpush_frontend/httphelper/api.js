import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000/api';

export const apiFetch = async (endpoint, options = {}) => {
  const token = await AsyncStorage.getItem('authToken');
  console.log('🔑 Token from AsyncStorage:', token);

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  console.log('➡️ Request:', `${API_URL}${endpoint}`);
  console.log('📦 Headers:', headers);
  console.log('📦 Body:', options.body);

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  console.log('📡 Response status:', res.status);

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
};
