

export default (file, url) => 
  fetch(url, {
    body: file,
    method: 'PUT',
    headers: {
      'Content-Type': file.type 
    }
  })
    .then(res => {
      console.log(res.data)
      return true
    })
    .catch(err => {
      console.log(err.message)
      return false
    })