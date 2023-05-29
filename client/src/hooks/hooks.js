import { useCallback, useState } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }, token, isFormData) => {
    setLoading(true);

    if (token) {
      headers = {
        ...headers,
        "Authorization": `Bearer ${token}`
      }
    }

    if (body && !isFormData) {
      body = JSON.stringify(body)
    }

    try {
      const reqData = { method, body, headers };
      // if(isFormData) {
      //   delete reqData.headers;
      // }
      const response = await fetch(url, reqData);

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        throw new Error(data.errorMessage);
      }

      setLoading(false);
      return data;

    } catch (e) {
      setLoading(false);
      setError(e);
      throw e;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError }
}
