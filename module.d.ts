// module.d.ts

declare module "adminui" {
  import * as Vue from "vue";

  interface ApiFormConfig {
    route: string;
    routeParams: Record<string, unknown>;
    method: "PATCH" | "GET" | "POST" | "PUT" | "DELETE";
    idField: string;
    initialData: Record<string, unknown>;
    key: string | Vue.InjectionKey;
    transforms: Record<string, (value: unknown) => unknown>;
    reload: Array<string>;
  }

  export function ref<T extends Vue.Ref>(value: T): T;
  export function ref<T>(value: T): Vue.Ref<Vue.UnwrapRef<T>>;
  export function ref<T = any>(): Vue.Ref<T | undefined>;

  export function reactive<T extends object>(
    target: T
  ): Vue.UnwrapNestedRefs<T>;

  export function computed<T>(
    getter: Vue.ComputedGetter<T>,
    debugOptions?: Vue.DebuggerOptions
  ): Vue.ComputedRef<T>;
  export function computed<T>(
    options: Vue.WritableComputedOptions<T>,
    debugOptions?: Vue.DebuggerOptions
  ): Vue.WritableComputedRef<T>;

  interface ApiForm {
    form: Vue.Reactive<object>;
    formErrors: Vue.Reactive<object>;
    formIsInit: Vue.Ref<boolean>;
    pauseUpdates: () => void;
    formIsSaving: Vue.Ref<boolean>;
    updateRemoteAll: () => void;
  }

  export function useApiForm(config: ApiFormConfig): ApiForm;
}
