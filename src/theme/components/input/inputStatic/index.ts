import inputStaticLabel from "./inputStaticLabel";
import inputStaticColors from "./inputStaticColors";
import inputStaticLabelColors from "./inputStaticLabelColors";

const inputStatic = {
  base: {
    input: {
      borderWidth: "tw-border-b",
      borderColor: "placeholder-shown:tw-border-blue-gray-200",
    },
    inputWithIcon: {
      pr: "!tw-pr-7",
    },
    icon: {
      top: "tw-top-2/4",
      right: "tw-right-0",
      transform: "-tw-translate-y-1/4",
    },
    label: inputStaticLabel,
  },
  sizes: {
    md: {
      container: {
        height: "tw-h-11",
      },
      input: {
        fontSize: "tw-text-sm",
        pt: "tw-pt-4",
        pb: "tw-pb-1.5",
      },
      label: {
        lineHeight: "peer-placeholder-shown:tw-leading-tight",
      },
      icon: {
        width: "tw-w-5",
        height: "tw-h-5",
      },
    },
    lg: {
      container: {
        height: "tw-h-12",
      },
      input: {
        fontSize: "tw-text-sm",
        px: "tw-px-px",
        pt: "tw-pt-5",
        pb: "tw-pb-2",
      },
      label: {
        lineHeight: "peer-placeholder-shown:tw-leading-tight",
      },
      icon: {
        width: "tw-w-6",
        height: "tw-h-6",
      },
    },
  },
  colors: {
    input: inputStaticColors,
    label: inputStaticLabelColors,
  },
  error: {
    input: {
      borderColor: "tw-border-red-500 placeholder-shown:tw-border-red-500",
      borderColorFocused: "focus:tw-border-red-500",
    },
    label: {
      color:
        "tw-text-red-500 peer-focus:tw-text-red-500 peer-placeholder-shown:tw-text-red-500",
      after: "after:tw-border-red-500 peer-focus:after:tw-border-red-500",
    },
  },
  success: {
    input: {
      borderColor: "tw-border-green-500 placeholder-shown:tw-border-green-500",
      borderColorFocused: "focus:tw-border-green-500",
    },
    label: {
      color:
        "tw-text-green-500 peer-focus:tw-text-green-500 peer-placeholder-shown:tw-text-green-500",
      after: "after:tw-border-green-500 peer-focus:after:tw-border-green-500",
    },
  },
  shrink: {
    input: {},
    label: {},
  },
};

export default inputStatic;
