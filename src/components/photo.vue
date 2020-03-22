<template>
    <div class="photo photo_center photo_front" :id="`photo_${index}`" @click="select()">
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
    import {Bus} from "../main";
    export default {
        name: "photo",
        props: ["index", "photoInfo"],
        inject:['album'],
        data: function (){
            return {

            };
        },
        mounted: function (){
            let that = this;
            Bus.$on("turnsByIndex", function (index) {
                if (index === that.index) {
                    that.turns();
                }
            })
        },
        methods: {
            select: function () {
                this.$store.commit("setSelected", this.index);
                this.turns();
            },
            turns: function () {
                let elem = this.$el;
                let name = elem.className;
                let index = elem.id.split('_')[1];

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
