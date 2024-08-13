import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
            <p className='text-lg mb-4'>
              <span className='font-semibold'>Location:</span> 
              <FaMapMarkerAlt className='inline text-yellow-500 ml-2' /> 
              <a href={`https://www.google.com/maps?q=${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`} target="_blank" rel="noopener noreferrer" className='text-blue-600 hover:underline'>
                {user.location.street.number} {user.location.street.name}, {user.location.city}, {user.location.state}, {user.location.country}
              </a>
            </p>
            <p className='text-lg mb-4'>
              <FaPhoneAlt className='inline text-yellow-500 mr-2' /> 
              <a href={`tel:${user.phone}`} className='text-blue-600 hover:underline'>Call me</a>
            </p>
            <div className='grid grid-cols-2 gap-4 text-left'>
              <div>
                <p className='text-lg'>
                  <span className='font-semibold'>City:</span><br />
                  {user.location.city}
                </p>
                <p className='text-lg'>
                  <span className='font-semibold'>Date of Birth:</span><br />
                  {user.dob.date}
                </p>
                <p className='text-lg'>
                  <span className='font-semibold'>Time Zone:</span><br />
                  {user.location.timezone.offset}
                </p>
              </div>
              <div>
                <p className='text-lg'>
                  <span className='font-semibold'>Nationality:</span><br />
                  {user.nat}
                </p>
                <p className='text-lg'>
                  <span className='font-semibold'>Phone:</span><br />
                  {user.phone}
                </p>
                <p className='text-lg'>
                  <span className='font-semibold'>Registered Since:</span><br />
                  {user.registered.date}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomUserProfile;
