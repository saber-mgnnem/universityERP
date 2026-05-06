'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function FormModal({
  isOpen,
  onClose,
  title,
  fields,
  onSubmit,
  submitLabel = 'Save',
  initialData = null,
}) {
  const [formData, setFormData] = useState({});

  // ================= INIT =================
  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setFormData(initialData);
    } else {
      const empty = fields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue ?? '';
        return acc;
      }, {});
      setFormData(empty);
    }
  }, [initialData, fields, isOpen]);

  // ================= CHANGE HANDLER =================
  const handleChange = (e, field) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : type === 'file'
          ? files[0]   // ✅ IMPORTANT FIX
          : value,
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] rounded-lg bg-background shadow-lg flex flex-col">

        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="space-y-4">

            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium mb-1">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>

                {/* TEXTAREA */}
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                  />
                ) : field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                  >
                    <option value="">Select</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'file' ? (
                  <input
                    type="file"
                    name={field.name}
                    onChange={(e) => handleChange(e, field)}
                    className="w-full"
                  />
                ) : (
                  <input
                    type={field.type || 'text'}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                  />
                )}
              </div>
            ))}

          </form>
        </div>

        {/* FOOTER */}
        <div className="flex gap-3 p-6 border-t">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border rounded p-2"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 text-white rounded p-2"
          >
            {submitLabel}
          </button>
        </div>

      </div>
    </div>
  );
}