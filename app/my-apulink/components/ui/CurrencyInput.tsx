// Path: app/my-apulink/components/ui/CurrencyInput.tsx
// Reusable currency input component with formatting on blur

import React, { useState, useEffect } from 'react';

interface CurrencyInputProps {
  value: number | undefined;
  onValue: (value: number) => void;
  decimals?: number;
  currency?: string;
  locale?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function CurrencyInput({
  value,
  onValue,
  decimals = 2,
  currency = 'EUR',
  locale = 'en-GB',
  placeholder = '0.00',
  className = '',
  disabled = false
}: CurrencyInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState('');

  // Format number for display
  const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num);
  };

  // Update display value when value prop changes
  useEffect(() => {
    if (!isFocused) {
      if (value !== undefined && value !== null && !isNaN(value)) {
        setDisplayValue(formatCurrency(value));
      } else {
        setDisplayValue('');
      }
    } else {
      // Show raw number when focused
      if (value !== undefined && value !== null && !isNaN(value)) {
        setDisplayValue(value.toString());
      }
    }
  }, [value, isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
    // Show raw number on focus
    if (value !== undefined && value !== null && !isNaN(value)) {
      setDisplayValue(value.toString());
    } else {
      setDisplayValue('');
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    const numValue = parseFloat(displayValue);
    
    if (!isNaN(numValue) && numValue >= 0) {
      // Round to specified decimals
      const rounded = Math.round(numValue * Math.pow(10, decimals)) / Math.pow(10, decimals);
      onValue(rounded);
      setDisplayValue(formatCurrency(rounded));
    } else if (displayValue === '') {
      // Allow empty field
      setDisplayValue('');
    } else {
      // Invalid input, revert to previous value
      if (value !== undefined && value !== null && !isNaN(value)) {
        setDisplayValue(formatCurrency(value));
      } else {
        setDisplayValue('');
      }
    }
  };

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Block negative sign
    if (e.key === '-') {
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
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onWheel={handleWheel}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
    />
  );
}
