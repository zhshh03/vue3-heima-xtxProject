import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user';
import { insertCartAPI,findNewCartListAPI } from '@/apis/cart';

export const useCartStore = defineStore('cart', () => {
  const cartList = ref([]);
  const userStore = useUserStore()
  const isLongin = computed(() => userStore.userInfo.token)
  const addCart = async(goods) => {
    const {skuId,count} = goods
    if(isLongin.value) {
      await insertCartAPI({skuId,count})
      const res = await findNewCartListAPI()
     cartList.value = res.data.result
      
    }else {
      const item = cartList.value.find(item => item.skuId === goods.skuId)
    if (item) {
      item.count += goods.count
    } else {
      cartList.value.push(goods)
    }
    }
    
  }
  const delCart = (skuId) => {
    const index = cartList.value.findIndex(item => item.skuId === skuId)
    cartList.value.splice(index, 1)
  }
  const totalCount = computed(() => cartList.value.reduce((total, item) => total + item.count, 0))
  const totalPrice = computed(() => cartList.value.reduce((total, item) => total + item.count * item.price, 0))
  
  const singleCheck = (skuId,selected) => {
    const item = cartList.value.find(item => item.skuId === skuId)
    item.selected = selected
  }

  const isAll = computed(()=> cartList.value.every(item => item.selected))
  const allCheck = (select) => {
    cartList.value.forEach(item=> item.selected = select)
  }

  const selectCount = computed(() => cartList.value.filter(item => item.selected).reduce((a,b) => a + b.count, 0))
  const selectPrice = computed(() => cartList.value.filter(item => item.selected).reduce((total, item) => total + item.count * item.price, 0))
  return {
    cartList,
    addCart,
    delCart,
    totalCount,
    totalPrice,
    singleCheck,
    isAll,
    allCheck,
    selectCount,
    selectPrice
  }
},{
  persist: true
})
