
//https://task.zbj.com/hallapi/v/index/list?cndr=&pageNum=2&pageSize=15
//https://task.zbj.com/hallapi/v/index/list?cndr=&pageNum=2&pageSize=15
const tranlist =(option)=>{
    return $.ajax({
        url:"/hallapi/v/index/list",
        'Content-Type':"application/json",
        data:{
            pageNum:option.pageNum,
            pageSize:15
        },
        beforeSend : function(){     
            $('.tranc-loading').show();
        },
        success:(result)=>{
            $('.tranc-loading').hide();
            return result
        }
    })
}
export default {
    tranlist
}