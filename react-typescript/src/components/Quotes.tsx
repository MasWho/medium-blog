import styles from '../styles/Quotes.module.css';

const quotes = [
  {id: 1, author: 'Mason', body: 'asdflkjadshflkjhqwopeirqepwads;lkfjasl;dkfasdj;f'},
  {id: 2, author: 'Shweta', body: 'asdflkjadshflkjhqwopeirqepwads;lkfjasl;dkfasdj;f'},
];

// TODO: put this in a data class maybe
const Quote: React.FC<{quote: {id: number; author: string, body: string}}> = ({quote}) => {
  return (
    <div className={styles.quote}>
      <p><i>{quote.body}</i></p>
      <p>- {quote.author}</p>
    </div>
  );
};

const Quotes = () => {
  const allQuotes = quotes.map(quote => {
    return <Quote quote={quote} />
  });

  return (
    <div className={styles.quotesContainer}>
      {allQuotes}
    </div>
  );
};

export default Quotes;