/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
export default {
  namespaced: true,
  state: {
    showLegend: true,
    content: {},
    archiveUpcoming: [],
    archiveUpcomingEnabled: true,
    archiveTethered: [],
    archiveTetheredEnabled: true,
    archiveFree: [],
    archiveFreeEnabled: true,
    archiveHuman: [],
    archiveHumanEnabled: true,
    archiveMuseo: [],
    archiveMuseoEnabled: true,
    archiveMember: [],
    archiveMemberEnabled: true,
    location: {},
  },
  mutations: {
    setShowLegend(state, v) {
      state.showLegend = v;
    },
    setArchiveContent(state, v) {
      state.content = v;
      if (v === undefined || v.title === undefined)
      {
        state.showLegend = true;
      }
    },
    clearArchiveContent(state) {
      state.content = {};
      state.showLegend = true;
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

    setArchiveUpcomingEnabled(state, v) {
      state.archiveUpcomingEnabled = v;
    },
    setArchiveTetheredEnabled(state, v) {
      state.archiveTetheredEnabled = v;
    },
    setArchiveFreeEnabled(state, v) {
      state.archiveFreeEnabled = v;
    },
    setArchiveHumanEnabled(state, v) {
      state.archiveHumanEnabled = v;
    },
    setArchiveMuseoEnabled(state, v) {
      state.archiveMuseoEnabled = v;
    },
    setArchiveMemberEnabled(state, v) {
      state.archiveMemberEnabled = v;
    },

    setLocation(state, v) {
      state.location = v;
    }
  },
};
