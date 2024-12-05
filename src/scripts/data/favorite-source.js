import { openDB } from 'idb';
import CONFIG from '../global/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;
const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(database) {
        database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
    },
});

const FavoriteRestaurantIDB = {
    async getRestaurant(id) {
        if (!id) return;
        return (await dbPromise).get(OBJECT_STORE_NAME, id);
    },

    async getAllRestaurant() {
        return (await dbPromise).getAll(OBJECT_STORE_NAME);
    },

    async putRestaurant(restaurant) {
        if (!restaurant || !restaurant.id) return;
        return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
    },

    async deleteRestaurant(id) {
        return (await dbPromise).delete(OBJECT_STORE_NAME, id);
    },

    async searchRestaurant(query) {
        return (await this.getAllRestaurant()).filter((restaurant) => {
            const loweredCaseRestaurantNames = (restaurant.name || '-').toLowerCase();
            const jammedRestaurantNames = loweredCaseRestaurantNames.replace(/\s/g, '');

            const loweredCaseQuery = query.toLowerCase();
            const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

            return jammedRestaurantNames.indexOf(jammedQuery) !== -1;
        });
    },
};

export default FavoriteRestaurantIDB;