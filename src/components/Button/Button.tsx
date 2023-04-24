import styles from './Button.module.css';

type TButtion = {
    name: string,
    class: keyof typeof buttonStyles,
    fn: () => void,
    disable?: boolean
}

const buttonStyles = {
    add: styles.add,
    delete: styles.delete,
    edit: styles.edit,
    back: styles.back,
    save: styles.save,
    yes: styles.yes,
    no: styles.no,
};

export const Button = (props: TButtion) => {
  return (
    <button title={props.class} disabled={props.disable || false} className={`${styles.btn} ${buttonStyles[props.class]}`} onClick={props.fn}>{props.name}</button>
  )
}