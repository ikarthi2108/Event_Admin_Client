import { Calendar, MapPin, DollarSign, Image, Check, X, Info, Plus } from 'lucide-react';


const ServicesOffered = ({ services, setServices, currentService, setCurrentService }) => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addService();
      }
    };
  
    const addService = () => {
      if (currentService.name.trim() === '' || currentService.price.trim() === '') return;
      setServices([...services, { ...currentService }]);
      setCurrentService({ name: '', price: '' });
    };
  
    const removeService = (index) => {
      const newServices = [...services];
      newServices.splice(index, 1);
      setServices(newServices);
    };
  
    return (
      <div>
        <h3 className="text-lg font-semibold mb-3">Services Offered</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
            <input
              type="text"
              value={currentService.name}
              onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })}
              onKeyDown={handleKeyDown}
              placeholder="e.g., Non-Veg Pricing"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <input
                type="text"
                value={currentService.price}
                onChange={(e) => setCurrentService({ ...currentService, price: e.target.value })}
                onKeyDown={handleKeyDown}
                placeholder="e.g., 1800"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
        <div className="space-y-2">
          {services.map((service, index) => (
            <div key={index} className="flex items-center bg-gray-50 p-3 rounded-md">
              <span className="flex-1">{service.name}: ₹{service.price}</span>
              <button
                type="button"
                onClick={() => removeService(index)}
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

  export default ServicesOffered