<template>
    <album class="wrap" id="wrap" :photos="photoList"></album>
</template>
<script>
    import mockData from "./mockData"
    import Album from "./components/album.vue";
    export default {
        name: "App",
        components: {
            Album
        },
        mounted: function () {
        },
        data: function () {
            return {
                photoList: mockData
            };
        }
    };
</script>
<style lang="css">
    *{
        padding: 0;
        margin: 0;
    }

    p{
        margin:0 0 10px;
    }

    p.desc {
        text-align: center;
        margin-top: 50%;
    }

    body{
        background-color: #fff;
        color: #555;
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
        font-size: 14px;
        -webkit-font-smoothing: antialiased;
    }

    .wrap{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #333;
        overflow: hidden;
        -moz-perspective: 800px;
        -webkit-perspective: 800px;
    }

    .photo{
        cursor: pointer;
        position: absolute;
        width: 260px;
        height: 320px;
        z-index: 1;
        box-shadow: 0 0 1px rgba(0,0,0,.01);
        -webkit-transition: all 1s;
        -moz-transition: all 1s;
        left:50%;
        top:50%;
        margin-left: -130px;
        margin-top:-160px;

    }

    .photo .side{
        width: 100%;
        height: 100%;
        background-color: #eee;
        position: absolute;
        top:0;
        right: 0;
    }

    .photo .side-front .img{
        padding: 15px;
        width: 100%;
        height: 250px;
        line-height: 250px;
        overflow: hidden;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
    }
    .photo .side-front .img img{
        width: 100%;
        vertical-align: middle;
    }
    .photo .side-front .title{
        line-height: 50px;
        text-align: center;
        font-size:16px;
    }

    .photo .side-back{
        padding: 20px;
        color:#666;
        font-size:14px;
        line-height: 1.5em;
    }

    .photo_center{
        width: 260px;
        height: 320px;
        z-index: 99;
        top:50%;
        left:50%;
        margin-left: -130px;
        margin-top:-160px;
    }

    .photo-wrap{
        width: 100%;
        height: 100%;
        -webkit-transition: all 1s;
        -moz-transition: all 1s;
        -webkit-transform-origin: 0% 50%;
        -moz-transform-origin: 0% 50%;
        -webkit-transform-style: preserve-3d;
        -moz-transform-style: preserve-3d;
    }

    .photo-wrap .side-front{
        -webkit-transform: rotateY(0deg);
        -moz-transform: rotateY(0deg);
    }

    .photo-wrap .side-back{
        -webkit-transform: rotateY(180deg);
        -moz-transform: rotateY(180deg);
    }

    .photo-wrap .side{
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
    }

    .photo_front .photo-wrap{
        -webkit-transform: translate(0px,0px) rotateY(0deg);
        -moz-transform: translate(0px,0px) rotateY(0deg);
    }

    .photo_back .photo-wrap{
        -webkit-transform: translate(260px,0px) rotateY(180deg);
        -moz-transform: translate(260px,0px) rotateY(180deg);
    }

    .nav{
        width: 60%;
        height: 30px;
        line-height: 30px;
        position: absolute;
        left:20%;
        bottom:45px;
        z-index: 999;
        text-align: center;
    }

    .nav .i{
        width: 30px;
        height: 30px;
        display: inline-block;
        cursor: pointer;
        background-color: #000;
        border-radius: 50%;

        -webkit-transform: scale(.48);
        -moz-transform: scale(.48);
        -webkit-transition: all 1s;
        -moz-transition: all 1s;
    }

    .nav .i_current{
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
    }

    .nav .i_back{
        -webkit-transform: rotateY(-180deg);
        -moz-transform: rotateY(-180deg);
        background-color: #555;
    }
</style>