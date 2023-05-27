const virtualModuleId = "virtual:adminui";
const resolvedVirtualModuleId = "\0" + virtualModuleId;

export default function vitePluginAdminui() {
    return {
        name: "vite-plugin-adminui",
        resolveId(id) {
            if (id === virtualModuleId) {
                return resolvedVirtualModuleId;
            }
        },
        load(id) {
            if (id === resolvedVirtualModuleId) {
                return `const namespace = globalThis.$adminui;

                export const ref = namespace.ref;
                export const computed = namespace.computed;
                export const reactive = namespace.reactive;
                export const inject = namespace.inject;
                export const provide = namespace.provide;
                export const getCurrentInstance = namespace.getCurrentInstance;

                export const useApiForm = namespace.useApiForm;
                export const useCheckPermissions = namespace.useCheckPermissions;
                export const useEcho = namespace.useEcho;
                export const useI18n = namespace.useI18n;
                export const useSnackbar = namespace.useSnackbar;
                export const useTheme = namespace.useTheme;
                export const useVuetify = namespace.useVuetify;
                export const useWysiwygImagePicker = namespace.useWysiwygImagePicker;
                export const axios = namespace.axios;

                export const currency = namespace.currency;
                export const humanFileSize = namespace.humanFileSize;
                export const shortDate = namespace.shortDate;
                export const shortDateOnly = namespace.shortDateOnly;
                export const mediumDate = namespace.mediumDate;
                export const mediumDateOnly = namespace.mediumDateOnly;

                export const usePage = namespace.usePage;
                export const useForm = namespace.useForm;
                export const router = namespace.router;
                export const useRoute = namespace.useRoute;
                export const Link = namespace.Link;
                export const Head = namespace.Head;
                `;
            }
        },
    };
}
