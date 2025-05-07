import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { Textarea } from "@/components/ui/textarea";
  import { Control } from "react-hook-form";
  
  interface FormInputProps {
    control: Control<any>;
    name: string;
    label: string;
    placeholder: string;
    description?: string;
    isTextArea?: boolean;
  }
  
  export function FormInput({
    control,
    name,
    label,
    placeholder,
    description,
    isTextArea = false,
  }: FormInputProps) {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              {isTextArea ? (
                <Textarea placeholder={placeholder} {...field} />
              ) : (
                <Input placeholder={placeholder} {...field} />
              )}
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }