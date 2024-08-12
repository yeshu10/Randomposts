import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RandomJokeTweet = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJoke = async () => {
      try {
        const response = await axios.get('https://api.freeapi.app/api/v1/public/randomjokes/joke/random');
        console.log('API Response:', response.data);
        setJoke(response.data.data); // Access the data property
        setLoading(false);
      } catch (error) {
        console.error('Error fetching joke data:', error);
        setLoading(false);
      }
    };

    fetchJoke();
  }, []);

  if (loading) return <div className='text-center text-xl'>Loading...</div>;

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-lg'>
        <div className='flex items-center'>
          <img src="https://via.placeholder.com/50" alt="Profile" className='w-12 h-12 rounded-full mr-4' />
          <div className='flex flex-col'>
            <span className='font-bold'>Elon Musk</span>
            <span className='text-gray-500 text-sm'>@elonmusk</span>
          </div>
        </div>
        <div className='mt-4'>
          <p className='text-lg'>{joke ? joke.content : 'No joke available'}</p>
        </div>
        <div className='mt-4 text-gray-500 text-sm'>
          <span>Timestamp: {new Date().toLocaleString()}</span> | <span>Views: {Math.floor(Math.random() * 1000)}</span>
        </div>
      </div>
    </div>
  );
};

export default RandomJokeTweet;
