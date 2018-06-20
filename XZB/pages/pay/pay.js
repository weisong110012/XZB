// pages/pay/pay.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.lists){
      this.setData({
        item: app.globalData.lists[options.active],
        active: options.active
      })
    }
  },
  /**
   * 绑定
  */
  wxpay:function(){
    var that=this
      wx.request({
        url: app.globalData.https +'/PICMS/public/index/index/wxpay',
        data: {
          pro_id: that.data.item['pro_id'],
          openid: wx.getStorageSync('openid')
        },
        success:function(res){
          var data=res.data.list
          wx.requestPayment({
            'timeStamp': data.timeStamp,
            'nonceStr': data.nonceStr,
            'package': data.package,
            'signType': data.signType,
            'paySign': data.paySign,
            'success': function (res) {
              wx.reLaunch({
                url: '../main/main?active='+that.data.active,
              })
            },
            'fail': function (res) {
              console.log(res)
            }
          })

        }

      })
 },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})