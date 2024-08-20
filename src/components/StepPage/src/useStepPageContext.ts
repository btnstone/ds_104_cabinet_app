import type { InjectionKey, Ref } from 'vue';
import { createContext, useContext } from '@/hooks/useContext';

export interface StepPageProviderContextProps {
  no: string;
}

const key: InjectionKey<StepPageProviderContextProps> = Symbol(undefined);

export function createStepPageProviderContext(context: StepPageProviderContextProps) {
  return createContext<StepPageProviderContextProps>(context, key);
}

export function useStepPageProviderContext() {
  return useContext<StepPageProviderContextProps>(key);
}
