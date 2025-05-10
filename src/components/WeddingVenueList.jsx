import React from 'react';
import { useNavigate } from 'react-router-dom';

const weddingVenues = [
  {
    name: 'Grand Palace',
    location: 'Downtown',
    address: '123 Main St, City',
    price: '$2000',
    ac: 'AC',
    brideGroomRoom: 'AC',
    guestRoom: 'Yes',
    decoration: 'Included',
    catering: 'Veg / Non Veg',
    size: '5000 sq ft',
    cateringInOut: 'Both',
    parking: 'Car & Bike',
    generator: 'Yes',
    year: '2010',
    photos: ['sample1.jpg', 'sample2.jpg'],
    faq: 'FAQ content here'
  },
  {
    name: 'Sunset Hall',
    location: 'Suburbs',
    address: '456 Side Rd, City',
    price: '$1500',
    ac: 'Non AC',
    brideGroomRoom: 'Non AC',
    guestRoom: 'No',
    decoration: 'Not Included',
    catering: 'Veg',
    size: '3000 sq ft',
    cateringInOut: 'In-house',
    parking: 'Car Only',
    generator: 'No',
    year: '2015',
    photos: ['sample3.jpg'],
    faq: 'FAQ content here'
  }
];

const WeddingVenueList = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/add-venue');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Wedding Venues</h1>
        <button onClick={handleNavigate} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg shadow-lg transition duration-300">
          Add New
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {weddingVenues.map((venue, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">{venue.name}</h2>
            <p className="text-gray-600">Location: {venue.location}</p>
            <p className="text-gray-600">Address: {venue.address}</p>
            <p className="text-gray-600">Price: {venue.price}</p>
            <p className="text-gray-600">AC: {venue.ac}</p>
            <p className="text-gray-600">Bride & Groom Room: {venue.brideGroomRoom}</p>
            <p className="text-gray-600">Guest Room: {venue.guestRoom}</p>
            <p className="text-gray-600">Decoration: {venue.decoration}</p>
            <p className="text-gray-600">Catering: {venue.catering}</p>
            <p className="text-gray-600">Total Size: {venue.size}</p>
            <p className="text-gray-600">Catering In/Out: {venue.cateringInOut}</p>
            <p className="text-gray-600">Parking: {venue.parking}</p>
            <p className="text-gray-600">Generator: {venue.generator}</p>
            <p className="text-gray-600">Establishment Year: {venue.year}</p>
            <div className="flex gap-2 my-2">
              {venue.photos.map((photo, i) => (
                <img key={i} src={photo} alt="Sample" className="w-20 h-20 object-cover rounded-lg border" />
              ))}
            </div>
            <p className="text-gray-600">FAQ: {venue.faq}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeddingVenueList;