const itActsAsFavoriteRestaurantModel = (favoriteRestaurants) => {
    it('should return the restaurant that has been added', async() => {
        favoriteRestaurants.putRestaurant({ id: "rqdv5juczeskfw1e867" });

        expect(await favoriteRestaurants.getRestaurant("rqdv5juczeskfw1e867")).toEqual({ id: "rqdv5juczeskfw1e867" });
        expect(await favoriteRestaurants.getRestaurant("s1knt6za9kkfw1e867")).toEqual(undefined);
    });

    it('should refuse a restaurant from being added if it does not have the correct property', async() => {
        favoriteRestaurants.putRestaurant({ aProperty: 'property' });

        expect(await favoriteRestaurants.getAllRestaurant()).toEqual([]);
    });

    it('can return all of the restaurants that have been added', async() => {
        favoriteRestaurants.putRestaurant({ id: "rqdv5juczeskfw1e867" });
        favoriteRestaurants.putRestaurant({ id: "s1knt6za9kkfw1e867" });

        expect(await favoriteRestaurants.getAllRestaurant()).toEqual([{ id: "rqdv5juczeskfw1e867" }, { id: "s1knt6za9kkfw1e867" }]);
    });

    it('should remove favorite restaurant', async() => {
        favoriteRestaurants.putRestaurant({ id: "rqdv5juczeskfw1e867" });
        favoriteRestaurants.putRestaurant({ id: "s1knt6za9kkfw1e867" });
        favoriteRestaurants.putRestaurant({ id: "w9pga3s2tubkfw1e867" });

        await favoriteRestaurants.deleteRestaurant(1);

        expect(await favoriteRestaurants.getAllRestaurant()).toEqual([{ id: "rqdv5juczeskfw1e867" }, { id: "s1knt6za9kkfw1e867" }, { id: "w9pga3s2tubkfw1e867" }]);
    });

    it('should handle request to remove a Restaurant even though the Restaurant has not been added', async() => {
        favoriteRestaurants.putRestaurant({ id: "rqdv5juczeskfw1e867" });
        favoriteRestaurants.putRestaurant({ id: "s1knt6za9kkfw1e867" });
        favoriteRestaurants.putRestaurant({ id: "w9pga3s2tubkfw1e867" });

        await favoriteRestaurants.deleteRestaurant(4);

        expect(await favoriteRestaurants.getAllRestaurant()).toEqual([{ id: "rqdv5juczeskfw1e867" }, { id: "s1knt6za9kkfw1e867" }, { id: "w9pga3s2tubkfw1e867" }]);
    });

    it('should be able to search for restaurants', async() => {
        favoriteRestaurants.putRestaurant({ id: "rqdv5juczeskfw1e867", name: 'restaurant a' });
        favoriteRestaurants.putRestaurant({ id: "s1knt6za9kkfw1e867", name: 'restaurant b' });
        favoriteRestaurants.putRestaurant({ id: "w9pga3s2tubkfw1e867", name: 'restaurant abc' });

        expect(await favoriteRestaurants.searchRestaurant('restaurant a')).toEqual([
            { id: "rqdv5juczeskfw1e867", name: 'restaurant a' },
            { id: "w9pga3s2tubkfw1e867", name: 'restaurant abc' },
        ]);
    });
};

export { itActsAsFavoriteRestaurantModel };