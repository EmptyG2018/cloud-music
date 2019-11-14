export const filterPlayList = (songs, id) => {
	return songs.filter(song => song.id !== id)
}

export const findPlayList = (songs, id) => {
	for (let i = 0, j = songs.length; i < j; i++) {
		if (songs[i].id === id) return i;
	}
	return -1;
}

export const findPlayListsIndex = (songs, song, playIndex) => {
	let delIndex = 0;
	let playList = songs.filter((item, index) => {
		if (item.id === song.id) {
			if (index < playIndex) {
				delIndex+=1;
			}
			if (index === playIndex) {
				delIndex = -1;
			}
		} else {
			return item;
		}
	})
	return {playList, delIndex}
}

export const playTypeIconStr = (index) => {
	let icon = '';
	let text = '';
	switch(index){
		case 0:
			icon = 'playlist_play';
			text = '顺序播放';
			break;
		case 1:
			icon = 'repeat';
			text = '列表循环';
			break;
		case 2: 
			icon = 'repeat_one';
			text = '单曲循环';
			break;
		case 3:
			icon = 'shuffle';
			text = '随机播放';
			break;
	}
	return {icon, text};
}

export const getPlayListSession = () => {
	let playListStr = localStorage.getItem('playList');
	let playList
	try{
		playList = JSON.parse(playListStr) || []
	} catch(err) {
		console.log(err);
		playList = []
	}
	return playList;
}

export const setPlayListSession = (arr) => {
	arr = Object.prototype.toString.call(arr) === '[object Array]' ? arr : [];
	localStorage.setItem('playList', JSON.stringify(arr));
}

export const getIndexSession = () => {
	let index = localStorage.getItem('index');
	index = index !== null ? index : -1;
	return parseInt(index);
}

export const setIndexSession = (num) => {
	num = typeof num === 'number' ? num : -1;
	localStorage.setItem('index', num);
}

export const getPlayTypeSession = () => {
	let index = localStorage.getItem('playType');
	index = index !== null ? index : 0;
	return parseInt(index);
}

export const setPlayTypeSession = (num) => {
	num = typeof num === 'number' ? num : 0;
	localStorage.setItem('playType', num);
}

export const getPlayingSession = () => {
	let playingStr = localStorage.getItem('playing');
	let playing
	let defaultObj = {id: '', name: '', author: '', musicUrl: '', album: ''};
	try{
		playing = JSON.parse(playingStr) || defaultObj
	} catch(err) {
		console.log(err);
		playing = defaultObj
	}
	return playing;
}

export const setPlayingSession = (obj) => {
	let defaultObj = {id: '', name: '', author: '', musicUrl: '', album: ''};
	obj = Object.prototype.toString.call(obj) === '[object Object]' ? obj : defaultObj
	localStorage.setItem('playing', JSON.stringify(obj));
}

export const authors = (authors) => {
	return authors.reduce((str , singer) => {
		return !str? str + singer.name:str +" / "+singer.name;
	}, '');
}