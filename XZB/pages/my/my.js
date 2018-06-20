const app=getApp();
var formDate=require('../../utils/util.js')
// pages/my/my.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    history:[],
    openText:'开通会员',
    vipType:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.vipType!=undefined){
      var vipText=['初级会员','中级会员','高级会员','超级会员'];
      this.setData({
        openText: vipText[options.vipType],
        vipType: options.vipType
      })
    }
  

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var that = this;
    if (wx.getStorageSync('openid')) {
      var openid = wx.getStorageSync('openid')
      wx.request({
        url: app.globalData.https + '/PICMS/public/index/index/history',
        data: {
          openid: openid
        },
        success: function (res) {
          var history=[];
          res.data.forEach((val)=>{
            val.time = formDate.formatTime(new Date(val.time*1000));
            history.push(val)
          })
          that.setData({
            history: history
          })
        }
      })
    }
    

  },
  preshow: function (e) {
    var that = this;
    var src=e.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src]
    })
  },
  openVip:function(){
    var that=this;
    wx.navigateTo({
      url: '../vip/vip?vipType=' + that.data.vipType,
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