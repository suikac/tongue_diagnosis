Page({
  data: {
    imageUrl: ''
  },

  // 选择图片
  chooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];
        this.setData({
          imageUrl: tempFilePath
        });
      }
    });
  },

  // 开始诊断，上传图片并请求后端
  startDiagnosis() {
    if (this.data.imageUrl) {
      wx.showLoading({ title: '分析中...' });
      
      wx.uploadFile({
        url: 'http://127.0.0.1:5000/analyze', // 保留原有的后端地址
        filePath: this.data.imageUrl,
        name: 'file',
        success: (res) => {
          wx.hideLoading();
          const result = JSON.parse(res.data);
          console.log(result);
          // 携带诊断结果跳转到诊断页面
          wx.navigateTo({
            url: `../diagnosis/diagnosis?image=${this.data.imageUrl}&result=${JSON.stringify(result)}`
          });
        },
        fail: (err) => {
          wx.hideLoading();
          wx.showToast({ title: '分析失败', icon: 'none' });
          console.error(err);
        }
      });
    }
  }
}); 