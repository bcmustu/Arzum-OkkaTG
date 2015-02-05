

$(document).ready(function () {
    setupVideo();
});



/* VIDEO SETUP */
var player;
var player_width;
var player_height;

function setupVideo() {
    // setup pop-up video panel positioning
    player_width = $('#player').attr('data-width');
    player_height = $('#player').attr('data-height');
    $('#player').css({ marginTop: -parseInt(player_height / 2), marginLeft: -parseInt(player_width / 2) });

    // retrieve thumb images for pop-up video 
    $('a.video').each(function (index, elem) {
        var videoID = $(this).attr('data-video-id');
        var frameNo = 0;
        var srcVal = 'http://img.youtube.com/vi/' + videoID + '/' + frameNo + '.jpg';
        $(this).append('<img src="' + srcVal + '" class="thumb" />');
    })

    // This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// This function creates an <iframe> (and YouTube player) after the API code downloads.
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: player_height,
        width: player_width,
        playerVars: { 'autoplay': 1, 'controls': 1 },
        events: { 'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange }
    });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
    $('a.video').click(function (e) {

        // position overlay
        $('#overlay').addClass('on').click(function () {
            closeVideoPanel();
        });

        // show player
        $("#player").show();

        var videoID = $(this).attr('data-video-id');
        player.loadVideoById(videoID, 0);
        event.target.playVideo();

        //prevent click propagation 
        return false;
    });
}

// The API calls this function when the player's state changes.
// The function indicates that when playing a video (state=1), the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}

function stopVideo() {
    player.stopVideo();
}

function closeVideoPanel() {
    $('#overlay').removeClass('on');
    stopVideo();
}
/* END - VIDEO SETUP */





