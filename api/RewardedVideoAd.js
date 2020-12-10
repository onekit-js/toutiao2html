export default class RewardedVideoAd {
  load(){}
  //加载激励视频广告。

  show(){}
  //显示激励视频广告。激励视频广告将从屏幕下方推入。

  destroy(){}
  //销毁激励视频广告实例。

  onLoad(callback){}
  //监听激励视频广告加载事件。

  offLoad(callback){}
  //取消监听激励视频广告加载事件

  onError(callback){}
  //监听激励视频错误事件。

  offError(callback){}
  //取消监听激励视频错误事件

  onClose(callback){}
  //监听用户点击 关闭广告 按钮的事件。

  offClose(callback){}
  //取消监听用户点击 关闭广告 按钮的事件
}
