import { Image, X } from 'lucide-react';

const AdditionalDetails = ({ 
  formData, 
  displayImagePreviews, 
  albumImagePreviews, 
  handleChange, 
  removeImage,
  handleCustomFieldChange,
  removeCustomField,
  prevSection
}) => {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4 border-b pb-2">Media & Additional Details</h2>
        
        <div className="space-y-6">
          {/* Display Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Display Images (Max 5)
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Image className="w-8 h-8 mb-2 text-gray-500" />
                  <p className="mb-1 text-sm text-gray-500">Click to upload display photos</p>
                  <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 10 MB each)</p>
                </div>
                <input 
                  type="file"
                  name="displayImages"
                  className="hidden"
                  onChange={handleChange}
                  accept="image/*"
                  multiple
                />
              </label>
            </div>
            
            {displayImagePreviews.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Display Images ({displayImagePreviews.length}/5)</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {displayImagePreviews.map((imgUrl, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={imgUrl} 
                        alt={`Display Preview ${index + 1}`} 
                        className="h-32 w-full object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index, 'displayImages')}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Album Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Album Images (Max 20)
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Image className="w-8 h-8 mb-2 text-gray-500" />
                  <p className="mb-1 text-sm text-gray-500">Click to upload album photos</p>
                  <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 10 MB each)</p>
                </div>
                <input 
                  type="file"
                  name="albumImages"
                  className="hidden"
                  onChange={handleChange}
                  accept="image/*"
                  multiple
                />
              </label>
            </div>
            
            {albumImagePreviews.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Album Images ({albumImagePreviews.length}/20)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {albumImagePreviews.map((imgUrl, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={imgUrl} 
                        alt={`Album Preview ${index + 1}`} 
                        className="h-32 w-full object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index, 'albumImages')}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
           
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-medium text-green-700 mb-2">Venue Promotion Tips</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Add high-quality photos showing different areas of your venue</li>
              <li>• Include images from actual wedding events (with permission)</li>
              <li>• Mention any special or unique features in the custom fields</li>
              <li>• Provide clear details about pricing and what's included</li>
            </ul>
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
          type="submit"
          className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300 flex items-center"
        >
          Submit Venue Information
        </button>
      </div>
    </>
  );
};

export default AdditionalDetails;