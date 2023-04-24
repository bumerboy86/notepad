import styles from './Alert.module.css';
import { useAppDispatch, useAppSelector} from '../../store/hooks';
import { deleteNote, showAlert } from '../../store/note.slice';
import { Button } from '../../components/Button/Button';
import { shallowEqual } from 'react-redux';

export const Alert = () => {
  const { note } = useAppSelector(state => state.note, shallowEqual);
  const dispatch = useAppDispatch();

  const deleteNoteHandler = () => {
    note && dispatch(deleteNote(note))
  }

  return (
    <>
      <div className={styles.alert}/>
      <div className={styles.alertBox}>
        <div className={styles.alertHeader}>
        <h1>Delete note?</h1>
        </div>
        <div className={styles.alertContainer}>
          <Button key={'yes'} class='yes' fn={deleteNoteHandler} name=''/>
          <Button key={'no'} class='no' fn={() => dispatch(showAlert(null))} name=''/>
        </div>
      </div>
    </>
  )
}
