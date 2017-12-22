import {fetchData,starToArray} from '../../../util/util.js';
// pages/home/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[],
    count:0
  },

  /**
   * 生命周期函数--监听页面加载
   * options 为页面跳转所带来的参数
   */
  onLoad: function (options) {
    var type = options.type;
 //console.log(type) 
  var str = ''
  switch(type){
    case '电影':
    str = 'https://api.douban.com/v2/movie/in_theaters';
    break;
    case '即将上映':
      str = 'https://api.douban.com/v2/movie/coming_soon';
    break;
    case 'top250':
      str = 'https://api.douban.com/v2/movie/top250';
    break;
  }
  console.log(str);
  fetchData(str).then(res=>{
    console.log(res)
    this.processData(res)
  });
  this.setData({
    url:str
  })
  },
  lazyLoad(){
    var count = this.data.count+20;
    this.setData({
      count
    });
    wx.showNavigationBarLoading()
    fetchData(this.data.url+'?start='+count+'&count=20').then(res=>{
      this.processData(res)
    })
  },
  processData(res){
    var datas = res.data.subjects;
    var arr = [];
    for (var i = 0; i < datas.length; i++) {
      var cur = datas[i];
      var tmpl = {
        images: cur.images.medium,
        title: cur.title.length>6?cur.title.slice(0,6)+'...':cur.title,
        rating: {

          stars: starToArray(cur.rating.stars),
          average: cur.rating.average
        }
      }
      arr.push(tmpl)
    };
    //如果以前有电影说明要延迟加载
    if(this.data.movies.length>0){
      var arr = this.data.movies.concat(arr);
      this.setData({ movies: arr });
    }
    this.setData({movies:arr});
  wx.hideNavigationBarLoading();
 // console.log(arr)
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