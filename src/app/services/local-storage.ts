export interface LocalStorageService {
  setItem: (key: string, value: string) => void;
  getItem: (key: string) => string | null;
  removeItem: (key: string) => void;
  setItems: (payload: { [key: string]: string }) => void;
  getItems: (keys: string[]) => (string | null)[];
}

export class LocalStorage implements LocalStorageService {
  setItem(key: string, value: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  }

  getItem(key: string) {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }

    return null;
  }

  removeItem(key: string) {
    if (typeof window !== "undefined") {
      return localStorage.removeItem(key);
    }
  }

  setItems(payload: { [key: string]: string }) {
    if (typeof window !== "undefined") {
      if (!payload) return;
      const keys = Object.keys(payload);
      for (const key of keys) {
        this.setItem(key, payload[key]);
      }
    }
  }

  getItems(keys: string[]) {
    if (typeof window !== "undefined") {
      const values = [];

      for (const key of keys) {
        values.push(this.getItem(key));
      }

      return values;
    }

    return [];
  }
}
