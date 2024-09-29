import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";
import { Button } from "./components/button";
import { Tag } from "./components/tag";
import { Badge } from "./components/badge";
import { fontSizes } from "./fontsize";

export const baseTheme = extendTheme({
  colors,
  fontSizes,
  components: {
    Button,
    Tag,
    Badge,
  },
  styles: {
    global: {
      body: {
        height: "100vh",
        width: "100%",
        background: "gray.800",
        color: "gray.0",
        fontFamily: "Montserrat",
      },
    },
  },
});
