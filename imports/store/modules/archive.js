/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
export default {
  namespaced: true,
  state: {
    content: {},
  },
  mutations: {
    setArchiveContent(state, v) {
      state.content = v;
    },
    clearArchiveContent(state) {
      state.content = {};
    },    
  },
};
