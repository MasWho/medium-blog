import { useState, useCallback } from "react"

/**
 * Custom hook for making http requests using the Fetch API.
 * Provides state logic for loading and error.
 */
const useHttp = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * send request to a url specified with params passed.
   * Optionally pass in a call back to handle the response received.
   * @param {String} url 
   * @param {Object} params 
   * @param {Function} handleSuccessResponse 
   * @param {Function} checkForError 
   * @param {Function} handleErrorResponse 
   */
  const request = useCallback(async (url, params, {handleSuccessResponse, checkForError, handleErrorResponse}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {...params});
      const data = await response.json();  // Assume always json response
      
      checkForError && checkForError(data);

      // If response is okay and no errors, then successful request
      handleSuccessResponse && await handleSuccessResponse(data);
      setData(data);
    } catch (error) {
      // Handle error if specified
      handleErrorResponse && handleErrorResponse(data, error);
      setError(error);
    }

    setLoading(false);
  }, []);

  return {
      loading: loading,
      error: error,
      data: data,
      request: request,
  };
};

export default useHttp;