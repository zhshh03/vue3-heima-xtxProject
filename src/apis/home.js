import httpInstance from "@/utils/http";

export const getBannerAPI = () => {
  return httpInstance({
    url:'/home/banner'
  })
}

export const getNewAPI = () => {
  return httpInstance({
    url: '/home/new'
  })
}

export const getHotAPI = () => {
  return httpInstance({
    url: '/home/hot'
  })
}