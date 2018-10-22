import homeContentTpl from '../../views/home/home-index.html';
import positionController from "./position.js";



const render = () => {
    $('.content').html(homeContentTpl);
    // imgChange();
    nav();
    scroll();
    banner1();
    banner2();
    news();
    positionController.render();
}


//轮播图1
const banner1 = () => {
    var swiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    var swiper1 = new Swiper('.swiper-container', {
        slidesPerView: 3,
        breakpoints: {
            1024: {
                slidesPerView: 4,
                spaceBetween: 40,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            }
        }
    });
}


//吸顶导航效果
const nav = () => {
    var h = $('.banner .h');
    $('.homeContent').scroll(function () {
        var t = $('.homeContent').scrollTop();
        if (t >= 200) {
            h.css('background', '#FF6800');
        } else {
            h.css('background', 'none');
        }
    })
}


//图片区域切换特效
const imgChange = () => {
    $('.imgs .btn i').click(function () {
        $(this).css('background', '#666').siblings().css('background', '#ccc');
    })
    // var swiper2 = new Swiper('.imgs',{
    //     autoplay:5000,
    //     loop:true,
    //     // visibilityFullFit: true,
    //     // pagination:'.pagination'
    // })
}


//文字滚动特效
const scroll = () => {
    var myScroll = new Scroll();
    myScroll.upScroll("scroll", "-.28rem", 5000);
}


//轮播图2
const banner2 = () => {
    var swiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    var swiper1 = new Swiper('.swiper-container', {
        slidesPerView: 3,
        breakpoints: {
            1024: {
                slidesPerView: 4,
                spaceBetween: 40,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            }
        }
    });
}


//新闻列表区域
const news = () => {
    var mySwiper = new Swiper('#newsList', {
        freeMode: true,
        slidesPerView: 'auto',
        freeModeSticky: true
    })
    //点击切换颜色
    var ele = $('#newsList .swiper-wrapper .swiper-slide');
    ele.click(function () {
        $(this).addClass('color').siblings().removeClass('color');
    })
}


export default {
    render
}