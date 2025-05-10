import React, { useState } from 'react';
import { Calendar, MapPin, DollarSign, Image, Check, X, Info } from 'lucide-react';

const WeddingVenueForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    address: '',
    addressLink: '',
    price: '',
    hasAC: false,
    brideGroomRoomAC: false,
    guestRoomCount: '',
    decoration: '',
    vegNonVeg: 'both',
    totalSize: '',
    cateringOption: 'both',
    parking: { car: false, bike: false },
    hasGenerator: false,
    establishmentYear: '',
    samplePhotos: [],
    faq: ''
  });

  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [activeSection, setActiveSection] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'car' || name === 'bike') {
      setFormData({
        ...formData,
        parking: {
          ...formData.parking,
          [name]: checked
        }
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else if (name === 'samplePhotos') {
      const files = Array.from(e.target.files);
      setFormData({
        ...formData,
        samplePhotos: [...formData.samplePhotos, ...files]
      });
      
      // Create image previews
      const newImageUrls = [];
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImageUrls.push(reader.result);
          if (newImageUrls.length === files.length) {
            setImagePreviewUrls([...imagePreviewUrls, ...newImageUrls]);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const removeImage = (index) => {
    const newPhotos = [...formData.samplePhotos];
    const newUrls = [...imagePreviewUrls];
    
    newPhotos.splice(index, 1);
    newUrls.splice(index, 1);
    
    setFormData({
      ...formData,
      samplePhotos: newPhotos
    });
    setImagePreviewUrls(newUrls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    window.scrollTo(0, 0);
  };

  const sections = [
    { id: 1, title: 'Basic Information' },
    { id: 2, title: 'Facilities & Features' },
    { id: 3, title: 'Food & Space' },
    { id: 4, title: 'Additional Details' }
  ];

  const FormSection = ({ id, children }) => {
    if (activeSection !== id) return null;
    return <div className="animate-fadeIn">{children}</div>;
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-b from-white to-green-50 rounded-xl shadow-xl">
      {formSubmitted ? (
        <div className="text-center py-16 space-y-6 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-green-800">Venue Information Submitted!</h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">Thank you for providing the details. The venue information has been successfully submitted.</p>
          <button 
            onClick={() => {
              setFormData({
                name: '',
                location: '',
                address: '',
                addressLink: '',
                price: '',
                hasAC: false,
                brideGroomRoomAC: false,
                guestRoomCount: '',
                decoration: '',
                vegNonVeg: 'both',
                totalSize: '',
                cateringOption: 'both',
                parking: { car: false, bike: false },
                hasGenerator: false,
                establishmentYear: '',
                samplePhotos: [],
                faq: ''
              });
              setImagePreviewUrls([]);
              setFormSubmitted(false);
              setActiveSection(1);
            }}
            className="mt-6 px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300"
          >
            Add Another Venue
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-center text-green-800 mb-2">Wedding Venue Form</h1>
          <p className="text-center text-gray-600 mb-8">Add your venue to our curated collection of premium wedding locations</p>
          
          {/* Progress Navigation */}
          <div className="flex justify-between mb-8 bg-white rounded-lg p-2 shadow-md">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 py-3 px-4 text-sm md:text-base font-medium rounded-md transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* SECTION 1: Basic Information */}
            <FormSection id={1}>
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
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
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
                  onClick={() => setActiveSection(2)}
                  className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300"
                >
                  Next: Facilities & Features
                </button>
              </div>
            </FormSection>
            
            {/* SECTION 2: Facilities & Features */}
            <FormSection id={2}>
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
                    
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="car"
                          name="car"
                          checked={formData.parking.car}
                          onChange={handleChange}
                          className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-all"
                        />
                        <label htmlFor="car" className="ml-2 text-gray-700">Car Parking</label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="bike"
                          name="bike"
                          checked={formData.parking.bike}
                          onChange={handleChange}
                          className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-all"
                        />
                        <label htmlFor="bike" className="ml-2 text-gray-700">Bike Parking</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label htmlFor="guestRoomCount" className="block text-sm font-medium text-gray-700 mb-1">
                    Guest Rooms Available
                  </label>
                  <input
                    type="number"
                    id="guestRoomCount"
                    name="guestRoomCount"
                    value={formData.guestRoomCount}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    min="0"
                    placeholder="Number of guest rooms"
                  />
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
                  onClick={() => setActiveSection(1)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-300"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection(3)}
                  className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300"
                >
                  Next: Food & Space
                </button>
              </div>
            </FormSection>
            
            {/* SECTION 3: Food & Space */}
            <FormSection id={3}>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-green-800 mb-4 border-b pb-2">Food & Space Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-green-700 mb-3">Food Options <span className="text-red-500">*</span></h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="vegOnly"
                          name="vegNonVeg"
                          value="veg"
                          checked={formData.vegNonVeg === 'veg'}
                          onChange={handleChange}
                          className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300"
                        />
                        <label htmlFor="vegOnly" className="ml-3 text-gray-700">Vegetarian Only</label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="nonVegOnly"
                          name="vegNonVeg"
                          value="nonVeg"
                          checked={formData.vegNonVeg === 'nonVeg'}
                          onChange={handleChange}
                          className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300"
                        />
                        <label htmlFor="nonVegOnly" className="ml-3 text-gray-700">Non-Vegetarian Only</label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="both"
                          name="vegNonVeg"
                          value="both"
                          checked={formData.vegNonVeg === 'both'}
                          onChange={handleChange}
                          className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300"
                        />
                        <label htmlFor="both" className="ml-3 text-gray-700">Both Available</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-green-700 mb-3">Catering Options <span className="text-red-500">*</span></h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="inHouse"
                          name="cateringOption"
                          value="in"
                          checked={formData.cateringOption === 'in'}
                          onChange={handleChange}
                          className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300"
                        />
                        <label htmlFor="inHouse" className="ml-3 text-gray-700">In-house Catering Only</label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="outside"
                          name="cateringOption"
                          value="out"
                          checked={formData.cateringOption === 'out'}
                          onChange={handleChange}
                          className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300"
                        />
                        <label htmlFor="outside" className="ml-3 text-gray-700">Outside Caterers Allowed</label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="bothCatering"
                          name="cateringOption"
                          value="both"
                          checked={formData.cateringOption === 'both'}
                          onChange={handleChange}
                          className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300"
                        />
                        <label htmlFor="bothCatering" className="ml-3 text-gray-700">Both Options Available</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label htmlFor="totalSize" className="block text-sm font-medium text-gray-700 mb-1">
                    Venue Size & Capacity
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      id="totalSize"
                      name="totalSize"
                      value={formData.totalSize}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                      placeholder="Total area (sq. ft.)"
                    />
                    <input
                      type="text"
                      id="capacity"
                      name="capacity"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                      placeholder="Guest capacity (e.g. 100-500)"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveSection(2)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-300"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection(4)}
                  className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300"
                >
                  Next: Additional Details
                </button>
              </div>
            </FormSection>
            
            {/* SECTION 4: Additional Details */}
            <FormSection id={4}>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-green-800 mb-4 border-b pb-2">Media & Additional Details</h2>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="samplePhotos" className="block text-sm font-medium text-gray-700 mb-3">
                      Venue Photos
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Image className="w-8 h-8 mb-2 text-gray-500" />
                          <p className="mb-1 text-sm text-gray-500">Click to upload venue photos</p>
                          <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 10 MB each)</p>
                        </div>
                        <input 
                          type="file"
                          id="samplePhotos"
                          name="samplePhotos"
                          className="hidden"
                          onChange={handleChange}
                          accept="image/*"
                          multiple
                        />
                      </label>
                    </div>
                    
                    {/* Image Previews */}
                    {imagePreviewUrls.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Preview ({imagePreviewUrls.length} photos)</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {imagePreviewUrls.map((imgUrl, index) => (
                            <div key={index} className="relative group">
                              <img 
                                src={imgUrl} 
                                alt={`Preview ${index + 1}`} 
                                className="h-32 w-full object-cover rounded-lg border border-gray-200"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
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
                  
                  <div>
                    <label htmlFor="faq" className="block text-sm font-medium text-gray-700 mb-2">
                      Frequently Asked Questions
                    </label>
                    <textarea
                      id="faq"
                      name="faq"
                      value={formData.faq}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                      placeholder="Add common questions and answers about the venue (e.g. Q: What's the refund policy? A: 50% refund for cancellations 30 days before the event...)"
                    ></textarea>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-medium text-green-700 mb-2">Venue Promotion Tips</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Add high-quality photos showing different areas of your venue</li>
                      <li>• Include images from actual wedding events (with permission)</li>
                      <li>• Mention any special or unique features in the FAQs</li>
                      <li>• Provide clear details about pricing and what's included</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveSection(3)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-300"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300 flex items-center"
                >
                  <Check className="mr-2 h-5 w-5" />
                  Submit Venue Information
                </button>
              </div>
            </FormSection>
          </form>

          {/* Footer information */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>All fields marked with <span className="text-red-500">*</span> are required</p>
            <p className="mt-1">By submitting this form, you agree to our terms and conditions</p>
          </div>
        </>
      )}
      
      {/* Floating help button */}
      <button className="fixed bottom-4 right-4 bg-green-600 text-white rounded-full p-3 shadow-lg hover:bg-green-700 transition-colors">
        <Info size={24} />
      </button>
    </div>
  );
};

export default WeddingVenueForm;