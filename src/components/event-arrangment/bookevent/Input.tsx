'use client';

import { Label } from "../../ui/label";
import {Input as ShadcnInput} from "@/components/ui/input"

interface InputProps {
  label: string;
  id: string;
  description?: string;
  required?: boolean;
  pattern?: string;
  type: string;
  minLength?: number;
  min?: number;
  max?: number;
  errorMsg?: string;
}

export default function Input({
  label,
  id,
  required,
  pattern,
  type,
  minLength,
  min,
  max,
  description,
  errorMsg,
}: InputProps) {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNewDealDetails({ [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Label className="text-primary block text-base" htmlFor={id}>
        {label}
        {description && (
          <span className="text-sm text-muted-foreground block mb-1">
            {description}
          </span>
        )}
      </Label>
      <ShadcnInput
        className={`text-primary ${
          errorMsg ? 'border-destructive' : 'border-primary'
        } border-2`}
        type={type}
        name={id}
        id={id}
        required={required}
        pattern={pattern}
        minLength={minLength}
        min={min}
        max={max}
        onChange={handleInputChange}
      />
      <div className="min-h-8 mt-1">
        {errorMsg && (
          <span className="text-destructive text-sm block ">{errorMsg}</span>
        )}
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function updateNewDealDetails(arg0: { [x: string]: string; }) {
    throw new Error("Function not implemented.");
}

