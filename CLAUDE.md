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
| `_tabs/` | Sidebar pages: Projects, Tags, Archives, About, Contact (sorted by `order`) |
| `_posts/` | Blog posts, served at `/posts/:title/` |
| `_projects/` | Project pages. `type: main` pages are listed on Projects, sorted by `order`; `type: sub` pages (privacy policies) are linked from their project page |
| `_includes/image-gallery.html` | Screenshot gallery: `{% include image-gallery.html folder="images/sudoku" %}` |
| `assets/css/jekyll-theme-chirpy.scss` | Theme stylesheet override; custom CSS goes at the end |
| `images/` | Project screenshots |
| `assets/img/` | Site images (App Store badge) |

## Rules

- **Never change a privacy policy URL.** These are registered in App Store Connect:
  - `/projects/sudoku/privacy-policy`
  - `/projects/runlight/privacy-policy`
- **Keep project permalinks as they are.** Project pages use URLs without a trailing slash (e.g. `/projects/sudoku`), as on the old site.
- **When a URL moves, add `redirect_from`** to the page so the old address keeps working.
- **Privacy policies must match the app.** Check them against the app's code and its `PrivacyInfo.xcprivacy`, and update "Last updated" whenever one changes. The Runlight source is in `../Runlight`.
- **No analytics or comments on the site.** The site doesn't collect data, like the apps.
- **Git:** only edit files. Mark makes all commits, branches and merges. Don't add a Co-Authored-By line for Claude. Use git, not jj.

## Plan: November 2026 rebuild

The old site was built from the `develop` branch by an unmaintained Action
(`helaili/jekyll-action`), which pushed the HTML to `master`. It last ran in
2023. This branch replaces that HTML with a fresh Chirpy source on `master`;
the content was ported from `develop`.

### Done (branch `feat/update_website`)

- [x] Removed the built HTML; added the Chirpy source, Gemfile and Ruby 3.4 pin
- [x] New deploy workflow (official GitHub Pages actions, html-proofer check)
- [x] `url` is now `https://marksinkovics.com`, so canonical links, the sitemap, the feed and `robots.txt` use the custom domain
- [x] Ported the about page, the four project pages and the blog post
- [x] Old URLs redirect: `/blog/` → `/`; `/blog/2021/09/19/swiftui_detect_multiple_tap_gestures/` → `/posts/swiftui-detect-multiple-tap-gestures/`. Project, tag, about, feed and sitemap URLs are unchanged.
- [x] Contact page at `/contact/`, which fixes the broken link in the Sudoku privacy policy
- [x] Sudoku privacy policy: "Last updated" date and fixed contact link (same URL)
- [x] Runlight project page and privacy policy
- [x] Production build and html-proofer pass locally

### To do: Mark

1. [ ] Review the changes, commit, and merge to `master`.
2. [ ] Before pushing `master`, set GitHub → Settings → Pages → Build and deployment → Source to **GitHub Actions**. Otherwise GitHub tries its own legacy Jekyll build, which can't use the Chirpy gem. The old site stays live until the first new deployment.
3. [ ] After the first deploy, check Settings → Pages: the custom domain is `marksinkovics.com` and "Enforce HTTPS" is on.
4. [ ] Retire `develop`. Its old workflow still force-pushes built HTML to `master` on every push to `develop`, which would now overwrite the source. Delete the branch (local and `origin`), or at least its workflow. The stale local branches (`feat/redesign`, `feat/update_design`, `feature/chirpy-migration*`, `backup/*`, `feature/responsive_layout`) can go too.
5. [ ] Check these URLs on the live site: `/projects/sudoku/privacy-policy`, `/projects/runlight/privacy-policy`, `/contact/`, and the old post URL.

### To do: Runlight repo (`../Runlight`)

- [ ] Add `Apps/Apple/fastlane/metadata/en-US/privacy_url.txt`: `https://marksinkovics.com/projects/runlight/privacy-policy`
- [ ] Add `Apps/Apple/fastlane/metadata/en-US/support_url.txt`: `https://marksinkovics.com/contact/`
- [ ] App Store Connect privacy labels: "Data Not Collected", matching the policy
- [ ] Update the policy here if Runlight adds anything that sends data: paid licences (Paddle, Lemon Squeezy, in-app purchase), update checks for the direct-download Mac build (e.g. Sparkle), crash reporting, a push relay, or GitHub support

### Open decisions

- [ ] `timezone` in `_config.yml` (empty = UTC)
- [ ] Sidebar avatar: an "MS" placeholder (`assets/img/avatar.svg`) for now; swap in a photo via `avatar` in `_config.yml`
- [ ] The About page is from 2023 and mentions a React Native job. Is it current?
- [ ] When Runlight launches: replace "Coming soon" with App Store or download links, and add screenshots (`images/runlight/` + the gallery include)
