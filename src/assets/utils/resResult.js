export default {
  successCheck(res = {}) {
    const {
      code,
    } = res;
    return code == 0;
  },
}