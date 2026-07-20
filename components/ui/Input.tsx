import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        <label htmlFor={inputId} className="text-sm font-medium text-ink">
          {label}
          {props.required && (
            <span aria-hidden className="ml-0.5 text-matcha-deep">
              *
            </span>
          )}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            "h-11 rounded-md border bg-surface px-4 text-sm text-ink placeholder:text-ink-faint",
            "transition-colors focus:border-matcha focus:outline-none focus:ring-2 focus:ring-matcha/20",
            error ? "border-red-400" : "border-line"
          )}
          {...props}
        />
        {hint && !error && <p className="text-xs text-ink-faint">{hint}</p>}
        {error && (
          <p id={`${inputId}-error`} role="alert" className="text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
