const prodList = (data) => {
    return $.ajax({
        type:'post',
        url:'/shop/search/v2',
        data:data,
        success:(result) => {
            return result;
        }
    })
}

const cityList = () =>  {
    return $.ajax({
        type:'post',
        url:'/city/getCityList',
        success: (result) => {
            return  result;
        }
    })
}
export default {
    prodList,
    cityList
}