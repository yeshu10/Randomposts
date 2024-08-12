import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CatsListing = () => {
  const [cats, setCats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`https://api.freeapi.app/api/v1/public/cats?page=${currentPage}`);
        const data = response.data;

        if (data.success && Array.isArray(data.cats)) {
          setCats(data.cats);
          setTotalPages(data.totalPages);
        } else {
          console.error('Unexpected data format:', data);
          setError('Unexpected data format received from the API. Please check the API documentation.');
        }
      } catch (error) {
        console.error('Error fetching cat data:', error);
        setError('Failed to fetch cat data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCats();
  }, [currentPage]);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cat Breeds</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cats.length > 0 ? (
          cats.map(cat => (
            <div key={cat.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={cat.image} alt={cat.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{cat.name}</h2>
                <p className="text-gray-700 mb-2">Origin: {cat.origin}</p>
                <p className="text-gray-600 mb-4">{cat.description}</p>
                <a href={cat.wikipedia_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Learn more
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4">No cats found.</div>
        )}
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="self-center text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CatsListing;
