import profileTpl from '../../views/profile/profile.html';

const render = () => {
    $('.content').html(profileTpl);
    // $('#root').html(profileTpl)
}

export default {
    render
}