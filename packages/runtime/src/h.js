import { withoutNulls } from "./tils/arrays";

export const DOM_TYPES = {
  TEXT: "text",
  ELEMENT: "element",
  FRAGMENT: "fragment",
};

export function h(tag, props = {}, children = []) {
  return {
    tag,
    props,
    children: mapTextNodes(withoutNulls(children)),
    type: DOM_TYPES.ELEMENT,
  };
}

export function hString(str) {
  return { type: DOM_TYPES.TEXT, value: str };
}

function mapTextNodes(children) {
  return children.map((child) => {
    typeof child === "string" ? hString(child) : child;
  });
}
