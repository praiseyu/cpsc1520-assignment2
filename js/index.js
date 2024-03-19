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

//fetch album data
async function appInit() {
  const response = await fetch('public/data/albums.json')
  const data = await response.json()
  albumStore = [...data]
  render(data, document.getElementById('album-rows'));



}

function render(data, container) {
  console.log(data)
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


appInit();

albumForm.addEventListener('submit', function onSubmitSearch(e) {
  e.preventDefault();
  // get values from input fields
  const textInput = e.currentTarget[0].value;
  const numberInput = e.currentTarget[1].value;
  if (textInput != null) {
    getAlbumByNameOrArtist(data, textInput);
  }
});

function getAlbumByNameOrArtist(data, textInputValue) {
  const albums = data;
  const query = textInputValue;

  const results = albums.filter((album) => {
    if (albums.album === query || albums.artistName === query) {
      return album;
    }
  })

};