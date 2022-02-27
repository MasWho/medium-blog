import styles from '../styles/QuotesForm.module.css';

const QuotesForm = () => {
  return (
    <form className={styles.quotesForm}>
      <div className={styles.inputSection}>
        <label htmlFor="author">Author</label>
        <input id="author" type="text" placeholder="Name" />
      </div>
      <div className={styles.inputSection}>
        <label htmlFor="quote">Quote</label>
        <textarea id="quote" placeholder="Quote body" />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default QuotesForm;