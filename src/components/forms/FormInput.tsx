import { useField } from "formik";

interface FormInputProps {
  name: string;
  label?: string;
  type?: "text" | "email" | "tel" | "number";
  placeholder?: string;
  as?: "input" | "textarea";
  rows?: number;
}

const fieldClass =
  "w-full rounded border border-outline-variant bg-surface-container px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary";

const FormInput = ({ name, label, type = "text", placeholder, as = "input", rows }: FormInputProps) => {
  const [field, meta] = useField(name);

  return (
    <div>
      {label && (
        <label htmlFor={name} className="mb-2 block font-label-lg text-label-lg text-on-surface">
          {label}
        </label>
      )}
      {as === "textarea" ? (
        <textarea id={name} rows={rows ?? 3} placeholder={placeholder} className={fieldClass} {...field} />
      ) : (
        <input id={name} type={type} placeholder={placeholder} className={fieldClass} {...field} />
      )}
      {meta.touched && meta.error && <p className="mt-1 font-body-md text-sm text-error">{meta.error}</p>}
    </div>
  );
};

export default FormInput;
