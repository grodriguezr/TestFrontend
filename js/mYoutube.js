
// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}
// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyCluphbelCHQtd2mzFp73KQf4LvSJ4hIX8');
}
 
// Called when the search button is clicked in the html code
function search() {
    var query = document.getElementById('query').value;
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q:query,
        type: 'video',
        maxResults: 20
    });
    // Send the request to the API server, call the onSearchResponse function when the data is returned
    request.execute(onSearchResponse);
}

//Called when a videa is clicked and saves the videoId in SessionStorage
function videoClick(clickedVideo){
    console.log('video es'+clickedVideo);
    sessionStorage.setItem('videoid', clickedVideo);
}

//Converts json text to html
function onSearchResponse(response) {
    //var item contains the json object "items"
    var itm = response.items, vlist="";
    $.each(itm, function(index, e){
  
         vlist = vlist +  '<li class="video-list"><a href="watchVideo.html/?v='+e.id.videoId+
         '" onclick=videoClick("'+e.id.videoId+'")><div class="video-wrapper"><div class="content-wrapper"><div class="title">'+
         e.snippet.title+'</div><div class="channel-name">'+
         e.snippet.channelTitle+'</div><div class="description">'+e.snippet.description+
         '</div></div><div class="thumbnail-wrapper"><img src="'+
         e.snippet.thumbnails.medium.url+'" width="260" height="120"></div></a></li>';
    });
    //adds the new html elements
    $('#search-results').html(vlist);

};