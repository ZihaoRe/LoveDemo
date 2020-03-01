<template>
    <div>
        <template v-for="(photo, index) in photos">
            <photo :photo-info="photo" :key="`${photo.img}`" :index="index"></photo>
        </template>
        <index :list="photos" class="nav"></index>
    </div>
</template>

<script>
    import photo from "./photo.vue";
    import index from "./index.vue";
    export default {
        provide: function (){
            return {album: this}
        },
        props: ["photos"],
        components: {
            photo,
            index
        },
        data: function () {
            return {

            };
        },
        mounted: function () {
            let center= this.random([0,this.photos.length-1]);
            this.sort(center);
        },
        updated: function () {
            let center= this.random([0,this.photos.length-1]);
            this.sort(center);
        },
        methods: {
            select: function(elem) {
                let method = elem.substr(0,1) === '.' ? 'getElementsByClassName' : 'getElementById';
                return document[method](elem.substr(1));
            },
            random: function (range) {
                //TODO:should be optimized
                let max = Math.max(range[0],range[1]);
                let min = Math.min(range[0],range[1]);
                let diff = max - min;
                let res = Math.ceil(diff * Math.random() + min);
                return res;
            },
            range: function() {
                let range = {
                    left:{x:[],y:[]},
                    right:{x:[],y:[]}
                };
                let wrap = {
                    width: this.select('#wrap').clientWidth,
                    height: this.select('#wrap').clientHeight
                };
                let photo = {
                    width: this.select('.photo')[0].clientWidth,
                    height: this.select('.photo')[0].clientHeight
                }
                range.wrap = wrap;
                range.photo = photo;

                range.left.x = [0-photo.width,wrap.width/2-photo.width/2];
                range.left.y = [0-photo.height,wrap.height];

                range.right.x = [wrap.width/2+photo.width/2,wrap.width];
                range.right.y = [0-photo.height,wrap.height];

                return range;
            },
            sort:function (index) {
                let _elem = this.select('.photo');
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
                let photo_center = this.select(`#photo_${index}`);
                photo_center.className += ' photo_center ';
                photos.splice(index,1);

                //divide into two parts
                let photos_left = photos.splice(0,Math.ceil(photos.length/2));
                let photos_right = photos;

                let _range = this.range();

                for (let i=0;i<photos_left.length;i++) {
                    photos_left[i].style.left = this.random(_range.left.x) + 'px';
                    photos_left[i].style.top = this.random(_range.left.y) + 'px';
                    photos_left[i].style['transform'] = photos_left[i].style['-webkit-transform'] = `rotate(${this.random([-180,180])}deg) scale(1)`;
                }

                for (let i=0;i<photos_right.length;i++) {
                    photos_right[i].style.left = this.random(_range.right.x) + 'px';
                    photos_right[i].style.top = this.random(_range.right.y) + 'px';
                    photos_right[i].style['transform'] = photos_right[i].style['-webkit-transform'] =`rotate(${this.random([-180,180])}deg) scale(1)`;
                }

                //switch controller
                let navs = this.select('.i');
                for (let i=0;i<navs.length;i++) {
                    navs[i].className = navs[i].className.replace(/\s*i_current\s*/,' ');
                    navs[i].className = navs[i].className.replace(/\s*i_back\s*/,' ');
                }
                this.select(`#nav_${index}`).className += ' i_current ';
            }
        }
    };
</script>
