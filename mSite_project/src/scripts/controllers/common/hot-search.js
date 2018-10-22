import hotSearchModel from '../../models/common/hot-search';
import hotWordTpl from '../../views/common/hotWord.html';
import searchListTpl from '../../views/common/searchList.html';

var cateName = localStorage.getItem("cateAddName");
var inpValue;
const render = async () => {
    console.log(cateName)
    if (cateName != null) {
        $('.searchInput').val(cateName);
    }
    let hotData = (await hotSearchModel.hotWord()).data;
    showHotData(hotData);
    clickSearch();
}

const clickSearch = () => {
    $('.searchInput').on("tap", function () {
        inpValue = $(this).val()
        $(this).val("");
        $('.search-relation').css('display', "block").siblings().css("display", "none");
    })
    $('.searchInput').on("keydown", async function () {
        if ($(this).val() != "") {

            let searchResult = (await hotSearchModel.searchResult($(this).val())).data;
            console.log($('.Italic'))

            let searchTemplate = Handlebars.compile(searchListTpl);
            let html = searchTemplate({
                searchResult
            });
            $('.search-relation').html(html);
            $('.Italic').text('"' + $(this).val() + '"');
        }
    })
    $(".cancelSearch").on("tap", function () {
        $('.search-relation').css('display', "none").siblings().css("display", "block");
        $('.searchInput').val(cateName);
        window.history.back(-1);
    })
    $(".search").on("tap", function () {
        console.log($(this).text());
        localStorage.setItem("keyword", $(this).text());
        location.href = "http://localhost:8800/#requirement";
        location.hash = "#requirement";
    })
}

const showHotData = (hotData) => {
    let listTemplate = Handlebars.compile(hotWordTpl);
    let html = listTemplate({
        hotData
    });
    $('.words-list').html(html);
}
export default {
    render
}