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
    // 接收上传的图片
    if (options.image) {
      this.setData({
        imageUrl: options.image
      })
    }
    
    // 接收后端返回的分析结果
    if (options.result) {
      const result = JSON.parse(options.result);
      this.setData({
        tongueColor: result.color || '未知',      // 舌色分析结果
        coatedColor: result.coated || '未知',     // 舌苔分析结果
        crackResult: result.crack || '未知',      // 裂纹分析结果
        indentResult: result.indent || '未知',    // 齿痕分析结果
        diagnosisResult: result.subtext || '暂无建议'  // 诊断建议
      });
    }
  },

  // 图片预览功能
  previewImage() {
    wx.previewImage({
      urls: [this.data.imageUrl],
      current: this.data.imageUrl
    })
  }
}); 