Page({
  data: {
    tongueImage: '/images/back2.jpg',
    resultImage: '/images/back2.jpg',
    tongueColor: '',
    coatedColor: '',
    crackResult: '',
    indentResult: '',
    diagnosisResult: ''
  },

  // 上传图片
  uploadImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          tongueImage: res.tempFilePaths[0]
        })
      }
    })
  },

  // 开始诊断
  startDiagnosis() {
    // 预留诊断功能接口
  },

  // 返回首页
  goBack() {
    wx.navigateBack()
  }
}) 