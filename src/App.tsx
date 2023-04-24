import { NotePadBody } from "./containers/NotePadBody/NotePadBody";
import { NotesList } from "./containers/NotesList/NotesList";
import styles from './App.module.css';
import { Backdrop } from "./components/Backdrop/Backdrop";
import { useAppSelector } from "./store/hooks";
import { shallowEqual } from "react-redux";
import { Alert } from "./containers/Alert/Alert";

function App() {
  const { editValue, alert } = useAppSelector(state => state.note, shallowEqual);
  return (
    <div className={styles.container}>
      {editValue && <Backdrop />}
      {alert && <Alert />}
      <NotePadBody />
      <NotesList />
    </div>
  )
}

export default App
