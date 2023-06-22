import "./styles.css";

/* eslint-disable react/prop-types */
export function RamroInput({
  label,
  type = "text",
  name,
  value,
  handleChange,
  ...rest
}) {
  return (
    <>
      <div className="form-input">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          {...rest}
        />
      </div>
    </>
  );
}

export function RamroSelect({
  label,
  name,
  value,
  handleChange,
  options,
  ...rest
}) {
  return (
    <>
      <div className="form-input">
        <label htmlFor={name}>{label}</label>
        <select name={name} onChange={handleChange} {...rest}>
          {options.map((el, id) => (
            <option key={id} value={el.value} selected={el.value === value}>
              {el.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
