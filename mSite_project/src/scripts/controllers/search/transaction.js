import transactionTpl from './../../views/search/transaction.html'
import tranModule from './../../models/search/transaction'
import transactionlistTpl from './../../views/search/transactionlist.html'
var pageNum = 1;
var datasource =[];
const render = async()=>{
    
    $("#root").html(transactionTpl)
    click();
    let list = datasource = (await tranModule.tranlist({pageNum:pageNum})).data.regionList.list;
    await renderList(list);
    scroll();  
}
const scroll = ()=>{
    $("#root").scroll( async function(){
        let top = $(this).scrollTop();
        let li = $(".transaction-main>ul>li");
        let iH = (li.eq(0).height()-(parseInt(li.eq(0).css("padding-top"))))*datasource.length;
        await data(top,iH)
    })
}
const data = async(top,iH)=>{
    if(top>=iH){
        let result =  (await tranModule.tranlist({pageNum:++pageNum})).data.regionList.list;
        let newlist = datasource = [
            ...datasource,
            ...result
        ]     
        await renderList(newlist);
    }
}
const click = ()=>{
    $(".return").on("tap",function(){
        location.href = '/#search';
    })
}
const renderList = (list)=>{
    let template = Handlebars.compile(transactionlistTpl);
    let html = template({ list })
    $(".transaction-main ul").html(html);
}
export default {
    render
}