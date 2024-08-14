import type { Component, VNodeProps } from 'vue';

export type ComponentType = keyof ComponentProps;

type MethodsNameToCamelCase<
  T extends string,
  M extends string = '',
> = T extends `${infer F}-${infer N}${infer Tail}`
  ? MethodsNameToCamelCase<Tail, `${M}${F}${Uppercase<N>}`>
  : `${M}${T}`;

type MethodsNameTransform<T> = {
  [K in keyof T as K extends `on${string}` ? MethodsNameToCamelCase<K> : never]: T[K];
};

type ExtractPropTypes<T extends Component> = T extends new (...args: any) => any
  ? Omit<InstanceType<T>['$props'], keyof VNodeProps>
  : never;

interface _CustomComponents {
  Auth: ExtractPropTypes<(typeof import('@/components/Authentication/index.vue')['default'])>;
  CabinetList: ExtractPropTypes<(typeof import('@/components/Cabinet/List/index.vue')['default'])>;
  InventoryCheckOne: ExtractPropTypes<(typeof import('@/components/Inventory/CheckOne.vue')['default'])>;
  InventoryCheckTwo: ExtractPropTypes<(typeof import('@/components/Inventory/CheckTwo.vue')['default'])>;
  InventoryCheckThree: ExtractPropTypes<(typeof import('@/components/Inventory/CheckThree.vue')['default'])>;
  Success: ExtractPropTypes<(typeof import('@/components/SuccessPage/index.vue')['default'])>;
  RevocationList: ExtractPropTypes<(typeof import('@/components/RevocationList/index.vue')['default'])>;
  TurnInUserSelect: ExtractPropTypes<(typeof import('@/components/TurnIn/UserSelect.vue')['default'])>;
}

type CustomComponents<T = _CustomComponents> = {
  [K in keyof T]: T[K] & MethodsNameTransform<T[K]>;
};

export interface ComponentProps {
  Auth: CustomComponents['Auth'];
  CabinetList: CustomComponents['CabinetList'];
  InventoryCheckOne: CustomComponents['InventoryCheckOne'];
  InventoryCheckTwo: CustomComponents['InventoryCheckTwo'];
  InventoryCheckThree: CustomComponents['InventoryCheckThree'];
  Success: CustomComponents['Success'];
  RevocationList: CustomComponents['RevocationList'];
  TurnInUserSelect: CustomComponents['TurnInUserSelect'];
}

export interface ComponentFormSchema<T extends ComponentType = any> extends StepItemSchema<T> {
  component: T;
}

interface StepItemSchema<T extends ComponentType = any> {
  title: string;
  params?: | (() => ComponentProps[T]) | ComponentProps[T];
}

export interface StepItemParams {
  title?: string;
  subTitle?: string;
  btn1Text?: string;
  btn2Text?: string;
  response?: object;
  isShowReceiver?: boolean;
  isShowSupervisor?: boolean;
  isShowOrg?: boolean;
}

type StepItemSchemaType<T extends ComponentType = ComponentType> = T extends any ? ComponentFormSchema<T> : never;

export type StepItem = StepItemSchemaType;
