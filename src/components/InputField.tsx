import { forwardRef, Ref } from "react";
import { Input, InputProps } from "@vkontakte/vkui";

const InputField = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => (
  <Input {...props} getRef={ref} />
));

InputField.displayName = 'InputField'

export default InputField;
