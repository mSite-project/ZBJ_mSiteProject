
const sealist = (option)=>{
    return $.ajax({
        url:'/case/search/v2/',
        //https://m.zbj.com/case/search/v2/
        type:'post',
        'Content-Type':"application/json",
        data:JSON.stringify({
            guidCategoryIds: option.id,
            page: option.page,
            pagesize: 10
        }),
        beforeSend : function(){     
            $('.sear-loading').show();
        },
        success:(result)=>{
            $(".sear-loading").hide();
            return result
        }
    })
}
export default {
    sealist
} 