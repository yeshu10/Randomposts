import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa'; // Spinner for loading state
import cup from '../assets/cup-logo.svg'; // Import Chaicode logo
import pexelsgrey from '../assets/pexelsgrey.jpg'; // Import background image

const CatsListing = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);

  const fetchCats = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.freeapi.app/api/v1/public/cats?page=${pageNumber}&limit=4`);
      const { data } = response.data;

      if (data.data.length === 0) {
        setHasMore(false);
      } else {
        setCats((prevCats) => [...prevCats, ...data.data]);
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

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        const isBottom = container.scrollWidth - container.scrollLeft === container.clientWidth;
        if (isBottom && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    const handleKeyDown = (event) => {
      const container = containerRef.current;
      if (container) {
        if (event.key === 'ArrowRight') {
          container.scrollBy({ left: 300, behavior: 'smooth' });
        } else if (event.key === 'ArrowLeft') {
          container.scrollBy({ left: -300, behavior: 'smooth' });
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasMore, loading]);

  return (
    <div
      className='relative min-h-screen p-4'
      style={{
        backgroundImage: `url(${pexelsgrey})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className='text-2xl text-white font-bold mb-4'>Cats around us</h1>
      <div
        ref={containerRef}
        className='flex overflow-x-auto space-x-4 pb-4 scrollbar-hidden'
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {cats.map((cat) => {
          const temperamentList = cat.temperament.split(',').slice(0, 3);

          return (
            <div
              key={cat.id}
              className='flex-none bg-white p-4 rounded-lg shadow-md w-[300px] h-[550px] flex flex-col snap-start'
              style={{ scrollSnapAlign: 'start' }}
            >
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
          <div className='flex-none bg-white p-4 rounded-lg shadow-md w-[300px] h-[550px] flex items-center justify-center'>
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
