(function() {
    const playlistWrapper = document.querySelector('.movies_wrapper');
    const addMovieButton = document.querySelector('.add_movie_button');
    const newMovieTitle = document.querySelector('#movie_title');
    const newMovieUrl = document.querySelector('#movie_url');
    var video = document.getElementById('video');


    const createNewMovieElement = () => {
        const movieItem = document.createElement('option');
        movieItem.textContent = newMovieTitle.value;
        var url = newMovieUrl.value;
        url = '\"'.concat(url);
        url = url.concat('\"');
        movieItem.setAttribute('onclick', `runVideo(${url})`);
        playlistWrapper.appendChild(movieItem);
        newMovieUrl.value = '';
        newMovieTitle.value = '';
    }

    addMovieButton.addEventListener('click', (e) => {
        e.preventDefault();
        createNewMovieElement();
    })
})();

function runVideo(link) {
    document.getElementById('video').setAttribute('src', link)
    document.getElementById('video').muted = 0;
}

function getParamNames(func) {
    var ARGUMENT_NAMES = /([^\s,]+)/g;
    var result = func.slice(func.indexOf('(') + 1, func.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null)
        result = [];
    return result;
}

function removeParentheses(string) {
    var result = string.toString().replaceAll('\"', '');
    return result;
}

current_video_index = 0;
document.getElementById('video').addEventListener('ended', myHandler, false);

function myHandler(e) {
    var arr = [];
    var e = document.getElementById("select");
    var lis = document.getElementsByTagName("option");
    for (var i = 0; i < lis.length; ++i) {
        var item = lis[i];
        if (item.value == e.value) {
            current_video_index = i;
        }
        if (lis[i].selected) {
            arr.push(i);
        }
    }
    console.log(arr);
    if (current_video_index < lis.length - 1) {
        next_video_link = removeParentheses(getParamNames(lis[current_video_index + 1].getAttribute('onclick')));
        $("#video").attr('src', next_video_link);
        var next_video_title = lis[current_video_index + 1].value;
        $('#select').val(next_video_title);
        current_video_index += 1;
    } else {
        next_video_link = removeParentheses(getParamNames(lis[0].getAttribute('onclick')));
        $("#video").attr('src', next_video_link);
        var next_video_title = lis[0].value;
        $('#select').val(next_video_title);
        current_video_index = 0;
    }
    $("#video")[0].load();
}

function moveUp() {
    var selected = $("#select").find(":selected");
    var before = selected.prev();
    if (before.length > 0)
        selected.detach().insertBefore(before);
}

function moveDown() {
    var selected = $("#select").find(":selected");
    var next = selected.next();
    if (next.length > 0)
        selected.detach().insertAfter(next);
}

function remove() {
    var select = document.getElementById("select");
    for (var i = 0; i < select.length; i++) {
        if (select[i].selected) {
            select.remove(i);
            i = i - 1;
        }
    }
}

function changeVolume() {
    var input = document.getElementById("volume");
    var progress_bar = document.getElementById("progress_volume");
    video.volume = input.value / 100.0;
    progress_bar.value = input.value;
}

function changePosition() {
    var input = document.getElementById("position");
    var progress_bar = document.getElementById("progress_position");
    var duration = video.duration;
    video.currentTime = (input.value) / 100 * duration;
    progress_bar.value = input.value;
}

function vh(v) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (v * h) / 100;
}

function vw(v) {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (v * w) / 100;
}

function vmin(v) {
    return Math.min(vh(v), vw(v));
}

function vmax(v) {
    return Math.max(vh(v), vw(v));
}

function maximize() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) { /* Safari */
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE11 */
        video.msRequestFullscreen();
    }
}

function wide() {
    div = document.getElementById('video_id');
    div.classList.remove('video_player');
    //var screenProportion = window.screen.availWidth / window.screen.availHeight;
    video.style.width = 0.97 * window.screen.availWidth;
    video.style.height = window.screen.availHeight;
    video.style.margin = 10;
    console.log(screenProportion);
}

function restore() {
    div = document.getElementById('video_id');
    div.classList.add('video_player');
}

video.onvolumechange = function() {
    var input = document.getElementById("volume");
    var progress_bar = document.getElementById("progress_volume");
    input.value = video.volume * 100;
    progress_bar.value = video.volume * 100;
};

video.ontimeupdate = function() {
    var input = document.getElementById("position");
    var progress_bar = document.getElementById("progress_position");
    var duration = video.duration;
    if (input.value > 0)
        input.value = video.currentTime / duration * 100
    progress_bar.value = input.value;
};

window.onbeforeunload = function() {
    return 'Are you sure you want to leave?';
}