import { Plus, X } from 'lucide-react';
import { useState } from 'react';

const AmenitiesSection = ({ amenities, setAmenities }) => {
  const [currentAmenity, setCurrentAmenity] = useState('');

  const addAmenity = () => {
    if (currentAmenity.trim() === '') return;
    setAmenities([...amenities, currentAmenity.trim()]);
    setCurrentAmenity('');
  };

  const removeAmenity = (index) => {
    const newAmenities = [...amenities];
    newAmenities.splice(index, 1);
    setAmenities(newAmenities);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Venue Amenities</h3>
      <div className="flex items-center mb-3">
        <input
          type="text"
          value={currentAmenity}
          onChange={(e) => setCurrentAmenity(e.target.value)}
          placeholder="Add amenity (e.g., 4000 Square Feet Capacity)"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="button"
          onClick={addAmenity}
          className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="space-y-2">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center bg-gray-50 p-3 rounded-md">
            <span className="flex-1">{amenity}</span>
            <button
              type="button"
              onClick={() => removeAmenity(index)}
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

export default AmenitiesSection;