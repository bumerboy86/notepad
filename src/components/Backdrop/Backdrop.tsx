import { useState, useEffect } from 'react';
import styles from './Backdrop.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { shallowEqual } from 'react-redux';
import { editNoteText, showEdit } from '../../store/note.slice';
import { Button } from '../Button/Button';

export const Backdrop = () => {
  const { note } = useAppSelector(state => state.note, shallowEqual)
  const [inputTxt, setInputTxt] = useState<string>('');
  const dispatch = useAppDispatch();

  const saveChangeHandler = () => {
    if (inputTxt.trim() && note !== null) {
      dispatch(editNoteText({id: note?.id, message: inputTxt}));
    }
  }

  useEffect(() => {
    note !== null && setInputTxt(note.message);
  }, [note])

  return (
    <>
      <div className={styles.backdrop}/>
      <div className={styles.editBox}>
        <div className={styles.editHeader}>
          <Button key={'save'} class='save' fn={saveChangeHandler} name='' disable={!inputTxt}/>
          <Button key={'back'} class='back' fn={() => dispatch(showEdit(null))} name=''/>
        </div>
        <div className={styles.editContainer}>
            <textarea onChange={(e) => setInputTxt(e.target.value)} className={styles.editText} value={inputTxt
            } />
        </div>
      </div>
    </>
  )
}
