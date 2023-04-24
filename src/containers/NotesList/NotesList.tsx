import { useEffect } from 'react';
import styles from './NotesList.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Note } from '../../components/Note/Note';
import { getNotes } from '../../store/note.slice';

export const NotesList = () => {
    const { notes } = useAppSelector(state => state.note);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getNotes());
    }, [])

    return (
        <div className={styles.NotesList}>
            {notes.length && notes.map(item => {
                return <Note key={item.id} note={item}/>
            })}
        </div>
    )
}
