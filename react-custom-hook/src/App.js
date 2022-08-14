import { useEffect, useCallback } from 'react';
import useHttp from './hooks/use-http';

const API_URL = "https://goquotes-api.herokuapp.com/api/v1/random?count=1";

function App() {
  const {data, loading, error, getData} = useHttp();

  const successResponseHandler = useCallback((data) => {
    return data.quotes;
  }, []);

  useEffect(() => {
    getData(API_URL, null, { 
      handleSuccessResponse: successResponseHandler 
    });
  }, [getData, successResponseHandler]);

  let content;
  if(loading) {
    content = <div>Busy Loading...</div>;
  } else if (error) {
    content = <div>{error}</div>;
  } else if (data) {
    content = <ul>
      {data.map((quote, idx) => <li key={`${quote.author}-${idx}`}>{quote.text}</li>)}
    </ul>;
  }
  
  return (
    <div>
      {content}
    </div>
  );
}

export default App;
