import requirementTpl from '../../views/requirement/requirement.html';

const render = () => {
    $('.content').html(requirementTpl);
}

export default {
    render
  }