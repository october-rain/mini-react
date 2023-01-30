import { REACT_ELEMENT_TYPE } from "shared/ReactSymbols";
import { Key, Props, IReactElement, Ref, ElementType } from "shared/ReactTypes";

// ReactElement

export const ReactElement = function (
  type: ElementType,
  key: Key,
  ref: Ref,
  props: Props
): IReactElement {
  const element: IReactElement = {
    $$typeof: REACT_ELEMENT_TYPE, // 通过这个字段确定这是个 react element
    type,
    key,
    ref,
    props,
    __mark: "rain",
  };
  return element;
};

export const jsx = (
  type: ElementType,
  config: any,
  ...maybeChildren: any[]
) => {
  let key: Key = null;
  const props: Props = {};
  let ref: Ref = null;

  for (const prop in config) {
    const val = config[prop];
    if (prop === "key") {
      if (val !== undefined) {
        key = "" + val;
      }
      continue;
    }
    if (prop === "ref") {
      if (val !== undefined) {
        ref = val;
      }
      continue;
    }
    // 判断是不是原型上的 prop
    if (Object.hasOwnProperty.call(config, prop)) {
      props[prop] = val;
    }
  }
  console.log("maybeChildren", maybeChildren);
  const maybeChildrenLength = maybeChildren.length;
  if (maybeChildrenLength) {
    if (maybeChildrenLength === 1) {
      props.children = maybeChildren[0];
    } else {
      props.children = maybeChildren;
    }
  }
  return ReactElement(type, key, ref, props);
};

export const jsxDEV = (type: ElementType, config: any) => {
  let key: Key = null;
  const props: Props = {};
  let ref: Ref = null;

  for (const prop in config) {
    const val = config[prop];
    if (prop === "key") {
      if (val !== undefined) {
        key = "" + val;
      }
      continue;
    }
    if (prop === "ref") {
      if (val !== undefined) {
        ref = val;
      }
      continue;
    }
    // 判断是不是原型上的 prop
    if (Object.hasOwnProperty.call(config, prop)) {
      props[prop] = val;
    }
  }

  return ReactElement(type, key, ref, props);
};
