// Page({
//     data: {
//       // 你可以在这里添加一些数据
//     },
//     onLoad: function () {
//       // 页面加载时的逻辑
//     },
//     onEnterSystem: function () {
//       // 点击“进入系统”按钮时的逻辑
//       wx.navigateTo({
//         url: '/pages/system/system' // 假设你有一个系统页面
//       });
//     }
//   });

Page({
  data: {
    result: null,
    imageUrl: null,
  },

  // 选择图片
  chooseImage() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];
        this.setData({ imageUrl: tempFilePath });
        this.uploadImage(tempFilePath);
      },
    });
  },

  // 上传图片并调用服务
  uploadImage(filePath) {
    wx.showLoading({ title: '分析中...' });

    wx.uploadFile({
      url: 'http://127.0.0.1:5000/analyze', // Python 服务地址
      filePath: filePath,
      name: 'file',
      success: (res) => {
        console.log(res.data)
        wx.hideLoading();
        const result = JSON.parse(res.data);
        this.setData({ result });
      },
      fail: (err) => {
        wx.hideLoading();
        wx.showToast({ title: '分析失败', icon: 'none' });
        console.error(err);
      },
    });
  },
});