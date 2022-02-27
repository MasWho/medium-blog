import './App.css';
import QuotesForm from './components/QuotesForm';
import Quotes from './components/Quotes';
import { useState } from 'react';
import QuoteModel from './model/quote';

function App() {
  const [quotes, setQuotes] = useState<QuoteModel[]>([]);

  const addQuoteHandler = (quote: QuoteModel) => {
    setQuotes(prevState => {
      return [...prevState, quote];
    });
  };

  const removeQuoteHandler = (id: number) => {
    setQuotes(prevState => {
      const newQuotes = prevState.filter(quote => quote.id !== id);
      return newQuotes;
    });
  };

  return (
    <div className="App">
      <QuotesForm onAddQuote={addQuoteHandler} />
      <Quotes quotes={quotes} onRemove={removeQuoteHandler} />
    </div>
  );
}

export default App;
