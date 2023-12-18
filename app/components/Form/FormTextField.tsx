import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormError } from "./FormError";

interface FormTextFieldProps {
  name: string;
  defaultValue: string;
  label?: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormTextField = ({
  name,
  defaultValue,
  label,
  errors,
}: FormTextFieldProps) => {
  return (
    <div className="grid  items-start gap-4">
      <Input
        name={name}
        className="col-span-3"
        defaultValue={defaultValue}
        placeholder={label}
      />
      <FormError id={name} errors={errors} />
    </div>
  );
};
