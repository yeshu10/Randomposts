import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegComment, FaRetweet, FaRegHeart, FaRegBookmark, FaPaperPlane, FaArrowLeft } from 'react-icons/fa';
import { BsUpload } from 'react-icons/bs';
import { MdVerified } from 'react-icons/md';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { format } from 'date-fns'; // Import date-fns
import cup from '../assets/cup-logo.svg'; // Import Chaicode logo
import background from '../assets/twitter-pattern.webp';

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

  const formattedDate = format(new Date(), 'h:mm a - MMM d yyyy'); // Format date
  const views = Math.floor(Math.random() * 20000000); 
  const formattedViews = views.toLocaleString(); 

  return (
    <div
      className='relative flex items-center justify-center min-h-screen p-4'
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover', // Ensure the image covers the entire background
        backgroundRepeat: 'no-repeat', // Prevent repeating the background image
        backgroundPosition: 'center', // Center the background image
      }}
    >
      <div className='w-full max-w-lg bg-black text-white rounded-lg shadow-lg'>
        {/* Header with Back button and Post label */}
        <div className='flex items-center justify-between p-4 border-b border-gray-800'>
          <button className='text-lg' onClick={() => window.history.back()}>
            <FaArrowLeft />
          </button>
          <span className='font-bold text-lg'>Post</span>
          <div className='w-8'></div> 
        </div>

        {/* Main content */}
        <div className='p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="Profile" className='w-12 h-12 rounded-full mr-4' />
              <div className='flex flex-col'>
                <span className='font-bold flex items-center'>
                  Elon Musk
                  <MdVerified className='text-blue-500 ml-1' />
                </span>
                <span className='text-gray-400 text-sm'>@elonmusk</span>
              </div>
            </div>
            <HiOutlineDotsHorizontal className='text-gray-400 text-2xl' />
          </div>
          <div className='mt-4'>
            <p className='text-lg'>{joke ? joke.content : 'No joke available'}</p>
          </div>
          <div className='mt-4 text-gray-400 text-sm'>
            <span>{formattedDate}</span> | <span>{formattedViews} Views</span>
          </div>
        </div>

        {/* Footer with icons and counts */}
        <div className='w-full border-t border-gray-800 p-5 flex items-center justify-around text-gray-400'>
          <div className='flex flex-1 justify-around'>
            <div className='flex items-center space-x-2'>
              <FaRegComment className='text-xl' />
              <span>12</span>
            </div>
            <div className='flex items-center space-x-2'>
              <FaRetweet className='text-xl' />
              <span>45</span>
            </div>
            <div className='flex items-center space-x-2'>
              <FaRegHeart className='text-xl' />
              <span>78</span>
            </div>
            <div className='flex items-center space-x-2'>
              <FaRegBookmark className='text-xl' />
              <span>22</span>
            </div>
            <div className='flex items-center space-x-2'>
              <BsUpload className='text-xl' />
            </div>
          </div>
        </div>

        {/* Additional footer line */}
        <div className='text-center py-2 text-white'>
          <span>@chai aur code</span>
        </div>
      </div>

      {/* Chaicode logo in bottom-right corner */}
      <div className='absolute bottom-4 right-4'>
        <a href='https://chaicode.com' target="_blank" rel="noopener noreferrer" className='flex items-center justify-center bg-black p-2 rounded-lg'>
          <img src={cup} alt='Chaicode Logo' className='w-12 h-12 rounded-lg' />
        </a>
      </div>
    </div>
  );
};

export default RandomJokeTweet;
