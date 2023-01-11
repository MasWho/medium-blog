/* ui/src/components/shared/Spinner.tsx */

import styles from "./Spinner.module.css";

type Props = {
  [key: string]: any;
};

const Spinner = (props: Props) => {
  const {style} = props;
  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className={styles["lds-ripple"]}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
