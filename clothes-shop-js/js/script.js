//Вопрос 1: Хотела сделать отображение цены товара в виде $1000.00. В прошлом задании делала это через шаблонные строки ({{`$${good.price}.00`}}), но сейчас так не работает и он ругается на знак $. Как мне вывести знак $ на страницу (строка 50)?
const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const MAX_GOODS_BASKET = 9;

Vue.component('product-list', {
  props: ['goods'],
  template: `
    <ul class="products__list" v-if="goods.length !== 0">
      <products-item 
        v-for="item in goods"
        :goodProp="item"
        :key="item.id_product"
        @mouse-click="getClickOfProductsItem"
      >
      </products-item>
    </ul>
  `,

  methods: {
    getClickOfProductsItem() {
      const clickEvent = event
      this.$emit('mouse-click', clickEvent)
  }
  }
});

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

Vue.component('form-serch', {
  data() {
    return {
      searchLine: '',
      filteredProduct: []
    }
  },

  props: ['product'],

  template: `
  <div class="header__form-inner">
    <input 
      v-model="searchLine"
      class="header__form-input" 
      type="search" 
      id="serch" 
      placeholder="Serch"
    >
    <button @click="filterGoods" class="header__form-btn-serch">Serch</button>
  </div>
  `,

  methods: {
    /**
       * Функция, которая отвечает за поиск товара по странице
       */
    filterGoods () {
      this.filteredProduct = [];
      this.product.forEach(good => {
        if(good.product_name.toUpperCase().indexOf(this.searchLine.toUpperCase()) !== -1) {
          this.filteredProduct.push(good);
        }
      })

      this.$emit('products', this.filteredProduct)
    },
  }
});

Vue.component('basket', {
  data() {
    return {
      goodsBasket: [],
      basket: [],
      sumGoods: '',
    }
  },
  props: ['goods'],

  template: `
    <div v-if="goodsBasket.length !== 0" class="header__basket-inner">
      <div class="header__basket" v-for="item in basket">
        <div class="header__basket-item" itemid="456">
          <div class="header__basket-img"></div>
          <h3> {{item.product_name}} </h3>
          <p> {{item.price}} </p>
          <span class="header__amount-good"> {{sortingGood(item.id_product)}} </span>
          <button v-on:click="removeGood(item.id_product)" type="button" class="header__btn-delet">
              -
          </button>
        </div>
      </div>
      <div class="header__basket-total">
        <div class="header__basket-total-list">
          <div class="header__basket-title">Итого:</div>
          <div class="header__basket-sum"> {{calculateSum()}} </div>
        </div>
      </div>
    </div>
  `,

  methods: {
    /**
       * 
       * @param {MouseEvent} event Добавляем товар в корзину по itemid товара
       */
    addGood(event) {
        console.log('ура')
        for(let i = 0; i < this.goods.length; i++) {
          let idProduct = this.goods[i].id_product;
    
          if(idProduct === +event.path[2].attributes[0].value) {
            this.goodsBasket.push(this.goods[i]);
          };
        }
  
        this.basket = this.searchUniqueValues(this.goodsBasket);
        this.calculateGoods()
    },

    /**
     * Поиск уникальных значений в исходном массиве
     * @param {Array} arrValues Исходный массив данных
     * @returns Возвращает массив из уникальных значений
     */
    searchUniqueValues(arrValues) {
      return [...new Set(arrValues)];
    },

    /**
     * Метод, который считает сумму товаров в корзине
     * @returns {Number}
     */
    calculateSum() {
      let sum = 0;
      this.goodsBasket.forEach((good) => {
        sum += good.price;
      });
      return sum;
    },

    /**
     * Подсчет количества всех товаров в корзине, чтобы выводить на страницу в span cart-goods
     * @returns Количество товара в корзине
     */
    calculateGoods() {
      if(this.goodsBasket.length > MAX_GOODS_BASKET) {
        this.sumGoods = `${MAX_GOODS_BASKET}+`;
      }
      else {
        this.sumGoods = this.goodsBasket.length;
      }

      this.$emit('amount-goods', this.sumGoods)
    },

    /**
     * Функция, которая считает количество каждого товара в корзине
     * @param {ID} id 
     * @returns Возвращает длину массива
     */
    sortingGood(id) {
      let arr = [];
      this.goodsBasket.forEach((item) => {
        if(item.id_product === +id) {
          arr.push(item);
        };
      });
      return arr.length
    },

    /**
     * Метод удаления товара из корзины
     * @param {Id} idGood Id удаляемого товара
     */
    removeGood(idGood) {
      for(let i = this.goodsBasket.length - 1; i >= 0; i--) {
        if(this.goodsBasket[i].id_product === +idGood) {
          this.goodsBasket.splice([i], 1);
          break;
        };
      };
      this.basket = this.searchUniqueValues(this.goodsBasket);
      this.calculateGoods()
    }
  }
});

const app = new Vue({

    el: "#app",
    data: {
        goods: [],
        filteredGoods: [],
        sumGoods: '',
    },

    methods: {
      /**
       * Запрос товара с сервера
       */
      async getProducts() {
        const responce = await fetch(`${API_URL}/catalogData.json`);
        if (responce.ok) {
          const catalogItems = await responce.json();
          this.goods = catalogItems;
          this.filteredGoods = catalogItems;
        } else {
          alert("Ошибка при соединении с сервером");
        }
      },

      /**
       * Функция, которая получает отфильтрованные продукты от компонента поиска "form-serch"
       * @param {emit} product массив отфильтрованных товаров
       */
      getFilteredGoods(product) {
        this.filteredGoods = product;
      },

      /**
       * Функция, которая следит за кликом из дочернего компонента products-item и запускает метод добавления в корзину в другом дочернем компоненте basket
       */
      getClickOfProductsItem() {
          this.$refs.basket.addGood(event);
      },


      /**
       * Функция, которая следит за изменением количества товара в дочернем компоненте basket и записывает их к себе в data
       * @param {emit} amountGoods Количество товара
       */
      getAmountGoods(amountGoods) {
        this.sumGoods = amountGoods;
      }
    },

    async mounted() {
      await this.getProducts();
    }
});