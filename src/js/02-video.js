import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import storage from './storage'

const LOCAL_STORAGE_KEY = "videoplayer-current-time"

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const savedCurrentTime = storage.load(LOCAL_STORAGE_KEY); 

if (savedCurrentTime) {
    player.setCurrentTime(savedCurrentTime);
}

const onPlay = function ({seconds}) {
    storage.save(LOCAL_STORAGE_KEY, seconds);
};
const throttledOnPlay = throttle(onPlay, 1000);

player.on('timeupdate', throttledOnPlay);

