// Path: app/my-apulink/components/AddBudgetItem.tsx
// Component for adding new budget items to a project

'use client';

import React, { useState } from 'react';
import { budgetService } from '../../../lib/firebase/firestore-service';
import { Plus, X, Loader2 } from 'lucide-react';
import { CurrencyInput } from './ui/CurrencyInput';
import { NumberInput } from './ui/NumberInput';
import { z } from 'zod';

// Zod schema for validation
const budgetItemSchema = z.object({
  item: z.string().min(1, 'Item description is required'),
  quantity: z.number().nonnegative('Quantity must be non-negative').max(1e12),
  unitCost: z.number().nonnegative('Unit cost must be non-negative').max(1e12),
  vatRate: z.number().min(0).max(1) // As decimal: 0 to 1 (0% to 100%)
});

interface AddBudgetItemProps {
  projectId: string;
  onClose: () => void;
  onAdded: () => void;
}

export default function AddBudgetItem({ projectId, onClose, onAdded }: AddBudgetItemProps) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    category: 'Works' as const,
    item: '',
    quantity: 1,
    unit: 'unit',
    unitCost: 0,
    vatRate: 0.22,
    status: 'planned' as const,
    notes: ''
  });

  const totalCost = formData.quantity * formData.unitCost;
  const vatAmount = totalCost * formData.vatRate;
  const grandTotal = totalCost + vatAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      // Validate critical fields
      const validation = budgetItemSchema.parse({
        item: formData.item,
        quantity: formData.quantity,
        unitCost: formData.unitCost,
        vatRate: formData.vatRate
      });

      setLoading(true);

      await budgetService.createBudgetItem({
        projectId,
        ...formData,
        totalCost: Math.round(totalCost * 100) / 100,
        vatAmount: Math.round(vatAmount * 100) / 100
      });
      
      onAdded();
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.error('Error adding budget item:', error);
        setErrors({ general: 'Error adding budget item. Please try again.' });
      }
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add Budget Item</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
              {errors.general}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="Acquisition">Acquisition</option>
                <option value="Design">Design</option>
                <option value="Permits">Permits</option>
                <option value="Works">Works</option>
                <option value="FF&E">FF&E</option>
                <option value="Contingency">Contingency</option>
                <option value="Fees">Fees</option>
                <option value="VAT">VAT</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="planned">Planned</option>
                <option value="committed">Committed</option>
                <option value="invoiced">Invoiced</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Item Description *</label>
            <input
              type="text"
              required
              value={formData.item}
              onChange={(e) => setFormData({ ...formData, item: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="e.g., Structural Reinforcement"
            />
            {errors.item && (
              <p className="text-red-500 text-sm mt-1">{errors.item}</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <NumberInput
                value={formData.quantity}
                onValue={(value) => setFormData({ ...formData, quantity: value })}
                decimals={3}
                min={0}
                placeholder="1"
                className="w-full px-3 py-2 border rounded-lg"
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Unit</label>
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="e.g., sqm, unit, hours"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Unit Cost (€)</label>
              <CurrencyInput
                value={formData.unitCost}
                onValue={(value) => setFormData({ ...formData, unitCost: value })}
                decimals={2}
                currency="EUR"
                locale="en-GB"
                placeholder="0.00"
                className="w-full px-3 py-2 border rounded-lg"
              />
              {errors.unitCost && (
                <p className="text-red-500 text-sm mt-1">{errors.unitCost}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">VAT Rate</label>
            <select
              value={formData.vatRate}
              onChange={(e) => setFormData({ ...formData, vatRate: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="0">0% - No VAT</option>
              <option value="0.04">4% - Reduced</option>
              <option value="0.10">10% - Reduced</option>
              <option value="0.22">22% - Standard</option>
            </select>
            {errors.vatRate && (
              <p className="text-red-500 text-sm mt-1">{errors.vatRate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              rows={2}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>€{totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>VAT ({(formData.vatRate * 100).toFixed(0)}%)</span>
              <span>€{vatAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>€{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Item
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
