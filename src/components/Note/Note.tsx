import { INotes } from "../../interfaces/INotes";
import { useAppDispatch } from "../../store/hooks";
import { Button } from "../Button/Button";
import styles from './Note.module.css';
import styleBtn from '../Button/Button.module.css';
import { deleteNote, editNotePerform, showEdit } from "../../store/note.slice";

type TNote = {
    note: INotes
}

export const Note = (props: TNote) => {
    const dispatch = useAppDispatch();

    const editNoteText = () => {
        dispatch(showEdit(props.note));
    }

    const editNote = () => {
        dispatch(editNotePerform(props.note))
    }

    return (
        <div className={styles.note}>
            <div className={styles.editHeader}>
                <Button fn={() => editNoteText()} name="" class="edit"/>
                <Button fn={() => dispatch(deleteNote(props.note))} name="" class="delete"/>
                <div title="maded" className={props.note.performed ? `${styleBtn.btn} ${styles.checked}` :`${styleBtn.btn} ${styles.noChecked}`} onClick={editNote} />
                </div>
                <p className={styles.checkbonoteMessage}>{props.note.message}</p>
        </div>
    )
}
