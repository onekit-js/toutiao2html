export default class InterstitialAd {
  show() {}
  //显示插屏广告。

  load() {}
  //加载插屏广告。

  destroy() {}
  //销毁插屏广告实例。

  onLoad(callback) {}
  //监听插屏广告加载事件。

  offLoad(callback) {}
  //取消监听插屏广告加载事件

  onError(callback) {}
  //监听插屏错误事件。

  offError(callback) {}
  //取消监听插屏错误事件

  onClose(callback) {}
  //监听插屏广告关闭事件。

  offClose(callback) {}
  //取消监听插屏广告关闭事件
}
