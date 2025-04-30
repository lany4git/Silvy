import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/lany4git",
      "Discord Community": "https://discord.gg/DN2MkhSEWE",
    },
  }),
}

export const explorerInstance = Component.Explorer({
  title: "Explorer",
  folderClickBehavior: "collapse",
  folderDefaultState: "collapsed",
  useSavedState: true,
  order: ["filter", "map", "sort"],
})

console.log(explorerInstance);

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        {
          Component: Component.Darkmode(),
        },
        {
          Component: Component.ReaderMode(),
        },
      ],
    }),
    explorerInstance, //Get rid of slashes to add
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
};


// components for pages that display lists of pages (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        {
          Component: Component.Darkmode(),
        },
      ],
    }),
    Component.Explorer({
      mapFn: (node) => {
        if (node.isLongform) {
          node.displayName = "✨ " + node.displayName;
        } else {
          node.displayName = "🟦 " + node.displayName;
        }
      },
    }),
  ],
  right: [],
};
