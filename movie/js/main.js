var app = new Vue({
  el: '#main',
  data: {
    'ttl_main': '',
    'ttl_sub': '',
    'txt_result': '',
    'img_result': '',
    'vote_average': '',
    load : false
  },
  beforeCreate: function(){
  },
  created: function(){
  },
  mounted: function(){
    this.getData();
  },
  filters: {
    
  },
  methods: {
     getHashTag : function() {
      let hash = decodeURIComponent(location.hash.substring(1));
      let base = ['27', '28', '878'];
      if (base.indexOf(hash) === -1) {
        location.href = 'index.html';
        return false;
      }
      return hash;
    },
    getData : function(){
      //ろーでぃんぐ
      //loadStart();
      this.load = true;
      let data = {
        with_genres: this.getHashTag(),
        api_key: '7c3188e9c8d1ac9ba73cbb14e3e3e53d',
        sort_by: 'popularity.desc',
        page: Math.floor(Math.random() * 21),
        language: 'ja-JP'
      }
      let url = 'https://api.themoviedb.org/3/discover/movie?' + $.param(data);
      axios.get(
        url,
        {
          method: 'GET',
          headers: {
            'Content-Type': "application/x-www-form-urlencoded"
          }
        }
      )
      .then(function(response){
        let ram = Math.floor(Math.random() * 11);
        let result = response.data.results[ram];
        this.ttl_main     = result.title;
        this.txt_result   = result.overview;
        this.img_result   = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'+result.poster_path;
        this.vote_average = result.vote_average;
        console.log(result);
        console.log(ram);
        //ローディグ終了
        //loadEnd();
        this.load = false;
      }.bind(this))
      .catch(function(error){
        console.log(error);
        //ローディグ終了
        //loadEnd();
        this.load = false;
      })
    }
  }
})

//リロード
$(function () {
  $("#lod").on("click", function () {
    location.reload();
  });
});