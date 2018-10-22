import searchTpl from '../../views/search/search.html';
import searchModule from '../../models/search/search';
import searchlistTpl from '../../views/search/searchlist.html';

var datasource = []
var pageNo = 0;
var msg_list_loading = false;
var id = [2000001, 2000022, 2000031, 2000004, 2000024, 2006112, 2002927, 2000007, 2000005, 2000003, 2004068, 2000017, 2000015, 2001144, 2000021, 2000006, 2006065, 2003501, 2000023, 2006113, 2006061, 2002575, 2002124]

const render = async () => {
    $('.content').html(searchTpl);
    fen_scroll();
    toggle();
    swiper();
    changeTab();
    click();
    let list = datasource = (await searchModule.sealist({ id: 2000001, page: pageNo })).data.list;
    await renderList(list);
    priceTap();
    tap();
    
    scroll();
}
//---------------页面跳转----------------------
const toggle = () => {
    let pages = ['/#search', '/transaction.html', '/industry.html', '/service.html']
    let index = pages.indexOf(location.pathname === '/' ? '/#search' : location.pathname)
    $('.sear-header ul li').eq(index).addClass('active').siblings().removeClass('active')
    $('.sear-header ul li').on('tap', function () {
        location.href = pages[$(this).index()]
    })
}
//------------------点击事件--------------------
const click = () => {

    $(".swiper-btn").on("tap",block.bind(this))
    $(".f-close").on("tap", none.bind(this))
}

const tap = () =>{
    $(".addr a").on("tap", function () {
        $(this).css({ "color": "#ff6900" })
        $(this).children("span").removeClass($(this).children("span").attr("class")).addClass("search_addr_ff")
    })
    $(".price a").on("tap", function () {
        $(this).css({ "color": "#ff6900" })
        let num = $(this).attr("data-class");
        if (num === "0" || num === "2") {
            $(this).attr("data-class", "1");
            $(this).children("span").removeClass($(this).children("span").attr("class")).addClass("search_bottom")
            
        }
        if (num === "1") {
            $(this).attr("data-class", "2");
            $(this).children("span").removeClass($(this).children("span").attr("class")).addClass("search_top")
        }

    })
}

function quchong(arr) {
    let obj = {};
    arr = arr.reduce((cur, next) => {
        obj[next.caseId] ? "" : obj[next.caseId] = true && cur.push(next);
        return cur;
    }, [])
    return arr
}

const scroll = () => {
    var numIndex = 0;
    $(".box").scroll(async function () {
        $(".wrap2 div").each(function () {
            if ($(this).hasClass("active")) {
                numIndex = $(this).attr("index");
            }
        })
        let top = $(this).scrollTop();
        top >= 100 ? $(".search-top").addClass("show") : $(".search-top").removeClass("show");
        let li = $(".scon-list>li");
        let iH = (li.eq(0).height() - (parseInt(li.eq(0).css("padding-top")) + parseInt(li.eq(0).css("padding-bottom")))) * datasource.length - 150;
        if (!msg_list_loading) {
            await data(top, iH, numIndex);
        }

    })
}
const data = async (top, iH, numIndex) => {
    if (top >= iH) {
        msg_list_loading = true;
        let result = (await searchModule.sealist({ id: id[numIndex], page: ++pageNo })).data.list;
        let newlist = [
            ...datasource,
            ...result
        ]
        datasource = newlist;
        await renderList(newlist);
        msg_list_loading = false;
    }
}
const changeTab = () => {
    $('.wrap2 div').on("tap", async function () {
        var index = $(this).index();
        var priceA = $(".price a");
        $(this).attr("index", index);
        $(this).addClass("active").siblings().removeClass("active");
        $(".box").scrollTop(0);
        priceA.attr("data-class", "0");
        priceA.css("color","#666");
        priceA.children("span").removeClass($(".price a").children("span").attr("class")).addClass("span")
        datasource = [];
        let list = datasource = (await searchModule.sealist({ id: id[index], page: ++pageNo })).data.list;
        await renderList(list);
        index = $(this).index();
    })
}
const renderList = (list) => {
    let template = Handlebars.compile(searchlistTpl)
    let html = template({ list })
    $(".scon-list").html(html)
}

//----------swiper----------------
const swiper = () => {
    var swip = new Swiper('.container1', {
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    });
    var swi = new Swiper('.container2', {
        slidesPerView: 5,
        spaceBetween: 20,
    });
}

// --------------排序---------------
function sortNum(attr, rev) {
    //true 升序  search_bottom a 1
    // false 降序 search_top a 2
    if (rev == undefined) {
        rev = 1;
    } else {
        rev = (rev) ? 1 : -1;
    }

    return function (a, b) {
        a = Number(a[attr]);
        b = Number(b[attr]);
        if (a < b) {
            return rev * -1;
        }
        if (a > b) {
            return rev * 1;
        }
        return 0;
    }
}
// -----------价格------------------
const priceTap = () => {
    $(".price a").on("tap", async function () {
        datasource = quchong(datasource)
        $(".box").scrollTop(0);
        var flag = true;
        var data_id = $(this).attr("data-class");
        if(data_id==1){
            flag = true;
        }else if(data_id == 2){
            flag = false;
        }
        var newarr=datasource.sort(sortNum('amount', flag));
        await renderList(newarr);
    })
}

//--------------分类显示------------------
const block = ()=>{
    var timer = null;
    let speed = 80;
        clearInterval(timer)
        timer = setInterval(function () {
            speed -= 10;
            if (speed >= 0) {
                $(".fenlei").css("transform", "translateY(" + speed + "%)");
            } else {
                clearInterval(timer)
            }
        }, 30)
        $(".moban").css("display", "block")
}
//--------------分类隐藏----------------------
const none = () =>{
    var timer = null;
    let speed = 0;
        clearInterval(timer)
        timer = setInterval(function () {
            speed += 10;
            if (speed <= 100) {
                $(".fenlei").css("transform", "translateY(" + speed + "%)");
            } else {
                clearInterval(timer)
            }
        }, 30)
        $(".moban").css("display", "none")
}
//--------------分类滚动-------------------
const fen_scroll =()=>{
   new BScroll('.fen-box');
   $(".fen-list li").on("tap",async function(){
        none();
        $('.wrap2 div').eq($(this).index()).addClass("active").siblings().removeClass("active");
        
        $('.wrap2').css("transform","translate3d("+$(this).index()*-73+"px, 0px, 0px")
        datasource = [];
        let list = datasource = (await searchModule.sealist({ id:id[$(this).index()], page: pageNo })).data.list;
        await renderList(list);
    })
}



export default {
    render
}