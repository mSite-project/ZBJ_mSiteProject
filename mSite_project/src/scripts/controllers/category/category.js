import categoryTpl from '../../views/category/category.html';
import categoryModel from '../../models/category/category.js';
import categoryLeftBarTpl from '../../views/category/category-leftBar.html';
import categoryRightContentTpl from '../../views/category/category-rightContent.html';

var datasource;
var data;
var moreDataSource;
var moreData;
var pageNo = 0;
const render = async () => {
    $('.content').html(categoryTpl);
    let list = datasource = datasource = (await categoryModel.cateList()).data.classifications;
    moreDataSource = moreData = (await categoryModel.cateProdList({
        guidIds: datasource[0].guidIds,
        pageNo: pageNo
    })).data;
    console.log(datasource)
    data = datasource[0];
    loadLeftList(list);
    showRightContent(data);
    scroll();
    clickEvent();
    showHotSearch();
}

const loadLeftList = (list) => {
    let template = Handlebars.compile(categoryLeftBarTpl);
    let html = template({
        list
    });
    $('.content-left ul').html(html);
    $('.content-left ul li').eq(0).addClass('active');
}
const clickEvent = () => {
    $('.content-left ul li').on("tap", async function () {
        $(this).addClass('active').siblings().removeClass('active');
        var key = $.trim($(this).text());
        data = datasource.find((value, index, arr) => {
            return value.name == key;
        });
        moreData = (await categoryModel.cateProdList({
            guidIds: data.guidIds,
            pageNo: pageNo
        })).data;
        showRightContent(data);
        scroll();
    });

    $('.cate-content-list-hot').children('li').on("tap", function () {
        console.log(location.href)
        var targetParam = $(this).attr('data-targetParam')
        location.hash = '#requirement';
        localStorage.setItem("targetParam", targetParam)
        localStorage.setItem("cateAddName", $(this).children('a').children('span').text())
        console.log($(this).attr('data-targetParam'))
    })
    console.log($('.cate-content-loadmore').children('ul').children('li'))
    $('.cate-content-loadmore').children('ul').children('li').on("tap", function () {
        console.log(1)
        location.href = 'http://localhost:8800/appCateDetails.html';
    })
}
const showRightContent = function (data) {
    let template = Handlebars.compile(categoryRightContentTpl);
    Handlebars.registerHelper("compare", function (v1, v2, options) {
        if (v1 == v2) {
            return options.fn(this); //满足条件执行，返回 this数据
        } else {
            return options.inverse(this); //不满足条件执行，不返回 this数据
        }
    })

    let html = template({
        moreDataSource: moreData == "" ? moreDataSource : moreData,
        data
    });
    $('.RightContent').html(html);

}
const showHotSearch = () => {
    $('.searchInput').on("tap", function () {
        location.href = "appHot.html";
    })
}
const scroll = () => {
    let cateScroll = new BScroll('.content-right');
    cateScroll.refresh();
    cateScroll.on('scrollEnd', async function () {
        this.refresh();
        let y = this.y,
            maxY = this.maxScrollY;
        if (maxY - y > -400 && maxY - y <= 0) {
            let result = (await categoryModel.cateProdList({
                guidIds: data.guidIds,
                pageNo: ++pageNo
            })).data;
            moreData = [
                ...moreData,
                ...result
            ]
            showRightContent(data);
            this.refresh();
            this.scrollTo(0, y);
        }

    })
}
export default {
    render
}