import React, { useState } from "react";
import { useCookies } from "react-cookie";

// localStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue, removeValue];
}

const StorageManager = () => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies([key]);
  const [localStorageData, setLocalStorage, removeLocalStorage] =
    useLocalStorage(key, "");

  const handleLocalStorageSet = () => {
    setLocalStorage(value);
  };

  const handleLocalStorageRemove = () => {
    removeLocalStorage();
  };

  const handleCookieSet = () => {
    setCookie(key, value, { path: "/" });
  };

  const handleCookieRemove = () => {
    removeCookie(key, { path: "/" });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleLocalStorageSet}>Set LocalStorage</button>
        <button onClick={handleLocalStorageRemove}>Remove LocalStorage</button>
        <button onClick={handleCookieSet}>Set Cookie</button>
        <button onClick={handleCookieRemove}>Remove Cookie</button>
      </div>
      <div>
        <h3>LocalStorage Data:</h3>
        <pre>{JSON.stringify(localStorageData)}</pre>
        <h3>Cookies:</h3>
        <pre>{JSON.stringify(cookies)}</pre>
      </div>
    </div>
  );
};

export default StorageManager;
