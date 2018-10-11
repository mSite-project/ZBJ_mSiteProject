import homeTpl from '../views/home.html';

const render = () => {
    $("#root").html(homeTpl);
    console.log(homeTpl)
}

export default {
    render
  }