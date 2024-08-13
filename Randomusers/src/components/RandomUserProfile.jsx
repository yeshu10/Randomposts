import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cup from '../assets/cup-logo.svg';
import { FaArrowLeft, FaRedo, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'; // Added icons

const RandomUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const response = await axios.get('https://api.freeapi.app/api/v1/public/randomusers/user/random');
      console.log('API Response:', response.data);
      setUser(response.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false); // Set loading to false when fetching is done
    }
  };

  useEffect(() => {
    fetchUser(); // Fetch user data on component mount
  }, []);

  if (loading) return <div className='p-4'>Loading...</div>;

  return (
    <div className='flex items-center justify-center min-h-screen p-4'>
      <div className='relative bg-blue-200 p-6 rounded-lg text-black w-full max-w-md h-3/4'>
        <div className='absolute top-4 left-4'>
          <button className='text-black hover:text-gray-600'>
            <FaArrowLeft size={24} />
          </button>
        </div>
        <div className='absolute top-4 right-4'>
          <button className='text-black hover:text-gray-600' onClick={fetchUser}>
            <FaRedo size={24} />
          </button>
        </div>
        <h1 className='text-xl font-bold text-center mb-4'>Profile Overview</h1>
        {user && (
          <div className='text-center'>
            <img src={user.picture.large || 'https://via.placeholder.com/150'} alt="User" className='rounded-full w-32 h-32 mb-4 mx-auto' />
            <p className='text-lg font-semibold'>{user.name.first} {user.name.last}</p>
            <div className='flex items-center justify-center mb-4 space-x-4'>
              <a href={`https://www.google.com/maps?q=${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`} target="_blank" rel="noopener noreferrer" className='flex items-center space-x-2'>
                <div className='inline-flex items-center justify-center w-8 h-8 bg-black text-white rounded-full'>
                  <FaMapMarkerAlt size={16} />
                </div>
                <span className='font-semibold'>Location</span>
              </a>
              <a href={`tel:${user.phone}`} className='flex items-center space-x-2'>
                <div className='inline-flex items-center justify-center w-8 h-8 bg-black text-white rounded-full'>
                  <FaPhoneAlt size={16} />
                </div>
                <span>Call me</span>
              </a>
            </div>
            <div className='grid grid-cols-2 gap-4 text-left'>
              <div>
                <p className='text-xs mb-2'>
                  <span className='font-semibold'>City:</span><br />
                  {user.location.city}
                </p>
                <p className='text-xs mb-2'>
                  <span className='font-semibold'>Date of Birth:</span><br />
                  {user.dob.date}
                </p>
                <p className='text-xs mb-2'>
                  <span className='font-semibold'>Time Zone:</span><br />
                  {user.location.timezone.offset}
                </p>
              </div>
              <div>
                <p className='text-xs mb-2'>
                  <span className='font-semibold'>Nationality:</span><br />
                  {user.nat}
                </p>
                <p className='text-xs mb-2'>
                  <span className='font-semibold'>Phone:</span><br />
                  {user.phone}
                </p>
                <p className='text-xs mb-2'>
                  <span className='font-semibold'>Registered Since:</span><br />
                  {user.registered.date}
                </p>
              </div>
            </div>
            <div className='mt-6 flex justify-end'>
              <a href='https://chaicode.com' target="_blank" rel="noopener noreferrer" className='flex items-center justify-center bg-black p-2 rounded-lg'>
                <img src={cup} alt='Chaicode Logo' className='w-12 h-12 rounded-lg' />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomUserProfile;
