# Changelog

## 0.1.6

* massive rewrite
* added profiles
* dropped setting default collections to `pages` and `posts` and site singleton to `site` - You have to specify them manually
* changed event `multiplane.getposts.before`
* moved npm build scripts to theme folders
* restructured `mp.js` to browserify modules
* restructured/moved page/posts templates
* added events `multiplane.getpage.before`, `multiplane.head`, `multiplane.getpreview.before`, `multiplane.seo`
* added rljstripes theme (experimental)
* added support for repeater as content field (experimental)
* added optional i18n date format for posts meta
* added simple snippet to enable matomo tracking
* added breakpoints for background image
* improved child theming
* improved menu/nav - multi level dropdown, responsive, touch friendly
* improved sitemap
* improved full-text search
* improved seo meta data (og:, twitter:, ld+json)
* improved `mp.js` (event system, accessibility)
* improved privacy popup
* improved live preview
* multiple minor fixes
* moved docs to [own repository](https://github.com/raffaelj/cockpit_CpMultiplane-docs)

## 0.1.5

* changed assets version to time in debug mode and moved version info to `package.json`
* introduced `MP_ENV_ROOT` and `MP_ENV_URL`
* added template and js for simple image carousel
* added lexy short renderer `bigthumbnail` to rljbase theme
* added events `multiplane.getposts.before`, `multiplane.page`, `multiplane.getimage.before`, `multiplane.sitemap`
* added sort order to `getNav` function
* added `/clearcache` route (only in debug mode)
* added sitemap
* introduced theme config file
* improved video field template - more php, less js
* improved search
* improved pagination
* improved css icons
* replaced `.htaccess` with `.htaccess.dist`
* improved Lexy settings
* some accessibility fixes
* deprecated: `convertVideoLinksToIframes()` in `mp.js`

## 0.1.4

* added child theme support
* fixed error in getNav if no entries exist
* improved full-text search
* some i18n fixes
* added cli commands `./mp check` and `./mp account/create`
* rljbase theme
  * fixed/improved font stack
  * restructured scss files into subfolder
  * some color changes and minor fixes

## 0.1.3

* started to implement posts meta data
* started to implement fulltext search
* added option for hardcoded navigation
* improved form (CSS and a session cleanup)
* improved custom theming
* fixed wrong gallery variable in rljbase theme
* removed wa-mediabox lightbox lib and replaced it with my own simple lightbox
* some cleanup

## 0.1.2

* new shorthand function `mp()` returns `cockpit('multiplane')`
* improved breadcrumbs (now they are also disabled by default)
* improved navigation (active state)
* new core function `get()` - works like `$app->retrieve()`, but only inside multiplane module
* changed lexy image shortcuts - `mode` is now `method`
* some cleanup

## 0.1.1

* minor fixes and cleanup
* added more comments to config variables
* changed `useDefaultRoutes => true` to `disableDefaultRoutes => false` (the configuration to disable all default routes)
* added `setConfig()` function to overwrite defaults with options from GUI

## 0.1.0

* initial release
* I rewrote [Monoplane](https://github.com/raffaelj/Monoplane). While trying to make it multilingual in its update branch, I decided, that the code base was too ugly.
