import React, { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, id, className = '', error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-[clamp(0.2rem,0.5vw,0.3rem)] w-full">
        
        {label && (
          <label 
            htmlFor={id} 
            className="text-[clamp(0.7rem,1vw,0.8rem)] font-bold text-[#475569] uppercase tracking-wide"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={id}
          className={`
            w-full bg-(--heading-bg)/10 text-[#1E293B] placeholder-[#94A3B8]
            rounded-md outline-none transition-all duration-200 border resize-y min-h-[100px]
            ${error ? 'border-red-500 bg-red-50/10' : 'border-transparent focus:border-[var(--gold)]'}
            focus:bg-white/20 focus:shadow-sm
            p-[clamp(0.6rem,1.5vw,0.875rem)]
            text-[clamp(0.875rem,1vw+0.2rem,1rem)]
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500 font-medium mt-0.5 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';