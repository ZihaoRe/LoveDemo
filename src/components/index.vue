<template>
    <div>
        <template v-for="(item, index) in list">
            <span :id="`nav_${index}`" class="i" @click="turnsByIndex"></span>
        </template>
    </div>
</template>
<script>
    export default {
        props: ["list"],
        name: "index",
        inject:['photo'],
        data() {
            return {

            };
        },
        methods: {
            turnsByIndex: function () {

            }
        }
    };
</script>
