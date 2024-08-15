import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa'; // Spinner for loading state
import cup from '../assets/cup-logo.svg'; // Import Chaicode logo
import pexelsgrey from '../assets/pexelsgrey.jpg'; // Import background image

const CatsListing = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchCats = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.freeapi.app/api/v1/public/cats?page=${pageNumber}&limit=4`);
      const { data } = response.data;

      if (data.data.length === 0) {
        setHasMore(false);
      } else {
        setCats((prevCats) => [...prevCats, ...data.data]);
        setHasMore(data.nextPage);
      }
    } catch (error) {
      console.error('Error fetching cats data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats(page); // Fetch initial page
  }, [page]);

  return (
    <div
      className='relative min-h-screen p-4'
      style={{
        backgroundImage: `url(${pexelsgrey})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className='text-2xl text-white font-bold mb-4 text-center'>Cats Listing</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {cats.slice(0, 4).map((cat) => {
          // Split the temperament into an array and take the first three elements
          const temperamentList = cat.temperament.split(',').slice(0, 3);

          return (
            <div key={cat.id} className='bg-white p-4 rounded-lg shadow-md h-[550px] flex flex-col mt-5'>
              <img src={cat.image || 'https://via.placeholder.com/150'} alt={cat.name} className='w-full h-56 object-cover rounded-lg mb-2' />
              <div className='flex flex-col flex-grow'>
                <h2 className='text-xl font-semibold mb-2'>{cat.name}</h2>
                <p className='text-sm mb-2 overflow-hidden h-20'>
                  {cat.description.length > 100
                    ? `${cat.description.substring(0, 100)}...`
                    : cat.description}
                </p>
                <p className='text-sm mb-2'>
                  <strong>Origin:</strong> {cat.origin}
                </p>
                <div className='text-sm mb-2'>
                  <strong>Temperament:</strong>
                  <div className='flex flex-wrap gap-2 mt-1'>
                    {temperamentList.map((temp, index) => (
                      <span key={index} className='bg-gray-200 text-gray-800 py-1 px-3 rounded-full'>
                        {temp}
                      </span>
                    ))}
                  </div>
                </div>
                <p className='text-sm mb-2'>
                  <strong>Life Span:</strong> {cat.life_span}
                </p>
                <a href={cat.vetstreet_url} className='text-blue-500' target="_blank" rel="noopener noreferrer">Learn More</a>
              </div>
            </div>
          );
        })}
        {loading && (
          <div className='col-span-full flex items-center justify-center p-4'>
            <FaSpinner className='text-blue-500 animate-spin' size={24} />
          </div>
        )}
      </div>
      <div className='absolute top-4 right-4'>
        <a href='https://chaicode.com' target="_blank" rel="noopener noreferrer" className='flex items-center justify-center bg-black p-2 rounded-lg'>
          <img src={cup} alt='Chaicode Logo' className='w-12 h-12 rounded-lg' />
        </a>
      </div>
    </div>
  );
};

export default CatsListing;
