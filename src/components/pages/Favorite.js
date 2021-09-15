import React, { useState, useEffect } from 'react';

import FavoriteCard from '../favorite/FavoriteCard';

import weatherService from '../../services/weatherService';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoritesData, setFavoritesData] = useState([]);

  useEffect(() => {
    const favLocations = localStorage.getItem('likes');
    setFavorites(JSON.parse(favLocations));
  }, []);

  useEffect(() => {
    let promiseArray = [];
    favorites.forEach((favoriteLocation) => {
      promiseArray.push(weatherService.loadCurrentData(favoriteLocation.Key));
    });
    Promise.all(promiseArray).then(function (values) {
      setFavoritesData(values);
    });
  }, [favorites]);
  return (
    <>
      {favoritesData.length > 0 ? (
        <ul>
          {favoritesData.map((favLocation, index) => (
            <FavoriteCard key={index} data={favLocation} />
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Favorite;
