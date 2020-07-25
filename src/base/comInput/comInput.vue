<template>
    <section class="input-wrapper">
        <input :type="showpas?'':types" :placeholder="placehold" v-model="currentValue" :disabled="disabled" />
        <div class="close-wrapper" v-if="currentValue" @click="clearValues">
            <i class="font_family icon-close"></i>
        </div>
        <div class="icon-wrapper" v-if="icon" @click="change">
            <i class="font_family" :class="showpas?'icon-login_eyesopen':'icon-login_eyesclose'"></i>
        </div>
        <div class="code" v-if="code">
            <procircle class="circle" :radius="32" :percent="percent"  v-show="!show">
                <span class="count">{{count}}s</span>
            </procircle>
            <div class="getcode" v-show="show" @click="onclick">发送验证码</div>            
        </div>
    </section>
</template>

<script>
import procircle from 'components/procircle/procircle'
    export default {
        name: "ksinput",
        props: {
            value:'',
            placehold:{
                type:String,
                default:'请输入手机号码'
            },
            disabled:{
                type:Boolean,
                default:false
            },
            types:{
                type:String,
                default:''
            },
            icon:{
                type:Boolean,
                default:false
            },
            code:{
                type:Boolean,
                default:false
            },
            sended:{
                type:Boolean,
                default:false
            }
        },
        computed:{
            percent() {
                return this.count / this.tim
            },
            currentValue: {  
                // 动态计算currentValue的值  
                get:function() {  
                    return this.value; // 将props中的value赋值给currentValue  
                },  
                set:function(val) {  
                    this.$emit('input', val); // 通过$emit触发父组件  
                }  
            }  
        },
        data() {
            return {
                focus:false,
                showpas:false,
                show: true,
                count: '',
                timer: null,
                tim:60
            }
        },
        mounted() {

            if(this.sended) {
                this.getCode()
            }
        },
        methods: {
            onclick() {
                this.$emit('onClick')
            },
            getCode(){     
            if (!this.timer) {
                this.count = this.tim;
                this.show = false;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= this.tim) {
                        this.count--;
                    } else {
                        this.show = true;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000)
            }            
        } , 
            clearValues() {
                this.currentValue = ''
            },
            change() {
                this.showpas = !this.showpas
            },
            /* changeFocus() {
                this.focus = !this.focus 
            } */
        },
        components:{
            procircle
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
.input-wrapper
    display flex 
    box-sizing border-box
    margin 0 0.3rem
    height 0.88rem
    line-height 0.88rem
    border-bottom-1px(#E0E4E9)
    input
        flex 1       
        outline none
        border none
        color #38404A 
        font-size 0.48rem 
        &::-webkit-input-placeholder
            color #38404A  
    input:-webkit-autofill
        -webkit-box-shadow: 0 0 0 1000px white inset;  //使用足够大的纯色内阴影覆盖黄色背景                   
    .close-wrapper
        flex 0 0 0.4rem
        margin-right 0.2rem
        padding 0 0.2rem
        .icon-close
            font-size 0.24rem
            color rgb(136,144,154)
    .icon-wrapper
        flex 0 0 0.4rem 
        .font_family
            font-size 0.36rem
            color rgb(136,144,154)
    .code
        flex 0 0 2rem
        position relative
        display flex
        padding-bottom 0.15rem
        justify-content center
        align-items flex-end
        .circle
            position absolute
            right 0
            top 0.2rem
        .getcode
            width 1.68rem
            height 0.52rem 
            line-height 0.52rem 
            border-radius 0.26rem
            text-align center
            border: 1px solid #448FF2
            font-size: 0.24rem;
            color: #448FF2; 
        .count
            width 32px
            height 32px
            text-align center
            position absolute
            left 0
            top 0
            line-height 32px
            font-size: 0.24rem;
            color: #D2D7DE;    
</style>
