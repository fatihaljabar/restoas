import * as TestFactories from "./helpers/testFactories";
import FavoriteRestaurantIDB from "../src/scripts/data/favorite-source";

describe('Unliking A Restaurant', () => {
    const addLikeButtonContainer = () => {
        document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    };

    beforeEach(async() => {
        addLikeButtonContainer();
        await FavoriteRestaurantIDB.putRestaurant({
            id: "rqdv5juczeskfw1e867",
        });
    });

    afterEach(async() => {
        await FavoriteRestaurantIDB.deleteRestaurant("rqdv5juczeskfw1e867");
    });

    it('should display unlike widget when the restaurant has been liked', async() => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: "rqdv5juczeskfw1e867" });

        expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy();
    });

    it('should not display like widget when the restaurant has been liked', async() => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: "rqdv5juczeskfw1e867" });

        expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy();
    });

    it('should be able to remove liked restaurant from the list', async() => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: "rqdv5juczeskfw1e867" });

        document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));
        expect(await FavoriteRestaurantIDB.getAllRestaurant()).toEqual([]);
    });

    it('should not throw error when user click unlike widget if the unliked restaurant is not in the list', async() => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: "rqdv5juczeskfw1e867" });

        await FavoriteRestaurantIDB.deleteRestaurant("rqdv5juczeskfw1e867");

        document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));

        expect(await FavoriteRestaurantIDB.getAllRestaurant()).toEqual([]);
    });
});