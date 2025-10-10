import type { InputHTMLAttributes } from "react";
import { Controller, type Control, type FieldError } from "react-hook-form";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "defaultValue" | "value"> {
    name: string;
    control: Control<any>;
    label?: string;
    error?: FieldError;
    wrapperClassName?: string;
    labelClassName?: string;
}

const InputForm = ({
    name,
    control,
    label,
    type = "text",
    error,
    className,
    wrapperClassName,
    labelClassName,
}: Props) => {
    return (
        <div className={`flex flex-col gap-1 ${wrapperClassName ?? ""}`}>
            <label htmlFor={name} className={labelClassName ?? "font-montserrat text-sm"}>
                {label}
            </label>

            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        type={type}
                        className={`border p-0 ${error && "border-red-500"} ${className ?? ""}`}
                    />
                )}
            />
            {error && <p className="text-red-500 text-xs">{error.message}</p>}
        </div>
    );
};

export default InputForm;
