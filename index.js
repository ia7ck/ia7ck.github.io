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
const csa_endpoint = `https://csacademy.com/user/${username}`

const dummy = 'https://script.google.com/macros/s/AKfycbzSFMM_St_VhociIILfWgjYE4Yv7ZBsx2jFQdkwYXweza0X6Uk/exec'
const dummy2 = "https://script.google.com/macros/s/AKfycbx3rXTgOUj6clqPXrc6egT1aIeY4qhVus2Qsa3164mG__Evoa0/exec"

fetch(dummy + "?url=" + cf_endpoint)
  .then((response) => {
    return response.json()
  })
  .then((result) => {
    if (result.status === 'OK') {
      const data = result.result[0]
      const current_rating = data.rating
      const max_rating = data.maxRating
      const current_color = get_color('codeforces', current_rating)
      const max_color = get_color('codeforces', max_rating)
      const current_rank = data.rank
      const max_rank = data.maxRank

      const cfRatingElement = document.querySelector('.codeforces.current')
      cfRatingElement.innerHTML = `${current_rating} (${current_rank})`
      cfRatingElement.style.color = current_color
      const cfMaxRatingElement = document.querySelector('.codeforces.max')
      cfMaxRatingElement.innerHTML = `${max_rating} (${max_rank})`
      cfMaxRatingElement.style.color = max_color
    }
  })

fetch(dummy + "?url=" + ac_endpoint)
  .then((response) => {
    return response.json()
  })
  .then((result) => {
    if (result.length > 0) {
      const current_rating = result[result.length - 1].NewRating;
      const max_rating = result.reduce((ret, elem) => {
        return Math.max(ret, elem.NewRating)
      }, 0)
      const current_color = get_color('atcoder', current_rating)
      const max_color = get_color('atcoder', max_rating)

      const acRatingElement = document.querySelector('.atcoder.current')
      acRatingElement.innerHTML = current_rating
      acRatingElement.style.color = current_color
      const acMaxRatingElement = document.querySelector('.atcoder.max')
      acMaxRatingElement.innerHTML = max_rating
      acMaxRatingElement.style.color = max_color
    }
  })

fetch(dummy2 + "?url=" + csa_endpoint)
  .then((response) => {
    return response.json()
  })
  .then((result) => {
    const history = result.state.publicuser[0].contestHistory
    const current_rating = Math.floor(history[0].rating)
    const max_rating = history.reduce((ret, elem) => {
      return Math.max(ret, Math.floor(elem.rating))
    }, 0)
    const csaRatingElement = document.querySelector('.csacademy.current')
    csaRatingElement.innerHTML = current_rating
    const csaMaxRatingElement = document.querySelector('.csacademy.max')
    csaMaxRatingElement.innerHTML = max_rating
  })