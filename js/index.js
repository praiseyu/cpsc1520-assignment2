/* 
<tr>
  <td>ALBUM NAME HERE</td>
  <td>RELEASE DATE HERE</td>
  <td>ARTIST NAME HERE</td>
  <td>GENRE HERE</td>
  <td>AVERAGE RATING HERE</td>
  <td>NUMBER OF RATINGS HERE</td>
</tr> 
*/

let albumStore;
const albumForm = document.getElementById('album-search-form');
const albumRows = document.getElementById('album-rows');
// const albumHeaders = document.getElementsByTagName('th');
const avgRatingHeading = document.getElementsByTagName('th')[4];
const numReviewsHeading = document.getElementsByTagName('th')[5];
albumForm.addEventListener('submit', onSubmitSearch);
avgRatingHeading.addEventListener('click', sortHighToLowRating);
numReviewsHeading.addEventListener('click', sortHighToLowReviews);


//fetch album data
async function appInit() {
  const response = await fetch('public/data/albums.json')
  const data = await response.json()
  albumStore = [...data]
  render(data, albumRows);

}

appInit();

function render(data, container) {
  data.forEach((item) => {
    const template = `<tr>
    <td>${item.album}</td>
    <td>${item.releaseDate}</td>
    <td>${item.artistName}</td>
    <td>${item.genres}</td>
    <td>${item.averageRating}</td>
    <td>${item.numberRatings}</td>
  </tr>`
    container.insertAdjacentHTML('afterbegin', template);
  })
}

function onSubmitSearch(e) {
  e.preventDefault();
  // get values from input fields
  const textInput = e.currentTarget[0].value.trim().toLowerCase();
  const numberInput = e.currentTarget[1].value.trim();
  console.log(textInput);
  console.log(numberInput);
  if (!textInput) {
    document.getElementById('search-input').classList.add("is-invalid");
  }
  if (numberInput > 5 || numberInput < 0) {
    document.getElementById('min-album-rating-input').classList.add("is-invalid");
  }

  if (textInput && numberInput) {
    getAlbumByRatingandName(albumStore, textInput, numberInput);
  }
  else if (textInput) {
    getAlbumByNameOrArtist(albumStore, textInput)
  }
  else if (numberInput) {
    getAlbumByRating(albumStore, numberInput);
  }
}

function getAlbumByNameOrArtist(data, textInputValue) {
  const albums = data;

  const results = albums.filter((album) => {
    const albumName = album.album.trim().toLowerCase();
    const artistName = album.artistName.trim().toLowerCase();
    return albumName.includes(textInputValue) || artistName.includes(textInputValue);
  })
  clearData();

  if (results.length == 0) {
    resultNotFoundMessage();
  }
  render(results, albumRows);
}

function getAlbumByRating(data, minimumValue) {
  const albums = data;
  const results = albums.filter((album) => {
    return album.averageRating >= minimumValue
  });
  clearData();
  render(results, albumRows);
}

function getAlbumByRatingandName(data, textInputValue, minimumValue) {
  const albums = data;

  const results = albums.filter((album) => {
    const albumName = album.album.trim().toLowerCase();
    const artistName = album.artistName.trim().toLowerCase();
    if (albumName.includes(textInputValue) || artistName.includes(textInputValue)) {
      return album;
    }
  }).filter((album) => {
    if (album.averageRating >= minimumValue) {
      return album
    }
  })
  console.log(results);
  clearData();

  render(results, albumRows);
};


function clearData() {
  while (albumRows.hasChildNodes()) {
    albumRows.removeChild(albumRows.firstChild);
  }
}

function resultNotFoundMessage() {

  const template = `<div class="p-3 bg-warning text-dark"><p>There were no records found.</p></div>`
  albumForm.insertAdjacentHTML('afterend', template);

}


function sortHighToLowRating() {
  const data = albumStore;
  const highToLow = data.sort((a, b) => {
    if (b.averageRating > a.averageRating) {
      return -1
    }
    return 0
  })
  console.log(highToLow);
  clearData();
  render(highToLow, albumRows);
}

function sortHighToLowReviews() {
  const data = albumStore;
  const highToLow = data.sort((a, b) => {
    if (b.numberRatings > a.numberRatings) {
      return -1
    }
    return 0
  })

  console.log(highToLow);
  clearData();
  render(highToLow, albumRows);
}