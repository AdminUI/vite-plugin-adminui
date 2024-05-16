const virtualModuleId = "adminui";
const resolvedVirtualModuleId = "\0" + virtualModuleId;

export default function vitePluginAdminui({ version = "3" } = {}) {
  return {
    name: "vite-plugin-adminui",
    config: () => ({
      resolve: {
        alias: {
          vue: `https://unpkg.com/vue@${version}/dist/vue.esm-browser.js`,
        },
      },
      optimizeDeps: {
          exclude: ["vue"],
      },
    }),
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
                export const watch = namespace.watch;
                export const watchEffect = namespace.watchEffect;
                export const nextTick = namespace.nextTick;
                export const onBeforeMount = namespace.onBeforeMount;
                export const onMounted = namespace.onMounted;
                export const onBeforeUnmount = namespace.onBeforeUnmount;
                export const onUnmounted = namespace.onUnmounted;
                export const onUpdated = namespace.onUpdated;
                export const onActivated = namespace.onActivated;
                export const onDeactivated = namespace.onDeactivated;
                export const onErrorCaptured = namespace.onErrorCaptured;
                export const readonly = namespace.readonly;
                export const toRaw = namespace.toRaw;
                export const markRaw = namespace.markRaw;
                export const isRef = namespace.isRef;
                export const isProxy = namespace.isProxy;
                export const unref = namespace.unref;
                export const toRef = namespace.toRef;
                export const toRefs = namespace.toRefs;
                export const isReactive = namespace.isReactive;
                export const isReadonly = namespace.isReadonly;
                export const shallowRef = namespace.shallowRef;
                export const h = namespace.h;

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

                export const DefaultLayout = namespace.layouts?.default;
                export const ProductLayout = namespace.layouts?.product;
                `;
      }
    },
  };
}
