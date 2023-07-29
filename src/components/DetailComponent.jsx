import styles from "../styles/DetailComponent.module.css";

function DetailComponent({ icon, data1, data2, description, unit }) {
  return (
    <div className={styles.detailContainer}>
      <div className={styles.leftContainer}>{icon}</div>
      <div className={styles.rightContainer}>
        <h4 className={styles.data}>
          {data2
            ? `${Math.ceil(data1)}${unit} | ${Math.floor(data2)}${unit}`
            : `${Math.ceil(data1)} ${unit}`}
        </h4>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}

export default DetailComponent;
