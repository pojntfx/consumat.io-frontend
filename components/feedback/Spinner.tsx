import styles from "../../styles/Spinner.module.css";

type SpinnerProps = {
  className?: string;
};

const Spinner = ({ className }: SpinnerProps) => {
  return (
    <span className={`${styles.spinner} ${className && className}`}></span>
  );
};

export default Spinner;
