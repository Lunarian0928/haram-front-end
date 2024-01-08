import { useEffect } from 'react';

export const login = (id, setLoggedInId, setIsLoggedIn) => {
  setLoggedInId(id);
  setIsLoggedIn(true);

  localStorage.setItem('loggedInId', id);
  localStorage.setItem('isLoggedIn', true);
}

export const logout = (setLoggedInId, setIsLoggedIn) => {
  setLoggedInId("");
  setIsLoggedIn(false);

  localStorage.setItem('loggedInId', "");
  localStorage.setItem('isLoggedIn', false);
}

export const handleLocalStorage = (setLoggedInId, setIsLoggedIn) => {
    const storedLoggedInId = localStorage.getItem('loggedInId');
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');

    if (storedLoggedInId && storedIsLoggedIn === "true") {
        setLoggedInId(storedLoggedInId);
        setIsLoggedIn(true);
    }
}
