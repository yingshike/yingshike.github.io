
new Jet({
  beforeinitawait:function(next){
    // __yingshike_data
    // <script type="text/javascript" src="assets/js/jet.min.js"></script>
    this.$import('db',function(mod){
      Jet.prototype.db=mod.db;
      next();
    })
  },
  onroute: function () {
    this.$dom.out.html = '<div class="APP_Loading router-out"><i class="j-icon icon-spin icon-spinner-indicator"></i></div>';
  },
  onrouted:function(){
    if(this.$data.hidePages.indexOf(Jet.router.url)!==-1){
      this.showSearch=false;
    }else{
      this.showSearch=true;
    }
  },
  beforemount:function(){
    Jet.import('@bg',function(mod){})
  },
  onmounted:function(){
    //this.list=Jet.module.data.get(this.index,this.size)
    // this.list=Jet.module.db.query('蜘蛛侠')
    Jet.VAR={
      'maxWidth':1200,
      'mobileWidth':600,
      headHeight:60
    }
    this.$dom.down.class='-hide'
  },
  static:{
    hidePages:['/net'],
    attr:['title','daoyan','zhuyan','leixing','diqu','yuyan','des','date']
  },
  data:{
    shang:false,
    sp:false,
    size:10,
    index:0,
    searchText:'',
    fromSearch:false,
    formSearchCombine:false,
    showSearch:true,

    fromSearchBtn:false,
    searchBtnText:'',
    searchBtnType:'',

    list:[],
    down:false,
    type:"0",
    searchObj:{
      name:'',director:'',actor:'',type:'',area:''
    },
    typeArr0:['电影',"电视剧",'动漫','综艺','其他'],
    typeArr:["爱情", "剧情", "喜剧", "家庭", "伦理", "文艺", "音乐", "歌舞", "动漫", "西部", "武侠", "古装", "动作", "恐怖", "惊悚", "冒险", "犯罪", "悬疑", "记录", "战争", "历史", "传记", "体育", "科幻", "魔幻", "奇幻"],
    areaArr:['中国大陆','港澳台','美国','韩国','英国','日本','泰国'],
    searchArr:['',''],
/* <div class='j-option' value='0'>按名称</div>
<div class='j-option' value='1'>按导演</div>
<div class='j-option' value='2'>按主演</div>
<div class='j-option' value='3'>按类型</div>
<div class='j-option' value='4'>按地区</div>
<div class='j-option' value='5'>按语言</div>
<div class='j-option' value='6'>按简介</div>
<div class='j-option' value='7'>按时间</div>
<div class='j-option' value='8'>按全网</div> */
  },
  func:{
    showShang:function(){
      this.shang=true
    },
    showSp:function(){
      this.sp=true
    },
    isMobile:function(){
      return (this.$.width()<600)
    },
    co:function(){
        JUI.confirm({
            title:"广告合作",
            text:'广告合作等请发邮件至 : me@yingshike.com',
        })
    },
    toIndex:function(){
      if(Jet.router.url!=='/'){
          Jet.router.route('/')
      }
    },
    toggleDown:function(){
      this.down=!this.down
    },
    clearSearch:function(){
      this.fromSearch=false;
      this.formSearchCombine=false;
      this.fromSearchBtn=false;
      this.combine=false;
    },
    resetQuery:function(){
      this.searchText='';
      this.searchArr=['',''];
      this.searchBase();
    },
    checkKeyDown:function(opt){
      if(opt.event.keyCode==13){
        this.search();
      }
    },
    search:function(){
      if(this.type=="8"){
        Jet.router.route('/net?s='+this.searchText)
        this.down=false;
      }else{
        this.searchArr=[this.searchText,this.$data.attr[this.type]];
        this.searchBase();
      }
    },
    searchByBtn:function(opt){
      var s=opt.ele.txt();
      this.searchArr[0]=s;
      this.searchText=='';
      if(this.typeArr0.indexOf(s)!==-1){
        this.searchArr[0]=this.typeArr0.indexOf(s)
        this.searchArr[1]='movieType'
      }else if(this.typeArr.indexOf(s)!==-1){
        this.searchArr[1]='leixing'
      }else if(this.areaArr.indexOf(s)!==-1){
        this.searchArr[1]='diqu'
      }
      this.searchBase('formSearchBtn');
    },
    searchBase:function(s){
      if(Jet.router.url==='/'){
        Jet.comp.index.query();
      }else{
        this.fromSearch=true;
        Jet.router.route('/')
      }
    },
    searchCombine:function(){
      this.combine=true;
      this.searchBase();
    },
    attachResize:function(fun) {
      if (document.addEventListener) {
        window.addEventListener('resize', fun, false);
      } else if (document.attachEvent) {
        window.attachEvent('onresize', fun);
      }
    },
    removeResize:function(func){
      window.removeEventListener("resize", func);
    }
  }
})
      