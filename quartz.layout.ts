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
    //Component.ConditionalRender({
    //  component: Component.Breadcrumbs(),
    //  condition: (page) => page.fileData.slug !== "index",
    //}),
    Component.ArticleTitle(),
    Component.Flex({
      components: [
        {
          Component: Component.ContentMeta(),
        },
        {
          Component: Component.ReaderMode(),
        }
      ]
  })
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        // {
        //   Component: Component.Search(),
        //   grow: true,
        // },
        {
          Component: Component.Darkmode(),
        },
      ],
    }),    
    Component.TagList(),
    //explorerInstance,
  ],
  right: [
    Component.Graph({
      localGraph: {
        drag: false,
        zoom: true,
        depth: 1,
        scale: 1.1,
        repelForce: 0.4,
        centerForce: 0.5,
        linkDistance: 70,
        fontSize: 1.1,
        opacityScale: 1,
        removeTags: [],
        showTags: false,
        enableRadial: false,
      },
      globalGraph: {
        depth: 2,
        repelForce: 0.6,
        centerForce: 0.5,
        linkDistance: 100,
        fontSize: 3,
        showTags: false,
        enableRadial: false,
      }
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
};

// components for pages that display lists of pages (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    // Component.Breadcrumbs(),
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
    // Component.Explorer({
    //  mapFn: (node) => {
    //    if (node.slug?.startsWith("content/")) {
    //      node.displayName = "✨ " + node.displayName;
    //    } else {
    //      node.displayName = "🟦 " + node.displayName;
    //    }
    //  },
    // }),
  ],
  right: [],
};
