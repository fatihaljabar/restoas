import {
    createLikeMovieButtonTemplate,
    createUnlikeMovieButtonTemplate,
} from '../views/templates/template-creator';
import Swal from 'sweetalert2';

const LikeButtonInitiator = {
    async init({ likeButtonContainer, restaurant, favoriteRestuarants }) {
        this._likeButtonContainer = likeButtonContainer;
        this._restaurant = restaurant;
        this._favoriteRestaurants = favoriteRestuarants;

        await this._renderButton();
    },

    async _renderButton() {
        const { id } = this._restaurant;

        if (await this._isRestaurantExist(id)) {
            this._renderLiked();
        } else {
            this._renderLike();
        }
    },

    async _isRestaurantExist(id) {
        const restaurant = await this._favoriteRestaurants.getRestaurant(id);
        return !!restaurant;
    },

    _renderLike() {
        this._likeButtonContainer.innerHTML = createLikeMovieButtonTemplate();

        const likeButton = document.querySelector('#likeButton');
        likeButton.addEventListener('click', async() => {
            await this._favoriteRestaurants.putRestaurant(this._restaurant);
            Swal.fire({
                icon: 'success',
                title: 'Added to Favorites!',
                text: `${this._restaurant.name} has been added to your favorites.`,
                background: '#ca4b3a',
                color: '#fff7eb',
            });
            this._renderButton();
        });
    },

    _renderLiked() {
        this._likeButtonContainer.innerHTML = createUnlikeMovieButtonTemplate();

        const likeButton = document.querySelector('#likeButton');
        likeButton.addEventListener('click', async() => {
            await this._favoriteRestaurants.deleteRestaurant(this._restaurant.id);
            Swal.fire({
                icon: 'info',
                title: 'Removed from Favorites',
                text: `${this._restaurant.name} has been removed from your favorites.`,
                background: '#ca4b3a',
                color: '#fff7eb',
            });
            this._renderButton();
        });
    },
};

export default LikeButtonInitiator;