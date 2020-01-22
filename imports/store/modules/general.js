/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
export default {
  namespaced: true,
  state: {
    isLoading: true, // are we still loading?
    transitionName: '',
    transitionMode: '',
    animationHeight: 'normal',
    isChoosingDestination: true,
    isAltPanelOpen: false,
    webColors: [
      '#FF060D', 
      '#F0E41E', 
      '#00FA00', 
      '#FFAC00', 
      '#8A7CEF', 
      '#FF81EB', 
      '#490073', 
      '#ffffff'
    ],
    isMenuOpen: false,
    isInfoBoxOpen: false,
    isWindPanelOpen: false,
    deviceName: '', // (small, medium, big) or (phone, tablet, desktop) ???
    modalShow: true,
    isPredictor: true,
    errorContent: '',
  },
  mutations: {
    setModalShow(state, v) {
      state.modalShow = v;
    },
    setAltPanel(state, v) {
      state.isAltPanelOpen = v;
    },
    loadingComplete(state) {
      state.isLoading = false;
    },
    setTransition(state, value) {
      state.transitionName = value;
    },
    setTransitionMode(state, value) {
      state.transitionMode = value;
    },
    setDevice(state, deviceName) {
      state.deviceName = deviceName;
    },
    toggleMenu(state) {
      state.isMenuOpen = !state.isMenuOpen;
    },
    toggleInfoBox(state) {
      state.isInfoBoxOpen = !state.isInfoBoxOpen;
    },
    setInfoBox(state, v) {
      state.isInfoBoxOpen = v;
    },
    setWindPanel(state, v) {
      state.isWindPanelOpen = v;
    },
    toggleWindPanel(state) {
      if (!state.isWindPanelOpen && state.isInfoBoxOpen) {
        state.isInfoBoxOpen = false;
      }
      state.isWindPanelOpen = !state.isWindPanelOpen;
    },
    closeMenu(state) {
      state.isMenuOpen = false;
    },
    closeInfoBox(state) {
      state.isInfoBoxOpen = false;
    },
    closeWindsPanel(state) {
      state.isWindPanelOpen = false;
    },
    setFormStatus(state, value) {
      state.isChoosingDestination = value;
    },
    setAnimationHeight(state, value) {
      state.animationHeight = value;
    },
    setIsPredictor(state, value) {
      state.isPredictor = value;
    },
    setErrorContent(state, value) {
      state.errorContent = value;
    },
  },
  getters: {
    isSmall: state => state.deviceName === 'small',
  },
};
