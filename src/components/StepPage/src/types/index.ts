export interface StepItem {
  title: string;
  component: Component;
  params?: StepItemParams;
}

export interface StepItemParams {
  title?: string;
  subTitle?: string;
  btn1Text?: string;
  btn2Text?: string;
  response?: object;
  isShowReceiver?: boolean;
  isShowSupervisor?: boolean;
}
