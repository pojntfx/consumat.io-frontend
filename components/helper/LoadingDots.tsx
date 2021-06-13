import styles from "../../styles/LoadingDots.module.css";

type LoadingDotsProps = {
  className?: string;
};

function LoadingDots({ className }: LoadingDotsProps) {
  return (
    <p className={styles.loadingDots + " w-min " + className}>
      <span>•</span>
      <span>•</span>
      <span>•</span>
    </p>
  );
}

export default LoadingDots;
