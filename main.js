const youtubeSearch = 'https://www.googleapis.com/youtube/v3/search';
let npt;
let ppt;
let value;
let related;



function getDataFromApi(searchterm, pageToken, relatedToVideoId) {
    event.preventDefault();
    clearResults();
    let settings = {
        url: youtubeSearch,
        data: {
            key: 'AIzaSyDxOLzBHrqafB6BfzkLuB9Zn_IfZVHyQ6k',
            q: searchterm,
            part: 'snippet',

        },
        dataType: 'json',
        type: 'GET',
        success: displayResults
    }
    if (pageToken) {
        settings.data.pageToken = pageToken
    }
    if (relatedToVideoId) {
        settings.data.type = 'video'
        settings.data.relatedToVideoId = relatedToVideoId
    }



    $.ajax(settings)

}





function submitSearch() {
    $('.button').click(function(event) {
        value = $('.search').val()
        getDataFromApi(value);
    })
}

function displayResults(callback) {

    for (let i = 0; i < callback.items.length; i++) {
        $('.js-search-results').append(`<div class="subgrid"><iframe title="video${[i +1]}" src="https://www.youtube.com/embed/${callback.items[i].id.videoId}" 
            width="300" frameborder="0" allowfullscreen target="_parent"></iframe> <button class="related" onclick="getDataFromApi(&quot;${value}&quot;, null, &quot;${callback.items[i].id.videoId}&quot;)">Related</button><div>`)
    }
    console.log(callback)
    npt = callback.nextPageToken
    ppt = callback.prevPageToken
    related = callback.relatedToVideoId
    console.log(related)
}

function nextPage() {
    $('.next').click(function(event) {
        getDataFromApi(value, npt)
    })
}


function prevPage() {
    $('.prev').click(function(event) {
        getDataFromApi(value, ppt)
    })
}


function showNextButton() {
    $('.button').click(function() {
        $('.next').css('visibility', 'visible')
    })
}

function showPrevButton() {
    $('.next').click(function() {
        $('.prev').css('visibility', 'visible')
    })
}


function clearResults() {
    $('.js-search-results').empty()
}

submitSearch()
nextPage()
showNextButton()
prevPage()
showPrevButton()
