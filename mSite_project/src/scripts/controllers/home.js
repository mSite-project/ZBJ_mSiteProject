import homeTpl from '../views/home.html';

const render = () => {
    $("#root").html(homeTpl);
    changeTab();
}

const changeTab = () => {
    $('nav li').on('tap', function () {
      let hashs = ['#home','#category','#requirement', '#search', '#profile']
      location.hash = hashs[$(this).index()]
      $(this).addClass('active').siblings().removeClass('active')
    })
  }

export default {
    render
  }