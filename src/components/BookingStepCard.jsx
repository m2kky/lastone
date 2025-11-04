import { forwardRef } from 'react';
import styles from './BookingStepCard.module.css';

const BookingStepCard = forwardRef(({ title, subtitle, icon, children }, ref) => {
  return (
    <div className={styles.card} ref={ref} tabIndex="-1">
      <header className={styles.header}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </header>
      <div className={styles.body}>
        {children}
      </div>
    </div>
  );
});

BookingStepCard.displayName = 'BookingStepCard';

export default BookingStepCard;