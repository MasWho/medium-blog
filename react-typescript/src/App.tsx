import './App.css';
import QuotesForm from './components/QuotesForm';
import QuoteList from './components/QuoteList';
import { useState } from 'react';
import QuoteData from './model/quote';

function App() {
  const [quotes, setQuotes] = useState<QuoteData[]>([]);

  const addQuoteHandler = (quote: QuoteData): void => {
    setQuotes(prevState => {
      return [...prevState, quote];
    });
  };

  const removeQuoteHandler = (id: number): void => {
    setQuotes(prevState => {
      const newQuotes = prevState.filter(quote => quote.id !== id);
      return newQuotes;
    });
  };

  return (
    <div className="App">
      <QuotesForm onAddQuote={addQuoteHandler} />
      <QuoteList quotes={quotes} onRemove={removeQuoteHandler} />
    </div>
  );
}

export default App;