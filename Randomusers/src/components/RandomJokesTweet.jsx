import { useState, useEffect } from 'react';
import axios from 'axios';

const RandomJokesTweet = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.freeapi.app/api/v1/public/randomjokes/joke/random');
      setJoke(response.data);
    } catch (error) {
      console.error("Error fetching joke data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="p-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        joke && (
          <div className="border p-4 rounded">
            <h2 className="text-xl font-bold">Elon Must</h2>
            <p>{joke.joke}</p>
            <div className="text-sm text-gray-600">
              <p>Timestamp: {new Date().toLocaleString()}</p>
              <p>Views: {Math.floor(Math.random() * 1000)}</p>
              <p>Date: {new Date().toDateString()}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default RandomJokesTweet;
