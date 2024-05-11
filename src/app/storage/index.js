import EncryptedStorage from 'react-native-encrypted-storage';

export async function setStorageItem(key, value) {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // There was an error on the native side
  }
}

export async function retrieveStorageItem(key, defaultValue) {
  try {
    const value = await EncryptedStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return defaultValue;
    }
  } catch (error) {
    // There was an error on the native side
  }
}

export async function removeStorageItem(key) {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    // There was an error on the native side
  }
}

export async function clearStorage() {
  try {
    await EncryptedStorage.clear();
  } catch (error) {
    // There was an error on the native side
  }
}
