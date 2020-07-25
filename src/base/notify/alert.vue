<template>
    <transition name="fade">
        <div class="notify-wrapper" v-if="show" :class="[className]">
            <div class="notify-mask" v-show="showBg" @click.stop></div>
            <div class="notify-alert" :class="[className]">
                <div v-if="$slots.default">
                    <slot></slot>
                </div>
                <div class="notify-tbody" v-else v-html="content"></div>
                <div class="notify-footer">
                    <div class="ft-close" @click="clickFn">{{btnText}}</div>
                </div> 
            </div>
        </div>
    </transition>
</template>

<script>

    export default {
        name: "notice",
        data(){
            return {
               show:false
            }
        },
        props:{

            content:{
                type:String,
                default:''
            },
            btnText:{
                type:String,
                default:'确定'
            },
            className:{
                type:String,
                default:''
            },
            showBg:{
                type:Boolean,
                default:true
            },
            callBack:{
                type:Function,
                default:()=>{}
            },
            transition:{
                type:Boolean,
                default:true
            }
        },
        methods:{
            clickFn(){
                this.show = false;
                this.callBack && this.callBack();
                this.$emit('alertFn')
            },
            showAlert() {
                this.show = true
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
   @import "./index";    
</style>