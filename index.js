const colors = {
  'atcoder': [
    { 'color': '#808080', 'lb': 0, 'ub': 399 },
    { 'color': '#804000', 'lb': 400, 'ub': 799 },
    { 'color': '#008000', 'lb': 800, 'ub': 1199 },
    { 'color': '#00C0C0', 'lb': 1200, 'ub': 1599 },
    { 'color': '#0000FF', 'lb': 1600, 'ub': 1999 },
    { 'color': '#C0C000', 'lb': 2000, 'ub': 2399 },
    { 'color': '#FF8000', 'lb': 2400, 'ub': 2799 },
    { 'color': '#FF0000', 'lb': 2800, 'ub': 9999 }
  ],
  'codeforces': [
    { 'color': '#808080', 'lb': 0, 'ub': 1199 },
    { 'color': '#008000', 'lb': 1200, 'ub': 1399 },
    { 'color': '#03A89E', 'lb': 1400, 'ub': 1599 },
    { 'color': '#0000FF', 'lb': 1600, 'ub': 1899 },
    { 'color': '#AA00AA', 'lb': 1900, 'ub': 2199 },
    { 'color': '#FF8C00', 'lb': 2200, 'ub': 2399 },
    { 'color': '#FF0000', 'lb': 2400, 'ub': 9999 }
  ]
}

function get_color(oj, rating) {
  const ret = colors[oj].find((elem) => {
    return elem.lb <= rating && rating <= elem.ub
  }).color
  return ret
}

const username = 'ikd'
const cf_endpoint = `http://codeforces.com/api/user.info?handles=${username}`
const ac_endpoint = `https://beta.atcoder.jp/users/${username}/history/json`

const dummy = 'https://script.google.com/macros/s/AKfycbzSFMM_St_VhociIILfWgjYE4Yv7ZBsx2jFQdkwYXweza0X6Uk/exec'

axios.get(dummy, { params: { url: cf_endpoint } })
  .then((result) => {
    if (result.data.status === 'OK') {
      const data = result.data.result[0]
      const current_rating = data.rating
      const max_rating = data.maxRating
      const current_color = get_color('codeforces', current_rating)
      const max_color = get_color('codeforces', max_rating)
      const current_rank = data.rank
      const max_rank = data.maxRank

      const elems = document.getElementsByClassName('codeforces')
      for (let i = 0; i < elems.length; i += 1) {
        const list = elems[i].classList
        if (list.contains('current')) {
          elems[i].innerHTML = `${current_rating} (${current_rank})`
          elems[i].style.color = current_color
        } else if (list.contains('max')) {
          elems[i].innerHTML = `${max_rating} (${max_rank})`
          elems[i].style.color = max_color
        }
      }
    } else {
      console.error('error')
    }
  })
  .catch((err) => {
    console.error(err)
  })

axios.get(dummy, { params: { url: ac_endpoint } })
  .then((result) => {
    if (result.status === 200 && result.data.length > 0) {
      const history = result.data
      const current_rating = history[history.length - 1].NewRating;
      const max_rating = history.reduce((ret, elem) => {
        return Math.max(ret, elem.NewRating)
      }, 0)
      const current_color = get_color('atcoder', current_rating)
      const max_color = get_color('atcoder', max_rating)

      const elems = document.getElementsByClassName('atcoder')
      for (let i = 0; i < elems.length; i += 1) {
        const list = elems[i].classList
        if (list.contains('current')) {
          elems[i].innerHTML = `${current_rating}`
          elems[i].style.color = current_color
        } else if (list.contains('max')) {
          elems[i].innerHTML = `${max_rating}`
          elems[i].style.color = max_color
        }
      }
    } else {
      console.error('error')
    }
  })
  .catch((err) => {
    console.error(err)
  })
