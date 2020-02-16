<template>
    <div>
        <template v-for="(item, index) in list">
            <span :id="`nav_${index}`" class="i" @click="turnsByIndex(index)"></span>
        </template>
    </div>
</template>
<script>
    import {Bus} from "../main";
    export default {
        props: ["list"],
        name: "index",
        data: function () {
            return {

            };
        },
        methods: {
            turnsByIndex: function (index) {
                Bus.$emit("turnsByIndex", index);
            }
        }
    };
</script>
