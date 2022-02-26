import styles from '../styles/QuotesForm.module.css';

const QuotesForm = () => {
  return (
    <form className={styles.quotesForm}>
      <label htmlFor="author">Author</label>
      <input id="author" type="text" placeholder="Name" />
      <label htmlFor="quote">Quote</label>
      <textarea id="quote" placeholder="Quote body" />
      <button type="submit">Add</button>
    </form>
  );
};

export default QuotesForm;