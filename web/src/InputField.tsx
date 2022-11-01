import { classNames } from "./class-names";

type As = React.ElementType;
type Props<T extends As> = T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T]
  : T extends React.Component | React.ExoticComponent
  ? React.ComponentProps<T>
  : T extends React.ForwardRefExoticComponent<infer P>
  ? P
  : never;

type InputFieldProps<T extends As> = Props<T> & {
  as: T;
  name?: string;
  required?: boolean;
  error?: string | false;
  label: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
};

export function InputField<T extends As>({
  as,
  required,
  error,
  label,
  startAdornment,
  endAdornment,
  ...props
}: InputFieldProps<T>) {
  const Component = (as || 'input') as As;

  return (
    <div>
      <label
        htmlFor={props.name}
        className={
          'tw-block tw-text-sm tw-font-medium tw-text-gray-700 ' +
          (required
            ? "after:tw-ml-0.5 after:tw-text-red-500 after:tw-content-['*']"
            : '')
        }
      >
        {label}
      </label>
      <div className="tw-mt-1 tw-relative">
        {!!startAdornment && (
          <div className="tw-absolute tw-inset-y-0 tw-left-0 tw-pl-3 tw-flex tw-items-center">
            {startAdornment}
          </div>
        )}
        <Component
          className={
            classNames(
              "tw-block tw-w-full tw-rounded-md tw-border-gray-300 tw-py-2 tw-px-4 tw-shadow-sm focus:tw-border-indigo-500 focus:tw-ring-indigo-500",
              startAdornment && "tw-pl-7",
              endAdornment && "tw-pr-20",
            )
          }
          {...props}
        />
        {!!endAdornment && (
          <div className="tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center">
            {endAdornment}
          </div>
        )}
      </div>
      {error && (
        <p className="tw-mt-1 tw-text-sm tw-text-red-600" id={props.name + "-error"}>
          {error}
        </p>
      )}
    </div>
  );
}
