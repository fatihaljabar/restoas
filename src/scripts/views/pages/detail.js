import RestaurantSource from '../../data/restaurant-source';
import FavoriteRestaurantIDB from '../../data/favorite-source';
import UrlParser from '../../routes/url-parser';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-presenter';
import AddReviewInitiator from '../../utils/add-review-initiator';
import Swal from 'sweetalert2';

const Detail = {
  async render() {
    return `
        <div id="restaurantDetails" class="details"></div>
        <div id="likeButtonContainer"></div>
        `;
  },

  async afterRender() {
    this.loading();

    setTimeout(async () => {
      Swal.close();
      try {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const restaurant = await RestaurantSource.detailRestaurants(url.id);
        const details = document.querySelector('#restaurantDetails');
        details.innerHTML = createRestaurantDetailTemplate(restaurant);

        AddReviewInitiator.init({
          restaurantID: url.id,
          inputName: document.querySelector('#reviewName'),
          inputContent: document.querySelector('#reviewContent'),
          btnShowReviewForm: document.querySelector('#btnAddReviews'),
          container: document.querySelector('#addReviewPopup'),
          btnClose: document.querySelector('.closePopup'),
          btnSave: document.querySelector('.btn-submit-review'),
          containerListReview: document.querySelector(
            '.userReviewDetailsContent'
          ),
          restaurant,
        });

        LikeButtonInitiator.init({
          likeButtonContainer: document.querySelector('#likeButtonContainer'),
          restaurant,
          favoriteRestuarants: FavoriteRestaurantIDB,
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong...',
          text: error.message,
          background: '#ca4b3a',
          color: '#fff7eb',
        });
      }
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

export default Detail;
