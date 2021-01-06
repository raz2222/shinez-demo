Vue.config.devtools = true;
Vue.component("phone", {
  template:
    '\n    <div class="phone-wrap"\n      @mousemove="handleMouseMove"\n      @mouseenter="handleMouseEnter"\n      @mouseleave="handleMouseLeave"\n      ref="phone">\n      <div class="phone"\n        :style="phoneStyle">\n        <div class="phone-bg" :style="[phoneBgImage]"></div>\n        </div>\n      </div>\n    </div>',

  mounted() {
    this.width = this.$refs.phone.offsetWidth;
    this.height = this.$refs.phone.offsetHeight;
  },

  props: ["dataImage"],
  data: () => ({
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
    mouseLeaveDelay: null,
  }),
  computed: {
    mousePX() {
      return this.mouseX / this.width;
    },

    mousePY() {
      return this.mouseY / this.height;
    },

    phoneStyle() {
      const rX = this.mousePX * 20;
      const rY = this.mousePY * -20;
      return {
        transform: "rotateY(" + rX + "deg) rotateX(" + rY + "deg)",
      };
    },

    phoneBgImage() {
      return {
        backgroundImage: "url(" + this.dataImage + ")",
      };
    },
  },
  methods: {
    handleMouseMove(e) {
      this.mouseX = e.pageX - this.$refs.phone.offsetLeft - this.width / 2;
      this.mouseY = e.pageY - this.$refs.phone.offsetTop - this.height / 2;
    },

    handleMouseEnter() {
      clearTimeout(this.mouseLeaveDelay);
    },

    handleMouseLeave() {
      this.mouseLeaveDelay = setTimeout(() => {
        this.mouseX = 0;
        this.mouseY = 0;
      }, 2000);
    },
  },
});
const app = new Vue({
  el: "#phone",
});
