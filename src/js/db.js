Jet.define('db',['initData','mark'], function (mod) {
    var type = ["电影", "电视剧", "动画动漫", "综艺其他", "其他"]
    var typeSimple = ["影", "剧", "漫", "综", "它"]
    var attr = {
        '豆瓣评分': 'pingfen',
        '导演': 'daoyan',
        '编剧': 'bianju',
        '主演': 'zhuyan',
        '类型': 'leixing',
        '制片国家/地区': 'diqu',
        '语言': 'yuyan',
        '上映日期': 'riqi',
        '片长': 'pianchang',
        '又名': 'youming',
        'IMDb链接': 'imdb',
        '简介': 'jianjie',
        '首播': 'shoubo',
        '集数': 'jishu',
        '单集片长': 'danji',
        '全部描述': 'des',
        '链接': 'link',
        '备用链接': 'link',
        '提取码': 'pwd',
        '密码': 'pwd',
        '官方网站': 'offical',
        '季数': 'season'
    }
    var data = mod.initData.data;
    var mark=mod.mark.data;
    Jet.import('data',function(mod){
        data=mod.data.data
        if(Jet.router.url==='/'){
            if(Jet.root){
                Jet.root.resetQuery();
            }
            if(Jet.comp){
                Jet.comp.index.showLoading=false;
            }

        }else if(Jet.router.url==='/play'){
            if(Jet.comp){
                Jet.comp.play.init();
            }
        }
    })
    var checkDateTime = function (s, isStart) {
        if (s !== '') {
            if (s.indexOf(' ') === -1) {
                return s + (isStart) ? ' 00:00:00' : ' 23:59:59'
            }
        }
        return s
    }
    var tempData=data;

    Jet.export({
        count:function(){
            return tempData.length
        },
        getType: function (movieType) {
            return type[movieType]
        },
        getTypeSimple: function (movieType) {
            return typeSimple[movieType]
        },
        get: function (index, size) {
            index = index || 0
            size = size || 10
            var start = index * size;
            return tempData.slice(start, start + size)
        },
        loadMark:function(){
            tempData=mark;
            return tempData;
        },
        query: function (str,attr) {
            if(attr==='movieType'||attr==='id'){
                tempData=data.filter(function (item) {
                    return typeof item[attr]!=='undefined'&&item[attr]==str;
                })
            }else{
                attr=attr||"title"
                tempData=data.filter(function (item) {
                    return (typeof item[attr]!=='undefined'&&item[attr].indexOf(str) !== -1)||item.title.indexOf(str)!==-1
                })
            }
            return tempData;
        },
        reset:function(){
            tempData=data;
        },
        combineQuery:function(obj){
            var match=function(data,s,title){
                return s==""||(data&&(data.indexOf(s)!==-1||title.indexOf(s)!==-1))
            }
            tempData=data.filter(function(item){
                return (obj.name==""||(item.title&&item.title.indexOf(obj.name)!==-1)) && 
                    match(item.daoyan,obj.director,item.title)&&
                    match(item.zhuyan,obj.actor,item.title)&&
                    (match(item.leixing,obj.type,item.title) || type[item.movieType].indexOf(obj.type)!==-1)&& 
                    match(item.diqu,obj.area,item.title)
            })
            return tempData
        },
        betweenDate: function (d1, d2) {
            d1 = checkDateTime(d1, true)
            d2 = checkDateTime(d2, false)
            var func = null
            if (d1 == '') {
                func = function (item) {
                    return item.pubDateTime <= d2;
                }
            } else if (d2 == '') {
                func = function (item) {
                    return item.pubDateTime >= d1;
                }
            } else {
                func = function (item) {
                    return item.pubDateTime >= d1 && item.pubDateTime <= d2
                }
            }
            tempData=data.filter(func)
            return tempData;
        },
        getById:function(id){
            var d = data.filter(function(item){
                return item.id===id;
            })
            if(d.length==0){
                return null
            }
            return d[0]
        }
    })


})