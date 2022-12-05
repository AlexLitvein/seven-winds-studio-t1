import { useEffect, useState } from 'react';

export function useRequest<T>(
  baseUrl: string,
  method: string,
  query: string,
  body?: Object
): {
  isPending: boolean;
  isRejected: boolean;
  isFulfilled: boolean;
  data: T | undefined;
  error: string | undefined;
} {
  let [state, set_state] = useState({
    isPending: true,
    isRejected: false,
    isFulfilled: false,
    data: undefined,
    error: undefined,
  });

  useEffect(() => {
    fetch(baseUrl + query, {
      method,
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors', // WARN: обязательно! и на сервере разрешить корс
    })
      .then((request) => request.text())
      .then((text) => {
        set_state({ isPending: false, isRejected: false, isFulfilled: true, data: JSON.parse(text), error: undefined });
      })
      .catch((error) => {
        set_state({ isPending: false, isRejected: true, isFulfilled: false, data: undefined, error });
      });
  }, []);
  return state;
}
