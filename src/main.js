const mockData = require("./mockData");
require('../css/gallery.css');

const turns = (elem) => {
    let name = elem.className;
    let index = elem.id.split('_')[1];

    if (!/photo_center/.test(name)) {
        return sort(index);
    }

    if (/photo_front/.test(name)) {
        name = name.replace(/photo_front/,'photo_back');
        select(`#nav_${index}`).className += ' i_back ';
    } else {
        name = name.replace(/photo_back/,'photo_front');
        select(`#nav_${index}`).className = select(`#nav_${index}`).className.replace(/\s*i_back\s*/,' ');
    }


    return elem.className = name;
};

// common function

//selector function
let select = (elem) => {
    let method = elem.substr(0,1) === '.' ? 'getElementsByClassName' : 'getElementById';
    return document[method](elem.substr(1));
};
//random number generator function
let random = (range) => {
    //TODO:should be optimized
    let max = Math.max(range[0],range[1]);
    let min = Math.min(range[0],range[1]);
    let diff = max - min;
    let res = Math.ceil(diff * Math.random() + min);
    return res;
};

let range = () => {
    let range = {
        left:{x:[],y:[]},
        right:{x:[],y:[]}
    };
    let wrap = {
        width: select('#wrap').clientWidth,
        height: select('#wrap').clientHeight
    };
    let photo = {
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
};

let sort = (index) => {
    let _elem = select('.photo');
    let photos = [];
    for (let i = 0;i<_elem.length;i++) {
        //remove old style when sorted again
        _elem[i].className = _elem[i].className.replace(/\s*photo_center\s*/, ' ');
        _elem[i].className = _elem[i].className.replace(/\s*photo_back\s*/, ' ');
        _elem[i].className = _elem[i].className.replace(/\s*photo_front\s*/, ' ');
        //init front style to match the logic of 'turns' function
        _elem[i].className += 'photo_front';
        _elem[i].style.left = '';
        _elem[i].style.top = '';
        _elem[i].style['transform'] = _elem[i].style['-webkit-transform'] = 'rotate(360deg) scale(1.3)';

        photos.push(_elem[i]);
    }
    let photo_center = select(`#photo_${index}`);
    photo_center.className += ' photo_center ';
    photos.splice(index,1);

    //divide into two parts
    let photos_left = photos.splice(0,Math.ceil(photos.length/2));
    let photos_right = photos;

    let _range = range();

    for (let i=0;i<photos_left.length;i++) {
        photos_left[i].style.left = random(_range.left.x) + 'px';
        photos_left[i].style.top = random(_range.left.y) + 'px';
        photos_left[i].style['transform'] = photos_left[i].style['-webkit-transform'] = `rotate(${random([-180,180])}deg) scale(1)`;
    }

    for (let i=0;i<photos_right.length;i++) {
        photos_right[i].style.left = random(_range.right.x) + 'px';
        photos_right[i].style.top = random(_range.right.y) + 'px';
        photos_right[i].style['transform'] = photos_right[i].style['-webkit-transform'] =`rotate(${random([-180,180])}deg) scale(1)`;
    }

    //switch controller
    let navs = select('.i');
    for (let i=0;i<navs.length;i++) {
        navs[i].className = navs[i].className.replace(/\s*i_current\s*/,' ');
        navs[i].className = navs[i].className.replace(/\s*i_back\s*/,' ');
    }
    select(`#nav_${index}`).className += ' i_current ';
};

let init = () => {
    let template =
        '<div class="photo photo_center photo_front" id="{{photo_id}}">' +
            '<div class="photo-wrap">' + //used for reversing
                '<div class="side side-front">' +
                    '<p class="img"><img src="img/{{img}}"></p>' +
                    '<p class="title">{{title}}</p>' +
                '</div>' +
                '<div class="side side-back">' +
                    '<p class="desc">{{desc}}</p>' +
                '</div>' +
            '</div>' +
        '</div>';
    let html = [];
    let nav = [];
    for (let i = 0; i<mockData.length;i++) {
        let _html = template
            .replace('{{photo_id}}', `photo_${i}`)
            .replace('{{img}}',mockData[i].img)
            .replace('{{title}}',mockData[i].title)
            .replace('{{desc}}',mockData[i].desc);
        html.push(_html);
        nav.push(`<span id="nav_${i}" class="i"></span>`)
    }
    html.push(`<div class="nav">${nav.join('')}</div>`);
    select('#wrap').innerHTML = html.join('');
    document.getElementById("wrap").addEventListener("click", function(e){
        let target = e.target;
        while(target !== document.getElementById("wrap") ){
            if(target.tagName.toLowerCase() === 'div' && (target.className.indexOf("photo_center") !== -1 || target.className.indexOf("photo_front") !== -1 || target.className.indexOf("photo_back") !== -1)){
                turns(target);
                break;
            } else if (target.tagName.toLowerCase() === 'span' && target.className.indexOf("i") !== -1) {
                let _id = target.id.replace("nav_", "");
                turns(select(`#photo_${_id}`));
            }
            target = target.parentNode;
        }
    });
    let center= random([0,mockData.length-1]);
    sort(center);
};

init();



