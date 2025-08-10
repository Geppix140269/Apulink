// Path: app/my-apulink/components/ui/NumberInput.tsx
// Reusable number input component for quantities and percentages

import React, { useState, useEffect } from 'react';

interface NumberInputProps {
  value: number | undefined;
  onValue: (value: number) => void;
  decimals?: number;
  min?: number;
  max?: number;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function NumberInput({
  value,
  onValue,
  decimals = 2,
  min = 0,
  max,
  placeholder = '0',
  className = '',
  disabled = false
}: NumberInputProps) {
  const [displayValue, setDisplayValue] = useState('');

  // Update display value when value prop changes
  useEffect(() => {
    if (value !== undefined && value !== null && !isNaN(value)) {
      setDisplayValue(value.toString());
    } else {
      setDisplayValue('');
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    // Allow empty string
    if (input === '') {
      setDisplayValue('');
      return;
    }

    // Allow typing numbers and decimal point
    const regex = /^\d*\.?\d*$/;
    if (regex.test(input)) {
      setDisplayValue(input);
    }
  };

  const handleBlur = () => {
    const numValue = parseFloat(displayValue);
    
    if (!isNaN(numValue)) {
      let finalValue = numValue;
      
      // Apply min/max constraints
      if (min !== undefined && finalValue < min) {
        finalValue = min;
      }
      if (max !== undefined && finalValue > max) {
        finalValue = max;
      }
      
      // Round to specified decimals
      finalValue = Math.round(finalValue * Math.pow(10, decimals)) / Math.pow(10, decimals);
      
      onValue(finalValue);
      setDisplayValue(finalValue.toString());
    } else if (displayValue === '') {
      // Allow empty field but don't call onValue
      setDisplayValue('');
    } else {
      // Invalid input, revert to previous value
      if (value !== undefined && value !== null && !isNaN(value)) {
        setDisplayValue(value.toString());
      } else {
        setDisplayValue('');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Block negative sign if min is 0 or positive
    if (e.key === '-' && min !== undefined && min >= 0) {
      e.preventDefault();
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    // Disable scroll wheel changes
    (e.target as HTMLInputElement).blur();
  };

  return (
    <input
      type="text"
      inputMode="decimal"
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onWheel={handleWheel}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
    />
  );
}
