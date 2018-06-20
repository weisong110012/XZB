// pages/vip/vip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:[{
      title:'初级会员',
      money:10,
      vipType:0,
      text:'获得方案1的使用权'
    },
      {
        title: '中级会员',
        money: 20,
        vipType: 1,
        text: '获得方案1、方案2的使用权'
      },
      {
        title: '高级会员',
        money: 30,
        vipType: 2,
        text: '获得方案1、方案3的使用权'
      },
      {
        title: '超级会员',
        money: 40,
        vipType: 3,
        text: '获得所有方案的使用权'
      }
    ],
    active:null,
    vipType:null,
    openBtnText:'立即开通'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    if (options.vipType!='null'){
      var lists=[];
      that.data.lists.forEach((val,index)=>{
        if (index > options.vipType){
          lists.push(val)
        }
      })
      that.setData({
        lists: lists
      })
      console.log(1)
      if (options.vipType==3){
        that.setData({
          openBtnText:'土豪,您的会员等级到顶了'
        })
      }
     else{
        that.setData({
          openBtnText: '立即升级'
        })
     }


    }

  },



  chooseVip:function(e){
    this.setData({
      active:e.currentTarget.dataset.index
    })
  },

  openVip:function(){
    var that=this;
    wx.navigateTo({
      url: '../my/my?vipType=' + that.data.lists[that.data.active].vipType
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