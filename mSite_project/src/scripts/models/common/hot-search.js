const hotWord = () => {
    return $.ajax({
        url:'/getHotWord',
        success: (result) => {
            return result
        }
    })
}
  
const searchResult = (key) => {
    return $.ajax({
        type:'post',
        url:'/search/prompt/intelligent',
        data:{
            keyword:key
        },
        success: (result) => {
            return result;
        }
    })
}

export default {
    hotWord,
    searchResult
}