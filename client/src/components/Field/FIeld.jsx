import s from "./Field.module.css";

function Field({ labelText, register, name, options, errors, type }) {
  return (
    <div className={s.field}>
      <label
        htmlFor={name}
        className={s.label}
      >
        {labelText}
      </label>
      <input
        id={name}
        type={type || "text"}
        className={errors[name] ? s.inputError : s.input}
        {...register(name, options)}
      />
      {errors[name] && <p className={s.error}>{errors[name].message}</p>}
    </div>
  );
};

export default Field;