import FavoriteRestaurantShowPresenter from "../src/scripts/views/pages/favorite-restaurant-show-presenter";
import FavoriteRestaurantView from "../src/scripts/views/pages/favorite-restaurant-search-view";

describe('Showing all favorite restaurant', () => {
    let view;

    const renderTemplate = () => {
        view = new FavoriteRestaurantView();
        document.body.innerHTML = view.getTemplate();
    };
    beforeEach(() => {
        renderTemplate();
    });

    describe('When no restaurant have been liked', () => {
        it('should ask for the favorite restaurant', () => {
            const favoriteRestaurant = {
                getAllRestaurant: jest.fn().mockImplementation(() => []),
            };
            new FavoriteRestaurantShowPresenter({
                view,
                favoriteRestaurant,
            });
            expect(favoriteRestaurant.getAllRestaurant).toHaveBeenCalledTimes(1);
        });

        it('should show the information that no restaurant have been liked', (done) => {
            const cardContent = document.querySelector('.cardContent');
            cardContent.addEventListener('restaurant:updated', () => {
                expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
                done();
            });

            const favoriteRestaurant = {
                getAllRestaurant: jest.fn().mockImplementation(() => []),
            };

            new FavoriteRestaurantShowPresenter({
                view,
                favoriteRestaurant,
            });
        });
    });

    // describe('When favorite restaurant exist', () => {
    //     it('should render the restaurant', () => {
    //         const favoriteRestaurant = {
    //             getAllRestaurant: jest.fn().mockImplementation(() => []),
    //         };
    //         const presenter = new FavoriteRestaurantShowPresenter({
    //             view,
    //             favoriteRestaurant,
    //         });
    //         presenter._displayRestaurant([{
    //                 id: 'rqdv5juczeskfw1e867',
    //                 title: "Melting Pot",
    //                 description: "Restoran Melting Pot",
    //             },
    //             {
    //                 id: 's1knt6za9kkfw1e867',
    //                 title: "Kafe Kita",
    //                 description: "Restoran Kafe Kita",
    //             },
    //         ]);
    //         expect(document.querySelectorAll('.card').length).toEqual(2);
    //     });
    // });

    describe("When the favorite restaurants exist", () => {
        it("should show the restaurants", (done) => {
            document
                .querySelector(".cardContent")
                .addEventListener("restaurant:updated", () => {
                    expect(document.querySelectorAll(".card").length).toEqual(2);
                    done();
                });

            const favoriteRestaurant = {
                getAllRestaurant: jest.fn().mockImplementation(() => [{
                        id: "rqdv5juczeskfw1e867",
                        name: "Melting Pot",
                        description: "Restoran Melting Pot",
                    },
                    {
                        id: "s1knt6za9kkfw1e867",
                        name: "Kafe Kita",
                        description: "Restoran Kafe Kita",
                    },
                ]),
            };

            new FavoriteRestaurantShowPresenter({ view, favoriteRestaurant });
        });
    });
});