import styles from './modal-overlay.module.css';

export const ModalOverlayUI = ({ onClick }: { onClick: () => void }) => {
  const onRequestClose = onClick;
  return <div className={styles.overlay} onClick={onRequestClose} />;
};
