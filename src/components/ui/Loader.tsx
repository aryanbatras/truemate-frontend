import React from 'react';
import styles from '../../styles/components/ui/Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.container}>
        <div className={styles.preloader}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.shadow} />
      </div>
    </div>
  );
};

export default Loader;
