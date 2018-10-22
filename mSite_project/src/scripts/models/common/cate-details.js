const prodPic = () => {
    return $.ajax({
        url: '/shop/getServiceSlideInfo?serviceId=1376566',
        success: (result) => {
            return result
        }
    })
}

export default {
    prodPic
}