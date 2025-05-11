import React, { useState, useCallback, useMemo } from 'react';
import { Calendar, MapPin, DollarSign, Check, Info, Image, X, Plus } from 'lucide-react';
import axios from 'axios';

const WeddingVenueForm = () => {
  const tamilNaduDistricts = [
    'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 
    'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kancheepuram', 
    'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 
    'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 
    'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 
    'Thanjavur', 'Theni', 'Thiruvallur', 'Thiruvarur', 'Thoothukudi', 
    'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 
    'Tiruvannamalai', 'Vellore', 'Viluppuram', 'Virudhunagar'
  ];

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    district: '',
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
    customFields: [],
    otherInformation: [],
  });

  const [displayImagePreviews, setDisplayImagePreviews] = useState([]);
  const [albumImagePreviews, setAlbumImagePreviews] = useState([]);
  const [activeSection, setActiveSection] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentService, setCurrentService] = useState({ name: '', price: '' });
  const [currentFAQ, setCurrentFAQ] = useState({ question: '', answer: '' });
  const [currentCustomField, setCurrentCustomField] = useState({ fieldName: '', fieldValue: '' });
  const [currentAmenity, setCurrentAmenity] = useState('');
  const [currentPolicy, setCurrentPolicy] = useState('');
  const [currentOtherInfo, setCurrentOtherInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = useCallback(() => {
    const newErrors = {};

    // Required fields
    if (!formData.name.trim()) newErrors.name = 'Venue Name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.district.trim()) newErrors.district = 'District is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.price.trim()) newErrors.price = 'Price Range is required';
    if (!formData.vegNonVeg) newErrors.vegNonVeg = 'Food Option is required';
    if (!formData.cateringOption) newErrors.cateringOption = 'Catering Option is required';

    // Numeric fields
    if (formData.guestRoomCount && (isNaN(formData.guestRoomCount) || Number(formData.guestRoomCount) < 0)) {
      newErrors.guestRoomCount = 'Guest Room Count must be a non-negative number';
    }
    if (formData.carParkingCount && (isNaN(formData.carParkingCount) || Number(formData.carParkingCount) < 0)) {
      newErrors.carParkingCount = 'Car Parking Count must be a non-negative number';
    }
    if (formData.seatingCapacity && (isNaN(formData.seatingCapacity) || Number(formData.seatingCapacity) < 0)) {
      newErrors.seatingCapacity = 'Seating Capacity must be a non-negative number';
    }
    if (formData.floatingCapacity && (isNaN(formData.floatingCapacity) || Number(formData.floatingCapacity) < 0)) {
      newErrors.floatingCapacity = 'Floating Capacity must be a non-negative number';
    }
    if (formData.diningCapacity && (isNaN(formData.diningCapacity) || Number(formData.diningCapacity) < 0)) {
      newErrors.diningCapacity = 'Dining Capacity must be a non-negative number';
    }
    if (
      formData.establishmentYear &&
      (isNaN(formData.establishmentYear) || Number(formData.establishmentYear) < 1900 || Number(formData.establishmentYear) > new Date().getFullYear())
    ) {
      newErrors.establishmentYear = `Establishment Year must be between 1900 and ${new Date().getFullYear()}`;
    }

    // URL validation for addressLink
    if (formData.addressLink) {
      try {
        new URL(formData.addressLink);
      } catch {
        newErrors.addressLink = 'Please enter a valid URL';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prevData) => {
      if (type === 'checkbox') {
        return { ...prevData, [name]: checked };
      } else if (type === 'file' && (name === 'displayImages' || name === 'albumImages')) {
        const newFiles = Array.from(files);
        const maxFiles = name === 'displayImages' ? 5 : 20;
        const maxSize = 10 * 1024 * 1024; // 10MB

        // Validate file types and sizes
        const validFiles = newFiles.filter((file) => {
          const isValidType = ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type);
          const isValidSize = file.size <= maxSize;
          if (!isValidType) {
            alert(`Invalid file type for ${file.name}. Only PNG, JPG, or JPEG are allowed.`);
          }
          if (!isValidSize) {
            alert(`File ${file.name} exceeds 10MB limit.`);
          }
          return isValidType && isValidSize;
        });

        if (validFiles.length + prevData[name].length > maxFiles) {
          alert(`You can upload a maximum of ${maxFiles} ${name === 'displayImages' ? 'display' : 'album'} images`);
          return prevData;
        }

        // Generate previews
        const newPreviews = validFiles.map((file) => URL.createObjectURL(file));

        if (name === 'displayImages') {
          setDisplayImagePreviews((prev) => [...prev, ...newPreviews]);
        } else {
          setAlbumImagePreviews((prev) => [...prev, ...newPreviews]);
        }

        return {
          ...prevData,
          [name]: [...prevData[name], ...validFiles],
        };
      } else {
        return { ...prevData, [name]: name === 'district' ? value.toLowerCase() : value };
      }
    });

    setErrors((prev) => ({ ...prev, [name]: '' }));
  }, []);

  const removeImage = useCallback((index, type) => {
    setFormData((prevData) => {
      const newPhotos = [...prevData[type]];
      newPhotos.splice(index, 1);
      return { ...prevData, [type]: newPhotos };
    });

    if (type === 'displayImages') {
      setDisplayImagePreviews((prev) => {
        const newUrls = [...prev];
        URL.revokeObjectURL(newUrls[index]);
        newUrls.splice(index, 1);
        return newUrls;
      });
    } else {
      setAlbumImagePreviews((prev) => {
        const newUrls = [...prev];
        URL.revokeObjectURL(newUrls[index]);
        newUrls.splice(index, 1);
        return newUrls;
      });
    }
  }, []);

  const handleCustomFieldChange = useCallback((e) => {
    const { name, value } = e.target;
    setCurrentCustomField((prev) => ({ ...prev, [name]: value }));
  }, []);

  const addCustomField = useCallback(() => {
    if (currentCustomField.fieldName.trim() === '' || currentCustomField.fieldValue.trim() === '') {
      setErrors((prev) => ({
        ...prev,
        customField: 'Both Field Name and Field Value are required',
      }));
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      customFields: [...prevData.customFields, { ...currentCustomField }],
    }));
    setCurrentCustomField({ fieldName: '', fieldValue: '' });
    setErrors((prev) => ({ ...prev, customField: '' }));
  }, [currentCustomField]);

  const removeCustomField = useCallback((index) => {
    setFormData((prevData) => {
      const newCustomFields = [...prevData.customFields];
      newCustomFields.splice(index, 1);
      return { ...prevData, customFields: newCustomFields };
    });
  }, []);

  const addAmenity = useCallback(() => {
    if (currentAmenity.trim() === '') return;
    setFormData((prev) => ({
      ...prev,
      amenities: [...prev.amenities, currentAmenity.trim()],
    }));
    setCurrentAmenity('');
  }, [currentAmenity]);

  const removeAmenity = useCallback((index) => {
    setFormData((prev) => {
      const newAmenities = [...prev.amenities];
      newAmenities.splice(index, 1);
      return { ...prev, amenities: newAmenities };
    });
  }, []);

  const addOtherInfo = useCallback(() => {
    if (currentOtherInfo.trim() === '') return;
    setFormData((prev) => ({
      ...prev,
      otherInformation: [...prev.otherInformation, currentOtherInfo.trim()],
    }));
    setCurrentOtherInfo('');
  }, [currentOtherInfo]);

  const removeOtherInfo = useCallback((index) => {
    setFormData((prev) => {
      const newOtherInfo = [...prev.otherInformation];
      newOtherInfo.splice(index, 1);
      return { ...prev, otherInformation: newOtherInfo };
    });
  }, []);

  const addPolicy = useCallback(() => {
    if (currentPolicy.trim() === '') return;
    setFormData((prev) => ({
      ...prev,
      paymentPolicies: [...prev.paymentPolicies, currentPolicy.trim()],
    }));
    setCurrentPolicy('');
  }, [currentPolicy]);

  const removePolicy = useCallback((index) => {
    setFormData((prev) => {
      const newPolicies = [...prev.paymentPolicies];
      newPolicies.splice(index, 1);
      return { ...prev, paymentPolicies: newPolicies };
    });
  }, []);

  const handleServiceChange = useCallback((e) => {
    const { name, value } = e.target;
    setCurrentService((prev) => ({ ...prev, [name]: value }));
  }, []);

  const addService = useCallback(() => {
    if (currentService.name.trim() === '' || currentService.price.trim() === '') {
      setErrors((prev) => ({
        ...prev,
        service: 'Both Service Name and Price are required',
      }));
      return;
    }
    if (isNaN(currentService.price) || Number(currentService.price) < 0) {
      setErrors((prev) => ({
        ...prev,
        service: 'Price must be a non-negative number',
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      services: [...prev.services, { ...currentService, price: Number(currentService.price) }],
    }));
    setCurrentService({ name: '', price: '' });
    setErrors((prev) => ({ ...prev, service: '' }));
  }, [currentService]);

  const removeService = useCallback((index) => {
    setFormData((prev) => {
      const newServices = [...prev.services];
      newServices.splice(index, 1);
      return { ...prev, services: newServices };
    });
  }, []);

  const handleFAQChange = useCallback((e) => {
    const { name, value } = e.target;
    setCurrentFAQ((prev) => ({ ...prev, [name]: value }));
  }, []);

  const addFAQ = useCallback(() => {
    if (currentFAQ.question.trim() === '' || currentFAQ.answer.trim() === '') {
      setErrors((prev) => ({
        ...prev,
        faq: 'Both Question and Answer are required',
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { ...currentFAQ }],
    }));
    setCurrentFAQ({ question: '', answer: '' });
    setErrors((prev) => ({ ...prev, faq: '' }));
  }, [currentFAQ]);

  const removeFAQ = useCallback((index) => {
    setFormData((prev) => {
      const updatedFAQs = [...prev.faqs];
      updatedFAQs.splice(index, 1);
      return { ...prev, faqs: updatedFAQs };
    });
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validateForm()) {
        alert('Please fix the errors in the form before submitting.');
        return;
      }

      setIsSubmitting(true);

      try {
        const formDataToSend = new FormData();

        // Append non-file fields
        Object.keys(formData).forEach((key) => {
          if (key !== 'displayImages' && key !== 'albumImages') {
            if (Array.isArray(formData[key])) {
              formDataToSend.append(key, JSON.stringify(formData[key]));
            } else {
              formDataToSend.append(key, formData[key]);
            }
          }
        });

        // Append files without indexing
        formData.displayImages.forEach((file) => {
          formDataToSend.append('displayImages', file);
        });
        formData.albumImages.forEach((file) => {
          formDataToSend.append('albumImages', file);
        });

        const response = await axios.post('https://event-admin-server-3pka.onrender.com/api/venues', formDataToSend, {
          // const response = await axios.post('http://localhost:5000/api/venues', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Venue created:', response.data);
        setFormSubmitted(true);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting form: ' + (error.response?.data?.error || error.message));
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm]
  );

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      location: '',
      district: '',
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
      customFields: [],
      otherInformation: [],
    });
    setDisplayImagePreviews((prev) => {
      prev.forEach(URL.revokeObjectURL);
      return [];
    });
    setAlbumImagePreviews((prev) => {
      prev.forEach(URL.revokeObjectURL);
      return [];
    });
    setCurrentService({ name: '', price: '' });
    setCurrentFAQ({ question: '', answer: '' });
    setCurrentCustomField({ fieldName: '', fieldValue: '' });
    setCurrentAmenity('');
    setCurrentPolicy('');
    setCurrentOtherInfo('');
    setFormSubmitted(false);
    setActiveSection(1);
    setErrors({});
  }, []);

  const sections = useMemo(
    () => [
      { id: 1, title: 'Basic Information' },
      { id: 2, title: 'Facilities & Features' },
      { id: 3, title: 'Food & Space' },
      { id: 4, title: 'Additional Details' },
      { id: 5, title: 'Amenities & Policies' },
      { id: 6, title: 'FAQs' },
    ],
    []
  );

  const FormSection = useCallback(
    ({ id, children }) => {
      if (activeSection !== id) return null;
      return <div className="animate-fadeIn">{children}</div>;


    },
    [activeSection]
  );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-b from-white to-green-50 rounded-xl shadow-xl">
      {formSubmitted ? (
        <div className="text-center py-16 space-y-6 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-green-800">Venue Information Submitted!</h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Thank you for providing the details. The venue information has been successfully submitted.
          </p>
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
          <p className="text-center text-gray-600 mb-8">
            Add your venue to our curated collection of premium wedding locations
          </p>

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
            {/* Basic Information Section */}
            <FormSection id={1}>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-green-800 mb-4 border-b pb-2">Venue Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-green-600 transition-colors"
                    >
                      Venue Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all`}
                        required
                      />
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Info size={18} />
                      </div>
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div className="group">
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-green-600 transition-colors"
                    >
                      Location <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border ${
                          errors.location ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all`}
                        required
                      />
                      <div className="absolute left-3 top-3 text-gray-400">
                        <MapPin size={18} />
                      </div>
                    </div>
                    {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="group">
                    <label
                      htmlFor="district"
                      className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-green-600 transition-colors"
                    >
                      District <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border ${
                          errors.district ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all`}
                        required
                      >
                        <option value="">Select District</option>
                        {tamilNaduDistricts.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                      <div className="absolute left-3 top-3 text-gray-400">
                        <MapPin size={18} />
                      </div>
                    </div>
                    {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
                  </div>

                  <div className="md:col-span-2 group">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-green-600 transition-colors"
                    >
                      Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all`}
                      rows="2"
                      required
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>

                  <div className="group">
                    <label
                      htmlFor="addressLink"
                      className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-green-600 transition-colors"
                    >
                      Maps Link
                    </label>
                    <input
                      type="url"
                      id="addressLink"
                      name="addressLink"
                      value={formData.addressLink}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${
                        errors.addressLink ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all`}
                      placeholder="Google Maps URL"
                    />
                    {errors.addressLink && <p className="text-red-500 text-xs mt-1">{errors.addressLink}</p>}
                  </div>
                </div>

                <div className="mt-6 group">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-green-600 transition-colors"
                  >
                    Price Range (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border ${
                        errors.price ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all`}
                      placeholder="e.g. 50,000 - 1,50,000 or 2,00,000 onwards"
                      required
                    />
                    <div className="absolute left-3 top-3 text-gray-400">
                      <DollarSign size={18} />
                    </div>
                  </div>
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                </div>

                <div className="mt-6 group">
                  <label
                    htmlFor="establishmentYear"
                    className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-green-600 transition-colors"
                  >
                    Establishment Year
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="establishmentYear"
                      name="establishmentYear"
                      value={formData.establishmentYear}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border ${
                        errors.establishmentYear ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all`}
                      placeholder="e.g. 2010"
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                    <div className="absolute left-3 top-3 text-gray-400">
                      <Calendar size={18} />
                    </div>
                  </div>
                  {errors.establishmentYear && (
                    <p className="text-red-500 text-xs mt-1">{errors.establishmentYear}</p>
                  )}
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

            {/* Facilities & Features Section */}
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
                      <label htmlFor="hasAC" className="ml-3 text-gray-700">
                        Venue is Air Conditioned
                      </label>
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
                      <label htmlFor="brideGroomRoomAC" className="ml-3 text-gray-700">
                        Bride/Groom Rooms with AC
                      </label>
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
                      <label htmlFor="hasGenerator" className="ml-3 text-gray-700">
                        Generator Backup Available
                      </label>
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
                          className={`w-full px-3 py-2 border ${
                            errors.carParkingCount ? 'border-red-500' : 'border-gray-300'
                          } rounded-md focus:ring-green-500 focus:border-green-500`}
                          min="0"
                          placeholder="Enter number of cars"
                        />
                        {errors.carParkingCount && (
                          <p className="text-red-500 text-xs mt-1">{errors.carParkingCount}</p>
                        )}
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
                      <label htmlFor="hasDJ" className="ml-3 text-gray-700">
                        DJ Allowed
                      </label>
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
                        className={`w-full px-3 py-2 border ${
                          errors.guestRoomCount ? 'border-red-500' : 'border-gray-300'
                        } rounded-md focus:ring-green-500 focus:border-green-500`}
                        min="0"
                        placeholder="Number of guest rooms"
                      />
                      {errors.guestRoomCount && (
                        <p className="text-red-500 text-xs mt-1">{errors.guestRoomCount}</p>
                      )}
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
                  />
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

            {/* Food & Space Section */}
            <FormSection id={3}>
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
                            {option === 'in' ? 'In-house' : option === 'out' ? 'Outside' : 'Both'}
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

            {/* Additional Details Section */}
            <FormSection id={4}>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-green-800 mb-4 border-b pb-2">Media & Additional Details</h2>

                <div className="space-y-6">
                  {/* Display Images */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Display Images (Max 5)</label>
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
                          accept="image/png,image/jpeg,image/jpg"
                          multiple
                        />
                      </label>
                    </div>

                    {displayImagePreviews.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">
                          Display Images ({displayImagePreviews.length}/5)
                        </h3>
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
                    <label className="block text-sm font-medium text-gray-700 mb-3">Album Images (Max 20)</label>
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
                          accept="image/png,image/jpeg,image/jpg"
                          multiple
                        />
                      </label>
                    </div>

                    {albumImagePreviews.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">
                          Album Images ({albumImagePreviews.length}/20)
                        </h3>
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

                  {/* Custom Fields */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Custom Fields</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Field Name</label>
                        <input
                          type="text"
                          name="fieldName"
                          value={currentCustomField.fieldName}
                          onChange={handleCustomFieldChange}
                          placeholder="e.g., Unique Feature"
                          className={`w-full px-4 py-2 border ${
                            errors.customField ? 'border-red-500' : 'border-gray-300'
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                        />
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Field Value</label>
                          <input
                            type="text"
                            name="fieldValue"
                            value={currentCustomField.fieldValue}
                            onChange={handleCustomFieldChange}
                            placeholder="e.g., Rooftop Garden"
                            className={`w-full px-4 py-2 border ${
                              errors.customField ? 'border-red-500' : 'border-gray-300'
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={addCustomField}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                    </div>
                    {errors.customField && (
                      <p className="text-red-500 text-xs mb-2">{errors.customField}</p>
                    )}

                    <div className="space-y-2">
                      {formData.customFields.length > 0 ? (
                        formData.customFields.map((field, index) => (
                          <div key={index} className="flex items-center bg-gray-50 p-3 rounded-md">
                            <span className="flex-1 text-gray-800">
                              {field.fieldName}: {field.fieldValue}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeCustomField(index)}
                              className="text-red-500 hover:text-red-700 focus:outline-none"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600">No custom fields added yet.</p>
                      )}
                    </div>
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
                  onClick={() => setActiveSection(3)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-300"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection(5)}
                  className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300"
                >
                  Next: Amenities & Policies
                </button>
              </div>
            </FormSection>

            {/* Amenities & Policies Section */}
            <FormSection id={5}>
              <div className="bg-white p-6 rounded-lg shadow-md space-y-8">
                <h2 className="text-2xl font-bold text-green-800 mb-6">Amenities & Policies</h2>

                {/* Amenities */}
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

                {/* Other Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Other Information</h3>
                  <div className="flex items-center mb-3">
                    <input
                      type="text"
                      value={currentOtherInfo}
                      onChange={(e) => setCurrentOtherInfo(e.target.value)}
                      placeholder="Add other information (e.g., Outdoor Stage Available)"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="button"
                      onClick={addOtherInfo}
                      className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.otherInformation.map((info, index) => (
                      <div key={index} className="flex items-center bg-gray-50 p-3 rounded-md">
                        <span className="flex-1">{info}</span>
                        <button
                          type="button"
                          onClick={() => removeOtherInfo(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Policies */}
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
                    {formData.paymentPolicies.map((policy, index) => (
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

                {/* Services Offered */}
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
                          type="number"
                          name="price"
                          value={currentService.price}
                          onChange={handleServiceChange}
                          placeholder="e.g., 1800"
                          className={`w-full px-4 py-2 border ${
                            errors.service ? 'border-red-500' : 'border-gray-300'
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                          min="0"
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
                    {formData.services.length > 0 ? (
                      formData.services.map((service, index) => (
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
            </FormSection>

            {/* FAQ Section */}
            <FormSection id={6}>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-green-800 mb-4 border-b pb-2">
                  Frequently Asked Questions
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                    <input
                      type="text"
                      name="question"
                      value={currentFAQ.question}
                      onChange={handleFAQChange}
                      placeholder="Enter question"
                      className={`w-full px-4 py-2 border ${
                        errors.faq ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                    <input
                      type="text"
                      name="answer"
                      value={currentFAQ.answer}
                      onChange={handleFAQChange}
                      placeholder="Enter answer"
                      className={`w-full px-4 py-2 border ${
                        errors.faq ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={addFAQ}
                  className="px-4 py-2 mb-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Add FAQ
                </button>
                {errors.faq && <p className="text-red-500 text-xs mb-2">{errors.faq}</p>}

                <div className="space-y-3">
                  {formData.faqs.length > 0 ? (
                    formData.faqs.map((faq, index) => (
                      <div key={index} className="border border-gray-200 rounded-md p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-800">{faq.question}</h4>
                          <button
                            type="button"
                            onClick={() => removeFAQ(index)}
                            className="text-red-500 hover:text-red-700 focus:outline-none"
                          >
                            <X size={18} />
                          </button>
                        </div>
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No FAQs added yet.</p>
                  )}
                </div>
              </div>

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
                  disabled={isSubmitting}
                  className={`px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Venue'}
                </button>
              </div>
            </FormSection>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              All fields marked with <span className="text-red-500">*</span> are required
            </p>
            <p className="mt-1">By submitting this form, you agree to our terms and conditions</p>
          </div>
        </>
      )}
    </div>
  );
};

export default WeddingVenueForm;