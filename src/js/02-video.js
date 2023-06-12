import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const myPlayer = document.querySelector('#vimeo-player');
const player = new Player(myPlayer);

const onPlay = throttle(function (data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
}, 1000);
player.on('timeupdate', onPlay);

const currentTime = localStorage.getItem('videoplayer-current-time');
if (currentTime) {
  player.setCurrentTime(currentTime);
}
