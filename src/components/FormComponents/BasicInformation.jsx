import { useState } from "react";
import { MapPin, DollarSign, Info, Calendar } from "lucide-react";

const BasicInformation = ({ nextSection }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    address: "",
    addressLink: "",
    price: "",
    establishmentYear: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4 border-b pb-2">Venue Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-green-600 transition-colors">
              Venue Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                required
              />
              <div className="absolute left-3 top-3 text-gray-400">
                <Info size={18} />
              </div>
            </div>
          </div>

          <div className="group">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-green-600 transition-colors">
              Location <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                required
              />
              <div className="absolute left-3 top-3 text-gray-400">
                <MapPin size={18} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="md:col-span-2 group">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-green-600 transition-colors">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              rows="2"
              required
            ></textarea>
          </div>

          <div className="group">
            <label htmlFor="addressLink" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-green-600 transition-colors">
              Maps Link
            </label>
            <input
              type="url"
              id="addressLink"
              name="addressLink"
              value={formData.addressLink}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              placeholder="Google Maps URL"
            />
          </div>
        </div>

        <div className="mt-6 group">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-green-600 transition-colors">
            Price Range (₹) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              placeholder="e.g. 50,000 - 1,50,000 or 2,00,000 onwards"
              required
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <DollarSign size={18} />
            </div>
          </div>
        </div>

        <div className="mt-6 group">
          <label htmlFor="establishmentYear" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-green-600 transition-colors">
            Establishment Year
          </label>
          <div className="relative">
            <input
              type="number"
              id="establishmentYear"
              name="establishmentYear"
              value={formData.establishmentYear}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              placeholder="e.g. 2010"
              min="1900"
              max="2025"
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <Calendar size={18} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={nextSection}
          className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300"
        >
          Next: Facilities & Features
        </button>
      </div>
    </>
  );
};

export default BasicInformation;
