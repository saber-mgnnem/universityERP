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

    // EDIT MODE
    if (initialData) {
      setFormData(initialData);
    }

    // CREATE MODE
    else {
      const empty = fields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue ?? '';
        return acc;
      }, {});

      setFormData(empty);
    }
  }, [initialData, fields, isOpen]);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : type === 'file'
          ? files[0]
          : value,
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // ================= CLOSE =================
  const handleClose = () => {
    setFormData({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] rounded-xl bg-background shadow-xl border flex flex-col">

        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {title}
          </h2>

          <button
            onClick={handleClose}
            className="p-1 rounded hover:bg-muted transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto flex-1">

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {fields.map((field) => (
              <div key={field.name}>

                {/* LABEL */}
                <label className="block text-sm font-medium mb-2">
                  {field.label}

                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>

                {/* TEXTAREA */}
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    placeholder={field.placeholder || ''}
                    required={field.required}
                    rows={4}
                    className="w-full border border-input rounded-lg p-3 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : field.type === 'select' ? (

                  /* SELECT */
                  <select
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full border border-input rounded-lg p-3 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">
                      Select
                    </option>

                    {field.options?.map((opt, index) => {

                      // OBJECT OPTIONS
                      if (typeof opt === 'object') {
                        return (
                          <option
                            key={opt.value || index}
                            value={opt.value}
                          >
                            {opt.label}
                          </option>
                        );
                      }

                      // STRING OPTIONS
                      return (
                        <option
                          key={opt}
                          value={opt}
                        >
                          {opt}
                        </option>
                      );
                    })}
                  </select>

                ) : field.type === 'file' ? (

                  /* FILE */
                  <input
                    type="file"
                    name={field.name}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full border border-input rounded-lg p-3 bg-background"
                  />

                ) : field.type === 'checkbox' ? (

                  /* CHECKBOX */
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name={field.name}
                      checked={formData[field.name] || false}
                      onChange={handleChange}
                    />

                    <span className="text-sm text-muted-foreground">
                      {field.checkboxLabel || field.label}
                    </span>
                  </div>

                ) : (

                  /* INPUT */
                  <input
                    type={field.type || 'text'}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    placeholder={field.placeholder || ''}
                    required={field.required}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    className="w-full border border-input rounded-lg p-3 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
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
            onClick={handleClose}
            className="flex-1 border border-input rounded-lg p-3 hover:bg-muted transition"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 bg-primary text-primary-foreground rounded-lg p-3 hover:bg-primary/90 transition"
          >
            {submitLabel}
          </button>

        </div>

      </div>
    </div>
  );
}