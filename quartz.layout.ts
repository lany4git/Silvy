import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// Example sort, filter, and map functions
const sortFn = (a, b) => a.name.localeCompare(b.name);
const filterFn = (item) => true; // show all by default
const mapFn = (item) => item;    // identity by default

// create explorer once to prevent duplication when navigating between pages
export const explorerInstance = Component.Explorer({
  title: "Explorer",
  folderClickBehavior: "collapse",
  folderDefaultState: "collapsed",
  useSavedState: true,
  sortFn,
  filterFn,
  mapFn,
  order: ["filter", "map", "sort"],
});

// Browser-only nav updates
if (typeof document !== "undefined") {
  const navContainer = document.getElementById("nav");
  if (navContainer) {
    navContainer.innerHTML = ""; // clear previous items
    renderNavItems();            // re-render nav items
  }
}
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
    explorerInstance, // ✅ Reusing shared instance of the Explorer component
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
    explorerInstance, // ✅ Reuse your configured explorerInstance if defined
    // or fallback to a simple default like: Component.Explorer()
  ],
  right: [],
};
