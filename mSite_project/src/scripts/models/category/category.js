const cateList = () => {
    return $.ajax({
        url:'/search/getClassification',
        success: (result) => {
            return result
        }
    })
}
  
const cateProdList = (option) => {
    return $.ajax({
        type:'post',
        url:'/search/searchQueryServiceForClassification',
        contentType:"application/json",
        data:JSON.stringify({
            guidIds: option.guidIds,
            page: option.pageNo,
            serviceIds: "",
            size: 10
        }),
        success: (result) => {
            return result
        }
    })
}
export default {
    cateList,
    cateProdList
}