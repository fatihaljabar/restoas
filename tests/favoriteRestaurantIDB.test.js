import { itActsAsFavoriteRestaurantModel } from './contracts/favoriteRestaurantContract';
import FavoriteRestaurantIDB from '../src/scripts/data/favorite-source';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
    afterEach(async() => {
        (await FavoriteRestaurantIDB.getAllRestaurant()).forEach(async(restaurant) => {
            await FavoriteRestaurantIDB.deleteRestaurant(restaurant.id);
        });
    });

    itActsAsFavoriteRestaurantModel(FavoriteRestaurantIDB);
});