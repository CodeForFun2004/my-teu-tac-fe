import { useField } from "formik";

interface FormSelectOption {
  label: string;
  value: string;
}

interface FormSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: FormSelectOption[];
}

const FormSelect = ({ name, label, placeholder, options }: FormSelectProps) => {
  const [field, meta] = useField(name);

  return (
    <div>
      {label && (
        <label htmlFor={name} className="mb-2 block font-label-lg text-label-lg text-on-surface">
          {label}
        </label>
      )}
      <select
        id={name}
        className="w-full rounded border border-outline-variant bg-surface-container px-4 py-3 font-body-md text-body-md text-on-surface focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
        {...field}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && <p className="mt-1 font-body-md text-sm text-error">{meta.error}</p>}
    </div>
  );
};

export default FormSelect;
