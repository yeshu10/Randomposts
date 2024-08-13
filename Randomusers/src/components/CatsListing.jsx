import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa'; // Spinner for loading state

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

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Cats Listing</h1>
      <div className='flex overflow-x-scroll space-x-4'>
        {cats.map((cat) => (
          <div key={cat.id} className='bg-gray-200 p-4 rounded-lg shadow-md flex-shrink-0 w-60'>
            <img src={cat.image || 'https://via.placeholder.com/150'} alt={cat.name} className='w-full h-40 object-cover rounded-lg mb-2' />
            <h2 className='text-xl font-semibold'>{cat.name}</h2>
            <p className='text-sm'>{cat.origin}</p>
            <p className='text-sm'>{cat.description}</p>
            <a href={cat.vetstreet_url} className='text-blue-500' target="_blank" rel="noopener noreferrer">More Info</a>
          </div>
        ))}
        {loading && (
          <div className='flex items-center justify-center w-60 p-4'>
            <FaSpinner className='text-blue-500 animate-spin' size={24} />
          </div>
        )}
      </div>
      {hasMore && !loading && (
        <button onClick={loadMore} className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg'>
          Load More
        </button>
      )}
    </div>
  );
};

export default CatsListing;
