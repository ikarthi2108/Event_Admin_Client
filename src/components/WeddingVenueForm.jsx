// WeddingVenueForm.jsx
import React, { useState, useCallback } from 'react';
import { Calendar, MapPin, DollarSign, Image, Check, X, Info, Plus } from 'lucide-react';

// Components
import BasicInformation from './FormComponents/BasicInformation';
import FacilitiesFeatures from './FormComponents/FacilitiesFeatures';
import FoodAndSpace from './FormComponents/FoodAndSpace';
import AdditionalDetails from './FormComponents/AdditionalDetails';
import ServicesOffered from './FormComponents/ServicesOffered';
import FAQSection from './FormComponents/FAQSection';

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
    seatingCapacity: '',
    floatingCapacity: '',
    diningCapacity: '',
    cateringOption: 'both',
    carParkingCount: '',
    hasGenerator: false,
    hasDJ: false,
    establishmentYear: '',
    displayImages: [],
    albumImages: [],
    amenities: [],
    paymentPolicies: [],
    services: [],
    faqs: [],
    customFields: []
  });

  const [displayImagePreviews, setDisplayImagePreviews] = useState([]);
  const [albumImagePreviews, setAlbumImagePreviews] = useState([]);
  const [activeSection, setActiveSection] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentAmenity, setCurrentAmenity] = useState('');
  const [currentPaymentPolicy, setCurrentPaymentPolicy] = useState('');
  const [currentService, setCurrentService] = useState({ name: '', price: '' });
  const [currentFAQ, setCurrentFAQ] = useState({ question: '', answer: '' });

  const handleChange = useCallback((e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prevData) => {
      if (type === 'checkbox') {
        return {
          ...prevData,
          [name]: checked
        };
      } else if (name === 'displayImages' || name === 'albumImages') {
        const newFiles = Array.from(files);
        const maxFiles = name === 'displayImages' ? 5 : 20;

        if (newFiles.length + prevData[name].length > maxFiles) {
          alert(`You can upload maximum ${maxFiles} ${name === 'displayImages' ? 'display' : 'album'} images`);
          return prevData;
        }

        const newImageUrls = [];
        newFiles.forEach((file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            newImageUrls.push(reader.result);
            if (newImageUrls.length === newFiles.length) {
              if (name === 'displayImages') {
                setDisplayImagePreviews((prev) => [...prev, ...newImageUrls]);
              } else {
                setAlbumImagePreviews((prev) => [...prev, ...newImageUrls]);
              }
            }
          };
          reader.readAsDataURL(file);
        });

        return {
          ...prevData,
          [name]: [...prevData[name], ...newFiles]
        };
      } else {
        return {
          ...prevData,
          [name]: value
        };
      }
    });
  }, []);

  const removeImage = (index, type) => {
    setFormData((prevData) => {
      const newPhotos = [...prevData[type]];
      newPhotos.splice(index, 1);
      return {
        ...prevData,
        [type]: newPhotos
      };
    });

    if (type === 'displayImages') {
      setDisplayImagePreviews((prev) => {
        const newUrls = [...prev];
        newUrls.splice(index, 1);
        return newUrls;
      });
    } else {
      setAlbumImagePreviews((prev) => {
        const newUrls = [...prev];
        newUrls.splice(index, 1);
        return newUrls;
      });
    }
  };

  const handleKeyDownAmenity = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addAmenity();
    }
  };

  const addAmenity = () => {
    if (currentAmenity.trim() === '') return;
    setFormData((prevData) => ({
      ...prevData,
      amenities: [...prevData.amenities, currentAmenity.trim()]
    }));
    setCurrentAmenity('');
  };

  const removeAmenity = (index) => {
    setFormData((prevData) => {
      const newAmenities = [...prevData.amenities];
      newAmenities.splice(index, 1);
      return {
        ...prevData,
        amenities: newAmenities
      };
    });
  };

  const handleKeyDownPolicy = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addPaymentPolicy();
    }
  };

  const addPaymentPolicy = () => {
    if (currentPaymentPolicy.trim() === '') return;
    setFormData((prevData) => ({
      ...prevData,
      paymentPolicies: [...prevData.paymentPolicies, currentPaymentPolicy.trim()]
    }));
    setCurrentPaymentPolicy('');
  };

  const removePaymentPolicy = (index) => {
    setFormData((prevData) => {
      const newPolicies = [...prevData.paymentPolicies];
      newPolicies.splice(index, 1);
      return {
        ...prevData,
        paymentPolicies: newPolicies
      };
    });
  };

  const handleCustomFieldChange = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      customFields: [...prevData.customFields, field]
    }));
  };

  const removeCustomField = (index) => {
    setFormData((prevData) => {
      const newFields = [...prevData.customFields];
      newFields.splice(index, 1);
      return {
        ...prevData,
        customFields: newFields
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    window.scrollTo(0, 0);
  };

  const resetForm = () => {
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
      seatingCapacity: '',
      floatingCapacity: '',
      diningCapacity: '',
      cateringOption: 'both',
      carParkingCount: '',
      hasGenerator: false,
      hasDJ: false,
      establishmentYear: '',
      displayImages: [],
      albumImages: [],
      amenities: [],
      paymentPolicies: [],
      services: [],
      faqs: [],
      customFields: []
    });
    setDisplayImagePreviews([]);
    setAlbumImagePreviews([]);
    setCurrentAmenity('');
    setCurrentPaymentPolicy('');
    setCurrentService({ name: '', price: '' });
    setCurrentFAQ({ question: '', answer: '' });
    setFormSubmitted(false);
    setActiveSection(1);
  };

  const sections = [
    { id: 1, title: 'Basic Information' },
    { id: 2, title: 'Facilities & Features' },
    { id: 3, title: 'Food & Space' },
    { id: 4, title: 'Additional Details' },
    { id: 5, title: 'Amenities & Policies' },
    { id: 6, title: 'FAQs' }
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
            onClick={resetForm}
            className="mt-6 px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300"
          >
            Add Another Venue
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-center text-green-800 mb-2">Wedding Venue Form</h1>
          <p className="text-center text-gray-600 mb-8">Add your venue to our curated collection of premium wedding locations</p>
          
          <div className="flex flex-wrap justify-between mb-8 bg-white rounded-lg p-2 shadow-md">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 min-w-[150px] py-3 px-2 text-xs sm:text-sm md:text-base font-medium rounded-md transition-all duration-300 ${
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
            <FormSection id={1}>
              <BasicInformation 
                formData={formData} 
                handleChange={handleChange} 
                nextSection={() => setActiveSection(2)}
              />
            </FormSection>
            
            <FormSection id={2}>
              <FacilitiesFeatures 
                formData={formData} 
                handleChange={handleChange} 
                prevSection={() => setActiveSection(1)}
                nextSection={() => setActiveSection(3)}
              />
            </FormSection>
            
            <FormSection id={3}>
              <FoodAndSpace 
                formData={formData} 
                handleChange={handleChange} 
                prevSection={() => setActiveSection(2)}
                nextSection={() => setActiveSection(4)}
              />
            </FormSection>
            
            <FormSection id={4}>
              <AdditionalDetails 
                formData={formData}
                displayImagePreviews={displayImagePreviews}
                albumImagePreviews={albumImagePreviews}
                handleChange={handleChange}
                removeImage={removeImage}
                handleCustomFieldChange={handleCustomFieldChange}
                removeCustomField={removeCustomField}
                prevSection={() => setActiveSection(3)}
                nextSection={() => setActiveSection(5)}
              />
            </FormSection>

            <FormSection id={5}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-green-800 mb-6">Amenities & Policies</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Venue Amenities</h3>
                    <div className="flex items-center mb-3">
                      <input
                        type="text"
                        value={currentAmenity}
                        onChange={(e) => setCurrentAmenity(e.target.value)}
                        onKeyDown={handleKeyDownAmenity}
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
                      {formData.amenities.map((amenity, index) => (
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

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Payment Policies</h3>
                    <div className="flex items-center mb-3">
                      <input
                        type="text"
                        value={currentPaymentPolicy}
                        onChange={(e) => setCurrentPaymentPolicy(e.target.value)}
                        onKeyDown={handleKeyDownPolicy}
                        placeholder="Add payment policy (e.g., 50% Payment On Booking)"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <button
                        type="button"
                        onClick={addPaymentPolicy}
                        className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formData.paymentPolicies.map((policy, index) => (
                        <div key={index} className="flex items-center bg-gray-50 p-3 rounded-md">
                          <span className="flex-1">{policy}</span>
                          <button
                            type="button"
                            onClick={() => removePaymentPolicy(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <ServicesOffered
                    services={formData.services}
                    setServices={(services) => setFormData({ ...formData, services })}
                    currentService={currentService}
                    setCurrentService={setCurrentService}
                  />

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setActiveSection(4)}
                      className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSection(6)}
                      className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </FormSection>

            <FormSection id={6}>
              <FAQSection
                faqs={formData.faqs}
                setFaqs={(faqs) => setFormData({ ...formData, faqs })}
                currentFAQ={currentFAQ}
                setCurrentFAQ={setCurrentFAQ}
              />
              <div className="flex justify-between pt-4 px-6">
                <button
                  type="button"
                  onClick={() => setActiveSection(5)}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Submit Venue
                </button>
              </div>
            </FormSection>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>All fields marked with <span className="text-red-500">*</span> are required</p>
            <p className="mt-1">By submitting this form, you agree to our terms and conditions</p>
          </div>
        </>
      )}
      
      <button className="fixed bottom-4 right-4 bg-green-600 text-white rounded-full p-3 shadow-lg hover:bg-green-700 transition-colors">
        <Info size={24} />
      </button>
    </div>
  );
};

export default WeddingVenueForm;