// module.d.ts
export {};
declare module "adminui" {
  import * as Vue from "vue";

  interface ApiFormConfig {
    route: string;
    routeParams: Record<string, unknown>;
    method: "PATCH" | "GET" | "POST" | "PUT" | "DELETE";
    idField: string;
    initialData: Record<string, unknown>;
    key: string | Vue.InjectionKey<string>;
    transforms: Record<string, (value: unknown) => unknown>;
    reload: Array<string>;
  }

  const ref: typeof import("vue")["ref"];
  const computed: typeof import("vue")["computed"];
  const reactive: typeof import("vue")["reactive"];
  const inject: typeof import("vue")["inject"];
  const provide: typeof import("vue")["provide"];
  const getCurrentInstance: typeof import("vue")["getCurrentInstance"];
  const watch: typeof import("vue")["watch"];
  const watchEffect: typeof import("vue")["watchEffect"];
  const nextTick: typeof import("vue")["nextTick"];
  const onBeforeMount: typeof import("vue")["onBeforeMount"];
  const onMounted: typeof import("vue")["onMounted"];
  const onBeforeUnmount: typeof import("vue")["onBeforeUnmount"];
  const onUnmounted: typeof import("vue")["onUnmounted"];
  const onUpdated: typeof import("vue")["onUpdated"];
  const onActivated: typeof import("vue")["onActivated"];
  const onDeactivated: typeof import("vue")["onDeactivated"];
  const onErrorCaptured: typeof import("vue")["onErrorCaptured"];
  const readonly: typeof import("vue")["readonly"];
  const toRaw: typeof import("vue")["toRaw"];
  const markRaw: typeof import("vue")["markRaw"];
  const isRef: typeof import("vue")["isRef"];
  const isProxy: typeof import("vue")["isProxy"];
  const unref: typeof import("vue")["unref"];
  const toRef: typeof import("vue")["toRef"];
  const toRefs: typeof import("vue")["toRefs"];
  const isReactive: typeof import("vue")["isReactive"];
  const isReadonly: typeof import("vue")["isReadonly"];
  const shallowRef: typeof import("vue")["shallowRef"];
  const h: typeof import("vue")["h"];
  const useTemplateRef: typeof import("vue")["useTemplateRef"];
  const useId: typeof import("vue")["useId"];
  const toValue: typeof import("vue")["toValue"];
  const useSlots: typeof import("vue")["useSlots"];
  const useAttrs: typeof import("vue")["useAttrs"];
  const defineAsyncComponent: typeof import("vue")["defineAsyncComponent"];
  const useModel: typeof import("vue")["useModel"];
  const hydrateOnIdle: typeof import("vue")["hydrateOnIdle"];
  const hydrateOnVisible: typeof import("vue")["hydrateOnVisible"];
  const hydrateOnMediaQuery: typeof import("vue")["hydrateOnMediaQuery"];
  const hydrateOnInteraction: typeof import("vue")["hydrateOnInteraction"];

  const usePage: typeof import("@inertiajs/vue3")["usePage"];
  const useForm: typeof import("@inertiajs/vue3")["useForm"];
  const router: typeof import("@inertiajs/vue3")["router"];
  const Link: typeof import("@inertiajs/vue3")["Link"];
  const Head: typeof import("@inertiajs/vue3")["Head"];

  const useRoute: () => typeof import("ziggy-js")["route"];

  interface ApiForm {
    form: object;
    formErrors: object;
    formIsInit: Vue.Ref<boolean>;
    pauseUpdates: () => void;
    formIsSaving: Vue.Ref<boolean>;
    updateRemoteAll: () => void;
  }

  export function useApiForm(config: ApiFormConfig): ApiForm;
}
