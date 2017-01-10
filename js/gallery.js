function turns(elem) {
    var name = elem.className;
    var index = elem.id.split('_')[1];

    if (!/photo_center/.test(name)) {
        return sort(index);
    }

    if (/photo_front/.test(name)) {
        name = name.replace(/photo_front/,'photo_back');
        select('#nav_'+index).className += ' i_back ';
    } else {
        name = name.replace(/photo_back/,'photo_front');
        select('#nav_'+index).className = select('#nav_'+index).className.replace(/\s*i_back\s*/,' ');
    }


    return elem.className = name;
}

// common function

//selector function
function select(elem) {
    var method = elem.substr(0,1) == '.' ? 'getElementsByClassName' : 'getElementById';
    return document[method](elem.substr(1));
}
//random number generator function
function random(range) {
    //TODO:should be optimized
    var max = Math.max(range[0],range[1]);
    var min = Math.min(range[0],range[1]);
    var diff = max - min;
    var res = Math.ceil(diff * Math.random() + min);
    return res;
}

var mockData = data;

function init() {
    var template = select('#wrap').innerHTML;
    var html = [];
    var nav = [];
    for (var i = 0; i<mockData.length;i++) {
        var _html = template
            .replace('{{photo_id}}', 'photo_'+i)
            .replace('{{img}}',mockData[i].img)
            .replace('{{title}}',mockData[i].title)
            .replace('{{desc}}',mockData[i].desc);
        html.push(_html);
        nav.push('<span id="nav_'+i+'" class="i" onclick="turns(select(\'#photo_'+i+'\'))"></span>')
    }
    html.push('<div class="nav">'+nav.join('')+'</div>')
    select('#wrap').innerHTML = html.join('');
    var center= random([0,mockData.length-1]);
    sort(center);
}

init();

function range() {
    var range = {
        left:{x:[],y:[]},
        right:{x:[],y:[]}
    };
    var wrap = {
        width: select('#wrap').clientWidth,
        height: select('#wrap').clientHeight
    };
    var photo = {
        width: select('.photo')[0].clientWidth,
        height: select('.photo')[0].clientHeight
    }
    range.wrap = wrap;
    range.photo = photo;

    range.left.x = [0-photo.width,wrap.width/2-photo.width/2];
    range.left.y = [0-photo.height,wrap.height];

    range.right.x = [wrap.width/2+photo.width/2,wrap.width];
    range.right.y = [0-photo.height,wrap.height];

    return range;
}

function sort(index) {
    var _elem = select('.photo');
    var photos = [];
    for (var i = 0;i<_elem.length;i++) {
        //remove old style when sorted again
        _elem[i].className = _elem[i].className.replace(/\s*photo_center\s*/, ' ');
        _elem[i].className = _elem[i].className.replace(/\s*photo_back\s*/, ' ');
        _elem[i].className = _elem[i].className.replace(/\s*photo_front\s*/, ' ');
        //init front style to match the logic of 'turns' function
        _elem[i].className += 'photo_front'
        _elem[i].style.left = '';
        _elem[i].style.top = '';
        _elem[i].style['transform'] = _elem[i].style['-webkit-transform'] = 'rotate(360deg) scale(1.3)';

        photos.push(_elem[i]);
    }
    var photo_center = select('#photo_'+index);
    photo_center.className += ' photo_center ';
    photos.splice(index,1);

    //divide into two parts
    var photos_left = photos.splice(0,Math.ceil(photos.length/2));
    var photos_right = photos;

    var _range = range();

    for (i=0;i<photos_left.length;i++) {
        photos_left[i].style.left = random(_range.left.x) + 'px';
        photos_left[i].style.top = random(_range.left.y) + 'px';
        photos_left[i].style['transform'] = photos_left[i].style['-webkit-transform'] = 'rotate('+random([-180,180])+'deg) scale(1)';
    }

    for (i=0;i<photos_right.length;i++) {
        photos_right[i].style.left = random(_range.right.x) + 'px';
        photos_right[i].style.top = random(_range.right.y) + 'px';
        photos_right[i].style['transform'] = photos_right[i].style['-webkit-transform'] ='rotate('+random([-180,180])+'deg) scale(1)';
    }

    //switch controller
    var navs = select('.i');
    for (i=0;i<navs.length;i++) {
        navs[i].className = navs[i].className.replace(/\s*i_current\s*/,' ');
        navs[i].className = navs[i].className.replace(/\s*i_back\s*/,' ');
    }
    select('#nav_'+index).className += ' i_current ';

}



