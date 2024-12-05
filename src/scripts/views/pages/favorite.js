import { createRestaurantFavoriteTemplate } from '../templates/template-creator';
import FavoriteRestaurantIDB from '../../data/favorite-source';
import Swal from 'sweetalert2';
import FavoriteRestaurantView from './favorite-restaurant-search-view';
import FavoriteRestaurantShowPresenter from '../pages/favorite-restaurant-show-presenter';
import FavoriteRestaurantSearchPresenter from '../pages/favorite-restaurant-search-presenter';

const view = new FavoriteRestaurantView();


const Favorite = {
    async render() {
        return view.getTemplate();
    },

    async afterRender() {
        this.loading();

        setTimeout(() => {
            Swal.close();
            new FavoriteRestaurantShowPresenter({ view, favoriteRestaurant: FavoriteRestaurantIDB });
            new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurants: FavoriteRestaurantIDB });
        }, 1000);
    },

    loading() {
        Swal.fire({
            title: 'Loading data...',
            text: 'Please wait.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
            background: '#ca4b3a',
            color: '#fff7eb',
        });
    },
};

export default Favorite;