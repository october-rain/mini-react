import { REACT_ELEMENT_TYPE } from "shared/ReactSymbols";
import { Key, Props, ReactElement, Ref, ElementType } from "shared/ReactTypes";

// ReactElement

export const ReactElement = function (
  type: ElementType,
  key: Key,
  ref: Ref,
  props: Props
): ReactElement {
  const element: ReactElement = {
    $$typeof: REACT_ELEMENT_TYPE, // 通过这个字段确定这是个 react element
    type,
    key,
    ref,
    props,
    __mark: "rain",
  };
  return element;
};

export const jsx = (type: ElementType, config: any, ...maybeChildren) => {
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
    if (Object.hasOwnProperty.call(config, prop)) {
      props[prop] = val;
    }
  }

  const maybeChildrenLength = maybeChildren.length;
  if (maybeChildrenLength) {
    if (maybeChildrenLength === 1) {
      props.children = maybeChildren[0];
    } else {
      props.children = maybeChildren[0];
    }
  }
  return ReactElement(type, key, ref, props);
};

export const jsxDEV = jsx;
