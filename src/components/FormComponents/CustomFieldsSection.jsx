import { useState } from 'react';
import { Plus, X } from 'lucide-react';

const CustomFieldsSection = ({ customFields, onAddField, onRemoveField }) => {
  const [fieldName, setFieldName] = useState('');
  const [fieldValue, setFieldValue] = useState('');

  const handleAddField = () => {
    if (fieldName.trim() && fieldValue.trim()) {
      onAddField({ name: fieldName, value: fieldValue });
      setFieldName('');
      setFieldValue('');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-green-800 mb-4">Custom Fields</h3>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Field Name"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
        />
        <input
          type="text"
          placeholder="Field Value"
          value={fieldValue}
          onChange={(e) => setFieldValue(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
        />
        <button
          type="button"
          onClick={handleAddField}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="space-y-2">
        {customFields.map((field, index) => (
          <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded-lg border border-green-200">
            <span className="text-gray-800">{field.name}: {field.value}</span>
            <button
              type="button"
              onClick={() => onRemoveField(index)}
              className="text-red-500 hover:text-red-700"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomFieldsSection;
