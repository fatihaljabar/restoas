const assert = require("assert");

Feature("Unliked Restaurants");

Before(async ({ I }) => {
  I.amOnPage("/");
});

Scenario("unliked restaurant", async ({ I }) => {
  // Disini saya mensimulasikan untuk menyukai 2 restoran terlebih dahulu
  I.waitForElement(".details-link", 5);
  I.seeElement(".details-link");

  const names = [];
  for (let i = 1; i <= 2; i++) {
    I.waitForElement(".details-link", 5);
    I.click(locate(".details-link").at(i));

    I.waitForElement("#likeButton", 5);
    I.seeElement("#likeButton");
    I.click("#likeButton");

    I.waitForElement("#detailsTitle", 5);
    names.push(await I.grabTextFrom("#detailsTitle"));
    I.amOnPage("/");
  }

  I.amOnPage("/#/favorite");
  I.waitForElement(".card", 5);
  I.seeElement(".card");
  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements(".card");

  assert.strictEqual(names.length, visibleLikedRestaurants);

  /*
   * Disini saya baru melakukan simulasi untuk batal menyukai restoran
   * Restoran yang saya hapus merupakan restoran yang ada pada urutan pertama
   */
  I.waitForElement(".details-link", 5);
  I.click(locate(".details-link").first());

  I.waitForElement("#detailsTitle", 5);
  const restaurantNameUnliked = await I.grabTextFrom("#detailsTitle");

  I.waitForElement(`[aria-label="unlike this restaurant"]`, 5);
  I.click(`[aria-label="unlike this restaurant"]`);
  I.amOnPage("/#/favorite");

  // disini saya memastikan bahwa restaurant tersebut sudah tidak ada dalam daftar ".card"
  I.waitForElement(".card", 5);
  I.seeElement(".card");
  I.dontSee(restaurantNameUnliked, ".card");
  const visibleLikedRestaurantsAfterUnliked =
    await I.grabNumberOfVisibleElements(".card");

  assert.strictEqual(
    visibleLikedRestaurants - 1,
    visibleLikedRestaurantsAfterUnliked
  );
});
