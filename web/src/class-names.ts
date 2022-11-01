export function classNames(...classes: (string | number | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}