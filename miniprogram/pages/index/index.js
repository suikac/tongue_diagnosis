Page({
    data: {
      // 你可以在这里添加一些数据
    },
    onLoad: function () {
      // 页面加载时的逻辑
    },
    onEnterSystem: function () {
      // 点击“进入系统”按钮时的逻辑
      wx.navigateTo({
        url: '/pages/system/system' // 假设你有一个系统页面
      });
    }
  });