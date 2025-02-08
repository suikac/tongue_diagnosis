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
        this.setData({
          imageUrl: res.tempFilePaths[0]
        })
      }
    })
  },

  // 开始诊断，跳转到诊断页面
  startDiagnosis() {
    if (this.data.imageUrl) {
      wx.navigateTo({
        url: '../diagnosis/diagnosis?image=' + this.data.imageUrl
      })
    }
  }
}) 