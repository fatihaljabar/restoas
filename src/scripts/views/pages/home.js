import Swal from 'sweetalert2';
import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
    async render() {
        return `
        <picture class="heroImage">
          <source media="(max-width: 600px)" srcset="./images/heros/hero-image_1-small.jpg">
          <img src="./images/heros/hero-image_1-large.jpg" alt="Image Jumbotron">
        </picture>
        <div class="textContent">
            <h1 tabindex="0">
                A Glimpse of Our <br /> Culinary Indonesia
            </h1>
        </div>
        <div class="cardContent"></div>
      `;
    },

    async afterRender() {
        this.loading();

        setTimeout(async() => {
            Swal.close();
            try {
                const restaurant = await RestaurantSource.restaurantsList();
                const cardContent = document.querySelector('.cardContent');
                restaurant.forEach((resto) => {
                    cardContent.innerHTML += createRestaurantItemTemplate(resto);
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

export default Home;