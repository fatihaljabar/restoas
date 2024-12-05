const assert = require("assert");

Feature("Customer Reviews");

Before(({ I }) => {
  I.amOnPage("/");
});

Scenario("give a restaurant review", async ({ I }) => {
  I.waitForElement(".details-link", 5);
  I.seeElement(".details-link");
  I.click(locate(".details-link").first());

  I.waitForElement(".userReviewDetailsContent", 5);
  const visibleCustomerReviews = await I.grabNumberOfVisibleElements(
    ".userReviewDetailsContent"
  );
  const expectedAfterReview = visibleCustomerReviews;

  I.waitForElement("#btnAddReviews", 5);
  I.click("#btnAddReviews");

  const customerReview = {
    name: "Ciwo",
    review: "Restaurant nya oke banget nih",
  };

  I.waitForElement("input#reviewName", 5);
  I.fillField("input#reviewName", customerReview.name);

  I.waitForElement("textarea#reviewContent", 5);
  I.fillField("textarea#reviewContent", customerReview.review);

  I.waitForElement(".btn-submit-review", 5);
  I.click(".btn-submit-review");

  I.wait(1);

  const visibleCustomerReviewsAfterReview = await I.grabNumberOfVisibleElements(
    ".userReviewDetailsContent"
  );

  assert.strictEqual(expectedAfterReview, visibleCustomerReviewsAfterReview);

  I.waitForElement(".userReviewDetailsContent", 5);
  I.waitForElement(".userDescription", 5);
  I.waitForElement(".UserReview", 5);

  const lastContentUserSelector = ".contentUser:last-of-type";
  const expectedCustomerReview = {
    name: await I.grabTextFrom(
      lastContentUserSelector + " .userDescription .user p"
    ),
    review: await I.grabTextFrom(lastContentUserSelector + " .UserReview p"),
  };
  const customerReviewString = JSON.stringify(customerReview);
  const expectedCustomerReviewString = JSON.stringify(expectedCustomerReview);

  assert.strictEqual(customerReviewString, expectedCustomerReviewString);
});
