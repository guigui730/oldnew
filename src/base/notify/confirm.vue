<template>
    <transition name="fade">
        <div class="notify-wrapper" v-if="show" :class="[className]">
            <div class="notify-mask" v-show="showBg"></div>
            <div class="notify-alert" :class="[className]">                
                <div v-if="$slots.default">
                    <slot></slot>
                </div>
                <div class="notify-tbody" v-else v-html="content"></div>
                <div class="notify-footer">
                    <div class="ft-cancle" @click="cancleFn">{{btnText[0]}}</div>
                    <div class="ft-close" @click="confirmFn">{{btnText[1]}}</div>
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
                type:Array,
                default:()=>{
                    return ['取消','确认'];
                }
            },
            className:{
                type:String,
                default:''
            },
            callBack:{
                type:Function,
                default:()=>{}
            },
            successCallBack:{
                type:Function,
                default:()=>{}
            },
            showBg:{
                type:Boolean,
                default:true
            },
            transition:{
                type:Boolean,
                default:true
            }
        },
        methods:{
            cancleFn(){
                this.show = false;
                this.$emit('cancel')
                this.callBack && this.callBack();
            },
            confirmFn(){
                this.show = false;
                this.$emit('success')
                this.successCallBack && this.successCallBack();
            },
            showConfirm() {
                this.show = true;
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "./index"; 
</style>
