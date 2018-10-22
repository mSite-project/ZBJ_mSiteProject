import homeContentTpl from '../../views/home/home-index.html';
import positionListTpl from '../../views/home/position-list.html';
import positionModel from "../../models/home/position.js"



var datasource = [];
const render = async () => {
  $('.dataList').html(positionListTpl);
  let list = datasource = (await positionModel.list()).data.list;
  await renderList(list)
  console.log(list)
}


const renderList = async (list) => {
  let template = Handlebars.compile(positionListTpl)
  let html = template({
    list
  })
  $('.dataList').html(html)
}

export default {
  render
}