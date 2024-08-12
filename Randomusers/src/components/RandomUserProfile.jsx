import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RandomUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://api.freeapi.app/api/v1/public/randomusers/user/random');
        console.log('API Response:', response.data);
        setUser(response.data.data); // Access the data property
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Random User Profile</h1>
      {user && (
        <div className='bg-blue-500 p-4 rounded-lg text-white'>
          <img src={user.picture.large || 'https://via.placeholder.com/150'} alt="User" className='rounded-full w-24 h-24 mb-4' />
          <p className='text-lg'>Name: {user.name.title} {user.name.first} {user.name.last}</p>
          <p className='text-lg'>
            Location: <a href={`https://www.google.com/maps?q=${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`} target="_blank" rel="noopener noreferrer" className='text-yellow-200 hover:underline'>
              {user.location.street.number} {user.location.street.name}, {user.location.city}, {user.location.state}, {user.location.country}
            </a>
          </p>
          <p className='text-lg'>
            Phone: <a href={`tel:${user.phone}`} className='text-yellow-200 hover:underline'>{user.phone}</a>
          </p>
          <p className='text-lg'>
            Email: <a href={`mailto:${user.email}`} className='text-yellow-200 hover:underline'>{user.email}</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default RandomUserProfile;
