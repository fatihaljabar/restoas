import Swal from 'sweetalert2';
import CONFIG from '../global/config';
import customValidationHeadingHandler from './form-custom-validation';
import { createListReview } from '../views/templates/template-creator';
import RestaurantSource from '../data/restaurant-source';

const AddReviewInitiator = {
  async init({
    btnShowReviewForm,
    container,
    btnClose,
    btnSave,
    inputName,
    inputContent,
    containerListReview,
    restaurantID,
  }) {
    const restaurant = await RestaurantSource.detailRestaurants(restaurantID);
    this.showReviewForm(btnShowReviewForm, container);
    this.closeReviewForm(btnClose, container);
    this.sendReview(
      btnSave,
      inputName,
      inputContent,
      container,
      restaurant,
      containerListReview
    );
    this.addValidation(inputName, inputContent);
  },

  showReviewForm: (btnShowReviewForm, container) => {
    btnShowReviewForm.addEventListener('click', () => {
      container.style.display = 'flex';
    });
  },

  closeReviewForm: (btnClose, container) => {
    btnClose.addEventListener('click', () => {
      container.style.display = 'none';
    });
  },

  addValidation: (inputName, inputContent) => {
    inputName.addEventListener('input', (event) => {
      customValidationHeadingHandler(event);
      const isValid = event.target.validity.valid;
      const errorMessage = event.target.validationMessage;
      const connectedValidationId =
        event.target.getAttribute('aria-describedby');
      const connectedValidationEl = connectedValidationId
        ? document.getElementById(connectedValidationId)
        : null;

      if (connectedValidationEl && errorMessage && !isValid) {
        connectedValidationEl.innerText = errorMessage;
      } else {
        connectedValidationEl.innerText = '';
      }
    });

    inputName.addEventListener('blur', (event) => {
      customValidationHeadingHandler(event);
    });
    inputName.addEventListener('invalid', customValidationHeadingHandler);

    inputContent.addEventListener('input', (event) => {
      customValidationHeadingHandler(event);

      const isValid = event.target.validity.valid;
      const errorMessage = event.target.validationMessage;
      const connectedValidationId =
        event.target.getAttribute('aria-describedby');
      const connectedValidationEl = connectedValidationId
        ? document.getElementById(connectedValidationId)
        : null;

      if (connectedValidationEl && errorMessage && !isValid) {
        connectedValidationEl.innerText = errorMessage;
      } else {
        connectedValidationEl.innerText = '';
      }
    });

    inputContent.addEventListener('blur', (event) => {
      customValidationHeadingHandler(event);
    });

    inputContent.addEventListener('invalid', customValidationHeadingHandler);
  },

  sendReview: (
    btnSave,
    inputName,
    inputContent,
    container,
    restaurant,
    containerListReview
  ) => {
    btnSave.addEventListener('click', async (e) => {
      e.preventDefault();

      Swal.fire({
        title: 'Submitting your review...',
        text: 'Please wait.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
        background: '#ca4b3a',
        color: '#fff7eb',
      });

      setTimeout(async () => {
        try {
          await fetch(`${CONFIG.BASE_URL}/review`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: restaurant.id,
              name: inputName.value.trim(),
              review: inputContent.value.trim(),
            }),
          });
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your review has been submitted.',
            background: '#ca4b3a',
            color: '#fff7eb',
          });
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
            background: '#ca4b3a',
            color: '#fff7eb',
          });
        }

        inputName.value = '';
        inputContent.value = '';
        container.style.display = 'none';
        let html = '';
        const fetchRestaurant = await RestaurantSource.detailRestaurants(
          restaurant.id
        );
        fetchRestaurant.customerReviews.forEach((review) => {
          html += createListReview(review.name, review.review, review.date);
        });
        containerListReview.innerHTML = html;
      }, 1000);
    });
  },
};

export default AddReviewInitiator;
