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

  export default 'form-serch';