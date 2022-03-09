import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { computed } from "vue";

const breakpoints = useBreakpoints(breakpointsTailwind);

const sm = breakpoints.smaller("sm");
const md = breakpoints.between("sm", "md");
const lg = breakpoints.between("md", "lg");
const xl = breakpoints.between("lg", "xl");
const xxl = breakpoints.between("xl", "2xl");
const xxxl = breakpoints["2xl"];
/**
 * 响应式样式
 * @param {any} (
 * @returns {any}
 */
const reactiveStyle = computed(() => {
  let iconArea = "";
  let picture = "";
  let slider = "";
  if (xxxl.value) {
    iconArea = "music-name";
    picture = "picture";
    slider = "slider";
  } else if (xxl.value) {
    iconArea = "xxl-music-name";
    picture = "xxl-picture";
    slider = "xxl-slider";
  } else if (xl.value) {
    iconArea = "xl-music-name";
    picture = "xl-picture";
    slider = "xl-slider";
  } else if (lg.value) {
    iconArea = "lg-music-name";
    picture = "lg-picture";
    slider = "lg-slider";
  } else if (md.value) {
    iconArea = "md-music-name";
    picture = "md-picture";
    slider = "md-slider";
  } else if (sm.value) {
    iconArea = "sm-music-name";
    picture = "sm-picture";
    slider = "sm-slider";
  }
  return {
    iconArea,
    picture,
    slider,
  };
});

export { reactiveStyle };
