import { useAppDispatch, useAppSelector } from 'src/store/store';
import styles from './ThemeToggle.module.css';
import { toggle } from 'src/store/features/themeModeSlice';

const ThemeToggle = () => {
  const isDark = useAppSelector((state) => state.theme.isDark);

  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    dispatch(toggle());
  };

  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={isDark} onChange={toggleTheme} />
      <span className={styles.slider}></span>
    </label>
  );
};

export default ThemeToggle;
