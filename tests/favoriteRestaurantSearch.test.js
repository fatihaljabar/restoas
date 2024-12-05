import FavoriteRestaurantSearchPresenter from "../src/scripts/views/pages/favorite-restaurant-search-presenter";
import FavoriteRestaurantView from "../src/scripts/views/pages/favorite-restaurant-search-view";
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

describe('Searching Restaurant', () => {
    let presenter;
    let favoriteRestaurants;
    let view;

    const searchRestaurant = (query) => {
        const queryElement = document.getElementById('query');
        queryElement.value = query;
        queryElement.dispatchEvent(new Event('change'));
    };

    const setRestaurantSearchContainer = () => {
        view = new FavoriteRestaurantView();
        document.body.innerHTML = view.getTemplate();
    };

    const constructPresenter = () => {
        favoriteRestaurants = {
            getAllRestaurant: jest.fn(),
            searchRestaurant: jest.fn(),
        };

        presenter = new FavoriteRestaurantSearchPresenter({
            favoriteRestaurants,
            view,
        });
    };

    beforeEach(() => {
        setRestaurantSearchContainer();
        constructPresenter();
    });

    describe('When query is not empty', () => {
        it('should be able to capture the query typed by the user', () => {
            favoriteRestaurants.searchRestaurant.mockImplementation(() => []);

            searchRestaurant('restaurant a');

            expect(presenter.latestQuery).toEqual('restaurant a');
        });

        it('should ask the model to search for liked restaurant', () => {
            favoriteRestaurants.searchRestaurant.mockImplementation(() => []);

            searchRestaurant('restaurant a');

            expect(favoriteRestaurants.searchRestaurant).toHaveBeenCalledWith('restaurant a');
        });

        it('should show the restaurants found by Favorite Restaurants', (done) => {
            document
                .querySelector('.cardContent')
                .addEventListener('restaurant:updated', () => {
                    expect(document.querySelectorAll('.card').length).toEqual(3);

                    done();
                });

            favoriteRestaurants.searchRestaurant.mockImplementation((query) => {
                if (query === 'restaurant a') {
                    return [
                        { id: 'rqdv5juczeskfw1e867', name: 'restaurant abc' },
                        { id: 's1knt6za9kkfw1e867', name: 'ada juga restaurant abcde' },
                        { id: 'w9pga3s2tubkfw1e867', name: 'ini juga boleh restaurant a' },
                    ];
                }

                return [];
            });

            searchRestaurant('restaurant a');
        });

        it('should show the name of the restaurants found by favorite restaurant', (done) => {
            document
                .querySelector('.cardContent')
                .addEventListener('restaurant:updated', () => {
                    const restaurantNames = document.querySelectorAll('.restaurant__name');

                    expect(restaurantNames.item(0).textContent).toEqual('restaurant abc');
                    expect(restaurantNames.item(1).textContent).toEqual('ada juga restaurant abcde');
                    expect(restaurantNames.item(2).textContent).toEqual('ini juga boleh restaurant a');


                    done();
                });

            favoriteRestaurants.searchRestaurant.mockImplementation((query) => {
                if (query === 'restaurant a') {
                    return [
                        { id: 'rqdv5juczeskfw1e867', name: 'restaurant abc' },
                        { id: 's1knt6za9kkfw1e867', name: 'ada juga restaurant abcde' },
                        { id: 'w9pga3s2tubkfw1e867', name: 'ini juga boleh restaurant a' },

                    ];
                }

                return [];
            });

            searchRestaurant('restaurant a');
        });

        it('should show - when the restaurant returned does not contain a name', (done) => {
            document.querySelector('.cardContent')
                .addEventListener('restaurant:updated', () => {
                    const restaurantNames = document.querySelectorAll('.restaurant__name');
                    expect(restaurantNames.item(0).textContent)
                        .toEqual('-');

                    done();
                });

            favoriteRestaurants.searchRestaurant.mockImplementation((query) => {
                if (query === 'restaurant a') {
                    return [{ id: 'rqdv5juczeskfw1e867' }];
                }

                return [];
            });

            searchRestaurant('restaurant a');
        });

    });

    describe('When query is empty', () => {
        it('should capture the query as empty', () => {
            favoriteRestaurants.getAllRestaurant.mockImplementation(() => []);
            searchRestaurant(' ');
            expect(presenter.latestQuery.length).toEqual(0);
            searchRestaurant('    ');
            expect(presenter.latestQuery.length).toEqual(0);
            searchRestaurant('');
            expect(presenter.latestQuery.length).toEqual(0);
            searchRestaurant('\t');
            expect(presenter.latestQuery.length).toEqual(0);
        });
        it('should show all favorite restaurant', () => {
            favoriteRestaurants.getAllRestaurant.mockImplementation(() => []);
            searchRestaurant('    ');
            expect(favoriteRestaurants.getAllRestaurant).toHaveBeenCalled();
        });
    });

    describe('When no favorite restaurant could be found', () => {
        it('should show the empty message', (done) => {
            document
                .querySelector('.cardContent')
                .addEventListener('restaurant:updated', () => {
                    expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
                    done();
                });
            favoriteRestaurants.searchRestaurant.mockImplementation((query) => []);
            searchRestaurant('restaurant a');
        });

        it('should not show any restaurant', (done) => {
            document.querySelector('.cardContent')
                .addEventListener('restaurant:updated', () => {
                    expect(document.querySelectorAll('.card').length).toEqual(0);
                    done();
                });
            favoriteRestaurants.searchRestaurant.mockImplementation(() => []);
            searchRestaurant('restaurant a');
        });
    });
});