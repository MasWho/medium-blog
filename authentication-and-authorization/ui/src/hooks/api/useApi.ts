// Global dependencies
import { useState, useCallback, useContext } from "react";

// Project dependencies
import AuthContext from "../../store/auth/AuthContextProvider";

const BASE_URL = 'http://localhost:8000';

/**
 * Custom hook for making http requests using the Fetch API.
 * Provides state logic for loading and error.
 */
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authState, globalLogOutDispatch } = useContext(AuthContext);

  /**
   * send request to a url specified with params passed.
   * Optionally pass in a call back to handle the response received.
   * @param {string} endpoint
   * @param {object} params
   * @param {Function} handleSuccessResponse
   * @param {Function} handleErrorResponse
   */
  const request = useCallback(
    async (
      endpoint: string,
      params: { [key: string]: any },
      handleSuccessResponse: (data: any) => void,
      handleErrorResponse?: (error: Error) => void
    ) => {
      setLoading(true);
      setError(null);

      try {
        // NOTE: If user is logged in, insert the auth token into request headers for authorization
        if (authState.isLoggedIn) {
          params.headers["x-access-token"] = authState.authToken;
        }

        const response = await fetch(BASE_URL + endpoint, { ...params });
        if (!response.ok) {
          const data = await response.json(); // Assume always json response
          throw new Error(data.error);
        }
        const data = await response.json(); // Assume always json response

        // If response is okay and no errors, then successful request
        handleSuccessResponse && (await handleSuccessResponse(data));
      } catch (error: any) {
        // NOTE: If it's unauthorized error, then we will auto log user out
        if (error && error.message && error.message === "Unauthorized") {
          globalLogOutDispatch();
        }

        // Handle error if specified
        if (handleErrorResponse) {
          handleErrorResponse(error.message || error.error || error);
        } else {
          setError(error.message || error.error || error);
        }
      }

      setLoading(false);
    },

    [authState.isLoggedIn, authState.authToken, globalLogOutDispatch]
  );

  return {
    loading: loading,
    error: error,
    request: request,
    setError: setError,
  };
};

export default useApi;
