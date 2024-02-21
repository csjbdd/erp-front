import { toRefs, reactive, computed } from 'vue';

const layoutConfig = reactive({
    ripple: Boolean(!localStorage.getItem('ripple') ? false : localStorage.getItem('ripple')),
    darkTheme: null,
    inputStyle: !localStorage.getItem('outlined') ? 'outlined' : localStorage.getItem('outlined'),
    menuMode: !localStorage.getItem('menuMode') ? 'static' : localStorage.getItem('menuMode'),
    theme : 'lara-light-indigo',
    scale: Number(!localStorage.getItem('scale') ? 14 : localStorage.getItem('scale')),
    activeMenuItem: null
});
const layoutState = reactive({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false
});

export function useLayout() {
    const changeThemeSettings = (theme, darkTheme) => {
        layoutConfig.darkTheme = darkTheme;
        layoutConfig.theme = theme;
    };

    const setScale = (scale) => {
        layoutConfig.scale = scale;
        localStorage.setItem('scale',scale);

    };

    const setActiveMenuItem = (item) => {
        layoutConfig.activeMenuItem = item.value || item;
    };

    const onMenuToggle = () => {
        if (layoutConfig.menuMode === 'overlay') {
            layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
        }

        if (window.innerWidth > 991) {
            layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive;
        } else {
            layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
        }
    };

    const isSidebarActive = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive);

    const isDarkTheme = computed(() => layoutConfig.darkTheme);

    return { layoutConfig: toRefs(layoutConfig), layoutState: toRefs(layoutState), changeThemeSettings, setScale, onMenuToggle, isSidebarActive, isDarkTheme, setActiveMenuItem };
}
