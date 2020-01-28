/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
export default {
  namespaced: true,
  state: {
    content: {},
    archiveTethered: [],
    archiveFree: [],
    archiveHuman: [],
    archiveMuseo: [],
    archiveMember: [],
  },
  mutations: {
    setArchiveContent(state, v) {
      state.content = v;
    },
    clearArchiveContent(state) {
      state.content = {};
    },  
    setArchiveTethered(state, v) {
      state.archiveTethered = v;
    },
    setArchiveFree(state, v) {
      state.archiveFree = v;
    },
    setArchiveHuman(state, v) {
      state.archiveHuman = v;
    },
    setArchiveMuseo(state, v) {
      state.archiveMuseo = v;
    },
    setArchiveMember(state, v) {
      state.archiveMember = v;
    },
  },
};
