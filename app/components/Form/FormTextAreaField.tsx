import { FormError } from "./FormError";
import { Textarea } from "@/components/ui/textarea";

interface FormTextAreaFieldProps {
  name: string;
  defaultValue: string;
  label?: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormTextAreaField = ({
  name,
  defaultValue,
  label,
  errors,
}: FormTextAreaFieldProps) => {
  return (
    <div className="grid  items-start gap-4">
      <Textarea
        name="description"
        className="col-span-3"
        defaultValue={defaultValue}
        placeholder={label}
      />
      <FormError id={name} errors={errors} />
    </div>
  );
};
