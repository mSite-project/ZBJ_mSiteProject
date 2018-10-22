import cateDetailsTpl from '../../views/common/cateDetails.html';
import cateProdPicTpl from '../../views/common/cate-bannerSwiper.html';
import cateProModels from '../../models/common/cate-details';

const render = async () => {
    $("#root").html(cateDetailsTpl);
    await showPic();
    swiperBanner();
    goBack();
}
const swiperBanner = () => {

    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    })
}

const showPic = async () => {
    let prodPic = (await cateProModels.prodPic()).data;
    let prodPicTemplate = Handlebars.compile(cateProdPicTpl);
    let html = prodPicTemplate({
        prodPic
    });
    $('.banner .swiper-container .swiper-wrapper').html(html);

}

const goBack = () => {
    $('.goBack').on("tap", function () {
        window.history.back(-1);
    })
}
export default {
    render
}