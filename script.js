var playList = [
    {
        id: 1,
        title: 'Some One Like You',
        signer: 'Adele',
        poster: 'assets/images/unnamed.jpg',
        timeDuration: '4:44',
        path: 'assets/songs/Adele_Someone_Like_You_320.mp3',
    },
    {
        id: 2,
        title: 'Perfect Duet',
        signer: 'Ed Sheeran',
        poster: 'assets/images/ed.jpg',
        timeDuration: '4:24',
        path: 'assets/songs/Ed-Sheeran-Perfect-Duet-abanmusics.com-320.mp3',
    },
    {
        id: 3,
        title: 'Set Fire To The Rain',
        signer: 'Adele',
        poster: 'assets/images/adele.jpg',
        timeDuration: '4:01',
        path: 'assets/songs/Set Fire To The Rain - Adele.mp3',
    },
    {
        id: 4,
        title: 'Levitating',
        signer: 'Dua Lipa',
        poster: 'assets/images/dua.jpg',
        timeDuration: '3:40',
        path: 'assets/songs/Dua Lipa - Levitating [320].mp3',
    },
    {
        id: 5,
        title: 'Shallow',
        signer: 'Lady Gaga',
        poster: 'assets/images/gaga.jpg',
        timeDuration: '3:35',
        path: 'assets/songs/Shallow - Lady Gaga  Bradley Cooper (320).mp3',
    },
    {
        id: 6,
        title: 'Bad Romance',
        signer: 'Lady Gaga',
        poster: 'assets/images/lady.jpg',
        timeDuration: '4:54',
        path: 'assets/songs/Lady Gaga - Bad Romance.mp3',
    },
    {
        id: 7,
        title: 'Some One Like You',
        signer: 'Adele',
        poster: 'assets/images/unnamed.jpg',
        timeDuration: '4:44',
        path: 'assets/songs/Adele_Someone_Like_You_320.mp3',
    },
    {
        id: 8,
        title: 'Perfect Duet',
        signer: 'Ed Sheeran',
        poster: 'assets/images/ed.jpg',
        timeDuration: '4:19',
        path: 'assets/songs/Ed-Sheeran-Perfect-Duet-abanmusics.com-320.mp3',
    },
];

var playListContainer = document.querySelector('.play-list-container');
var playListElement = document.createElement('UL');
playListElement.classList.add('play-list');
playListContainer.appendChild(playListElement);

// Play list listener (UL Element)
playListElement.addEventListener('click', function (e) {
    if (e.target.tagName === 'IMG') {
        renderPlayBox(e.target.dataset.songindex);
        palyingSong(e.target.dataset.songindex);
    }

});

// Calculation total time duration of songs
var totalTime = { mins: 0, sec: 0 };
function calculateTotalHours() {
    console.log('test')
    var totalSeconds = 0;
    playList.forEach(function (song) {
        var timeDurationArr = song.timeDuration.split(':');
        // timeDurationArr[0]   hours
        // timeDurationArr[1]   mins
        totalSeconds += (Number(timeDurationArr[0]) * 60) + Number(timeDurationArr[1]);
    })
    var totalMinuts = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;

    return totalTime = { mins: totalMinuts, sec: seconds };
}

// Render play list 
function renderPlayList() {
    var string = '';
    playList.forEach(function (song, index) {
        string += ' <li class="flex flex-row items-center py-5"><div class="img-song hover:opacity-50 basis-1/12 mx-5" data-songindex="'
            + index + '"><img class=" cursor-pointer" src='
            + song.poster + ' data-songindex="'
            + index + '"/></div><div class="deatils-song basis-10/12"><div class="title">'
            + song.title + '</div><div class="singer">'
            + song.signer + '</div></div><div class="time-song basis-1/12">'
            + song.timeDuration + '</div></li>';
    });
    playListElement.innerHTML = string;
}

// Handle play box listeners
function playBoxBtnsListener(playListIndex) {
    var playBoxBtns = document.querySelector('.play-box-btns');
    playBoxBtns.addEventListener('click', function (e) {
        if (e.target.classList.contains('next-btn')) {
            playListIndex++;
            if (playListIndex >= playList.length)
                playListIndex = 0;
            renderPlayBox(playListIndex);
        }
        if (e.target.classList.contains('prev-btn')) {
            playListIndex--;
            if (playListIndex < 0)
                playListIndex = playList.length - 1;
            renderPlayBox(playListIndex);
        }
        palyingSong(playListIndex)
    })
}

//Render Play Box
function renderPlayBox(playListIndex) {
    console.log(playListIndex)
    var string = '';
    var playBox = document.querySelector('.play-box');
    string = '<div class="play-box-img"><img src="'
        + playList[playListIndex].poster + '" class="hover:opacity-50 "></div><h1 class="mt-5">Pop Gold</h1><span class="subtitle py-3">Youtube Music</span><span class="play-list-details">'
        + playList.length + ' Songs . '
        + totalTime.mins + ' Minuts, '
        + totalTime.sec + ' Seconds</span><span class="song-title">'
        + playList[playListIndex].title + '</span><span class="songer">'
        + playList[playListIndex].signer + '</span><div class="play-box-btns flex flex-row items-center mt-5"><button class="prev-btn bg-zinc-800 text-white-800 hover:bg-zinc-700 font-bold rounded-full pb-1 w-10 h-10 text-sm"><i class="prev-btn bi bi-chevron-left"></i></button><audio controls autoplay ><source src="'
        + playList[playListIndex].path + '" type="audio/mpeg"></audio><button  class="next-btn bg-zinc-800 text-white-800 hover:bg-zinc-700 font-bold rounded-full pb-1 w-10 h-10 text-sm"><i class="next-btn bi bi-chevron-right"></i></button></div>';

    playBox.innerHTML = string;
    playBoxBtnsListener(playListIndex);
}

// Make diffrent style for song's that are palying in play list
function palyingSong(songIndex) {
    var songsList = document.querySelectorAll('.play-list li');
    songsList.forEach(function (item, index) {
        if (index == songIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    })
}

// init function
function init() {
    renderPlayList();
    renderPlayBox(0);
    calculateTotalHours();
}
init();


