const homeTpl = require('../views/home.html');

const render = () => {
    $("#root").html(homeTpl);
    console.log(homeTpl)
}

module.exports = {
    render
}