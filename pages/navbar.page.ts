import { Page, expect } from '@playwright/test';
import { HomePage } from '../components/home.component';
import { productData } from '../test-data/product.data';

export class NavbarPage {
  constructor(private page: Page) {}
  homePage = new HomePage(this.page);

  //* POM for Contact Us page form (#fillContactUs) (#confirmationContactUs)
  hGetInTouch = this.page.getByRole('heading', { name: 'Get in Touch' });

  fillName = this.page.getByTestId('name');
  fillEmail = this.page.getByTestId('email');
  fillSubject = this.page.getByTestId('subject');
  fillMessage = this.page.locator('#message');
  uploadFile = this.page.locator('input[name="upload_file"]');
  bSubmit = this.page.getByTestId('submit-button');

  bDialogSubmit = this.page.getByRole('button', { name: 'Submit' });

  hSuccessSubmitted = this.page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.');
  bContactUsHome = this.page.locator('#form-section').getByRole('link', { name: ' Home' });

  async fillContactUs(name: string, email: string, subject: string, message: string): Promise<void> {
    await this.homePage.contactUs.click();
    await expect(this.hGetInTouch).toBeVisible();
    await this.fillName.fill(name);
    await this.fillEmail.fill(email);
    await this.fillSubject.fill(subject);
    await this.fillMessage.fill(message);
    await this.uploadFile.setInputFiles('./test-upload/image.jpg');
    await this.bSubmit.click();
  }

  async confirmationContactUs(): Promise<void> {
    await expect(this.hSuccessSubmitted).toBeVisible();
    await this.bContactUsHome.click();
  }

  //* Method for page Test case
  async openTestCase(): Promise<void> {
    await this.homePage.testCases.click();
  }

  //* POM for page Products (#selectFirstProduct) (#expectFirstProductDetails) (#searchProduct) (#sendSubscribe)
  linkViewProduct = this.page.getByRole('link', { name: 'View Product' });

  hBlueTop = this.page.getByRole('heading', { name: 'Blue Top' });
  category = this.page.getByText('Category:');
  price = this.page.getByText('Rs.');
  availability = this.page.getByText('Availability:');
  condition = this.page.getByText('Condition:');
  brand = this.page.getByText('Brand:');

  fillSearchProduct = this.page.locator('#search_product');
  bSearch = this.page.locator('#submit_search');
  hSearchedProducts = this.page.getByRole('heading', { name: 'Searched Products' });

  linkViewProductFirst = this.page.getByRole('link', { name: 'View Product' }).first();

  firstProduct = this.page.getByText(productData.firstProduct);
  addToCartFirstProduct = this.page.getByText('Add to cart');
  bContinueShopping = this.page.getByRole('button', { name: 'Continue Shopping' });
  secondProduct = this.page.getByText(productData.secondProduct, { exact: true });
  addToCartSecondProduct = this.page.getByText('Add to cart');
  viewCart = this.page.getByRole('link', { name: 'View Cart' });

  tableRow = this.page.locator('#cart_info_table').locator('tbody').locator('tr');
  cartPriceP1 = this.page.locator('#product-1').locator('.cart_price');
  cartQuantityP1 = this.page.locator('#product-1').locator('.cart_quantity');
  cartTotalPriceP1 = this.page.locator('#product-1').locator('.cart_total_price');
  cartPriceP2 = this.page.locator('#product-2').locator('.cart_price');
  cartQuantityP2 = this.page.locator('#product-2').locator('.cart_quantity');
  cartTotalPriceP2 = this.page.locator('#product-2').locator('.cart_total_price');

  hSubscription = this.page.getByRole('heading', { name: 'Subscription', exact: true });
  fillSubsEmail = this.page.locator('#susbscribe_email');
  bSubscribe = this.page.locator('#subscribe');
  successSubs = this.page.locator('#success-subscribe');

  async selectFirstProduct(): Promise<void> {
    await this.homePage.products.click();
    await this.homePage.expectProductsPage();
    await this.linkViewProduct.first().click();
  }

  async expectFirstProductDetails(): Promise<void> {
    await expect(this.page).toHaveURL('/product_details/1');
    await expect(this.hBlueTop).toBeVisible();
    await expect(this.category).toBeVisible();
    await expect(this.price).toBeVisible();
    await expect(this.availability).toBeVisible();
    await expect(this.condition).toBeVisible();
    await expect(this.brand).toBeVisible();
  }

  async searchProduct(product: string): Promise<void> {
    await this.homePage.products.click();
    await this.homePage.expectProductsPage();
    await this.fillSearchProduct.fill(product);
    await this.bSearch.click();
    await expect(this.hSearchedProducts).toBeVisible();
  }

  async addProducts(): Promise<void> {
    await this.homePage.products.click();
    await this.firstProduct.first().hover();
    await this.addToCartFirstProduct.first().click();
    await this.bContinueShopping.click();
    await this.secondProduct.first().hover();
    await this.addToCartSecondProduct.nth(3).click();
    await this.viewCart.click();
  }

  async expectAddProducts() {
    await expect(this.cartPriceP1).toHaveText(productData.cartPriceP1);
    await expect(this.cartQuantityP1).toHaveText(productData.cartQuantity);
    await expect(this.cartTotalPriceP1).toHaveText(productData.cartPriceP1);
    await expect(this.cartPriceP2).toHaveText(productData.cartPriceP2);
    await expect(this.cartQuantityP2).toHaveText(productData.cartQuantity);
    await expect(this.cartTotalPriceP2).toHaveText(productData.cartPriceP2);
  }

  async sendSubscribe(email: string): Promise<void> {
    await expect(this.hSubscription).toBeVisible();
    await this.fillSubsEmail.fill(email);
    await this.bSubscribe.click();
  }
}
