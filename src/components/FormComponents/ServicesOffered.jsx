import { Plus, X } from 'lucide-react';

const ServicesOffered = ({ services, setServices, currentService, setCurrentService, errors }) => {
  const handleServiceChange = (e) => {
    const { name, value } = e.target;
    setCurrentService({ ...currentService, [name]: value });
  };

  const addService = () => {
    if (currentService.name.trim() === '' || currentService.price.trim() === '') {
      setErrors((prev) => ({
        ...prev,
        service: 'Both Service Name and Price are required',
      }));
      return;
    }
    if (isNaN(currentService.price) || currentService.price < 0) {
      setErrors((prev) => ({
        ...prev,
        service: 'Price must be a non-negative number',
      }));
      return;
    }
    setServices([...services, { ...currentService }]);
    setCurrentService({ name: '', price: '' });
    setErrors((prev) => ({ ...prev, service: '' }));
  };

  const removeService = (index) => {
    const newServices = [...services];
    newServices.splice(index, 1);
    setServices(newServices);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4 border-b pb-2">Services Offered</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
          <input
            type="text"
            name="name"
            value={currentService.name}
            onChange={handleServiceChange}
            placeholder="e.g., Non-Veg Pricing"
            className={`w-full px-4 py-2 border ${
              errors.service ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
          />
        </div>

        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
            <input
              type="text"
              name="price"
              value={currentService.price}
              onChange={handleServiceChange}
              placeholder="e.g., 1800"
              className={`w-full px-4 py-2 border ${
                errors.service ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
          </div>
          <button
            type="button"
            onClick={addService}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      {errors.service && <p className="text-red-500 text-xs mb-2">{errors.service}</p>}

      <div className="space-y-2">
        {services.length > 0 ? (
          services.map((service, index) => (
            <div key={index} className="flex items-center bg-gray-50 p-3 rounded-md">
              <span className="flex-1 text-gray-800">
                {service.name}: ₹{service.price}
              </span>
              <button
                type="button"
                onClick={() => removeService(index)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                <X size={18} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No services added yet.</p>
        )}
      </div>
    </div>
  );
};

export default ServicesOffered;