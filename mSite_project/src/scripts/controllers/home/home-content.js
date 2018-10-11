import homeContentTpl from '../../views/home/home-index.html';

const render = () => {
    $('.content').html(homeContentTpl);
}

export default {
    render
  }