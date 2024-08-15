import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cup from '../assets/cup-logo.svg';
import { FaArrowLeft, FaRedo, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'; // Added icons
import background from '../assets/dark_purple.jpg'; // Import background image

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
    <div className='relative min-h-screen bg-cover bg-center' style={{ backgroundImage: `url(${background})` }}>
      <div className='flex items-center justify-center min-h-screen p-4'>
        <div className='relative bg-purple-300 p-6 rounded-xl text-black w-full max-w-md h-3/4 border-8 border-white m-8'>
          <div className='absolute top-4 left-4'>
            <button className='text-black hover:text-gray-600'>
              <FaArrowLeft size={24} />
            </button>
          </div>
          <div className='absolute top-4 right-4'>
            <button className='text-black hover:text-gray-600' onClick={() => fetchUser()}>
              <FaRedo size={24} />
            </button>
          </div>
          <h1 className='text-xl font-bold text-center mb-4'>Profile Overview</h1>
          {user && (
            <div className='text-center relative'>
              {/* Title overlay */}
              <div className='absolute -top-2 right-16 bg-black text-white px-2 py-1 rounded-lg text-sm font-semibold transform -translate-x-6'>
                {user.name.title} {/* Display title */}
              </div>
              <img src={user.picture.large || 'https://via.placeholder.com/150'} alt="User" className='rounded-full w-32 h-32 mb-4 mx-auto' />            
              <p className='text-xl font-semibold mb-4'>{user.name.first} {user.name.last}</p>
              <div className='mb-4'>{user.login.username}</div>

              <hr className='my-4 border-gray-400' />

              <div className='flex items-center justify-center mb-4 space-x-4'>
                <a href={`https://www.google.com/maps?q=${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`} target="_blank" rel="noopener noreferrer" className='flex items-center space-x-2'>
                  <div className='inline-flex items-center justify-center w-6 h-6 bg-black text-white rounded-full'>
                    <FaMapMarkerAlt size={14} />
                  </div>
                  <span className='font-semibold'>Location</span>
                </a>
                <a href={`tel:${user.phone}`} className='flex items-center space-x-2'>
                  <div className='inline-flex items-center justify-center w-6 h-6 bg-black text-white rounded-full'>
                    <FaPhoneAlt size={14} />
                  </div>
                  <span>Call me</span>
                </a>
              </div>
              <hr className='my-4 border-gray-400' />

              <div className='grid grid-cols-2 gap-4 text-left space-x-4'>
                <div>
                  <p className='text-xs mb-4'>
                    City:<br />
                    <span className='font-semibold text-[16px]'>{user.location.city}</span>
                  </p>
                  <p className='text-xs mb-4'>
                    Date of Birth:<br />
                    <span className='font-semibold text-[16px]'>{user.dob.date}</span>                  
                  </p>
                  <p className='text-xs mb-4'>
                    Time Zone:<br />
                    <span className='font-semibold text-[16px]'>{user.location.timezone.offset}</span>
                  </p>
                </div>
                <div>
                  <p className='text-xs mb-4'>
                    Nationality:<br />
                    <span className='font-semibold text-[16px]'>{user.nat}</span>
                  </p>
                  <p className='text-xs mb-4'>
                    Phone:<br />
                    <span className='font-semibold text-[16px]'>{user.phone}</span>
                  </p>
                  <p className='text-xs mb-16'>
                    Registered Since:<br />
                    <span className='font-semibold text-[16px]'>{user.registered.date}</span>
                  </p>
                </div>
              </div>
              <div className='relative mt-14 flex items-center justify-center'>
                <span className='text-white absolute left-1/2 transform -translate-x-1/2'>
                  @chai aur code
                </span>
                <a href='https://chaicode.com' target="_blank" rel="noopener noreferrer" className='absolute bottom-0 right-0 flex items-center justify-center bg-black p-2 rounded-lg'>
                  <img src={cup} alt='Chaicode Logo' className='w-12 h-12 rounded-lg' />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RandomUserProfile;
