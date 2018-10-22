const list = () => {
  return $.ajax({
    url: '/shunt/favorite/',
    success: (result) => {
      return result
    }
  })
}

export default {
  list
}