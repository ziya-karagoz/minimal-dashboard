import { ChangeEvent } from "react";

export type DatePickerProps = {
    className?: string;
    value?:
      | string
      | number
      | Date
      | readonly (string | number | Date)[]
      | undefined;
    onChange?: ((event: ChangeEvent<HTMLInputElement>) => void) | undefined;
    enableTime?: boolean | undefined;
    noCalendar?: boolean | undefined;
    disabled?: boolean;
  };