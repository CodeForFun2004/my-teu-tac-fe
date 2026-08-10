import { useField } from "formik";

interface FormCheckboxProps {
  name: string;
  label: string;
}

const FormCheckbox = ({ name, label }: FormCheckboxProps) => {
  const [field, meta] = useField({ name, type: "checkbox" });

  return (
    <div>
      <div className="flex items-center gap-3">
        <input
          id={name}
          type="checkbox"
          className="h-5 w-5 rounded border-secondary/50 bg-transparent text-secondary focus:ring-secondary"
          {...field}
          checked={Boolean(field.value)}
        />
        <label htmlFor={name} className="cursor-pointer font-body-md text-body-md text-on-surface-variant">
          {label}
        </label>
      </div>
      {meta.touched && meta.error && <p className="mt-1 font-body-md text-sm text-error">{meta.error}</p>}
    </div>
  );
};

export default FormCheckbox;
