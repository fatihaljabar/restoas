import LikeButtonInitiator from "../../src/scripts/utils/like-button-presenter";
import FavoriteRestaurantIDB from "../../src/scripts/data/favorite-source";

const createLikeButtonPresenterWithRestaurant = async(restaurant) => {
    await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteRestuarants: FavoriteRestaurantIDB,
        restaurant,
    });
};
export { createLikeButtonPresenterWithRestaurant };