import { onBeforeRouteUpdate } from "vue-router";
import { getCategoryAPI } from "@/apis/category";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export function useCategory() {
  const route = useRoute()

  const getCategory = ref({})
  const getCategoryData = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    getCategory.value = res.data.result
  }

  onBeforeRouteUpdate((to) => {
    getCategoryData(to.params.id)
  })

  onMounted(() => {
    getCategoryData()
  })

  return{
    getCategory
  }

}