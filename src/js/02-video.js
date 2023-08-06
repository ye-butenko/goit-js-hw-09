import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

//оголошення змінних
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const VIDEO_TIME_KEY = 'videoplayer-current-time';

//відстеження і запис current time video в локальне сховище
player.on('timeupdate', throttle(onPlay, 1000));
function onPlay(data) {
  localStorage.setItem(VIDEO_TIME_KEY, data.seconds);
}

//початок відтворення відео при перезавантаженні
player.setCurrentTime(localStorage.getItem(VIDEO_TIME_KEY) ?? 0);
