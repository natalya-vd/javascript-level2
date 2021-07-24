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

  export default 'product-list';