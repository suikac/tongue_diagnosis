Page({
  data: {
    imageUrl: '',
    tongueColor: '',
    coatedColor: '',
    crackResult: '',
    indentResult: '',
    diagnosisResult: ''
  },

  onLoad: function(options) {
    // 接收上一页传来的图片
    if (options.image) {
      this.setData({
        imageUrl: options.image
      })
    }
    
    // 测试数据
    this.setData({
      tongueColor: '淡红舌',
      coatedColor: '薄白苔',
      crackResult: '无裂纹',
      indentResult: '轻度齿痕',
      diagnosisResult: '气虚质\n\n主要表现：\n疲劳乏力，气短懒言，容易出汗\n\n建议：\n1. 注意休息，避免过度劳累\n2. 适当运动，增强体质\n3. 饮食调理，补充气血\n4. 保持规律作息，早睡早起'
    })
  },

  // 上传图片
  uploadImage() {
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

  // 开始诊断
  startDiagnosis() {
    // 预留诊断功能接口
  },

  // 返回首页
  goBack() {
    wx.navigateBack()
  },

  // 图片预览功能
  previewImage() {
    wx.previewImage({
      urls: [this.data.imageUrl],
      current: this.data.imageUrl
    })
  }
}) 