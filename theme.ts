import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const styles = {
  global: (props: any) => ({
    body: {
      color: mode("#1f1f1f", "#f5f5f5")(props),
      bg: mode("#f5f5f5", "#1f1f1f")(props),
    },
    Button: {
      bg: mode("#f5f5f5", "#1f1f1f")(props),
    },
  }),
};

const theme = extendTheme({ config, styles });

export default theme;
