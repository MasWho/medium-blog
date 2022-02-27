import styles from '../styles/Quotes.module.css';
import QuoteModel from '../model/quote';

// const quotes = [
//   {id: 1, author: 'Mason', body: 'asdflkjadshflkjhqwopeirqepwads;lkfjasl;dkfasdj;f'},
//   {id: 2, author: 'Shweta', body: 'asdflkjadshflkjhqwopeirqepwads;lkfjasl;dkfasdj;f'},
// ];

// TODO: put this in a data class maybe
const Quote: React.FC<{quote: QuoteModel, onRemove: (id: number) => void}> = ({quote, onRemove}) => {
  return (
    <div className={styles.quote} onClick={onRemove.bind(null, quote.id)}>
      <p><i>{quote.body}</i></p>
      <p>- {quote.author}</p>
    </div>
  );
};

const Quotes: React.FC<{quotes: QuoteModel[], onRemove: (id: number) => void}> = ({quotes, onRemove}) => {
  const allQuotes = quotes.map(quote => {
    return <Quote quote={quote} key={quote.id} onRemove={onRemove} />
  });

  return (
    <div className={styles.quotesContainer}>
      {allQuotes}
    </div>
  );
};

export default Quotes;