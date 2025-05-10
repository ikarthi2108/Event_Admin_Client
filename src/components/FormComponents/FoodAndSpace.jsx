const FoodAndSpace = ({ formData, handleChange, prevSection, nextSection, errors }) => {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4 border-b pb-2">Food & Space Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-green-700 mb-3">
              Food Options <span className="text-red-500">*</span>
            </h3>

            <div className="space-y-3">
              {['veg', 'nonVeg', 'both'].map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="radio"
                    id={option}
                    name="vegNonVeg"
                    value={option}
                    checked={formData.vegNonVeg === option}
                    onChange={handleChange}
                    className={`h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 ${
                      errors.vegNonVeg ? 'border-red-500' : ''
                    }`}
                  />
                  <label htmlFor={option} className="ml-3 text-gray-700 capitalize">
                    {option}
                  </label>
                </div>
              ))}
              {errors.vegNonVeg && (
                <p className="text-red-500 text-xs mt-1">{errors.vegNonVeg}</p>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-green-700 mb-3">
              Catering Options <span className="text-red-500">*</span>
            </h3>

            <div className="space-y-3">
              {['in', 'out', 'both'].map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="radio"
                    id={`${option}Catering`}
                    name="cateringOption"
                    value={option}
                    checked={formData.cateringOption === option}
                    onChange={handleChange}
                    className={`h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 ${
                      errors.cateringOption ? 'border-red-500' : ''
                    }`}
                  />
                  <label htmlFor={`${option}Catering`} className="ml-3 text-gray-700 capitalize">
                    {option}
                  </label>
                </div>
              ))}
              {errors.cateringOption && (
                <p className="text-red-500 text-xs mt-1">{errors.cateringOption}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Venue Capacity</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="seatingCapacity" className="block text-sm text-gray-600 mb-1">
                Seating Capacity
              </label>
              <input
                type="number"
                id="seatingCapacity"
                name="seatingCapacity"
                value={formData.seatingCapacity}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.seatingCapacity ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:ring-green-500 focus:border-green-500`}
                min="0"
                placeholder="Number of seats"
              />
              {errors.seatingCapacity && (
                <p className="text-red-500 text-xs mt-1">{errors.seatingCapacity}</p>
              )}
            </div>

            <div>
              <label htmlFor="floatingCapacity" className="block text-sm text-gray-600 mb-1">
                Floating Capacity
              </label>
              <input
                type="number"
                id="floatingCapacity"
                name="floatingCapacity"
                value={formData.floatingCapacity}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.floatingCapacity ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:ring-green-500 focus:border-green-500`}
                min="0"
                placeholder="Number of people"
              />
              {errors.floatingCapacity && (
                <p className="text-red-500 text-xs mt-1">{errors.floatingCapacity}</p>
              )}
            </div>

            <div>
              <label htmlFor="diningCapacity" className="block text-sm text-gray-600 mb-1">
                Dining Capacity
              </label>
              <input
                type="number"
                id="diningCapacity"
                name="diningCapacity"
                value={formData.diningCapacity}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.diningCapacity ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:ring-green-500 focus:border-green-500`}
                min="0"
                placeholder="Number of people"
              />
              {errors.diningCapacity && (
                <p className="text-red-500 text-xs mt-1">{errors.diningCapacity}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevSection}
          className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-300"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={nextSection}
          className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300"
        >
          Next: Additional Details
        </button>
      </div>
    </>
  );
};

export default FoodAndSpace;