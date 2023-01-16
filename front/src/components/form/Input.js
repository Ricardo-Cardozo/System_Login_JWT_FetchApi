import styles from "./Input.module.css";

const Input = ({label, type, name, placeholder, onChange, value}) => {
  return (
    <div className={styles.formControl}>
      <label>
        {label}
        <input 
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </label>
    </div>
  );
};

export default Input;
