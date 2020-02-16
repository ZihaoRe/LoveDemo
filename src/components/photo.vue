<template>
    <div class="photo photo_center photo_front" :id="`photo_${index}`" @click="turns">
        <div class="photo-wrap"><!--used for reversing-->
            <div class="side side-front">
                <p class="img"><img :src="`img/${photoInfo.img}`"></p>
                <p class="title">{{photoInfo.title}}</p>
            </div>
            <div class="side side-back">
                <p class="desc">{{photoInfo.desc}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        provide(){
            return { photo: this}
        },
        name: "photo",
        props: ["index", "photoInfo"],
        inject:['album'],
        data() {
            return {

            };
        },
        methods: {
            turns: function () {
                let elem = this.$el;
                let name = elem.className;
                let index = elem.id.split('_')[1];

                if (!/photo_center/.test(name)) {
                    return this.album.sort(index);
                }

                if (/photo_front/.test(name)) {
                    name = name.replace(/photo_front/,'photo_back');
                    this.album.select(`#nav_${index}`).className += ' i_back ';
                } else {
                    name = name.replace(/photo_back/,'photo_front');
                    this.album.select(`#nav_${index}`).className = this.album.select(`#nav_${index}`).className.replace(/\s*i_back\s*/,' ');
                }
                return elem.className = name;
            }
        }
    };
</script>
