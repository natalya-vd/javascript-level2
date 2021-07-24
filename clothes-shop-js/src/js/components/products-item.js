
Vue.component('products-item', {
    props: ['goodProp'],
    template: `
      <li class="products__item" :itemId="goodProp.id_product">
        <div class="products__wrapper-overlay">
            <img class="products__item-img" src="./img/catalog/catalog-1.jpg" alt="Product"
              width="360" height="420">
            <button v-on:click="$emit('mouse-click', $event)" class="products__button-cart" type="button">
              Add to Cart
            </button>
        </div>
        <div class="products__item-inner">
            <h3 class="products__item-heading">
              <a class="products__item-link" href="./product.html">
                  {{goodProp.product_name}}
              </a>
            </h3>
            <p class="products__item-text">
              Known for her sculptural takes on traditional tailoring,
              Australian arbiter of cool Kym
              Ellery teams up with Moda Operandi.
            </p>
            <p class="products__item-price">
              {{goodProp.price}}.00
            </p>
        </div>
      </li>
    `
  });

export default 'products-item';