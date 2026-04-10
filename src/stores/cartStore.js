import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './userStore';
import { insertCartAPI,findNewCartListAPI,delCartAPI } from '@/apis/cart';

export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  // 购物车列表
  const cartList = ref([]);
  //检验是否登录
  const isLogin = computed(() => userStore.userInfo.token)
  //更新购物车列表
  const updateNewList = async() =>{
    const res = await findNewCartListAPI()
     cartList.value = res.data.result
  }

  // 添加购物车
  const addCart = async(goods) => {
    const {skuId,count} = goods
    if(isLogin.value) {
      await insertCartAPI({skuId,count})
      updateNewList()
    }else {
      const item = cartList.value.find(item => item.skuId === goods.skuId)
    if (item) {
      item.count += goods.count
    } else {
      cartList.value.push(goods)
    }
    }
    
  }
  // 删除购物车
  const delCart = async(skuId) => {
    if(isLogin.value) {
      await delCartAPI([skuId])
      updateNewList()
    }else{
      const index = cartList.value.findIndex(item => item.skuId === skuId)
    cartList.value.splice(index, 1)
    }
  }
  //清除购物车数据
  const clearCart = () => {
    cartList.value = []
  }

  // 计算总数量和总价格
  const totalCount = computed(() => cartList.value.reduce((total, item) => total + item.count, 0))
  const totalPrice = computed(() => cartList.value.reduce((total, item) => total + item.count * item.price, 0))
  //单选功能
  const singleCheck = (skuId,selected) => {
    const item = cartList.value.find(item => item.skuId === skuId)
    item.selected = selected
  }
  //全选功能
  const isAll = computed(()=> cartList.value.every(item => item.selected))
  const allCheck = (select) => {
    cartList.value.forEach(item=> item.selected = select)
  }
  //选中的数量和价格
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
    selectPrice,
    clearCart,
    updateNewList
  }
},{
  persist: true
})
