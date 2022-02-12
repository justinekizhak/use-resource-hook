import { MutableRefObject } from "react";
import type {
  AccumulatorContainer,
  BaseConfigType,
  BeforeEventType,
  NextCallbackType,
  OnFailureType,
  OnFinishType,
  OnSuccessType,
  EventType
} from "./main.type";

export interface RefetchFunctionArgType {
  accumulator: AccumulatorContainer;
  defaultNext: NextCallbackType;
  beforeTask: BeforeEventType;
  task: EventType;
  onSuccess: OnSuccessType;
  onFailure: OnFailureType;
  onFinal: OnFinishType;
  isMessageQueueAvailable: boolean;
  messageQueueName: string;
  pushToMessageQueue: (data: any) => void;
  useRequestChaining: boolean;
  baseConfigRef: MutableRefObject<BaseConfigType>;
  controllerInstance: MutableRefObject<AbortController>;
}

export type RefetchFunctionType = (
  args: RefetchFunctionArgType
) => (customConfig?: BaseConfigType) => void;
