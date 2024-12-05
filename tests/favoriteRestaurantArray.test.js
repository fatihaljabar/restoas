import { itActsAsFavoriteRestaurantModel } from "./contracts/favoriteRestaurantContract";

let favoriteRestaurants = [];

const FavoriteRestaurantArray = {
    getRestaurant(id) {
        if (!id) {
            return;
        }

        return favoriteRestaurants.find((restaurant) => restaurant.id == id);
    },

    getAllRestaurant() {
        return favoriteRestaurants;
    },

    putRestaurant(restaurant) {
        // eslint-disable-next-line no-prototype-builtins
        if (!restaurant.hasOwnProperty('id')) {
            return;
        }

        // pastikan id ini belum ada dalam daftar favoriterestaurant
        if (this.getRestaurant(restaurant.id)) {
            return;
        }

        favoriteRestaurants.push(restaurant);
    },

    searchRestaurant(query) {
        return this.getAllRestaurant()
            .filter((restaurant) => {
                const loweredCaseRestaurantNames = (restaurant.name || '-').toLowerCase();
                const jammedRestaurantNames = loweredCaseRestaurantNames.replace(/\s/g, '');

                const loweredCaseQuery = query.toLowerCase();
                const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

                return jammedRestaurantNames.indexOf(jammedQuery) != -1;
            });
    },

    deleteRestaurant(id) {
        // cara boros menghapus restaurant dengan meng-copy restaurant yang ada
        // kecuali restaurant dengan id == id
        favoriteRestaurants = favoriteRestaurants.filter((restaurant) => restaurant.id != id);
    },
};

describe('Favorite Restaurant Array Contract Test Implementation', () => {
    afterEach(() => {
        favoriteRestaurants = [];
    });

    itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray);
});