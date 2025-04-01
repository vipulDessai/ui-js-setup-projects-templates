export type ON_CLICK_HTML_ELEMENT_TYPE<T extends HTMLElement> =
  React.MouseEvent<T, MouseEvent>;

export type ON_CHANGE_KEYBOARD_INPUT_EVENT<T extends HTMLElement> =
  React.KeyboardEvent<T>;
export type ON_CHANGE_MOUSE_INPUT_EVENT<T extends HTMLElement> =
  React.FormEvent<T>;

// Type guard for KeyboardEvent
export const isKeyboardEvent = (event: any): event is React.KeyboardEvent => {
  return "key" in event;
};

// Type guard for FormEvent
export const isFormEvent = (event: any): event is React.FormEvent => {
  return "target" in event && "currentTarget" in event;
};
