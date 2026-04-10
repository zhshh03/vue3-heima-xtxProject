import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from "@/apis/user";
import { useCartStore } from "./cartStore";
import { mergeCartAPI } from "@/apis/cart";

export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()
  const userInfo = ref({})
  //获取用户信息
  const getUserInfo = async ({account, password}) => {
    const res = await loginAPI({account, password});
    userInfo.value = res.data.result
    //合并购物车
    await mergeCartAPI(cartStore.cartList.map(item => {
      return {
        skuId:item.skuId,
        selected:item.selected,
        count:item.count
      } 
    }))
    cartStore.updateNewList()
  }
  //清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
    cartStore.clearCart()
  }
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
},
{
  persist:true
}
)