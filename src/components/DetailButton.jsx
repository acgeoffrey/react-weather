import styles from "../styles/DetailButton.module.css";

function DetailButton({
  icon,
  text,
  property,
  activeProperty,
  setActiveProperty,
}) {
  let active = false;
  if (activeProperty == property) active = true;
  return (
    <div
      className={
        active
          ? `${styles.foreButtonContainer} ${styles.active}`
          : styles.foreButtonContainer
      }
      onClick={() => setActiveProperty(property)}
    >
      <div className={styles.buttonData}>
        <div className={styles.buttonIcon}>{icon}</div>
        {active ? <div>{text}</div> : null}
      </div>
    </div>
  );
}

export default DetailButton;
