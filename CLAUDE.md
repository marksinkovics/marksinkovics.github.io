# marksinkovics.com

Mark Sinkovics' personal site: a few blog posts, side-project pages, and the
privacy policies for the iOS/Mac apps (Sudoku, Runlight). Served at
https://marksinkovics.com (see `CNAME`) by GitHub Pages.

## Stack

- Jekyll 4 with the gem-based [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy)
  theme, 7.6.x. Set up from chirpy-starter v7.6.0; compare with that repo
  when upgrading the theme.
- Ruby 3.4 (`.ruby-version`). Chirpy 7.6 requires Ruby 3.x, so it won't
  install on Ruby 4.
- `jekyll-redirect-from` keeps old URLs working.
- Deployed by `.github/workflows/pages-deploy.yml` on every push to `master`:
  build, check links with html-proofer, deploy with `actions/deploy-pages`.

## Commands

```sh
bundle config set --local path vendor/bundle   # once
bundle install
bash tools/run.sh        # preview at http://127.0.0.1:4000
bash tools/test.sh       # production build + html-proofer, same as CI
```

## Layout

| Path | What |
| --- | --- |
| `_tabs/` | Sidebar pages: Projects, Tags, Archives, About, Contact (sorted by `order`). A new tab also needs its title under `tabs:` in `_data/locales/en.yml`, or its browser-tab title is empty |
| `_data/locales/en.yml` | Additions to the theme's English strings (merged with the theme's file) |
| `_posts/` | Blog posts, served at `/posts/:title/` |
| `_projects/` | Project pages. `type: main` pages are listed on Projects, sorted by `order`; `type: sub` pages (privacy policies) are linked from their project page |
| `_includes/image-gallery.html` | Screenshot gallery: `{% include image-gallery.html folder="images/sudoku" %}` |
| `assets/css/jekyll-theme-chirpy.scss` | Theme stylesheet override; custom CSS goes at the end |
| `images/` | Project screenshots |
| `assets/img/` | Site images (App Store badge, sidebar avatar placeholder) |

## Rules

- **Never change a privacy policy URL.** These are registered in App Store Connect:
  - `/projects/sudoku/privacy-policy`
  - `/projects/runlight/privacy-policy`
- **Keep project permalinks as they are.** Project pages use URLs without a trailing slash (e.g. `/projects/sudoku`), as on the old site.
- **When a URL moves, add `redirect_from`** to the page so the old address keeps working.
- **Privacy policies must match the app.** Check them against the app's code and its `PrivacyInfo.xcprivacy`, and update "Last updated" whenever one changes. If an app starts sending any data off the device, its policy must change before that release. The Runlight source is in `../Runlight`.
- **No analytics or comments on the site.** The site doesn't collect data, like the apps.