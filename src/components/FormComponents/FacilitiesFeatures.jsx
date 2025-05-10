const FacilitiesFeatures = ({ formData, handleChange, prevSection, nextSection }) => {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4 border-b pb-2">Comfort & Facilities</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-green-700 mb-3">Climate Control</h3>
            
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="hasAC"
                name="hasAC"
                checked={formData.hasAC}
                onChange={handleChange}
                className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-all"
              />
              <label htmlFor="hasAC" className="ml-3 text-gray-700">Venue is Air Conditioned</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="brideGroomRoomAC"
                name="brideGroomRoomAC"
                checked={formData.brideGroomRoomAC}
                onChange={handleChange}
                className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-all"
              />
              <label htmlFor="brideGroomRoomAC" className="ml-3 text-gray-700">Bride/Groom Rooms with AC</label>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-green-700 mb-3">Power & Parking</h3>
            
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="hasGenerator"
                name="hasGenerator"
                checked={formData.hasGenerator}
                onChange={handleChange}
                className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-all"
              />
              <label htmlFor="hasGenerator" className="ml-3 text-gray-700">Generator Backup Available</label>
            </div>
            
            <div className="space-y-3">
              <div>
                <label htmlFor="carParkingCount" className="block text-sm text-gray-600 mb-1">
                  Number of Car Parking Spaces
                </label>
                <input
                  type="number"
                  id="carParkingCount"
                  name="carParkingCount"
                  value={formData.carParkingCount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  min="0"
                  placeholder="Enter number of cars"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-green-700 mb-3">Entertainment</h3>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hasDJ"
                name="hasDJ"
                checked={formData.hasDJ}
                onChange={handleChange}
                className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-all"
              />
              <label htmlFor="hasDJ" className="ml-3 text-gray-700">DJ Allowed</label>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-green-700 mb-3">Accommodation</h3>
            
            <div>
              <label htmlFor="guestRoomCount" className="block text-sm text-gray-600 mb-1">
                Guest Rooms Available
              </label>
              <input
                type="number"
                id="guestRoomCount"
                name="guestRoomCount"
                value={formData.guestRoomCount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                min="0"
                placeholder="Number of guest rooms"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <label htmlFor="decoration" className="block text-sm font-medium text-gray-700 mb-1">
            Decoration Details
          </label>
          <textarea
            id="decoration"
            name="decoration"
            value={formData.decoration}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            placeholder="Describe available decoration options, themes, and packages"
          ></textarea>
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
          Next: Food & Space
        </button>
      </div>
    </>
  );
};

export default FacilitiesFeatures;