import profileTpl from '../../views/profile/profile.html';

const render = () => {
    $('.content').html(profileTpl);
}

export default {
    render
  }