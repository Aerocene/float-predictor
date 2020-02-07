/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
export default {
  namespaced: true,
  state: {
    content: {},
    archiveUpcoming: [],
    archiveTethered: [],
    archiveFree: [],
    archiveHuman: [],
    archiveMuseo: [],
    archiveMember: [],
    location: {},
  },
  mutations: {
    setArchiveContent(state, v) {
      state.content = v;
    },
    clearArchiveContent(state) {
      state.content = {};
    },  
    setArchiveUpcoming(state, v) {
      state.archiveUpcoming = v;
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
    setLocation(state, v) {
      state.location = v;
    }
  },
};
