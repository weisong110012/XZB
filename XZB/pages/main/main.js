// 初始化实例
const app=getApp();
// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:{},
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      hasUserInfo: false,
      preImg: app.globalData.https+'/PICMS/public/static/images/main/welcome.jpg',
      quanxian:true,
      btnText:'选图',
      active: 0,
      payActive:null,
      loading:false,
      uploaded:false,
      initialImg:'',
      lists:[
        
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (options.active){
      this.setData({
        payActive: options.active
      })
    }
    
     var that = this;
    if (app.globalData.userInfo) {
      console.log(1)
      if (!wx.getStorageSync('openid')) {
      wx.login({
        success: res => {
          var code = res.code;
          wx.request({
            url: app.globalData.https + '/PICMS/public/index/index/get_openid',
            data: {
              city: app.globalData.userInfo.city,
              nickName: app.globalData.userInfo.nickName,
              country: app.globalData.userInfo.country,
              gender: app.globalData.userInfo.gender,
              province: app.globalData.userInfo.province,
              language: app.globalData.userInfo.language,
              avatarUrl: app.globalData.userInfo.avatarUrl,
              code: code,
              openid:''
            },
            success: function (res) {
            
              that.setData({
                lists: res.data.lists
              })
              wx.setStorageSync('openid', res.data.openid)
            }
          })
        }
      })
      }
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      console.log(2)
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = ress => {
        console.log(3)
        if (!wx.getStorageSync('openid')){
          wx.login({
            success: res => {
              var code = res.code;
              wx.request({
                url: app.globalData.https + '/PICMS/public/index/index/get_openid',
                data: {
                  city: ress.userInfo.city,
                  nickName: ress.userInfo.nickName,
                  country: ress.userInfo.country,
                  gender: ress.userInfo.gender,
                  province: ress.userInfo.province,
                  language: ress.userInfo.language,
                  avatarUrl: ress.userInfo.avatarUrl,
                  code: code,
                  openid:''
                },
                success: function (res) {
                  console.log(res)
                  that.setData({
                    lists: res.data.lists
                  })
                  wx.setStorageSync('openid',res.data.openid)
                }
              })
            }
          })
        }
        this.setData({
          userInfo: ress.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      console.log(3)
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: ress => {
          app.globalData.userInfo = ress.userInfo
          if (!wx.getStorageSync('openid')) {
            wx.login({
              success: res => {
                var code = res.code;
                wx.request({
                  url: app.globalData.https + '/PICMS/public/index/index/get_openid',
                  data: {
                    city: ress.userInfo.city,
                    nickName: ress.userInfo.nickName,
                    country: ress.userInfo.country,
                    gender: ress.userInfo.gender,
                    province: ress.userInfo.province,
                    language: ress.userInfo.language,
                    avatarUrl: ress.userInfo.avatarUrl,
                    code: code,
                    openid: ''
                  },
                  success: function (res) {
                    console.log(res)
                    that.setData({
                      lists: res.data.lists
                    })
                    wx.setStorageSync('openid', res.data.openid)
                  }
                })
              }
            })
          }

          this.setData({
            userInfo: ress.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  /**
   * 事件绑定
   */
  bindViewTap:function(){
    wx.navigateTo({
      url: '../my/my'
    })
  },
  login:function(){
    var that=this
    wx.getUserInfo({
      success: ress => {
        app.globalData.userInfo = ress.userInfo
        if (!wx.getStorageSync('openid')) {
          wx.login({
            success: res => {
              var code = res.code;
              wx.request({
                url: app.globalData.https + '/PICMS/public/index/index/get_openid',
                data: {
                  city: ress.userInfo.city,
                  nickName: ress.userInfo.nickName,
                  country: ress.userInfo.country,
                  gender: ress.userInfo.gender,
                  province: ress.userInfo.province,
                  language: ress.userInfo.language,
                  avatarUrl: ress.userInfo.avatarUrl,
                  code: code,
                  openid: ''
                },
                success: function (res) {
                  console.log(res)
                  that.setData({
                    lists: res.data.lists
                  })
                  wx.setStorageSync('openid', res.data.openid)
                }
              })
            }
          })
        }

        this.setData({
          userInfo: ress.userInfo,
          hasUserInfo: true
        })
      }
    })
  },

  choose:function(e){
    var preSrc = e.currentTarget.dataset.presrc;
    var quanxian = e.currentTarget.dataset.quanxian;
    var index = e.currentTarget.dataset.index;
    app.globalData.lists = this.data.lists;
    var uploaded = this.data.uploaded;
    var filename = this.data.initialImg;
    var that = this;
    this.setData({
      quanxian: quanxian,
      active: index
    })
    if (uploaded){
      var filename = filename.split('/');
      var filename = filename[filename.length-1];
      that.setData({
        loading: true
      })
      wx.request({
        url: app.globalData.https+'/PICMS/public/index/index/uploads',
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          uploaded: uploaded,
          pro_id: that.data.lists[that.data.active]['pro_id'],
          filename: filename,
          openid: wx.getStorageSync('openid'),
          preTime:that.data.preTime
        },
        success:function(res){
          console.log(typeof(res.data))
          var data=res.data;
          that.setData({
            preImg: data.preSrc,
            loading:false
          })
        }  
      })
    } 
    else {
      this.setData({
        preImg: preSrc,
        quanxian: quanxian,
        active: index
      })
    }
  },
  chooseImg:function(){
    var that=this;
    console.log(wx.getStorageSync('openid'))
    wx.chooseImage({
      count:1,
      sourceType: ['album'],
      success: function(res) { 
          that.setData({
            loading:true,
            initialImg: res.tempFilePaths[0]
          })
          wx.uploadFile({
            url: app.globalData.https+'/PICMS/public/index/index/uploads',
            filePath: res.tempFilePaths[0],
            name: 'file',
            formData:{
              openid: wx.getStorageSync('openid'),
              pro_id: that.data.lists[that.data.active]['pro_id'],
              uploaded: that.data.uploaded
            },
            success:function(res){
              wx.getStorageSync('openid');
              console.log(typeof(res.data));
              var data = JSON.parse(res.data);
              that.setData({
                preImg: data.preSrc,
                loading:false,
                uploaded:true,
                preTime: data.preTime
              })
            }
          })
      },
    })
  },
  preshow:function(){
    var that=this;
    wx.previewImage({
      urls: [that.data.preImg],
    })
  },
  showToast:function(){
    var that=this;
    wx.showToast({
      title:'开通会员解锁!',
      icon:'none'
    })
    wx.navigateTo({
      url: '../pay/pay?active=' + that.data.active,
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
  onShow: function (options) {
          var that=this
              if (wx.getStorageSync('openid')) {
                var openid = wx.getStorageSync('openid')
                wx.request({
                  url: app.globalData.https + '/PICMS/public/index/index/get_openid',
                  data: {
                    openid: openid
                  },
                  success: function (res) {
                    that.setData({
                      lists: res.data.lists
                    })

                    if (that.data.payActive){
                      that.setData({
                        active: that.data.payActive,
                        preImg: res.data.lists[that.data.payActive].preSrc
                      })
                    }
                  }
                })
              }
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