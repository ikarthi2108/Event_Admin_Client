import { Plus, X } from 'lucide-react';
import { useState } from 'react';

const PaymentPoliciesSection = ({ paymentPolicies, setPaymentPolicies }) => {
  const [currentPolicy, setCurrentPolicy] = useState('');

  const addPolicy = () => {
    if (currentPolicy.trim() === '') return;
    setPaymentPolicies([...paymentPolicies, currentPolicy.trim()]);
    setCurrentPolicy('');
  };

  const removePolicy = (index) => {
    const newPolicies = [...paymentPolicies];
    newPolicies.splice(index, 1);
    setPaymentPolicies(newPolicies);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Payment Policies</h3>
      <div className="flex items-center mb-3">
        <input
          type="text"
          value={currentPolicy}
          onChange={(e) => setCurrentPolicy(e.target.value)}
          placeholder="Add payment policy (e.g., 50% Payment On Booking)"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="button"
          onClick={addPolicy}
          className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="space-y-2">
        {paymentPolicies.map((policy, index) => (
          <div key={index} className="flex items-center bg-gray-50 p-3 rounded-md">
            <span className="flex-1">{policy}</span>
            <button
              type="button"
              onClick={() => removePolicy(index)}
              className="text-red-500 hover:text-red-700"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentPoliciesSection;