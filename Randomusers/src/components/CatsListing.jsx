import { useState, useEffect } from 'react';
import axios from 'axios';

const CatsListing = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchCats = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.freeapi.app/api/v1/public/cats?page=${page}&limit=4`);
      setCats(response.data);
    } catch (error) {
      console.error("Error fetching cats data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, [page]);

  return (
    <div className="p-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex overflow-x-auto">
          {cats.map(cat => (
            <div key={cat.id} className="border p-4 rounded mr-4">
              <img src={cat.imageUrl} alt={cat.name} className="w-32 h-32" />
              <h3 className="text-lg font-bold">{cat.name}</h3>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => setPage(prev => prev + 1)} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Next Page
      </button>
    </div>
  );
};

export default CatsListing;
