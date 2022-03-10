import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { computed } from "vue";

const breakpoints = useBreakpoints(breakpointsTailwind);

const sm = breakpoints.smaller("sm");
const md = breakpoints.between("sm", "md");
const lg = breakpoints.between("md", "lg");
const xl = breakpoints.between("lg", "xl");
const xxl = breakpoints.between("xl", "2xl");
const xxxl = breakpoints["2xl"];

const reactiveStyle = computed(() => {
  let width = "";
  if (xl.value || xxl.value || xxxl.value) {
    width = "large-width";
  } else if (lg.value || sm.value || md.value) {
    width = "small-width";
  }
  return {
    width,
  };
});

export default reactiveStyle;
