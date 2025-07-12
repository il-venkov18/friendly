// lib/storage/local-storage.ts
export const saveToLocalStorage = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export const getFromLocalStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error('Error getting from localStorage:', error)
    return null
  }
}