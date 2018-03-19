<template>
    <div class="tabItems">
        <div class="Tab_tittle_wrap" @click="tabswitch">
            <span v-for="(v,i) in tabTitle" :style="{width:(100/tabTitle.length-7.5)+'%'}" :class="isShowTab==i?'router-link-active':''">{{v}}<i></i></span>
        </div>
        <div class="Tab_item_wrap">
            <slot></slot>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                tabTitle: [],
                isShowTab: 0,
            }
        },
        created: function() {
            let is = sessionStorage.getItem("isTabShow");
            if(is) {
                this.isShowTab = is;
            } else {
                let URL = libUtils.GetURLParamObj();
                this.isShowTab = URL.isShowTab ? URL.isShowTab : "0";
            }

            setTimeout(function() {
                this.tabswitch(document.querySelector(".Tab_tittle_wrap").children[this.isShowTab].click());
            }.bind(this), 0);
        },
        mounted() {
            let slot = this.$slots.default;
            for(let i = 0; i < slot.length; i++) {
                if(slot[i].tag == "div") {
                    this.tabTitle.push(slot[i].data.attrs.name);
                    if(slot[i].elm) {
                        slot[i].elm.className = "hide";
                        if(this.isShowTab == i) {
                            slot[i].elm.className = "";
                        }
                    };
                }
            }
        },
        methods: {
            tabswitch() {
                if(!event) return;
                let target = event.target;

                if(target.nodeName.toLowerCase() !== 'span') {
                    return;
                }

                let len = target.parentNode.children;
                for(let i = 0; i < len.length; i++) {
                    len[i].index = i;
                    len[i].removeAttribute('class');
                }
                target.setAttribute('class', 'router-link-active');
                this.isShowTab = target.index;

                //tabItems
                let child = this.$el.children[1].children;
                for(let k = 0; k < child.length; k++) {
                    child[k].className = "hide";
                    if(k == target.index) {
                        child[k].className = "showAnminous";
                    }
                }
                try {
                    sessionStorage.setItem("isTabShow", target.index);
                } catch(err) {
                    console.log(err);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

* {
    opacity: 1;
    -webkit-backface-visibility: hidden;
}
/*
.tabItems {
    .Tab_tittle_wrap {
        position: absolute;
        width: 100%;
        top: 0;
        z-index: 2;
        background: yellow;
        display: -webkit-box;
        height: 80px;
        line-height: 80px;
        text-align: center;
        color: red;
        border-bottom: 1px solid rgba(46, 177, 255, 0.08);
        box-shadow: 0px 0px 25px 6px rgba(46, 177, 255, 0.21);
        span {
            display: block;
            text-align: center;
            width: 26%;
            margin: 0 24px;
            font-size: 26px;
            position: relative;
            i {
                display: inline-block;
                position: absolute;
                width: 1px;
                height: 50px;
                top: 15px;
                right: -24px;
                background:blue;
            }
            &:last-child {
                i {
                    display: none;
                }
            }
        }
        .router-link-active {
            color: #8097f9;
            border-bottom: 1px solid #8097f9;
        }
    }
    .Tab_item_wrap {
        position: absolute;
        top: 82px;
        width: 100%;
        z-index: 0;
        background: yellow;
        bottom: 0;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
    }
    .showAnminous {
        opacity: 1;
        -webkit-backface-visibility: hidden;
        -webkit-animation-name: "rightMove";
        /*动画名称，需要跟@keyframes定义的名称一致*/
      //  -webkit-animation-duration: .3s;
        /*动画持续的时间长*/
     //   -webkit-animation-iteration-count: 1;
        /*动画循环播放的次数为1 infinite为无限次*/
        /*
    }
}

@-webkit-keyframes rightMove {
    0% {
        -webkit-transform: translate(110%, 0);
    }
    100% {
        -webkit-transform: translate(0, 0);
    }
}

@-ms-keyframes rightMove {
    0% {
        -ms-transform: translate(110%, 0);
    }
    100% {
        -ms-transform: translate(0, 0);
    }
}

@keyframes rightMove {
    0% {
        -webkit-transform: translate(110%, 0);
        -ms-transform: translate(110%, 0);
        transform: translate(110%, 0);
    }
    100% {
        -webkit-transform: translate(0, 0);
        -ms-transform: translate(0, 0);
        transform: translate(0, 0);
    }
}

   */ 
</style>