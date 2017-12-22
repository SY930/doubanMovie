function fetchData(url) {
  var promise = new Promise((resolve, reject) => {
    wx.request({
      url,
      data: {},
      method: 'GET',
      header: {
        // 访问豆瓣 不能给application/json
        'content-type': 'json'
      },
   
      success: resolve,
      fail: reject
    })
  });
  return promise;
}
function starToArray(score){
 var star = score.slice(0,1);
 var arr = [];
 for (var i = 0; i < star; i++) {
   arr.push(1)
 }
 for (var i = 0; i < 5-star; i++) {
   arr.push(0)
 }
 return arr;
}
export { fetchData, starToArray } 