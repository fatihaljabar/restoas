import CONFIG from '../../global/config';

const createRestaurantItemTemplate = (restaurant) => {
  return `
        <div class="card justifyContent">
            <section class="cardImg">
                <div class="labelCity">${restaurant.city}</div>
                <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name || '-'}" crossorigin="anonymous">
            </section>
            <section class="cardDescription">
                <p class="rating">Rating ${restaurant.rating}</p>
                <h1 class="restaurant__name">${restaurant.name || '-'}</h1>
                <p class="desc">${
  restaurant.description
    ? `${restaurant.description.toString().substring(0, 100)
    }...`
    : '-'
}</p>
            </section>
            <section class="cardBtn">
            <a href="#/detail/${restaurant.id}" class="details-link">Details</a>
            </section>
        </div>`;
};

const createRestaurantDetailTemplate = (restaurant) => {
  return `
        <div class="details-content">
            <section class="headerDetailsContent">
                <p>Details</p>
                <a class="arrowBack" href="#/"><i class="fa-solid fa-arrow-left"></i></a>
            </section>
            <hr />
            <section class="imgDetailsContent">
                <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" crossorigin="anonymous">
            </section>
            <section class="descDetailsContent">
                <h1 id="detailsTitle">${restaurant.name}</h1>
                <p><strong>City : </strong> <span id="detailsCity">${restaurant.address}, ${restaurant.city}</span></p>
                <p><strong>Rating : </strong> <span id="detailsRating">${restaurant.rating}</span></p>
                <p>
                    <strong>Catagories : </strong> ${restaurant.categories
    .map((category) => {
      return `<span id="detailsCatagories">${category.name}</span>`;
    })
    .join('')}
                </p>
                <p>
                    <strong>Description : </strong>
                    <span id="detailsDescription">${restaurant.description}</span>
                </p>
            </section>
            <section class="menuDetailsContent">
                <h1>Menu</h1>
                <div class="menuMakanan">
                    <p><strong>Makanan :</strong></p>
                    <div class="allVariantMenuMakanan">
                    ${restaurant.menus.foods
    .map(({ name }) => {
      return `<div class="variantMenuMakanan"><p>${name}</p></div>`;
    })
    .join('')}
                    </div>
                </div>
                <div class="menuMinuman">
                    <p><strong>Minuman :</strong></p>
                    <div class="allVariantMenuMinuman">
                    ${restaurant.menus.drinks
    .map(({ name }) => {
      return `<div class="variantMenuMinuman"><p>${name}</p></div>`;
    })
    .join('')}
                    </div>
                </div>
            </section>
            <section class="reviewsDetailsContent">
                <h1>Reviews</h1>
                <div class="btnAddReviews">
                    <button id="btnAddReviews" data-id="${restaurant.id}">Add Reviews +</button>
                </div>
                ${createAddReviewTemplate()}
                
                <div class="userReviewDetailsContent">
                    ${restaurant.customerReviews
    .map(({ name, review, date }) => {
      return createListReview(name, review, date);
    })
    .join('')}
                </div>
            </section>
        </div>`;
};

const createListReview = (name, review, date) => {
  return `
    <div class="contentUser">
        <div class="userDescription">
            <span class="user"><p>${name}</p></span>
            <span class="date"><p>${date}</p></span>
        </div>
        <div class="UserReview">
            <p>${review}</p>
        </div>
    </div>
    `;
};

const createRestaurantFavoriteTemplate = (restaurant) => {
  return `
        <div class="card justifyContent">
            <section class="cardImg">
                <div class="labelCity">${restaurant.city}</div>
                <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" crossorigin="anonymous">
            </section>
            <section class="cardDescription">
                <p class="rating">Rating ${restaurant.rating}</p>
                <h1>${restaurant.name}</h1>
                <p class="desc">${restaurant.description.substring(0, 100)}...</p>
            </section>
            <section class="cardBtn">
            <a href="#/detail/${restaurant.id}" class="details-link">Details</a>
            </section>
        </div>`;
};

const createAddReviewTemplate = () => {
  return `
        <div class="addReviewPopup" id="addReviewPopup">
            <div class="popupContent">
                <div class="headerPopupContent">
                    <h2>Add Review</h2>
                    <span class="closePopup">&times;</span>
                </div>
                <hr />
                <form class="addReviewForm">
                    <div class="formUser">
                        <label for="reviewName">Name :</label>
                        <input id="reviewName" required minlength="3" pattern="^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$" aria-describedby="reviewNameValidation" />
                        <p id="reviewNameValidation" class="validation-message" aria-live="polite"></p>
                        <br />
                    </div>
                    <div class="formUser">
                        <label for="reviewContent">Review :</label>
                        <textarea cols="30" rows="3" id="reviewContent" required minlength="3" pattern="" aria-describedby="reviewContentValidation"></textarea>
                        <br />
                        <p id="reviewContentValidation" class="validation-message" aria-live="polite"></p>
                    </div>
                    <div class="btnFormUser">
                        <button class="btn-submit-review" id="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>`;
};

const createLikeMovieButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa-regular fa-star" aria-hidden="true"></i>
  </button>
`;

const createUnlikeMovieButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa-solid fa-star" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createRestaurantFavoriteTemplate,
  createAddReviewTemplate,
  createLikeMovieButtonTemplate,
  createUnlikeMovieButtonTemplate,
  createListReview,
};
