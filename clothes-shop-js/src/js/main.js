import basket from  './components/basket';
import formSerch from './components/form-serch';
import productsItem from './components/products-item';
import productList from './components/product-list';

const API_URL = "http://localhost:3000";

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
        const responce = await fetch(`${API_URL}/catalogData`);
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
      await this.$refs.basket.getToCart();
    }
});