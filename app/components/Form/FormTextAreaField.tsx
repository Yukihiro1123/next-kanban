import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
      {label && <Label htmlFor={name}>{label}</Label>}
      <Textarea
        name="description"
        className="col-span-3"
        defaultValue={defaultValue}
      />
      <FormError id={name} errors={errors} />
    </div>
  );
};
