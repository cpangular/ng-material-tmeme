import { writeScssFile } from "./lib/util/writeScssFile";
import { options } from "./options";
import { ComponentThemes } from "./lib/data/componentThemes";

export function writeBuildBaseComponentFiles() {
  if (!options.write) return;

  ComponentThemes.forEach((t) => {
    const scss = `
        @use '../scss/theming';
        @include theming.${t}-theme();
      `;
    writeScssFile(`./dist/base/theme-${t}.scss`, scss, false);
  });
}
