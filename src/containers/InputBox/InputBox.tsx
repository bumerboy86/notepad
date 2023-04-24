import { useState } from 'react';
import { Button } from '../../components/Button/Button';
import styles from './InputBox.module.css';
import { useAppDispatch } from '../../store/hooks';
import { addNewNote } from '../../store/note.slice';

export const InputBox = () => {
    const [ userInput, setUserInput ] = useState<string>('');
    const dispatch = useAppDispatch();

    const addNotesHandler = () => {
        if (!userInput.trim()) return;
        dispatch(addNewNote(userInput));
        setUserInput('');
    }

    return (
        <div className={styles.InputBox}>
            <input 
                className={styles.inputText}
                type="text" value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder='Create a new note'
            />
            <Button class='add' name='' fn={addNotesHandler} disable={userInput.trim() ? false : true}/>
        </div>
    )
}
