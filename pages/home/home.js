import { fetchData, starToArray } from '../../util/util.js';
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {
      movies: [],
      name: '电影'
    },
    commingSoon: {
      movies: [],
      name: '即将上映'
    },
    top250: {
      movies: [],
      name: 'top250'
    }
  },
  // 跳转到搜索页面
  bindToSearch() {
    wx.navigateTo({
      url: 'search-page/search-page',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 默认返回20条  显示6条
    fetchData('https://api.douban.com/v2/movie/in_theaters?star=0&&count=6').then(res => {
      // console.log(res);
      this.processData(res, '电影', 'inTheaters')
    });
    // fetchData('https://api.douban.com/v2/movie/coming_soon?star=0&&count=6').then(res => {
    //   // console.log(res);
    //   this.processData(res, '即将上映', 'commingSoon')
    // });
    // fetchData('https://api.douban.com/v2/movie/top250?star=0&&count=6').then(res => {
    //   // console.log(res);
    //   this.processData(res, 'top250', 'top250')
    // })
  },
  bindToMore(e) {
    var val = e.currentTarget.dataset.more;
    console.log(val)
    wx.navigateTo({
      url: 'detail/detail?type=' + val,
    })
  },
  bindToDetail(e) {
    var mid = e.currentTarget.dataset.mid;
    // console.log(mid);
    wx.navigateTo({
      url: 'movie/movie?id=' + mid
    })
  },
  processData(res, name, type) {
    var datas = res.data.subjects;
    var arr = [];
    for (var i = 0; i < datas.length; i++) {
      var cur = datas[i];
      var tmpl = {
        images: cur.images.medium,
        title: cur.title.length > 6 ? cur.title.slice(0, 6) + '...' : cur.title,
        rating: {

          stars: starToArray(cur.rating.stars),
          average: cur.rating.average
        },
        id: cur.id
      }
      arr.push(tmpl)
    };
    // console.log(arr)
    var obj = {};
    obj[type] = {
      movies: arr,
      name

    }
    // type是对象中的一个key,并不是一个完整的key,要的是一个变量名
    this.setData(obj)
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