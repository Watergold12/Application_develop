function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder
}) {
  return (
    <div className="field">

      <label htmlFor={name}>
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? "invalid" : ""}
      />

      {error && (
        <small className="error">
          {error}
        </small>
      )}

    </div>
  );
}

export default InputField;