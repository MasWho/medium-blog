import styles from '../styles/QuoteList.module.css';
import QuoteData from '../model/quote';



const Quote: React.FC<{quote: QuoteData, onRemove: (id: number) => void}> = ({quote, onRemove}) => {
  return (
    <div className={styles.quote} onClick={onRemove.bind(null, quote.id)}>
      <p><i>{quote.body}</i></p>
      <p>- {quote.author}</p>
    </div>
  );
};

const QuoteList: React.FC<{quotes: QuoteData[], onRemove: (id: number) => void}> = ({quotes, onRemove}) => {
  const allQuotes = quotes.map(quote => {
    return <Quote quote={quote} key={quote.id} onRemove={onRemove} />
  });

  return (
    <div className={styles.quotesContainer}>
      {allQuotes}
    </div>
  );
};

export default QuoteList;