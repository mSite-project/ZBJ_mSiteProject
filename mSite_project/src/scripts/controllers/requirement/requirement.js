import requirementTpl from '../../views/requirement/requirement.html';
import requirementProdListTpl from '../../views/requirement/requirement-prodList.html';
import requirementModel from '../../models/requirement/requirement';
import requirementFilterCityTpl from '../../views/requirement/requirement-cityFilter.html';
import requirementCitiesTpl from '../../views/requirement/requirement-cities.html';
import requirementFiltersTpl from '../../views/requirement/requirement-filter.html';

var data;
var datasource;
var citysource;
var cityList;
var searchFilter;
var pageNo = 0;
var targetParam = localStorage.getItem("targetParam");
var cateAddName = localStorage.getItem("cateAddName");
var keyword = localStorage.getItem("keyword");

const render = async () => {
    $('.content').html(requirementTpl);
    searchFilter = {
        searchType: "SHOP",
        cateAddName: cateAddName,
        page: pageNo,
        pagesize: 10,
        sort: 1,
        minOpenShopDays: 0,
        userType: 0,
        platform: 0,
        newest: false,
        tabShow: false,
        guidCategoryIds: targetParam
    }
    console.log(keyword)
    if (keyword != null) {
        searchFilter.keyword = keyword;
    }
    data = (await requirementModel.prodList(searchFilter)).data;
    let list = datasource = data.list;
    showProdList(list);
    scroll();
    await loadCity();
    chooseCity();
    loadFilter();
    showFilter();
    showHotSearch();
}
const scroll = () => {
    let listScroll = new BScroll('.load-more');
    listScroll.on("scrollEnd", async function () {
        let y = this.y,
            maxY = this.maxScrollY;
        if (maxY >= y) {
            searchFilter.pageNo = ++pageNo;
            var moreData = (await requirementModel.prodList(moreData)).data.list;
            datasource = [
                ...datasource,
                ...moreData
            ];
            showProdList(datasource);
        }
    })
}

const showProdList = (list) => {
    let prodTemplate = Handlebars.compile(requirementProdListTpl);
    console.log(list)
    Handlebars.registerHelper("compare", function (v1, v2, options) {
        if (v1 == v2) {
            return options.fn(this); //满足条件执行，返回 this数据
        } else {
            return options.inverse(this); //不满足条件执行，不返回 this数据
        }
    })
    Handlebars.registerHelper("formatPercent", function (v1, v2, options) {
        if (v2 == 1) {
            return options.fn(Math.ceil(Number(v1) * 100));
        } else if (v2 == 2) {
            return options.fn(Math.floor(Number(v1) / 100) / 100);
        }
    })
    let html = prodTemplate({
        list
    });
    $('.load-more-body').html(html);
}
const loadCity = async () => {
    let cityList = citysource = (await requirementModel.cityList()).data;
    let proviceList = [];
    for (var i = 0; i < cityList.length; i++) {
        if (proviceList.indexOf(cityList[i].provinceName) == -1) {
            proviceList.push(cityList[i].provinceName)
        }
    }
    let proviceTemplate = Handlebars.compile(requirementFilterCityTpl);
    let html = proviceTemplate({
        proviceList
    });
    $('.filter-city-shadow').html(html);
}

const chooseCity = () => {
    console.log($('.sticky-ul').children('li').eq(0).children().eq(0).children('a'))
    $('.sticky-ul').children('li').eq(0).children().eq(0).children('a').on("tap", function () {
        console.log($(this))
        $(this).siblings('.filter-city-shadow').css('display', 'block').siblings('a').children().addClass('active')
    })
    $('.city-ul').children('li').on("tap", function () {
        var cities = [];
        var flag = false;
        $(this).addClass('active').siblings().removeClass('active');
        for (var i = 0; i < citysource.length; i++) {
            if ($.trim($(this).text()) == citysource[i].provinceName) {
                cities.push(citysource[i]);
                flag = true;
            }
        }
        cityList = cities;
        let citiesTemplate = Handlebars.compile(requirementCitiesTpl);
        let html = flag ? citiesTemplate({
            cityList
        }) : citiesTemplate({
            local: '本地优先'
        });
        $('.city-right').html(html);
        filterByCity();
    })
    $('.mask').on("tap", function () {
        $(this).parent().css('display', 'none').children('.filter-city-content').children('.city-left').children('.city-ul').children().removeClass('active');
        $('.sticky-ul').children('li').eq(0).children('div').children('a').children().removeClass('active');
    })
}

const filterByCity = () => {
    $('.city').children('li').on("tap", async function () {
        $(this).addClass('active').siblings().removeClass('active').parent().parent().parent().parent().css('display', 'none');
        $('.choose-city').text($(this).text());
        var cityId = $(this).attr('data-cityid');
        pageNo = 0;
        var proviceId = $(this).attr('data-provinceid');
        searchFilter.cityidfilter = cityId;
        searchFilter.provinceidfilter = proviceId;
        let list = datasource = (await requirementModel.prodList(searchFilter)).data.list;
        showProdList(list);
    })

}
const showFilter = () => {
    $('.filter-extend').children('a').on("tap", function () {
        $(this).siblings().css("display", "block")
    })
    $('.extend-item').on("tap", function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
    $('.extend-reset-btn').on("tap", async function () {
        $(this).parent().siblings().children(".extend-item-content").children(".extend-content").children('.extend-list').children('.extend-item').removeClass('active');
        $('.filter-extend').children('a').removeClass('active');
        $(this).parent().parent().parent().parent().css('display', 'none');
        delete searchFilter.navigationIds;
        delete searchFilter.navigationValueIds;
        let list = datasource = (await requirementModel.prodList(searchFilter)).data.list;
        showProdList(list);
    })
    $('.extend-title').on("tap", function () {
        console.log($(this).parent().hasClass('active'))
        if ($(this).parent().hasClass('active')) {
            $(this).parent().removeClass('active').children('.extend-content').css('display', 'none')
        } else {
            $(this).parent().addClass('active').children('.extend-content').css('display', 'block')
        }

    })
    $('.extend-sure-btn').on("tap", async function () {
        var navigationIds = [];
        var navigationValueIds = [];
        if ($(this).parent().siblings().children(".extend-item-content").children(".extend-content").children('.extend-list').children('.extend-item').hasClass('active')) {
            let div = $(this).parent().siblings().children(".extend-item-content").children(".extend-content").children('.extend-list').find('.active')
            for (var i = 0; i < div.length; i++) {
                navigationValueIds.push($(div[i]).attr('data-navigationValueId'));
                navigationIds.push($(div[i]).parent().parent().siblings('.extend-title').attr('data-navigationValueId'))
            }
            console.log(Array.of(navigationIds), Array.from(navigationIds))
            $(this).parent().parent().parent().parent().css('display', 'none');
            $('.filter-extend').children('a').addClass('active');
            pageNo = 0;
            searchFilter.navigationIds = navigationIds.join(",");
            searchFilter.navigationValueIds = navigationValueIds.join(",");
            console.log(searchFilter)
            let list = datasource = (await requirementModel.prodList(searchFilter)).data.list;
            showProdList(list);

        } else {
            alert("请选择筛选类型")
        }
    })
    console.log($('.leftButtom'))
    $('.leftButtom').on("tap", function () {
        console.log('1')
        window.history.back(-1);
    })
}
const showHotSearch = () => {
    $('.searchInput').on("tap", function () {
        location.href = "appHot.html";
    })
}
const loadFilter = () => {
    var list = data.facets;
    let filterTemplate = Handlebars.compile(requirementFiltersTpl);
    let html = filterTemplate({
        list
    });
    $('.filter-extend-content').html(html);
}
export default {
    render
}