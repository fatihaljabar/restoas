import { createRestaurantItemTemplate } from '../templates/template-creator';
import Swal from 'sweetalert2';

class FavoriteRestaurantView {
  getTemplate() {
    return `
          <div class="details-content">
            <section class="headerDetailsContent">
                <p>Favorite</p>
                <a href="#/"><i class="fa-solid fa-arrow-left"></i></a>
            </section>
        <hr />
        <input id="query" type="text">
        </div>
        <div class="cardContent"></div>
        `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurant(restaurants) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
      this._showEmptyStateNotification();
    }
    document.querySelector('.cardContent').innerHTML = html;

    document.querySelector('.cardContent').dispatchEvent(new Event('restaurant:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return `
          <div class="restaurant-item__not__found">
            Tidak ada restaurant untuk ditampilkan
          </div>
        `;
  }

  _showEmptyStateNotification() {
    Swal.fire({
      icon: 'info',
      title: 'Oops...',
      text: "You don't have any favorite restaurant yet",
      background: '#ca4b3a',
      color: '#fff7eb',
    });
  }
}

export default FavoriteRestaurantView;