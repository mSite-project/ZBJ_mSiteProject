import homeContentTpl from '../../views/home/home-index.html';
import listTpl from '../../views/home/home-list.html';
import dataList from "../../models/dataList"

const render = async () => {
    $('.content').html(listTpl)
    let list = datasource = (await dataList.list()).content.data.page.result
    await renderList(list)
}

const renderList = async (list) => {
  let template = Handlebars.compile(listTpl)
  let html = template({ list })
  $('.dataList').html(html)
}

export default {
  render
}


