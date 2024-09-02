
// 添加监听
const subscriEngineEvents = (engine) => {

	// onError	
	engine.on(VERTC.events.onError, onError);
	async function onError(e) {
		console.error('onError', e);
	}


	// 播放器事件
	engine.on(VERTC.events.onPlayerEvent, handlePlayerEvent);

	async function handlePlayerEvent(e) {
		// console.log('播放器事件', e);
	}


	// 远端可见用户加入房间，或房内不可见用户切换为可见的回调
	engine.on(VERTC.events.onUserJoined, onUserJoined);
	async function onUserJoined(e) {
		console.log('远端可见用户加入房间，或房内不可见用户切换为可见的回调', e);
	}

	// 远端可见用户离开房间，或房内可见用户切换为隐身的回调
	engine.on(VERTC.events.onUserLeave, onUserLeave);
	async function onUserLeave(e) {
		console.log('远端可见用户离开房间，或房内可见用户切换为隐身的回调', e);
	}

	// 连接状态发生变化
	engine.on(VERTC.events.onConnectionStateChanged, onConnectionStateChanged);
	async function onConnectionStateChanged(e) {
		console.log('连接状态发生变化', e);
	}


	// 房间内新增远端摄像头/麦克风采集音视频流的回调。
	engine.on(VERTC.events.onUserUnpublishStream, onUserUnpublishStream);
	async function onUserUnpublishStream(e) {
		console.log('房间内远端摄像头/麦克风采集的媒体流移除的回调。', e);
	}

	// 房间内新增远端屏幕共享音视频流的回调。
	engine.on(VERTC.events.onUserPublishScreen, onUserPublishScreen);
	async function onUserPublishScreen(e) {
		console.log('房间内新增远端屏幕共享音视频流的回调。', e);

		await engine.subscribeScreen(e.userId, e.mediaType)


		let data = await engine.setRemoteVideoPlayer(VERTC.StreamIndex.STREAM_INDEX_SCREEN, {
			userId: e.userId,
			renderDom: document.querySelector('#remoteStream'),
			renderMode: VERTC.VideoRenderMode.RENDER_MODE_FIT,
		})
		console.log(data);
	}

	// 	房间内远端屏幕共享音视频流移除的回调。
	engine.on(VERTC.events.onUserUnpublishScreen, onUserUnpublishScreen);
	async function onUserUnpublishScreen(e) {
		console.log('房间内远端屏幕共享音视频流移除的回调。', e);
	}

	// 	视频首帧渲染
	engine.on(VERTC.events.onRemoteVideoFirstFrame, onRemoteVideoFirstFrame);
	async function onRemoteVideoFirstFrame(e) {
		console.log('视频首帧渲染。', e);
	}

	// 	远端音频首帧播放事件
	engine.on(VERTC.events.onRemoteAudioFirstFrame, onRemoteAudioFirstFrame);
	async function onRemoteAudioFirstFrame(e) {
		console.log('远端音频首帧播放事件。', e);
	}

	// 	视频媒体设备状态改变。
	engine.on(VERTC.events.onVideoDeviceStateChanged, onVideoDeviceStateChanged);
	async function onVideoDeviceStateChanged(e) {
		console.log('视频媒体设备状态改变。', e);
	}
	// 	音频媒体设备状态改变。
	engine.on(VERTC.events.onAudioDeviceStateChanged, onAudioDeviceStateChanged);
	async function onAudioDeviceStateChanged(e) {
		console.log('音频媒体设备状态改变。', e);
	}


	// 	onActiveSpeaker
	engine.on(VERTC.events.onActiveSpeaker, onActiveSpeaker);
	async function onActiveSpeaker(e) {
		console.log('onActiveSpeakery音频回调。', e);
	}



	// 	远端音频回调
	engine.on(VERTC.events.onRemoteAudioPropertiesReport, onRemoteAudioPropertiesReport);
	async function onRemoteAudioPropertiesReport(e) {
		if (e.length > 0) {
			console.log('远端音频回调。', e);
			const volumeLevel = document.getElementById('volume-level')
			volumeLevel.style.height = `${e[0].audioPropertiesInfo.linearVolume }%`
		}
	}


	// 	本地音频回调
	engine.on(VERTC.events.onLocalAudioPropertiesReport, onLocalAudioPropertiesReport);
	async function onLocalAudioPropertiesReport(e) {
		if (e.length > 0) {
			// console.log('本地音频回调。', e);
			const localvolumeLevel = document.getElementById('local-level')
			localvolumeLevel.style.height = `${e[0].audioPropertiesInfo.linearVolume/2.5 }%`
		}
	}




	// 收到 VERTC.events.onUserPublishStream 事件后进行相应处理
	engine.on(VERTC.events.onUserPublishStream, handleUserPublishStream);


	async function handleUserPublishStream(e) {
		console.log('远端进房', e);

		// const player = document.querySelector('#video-container');
		// engine.subscribeStream(e.userId, e.mediaType)

		// setTimeout(() => {

		// 	// 创建video元素
		// 	const videoElement = document.createElement('video');
		// 	videoElement.width = e.videoStreamDescriptions[0].width; // 设置视频宽度
		// 	videoElement.height = e.videoStreamDescriptions[0].height; // 设置视频高度
		// 	videoElement.autoplay = true; // 自动播放

		// 	// 将video元素添加到div中
		// 	document.getElementById('video-list').appendChild(videoElement);
		// 	console.log(engine.getRemoteStreamTrack(e.userId, VERTC.StreamIndex.STREAM_INDEX_MAIN,
		// 		'video'));
		// 	videoElement.srcObject.addTrack(engine.getRemoteStreamTrack(e.userId, VERTC.StreamIndex
		// 		.STREAM_INDEX_MAIN,
		// 		'video'))
		// 	videoElement.play();
		// }, 500)

		// await engine.setRemoteVideoPlayer(VERTC.StreamIndex.STREAM_INDEX_MAIN, {
		// 	userId: e.userId,
		// 	renderDom: player,
		// });
		// await engine.setRemoteVideoPlayer(VERTC.StreamIndex.STREAM_INDEX_MAIN, {
		// 	userId: e.userId,
		// 	renderDom: document.querySelector('#remote_stream'),
		// 	// renderMode: VERTC.VideoRenderMode.RENDER_MODE_HIDDEN,
		// });
	}

}