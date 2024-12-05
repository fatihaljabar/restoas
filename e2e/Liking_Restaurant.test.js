const assert = require("assert");

Feature("Liking Restaurants");

Before(({ I }) => {
  I.amOnPage("/#/favorite");
});

Scenario("showing empty liked restaurants", ({ I }) => {
  I.seeElement("#query");
  I.see(
    "Tidak ada restaurant untuk ditampilkan",
    ".restaurant-item__not__found"
  );
});

Scenario("liking one restaurant", async ({ I }) => {
  I.see(
    "Tidak ada restaurant untuk ditampilkan",
    ".restaurant-item__not__found"
  );

  I.amOnPage("/");

  I.amOnPage("/");
  I.seeElement(".details-link");

  const firstRestaurantNameElement = locate(".restaurant__name").first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurantNameElement);

  I.click(locate(".details-link").first());

  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");
  I.seeElement(".card");

  const likedRestaurantNameElement = locate(".restaurant__name").first();
  const likedRestaurantName = I.grabTextFrom(likedRestaurantNameElement);

  assert(firstRestaurantName, likedRestaurantName);
});

Scenario("searching restaurants", async ({ I }) => {
  I.see(
    "Tidak ada restaurant untuk ditampilkan",
    ".restaurant-item__not__found"
  );
  I.amOnPage("/");

  I.waitForElement(".details-link", 3);
  I.seeElement(".details-link");

  const names = [];
  for (let i = 1; i <= 3; i++) {
    I.waitForElement(".details-link", 3);
    I.click(locate(".details-link").at(i));

    I.waitForElement("#likeButton", 3);
    I.seeElement("#likeButton");
    I.click("#likeButton");

    I.waitForElement("#detailsTitle", 3);
    names.push(await I.grabTextFrom("#detailsTitle"));
    I.amOnPage("/");
  }

  I.amOnPage("/#/favorite");
  I.waitForElement("#query", 3);
  I.seeElement("#query");

  I.waitForElement(".card", 5);
  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements(".card");

  assert.strictEqual(names.length, visibleLikedRestaurants);

  const searchQuery = "afe";
  I.fillField("#query", searchQuery);
  I.pressKey("Enter");

  const matchingRestaurants = names.filter(
    (name) => name.indexOf(searchQuery) !== -1
  );
  const visibleSearchedLikedRestaurants =
    await I.grabNumberOfVisibleElements(".card");

  assert.strictEqual(
    matchingRestaurants.length,
    visibleSearchedLikedRestaurants
  );

  I.waitForElement(".restaurant__name", 5);
  for (let i = 0; i < matchingRestaurants.length; i++) {
    const visibleName = await I.grabTextFrom(
      locate(".restaurant__name").at(i + 1)
    );
    assert.strictEqual(matchingRestaurants[i], visibleName);
  }
});
