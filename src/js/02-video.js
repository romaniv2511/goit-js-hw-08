import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import Storage from './storage'

const LOCAL_STORAGE_KEY = "videoplayer-current-time"

const iframe = document.querySelector('iframe');
const player = new Player(iframe);


if (Storage.load(LOCAL_STORAGE_KEY)) {
    const { time } = Storage.load(LOCAL_STORAGE_KEY);

    player.setCurrentTime(time).catch(function(error) {
        switch (error.name) {
            case 'RangeError':
                break;

            default:
                break;
        }
    });
}

const onPlay = function (data) {
    const currentTime = {};
    currentTime.time = data.seconds;

    Storage.save(LOCAL_STORAGE_KEY, currentTime);
};
const throttledOnPlay = throttle(onPlay, 1000);

player.on('timeupdate', throttledOnPlay);

