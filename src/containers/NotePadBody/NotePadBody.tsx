import { InputBox } from '../InputBox/InputBox';
import styles from './NotePadBody.module.css';

export const NotePadBody = () => {
  return (
    <div className={styles.notepadBox}>
        <h1 className={styles.notepadBoxTitle}>NOTEPAD</h1>
        <InputBox />
    </div>
  )
}
