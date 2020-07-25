<template>
    <div class="progress-wrapper">
        <div class="image-wrapper" :style="{'left':left}">
            <img src="../../common/image/loadingbus.png" alt="">
        </div>
        <div class="progress-project" :class="`skin-${type}`">
            <div class="pgs-bar" :style="{'width':number}"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                number:'0%',
                left:'0%'
            }
        },
        props: {
            precent: {
                type: Number,
                default: 0
            },
            type:{
                type:Number,
                default:0
            }
        },
        methods: {
            getInit() {
                setTimeout(()=>{                
                    this.number = this.precent * 100 + '%'
                    this.left = (this.precent-0.8/5.4) * 100 + '%'
                },20)
            }
        },
        mounted() {
            this.getInit()
        },
        watch:{
            precent() {
                this.getInit()
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.progress-wrapper
    position relative
    padding-top 0.34rem
    .image-wrapper{
        position absolute
        top 0 
        left 0
        transition:left 1s ease-in-out;
        width 100%
        img {
            width 0.8rem
            height 0.36rem
        }       
    }  
    .progress-project{
        height:0.14rem;
        width:100%;
        position:relative;
        background-color: #E0E0E0;
        border-radius:6px;         
        .pgs-bar{
            width:0;
            height:0.14rem;
            background:linear-gradient(to right,#fed14a,#fcae18);
            border-radius:6px;
            position:relative;
            transition:width 1s ease-in-out;
        }
        &.skin-0{
            background-color: #E0E0E0;
            .pgs-bar{
                background:linear-gradient(to right,#FFA006 ,#FFD508 );
            }
        }
        &.skin-1{
            background-color: #c7ddfb;
            .pgs-bar{
                background:linear-gradient(to right,#78d1fa,#448ff2);
            }
        }
        &.skin-2{
            background-color: #D8D8D8;
            .pgs-bar{
                background:linear-gradient(to right,#3DD186,#0FB381);
            }
        }
    }
</style>
