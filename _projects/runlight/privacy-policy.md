---
title: Privacy Policy for Runlight
# This URL goes into App Store Connect: never change it once submitted.
permalink: /projects/runlight/privacy-policy
type: sub
---

_Last updated: November 2, 2026_

### Overview

This Privacy Policy describes how your personal information is handled in "Runlight: CI & Code Reviews" app for iPhone, iPad and Mac.

### No personal information is collected by using the app

I do not collect, use, save, or have access to any of your personal data recorded in "Runlight: CI & Code Reviews". There is no Runlight server, and the app has no analytics, advertising, tracking or third-party SDKs. I can't see your accounts, your tokens or anything from your GitLab.

### How the app talks to GitLab

Runlight connects directly from your device to the GitLab server you add: GitLab.com or a self-hosted GitLab instance. Nothing passes through a server of mine.

- **Read-only access:** Runlight asks only for the `read_api` scope. It reads pipelines, jobs and merge requests, and never changes anything on GitLab.
- **Signing in with GitLab.com:** the sign-in page is GitLab's own, shown in the system's sign-in window or Safari view. Runlight never sees your GitLab password.
- **GitLab's own policy:** what GitLab does with your data is covered by [GitLab's privacy statement](https://about.gitlab.com/privacy/), or for a self-hosted instance, by whoever runs it.

### What the app stores, and where

Everything Runlight stores stays on your devices or in your own iCloud account. None of it is sent to me.

| Data | Where it's kept |
| --- | --- |
| Personal access tokens | The Keychain on your device, synced through iCloud Keychain if you use it |
| GitLab.com sign-in tokens | The Keychain on the device you signed in on, not synced |
| Accounts (GitLab address and name), watched projects, snoozes and muted projects | On your device, synced between your devices through your iCloud account |
| Settings | On your device |
| The latest pipelines and merge requests | A cache on your device, so the app and its widgets can show them when GitLab can't be reached |

iCloud sync is provided by Apple and uses your own iCloud account. See [Apple's privacy policy](https://www.apple.com/legal/privacy/).

Notifications are created on your device. On iPhone and iPad, iOS may wake the app in the background to check GitLab and update the widgets. No push server is involved.

Runlight can open GitLab pages in an in-app browser or in your default browser. Those pages are loaded from GitLab, and their own privacy policies apply.

### Crash reports

Runlight has no crash reporting of its own. If you have chosen to share analytics with app developers in your device's settings, Apple may send me anonymized crash reports and usage statistics, as described in Apple's privacy policy.

### Deleting your data

- Removing an account in Runlight deletes its token from the Keychain and removes the account from your other devices.
- Deleting the app removes the data Runlight stored on that device.
- Your GitLab data stays on GitLab. To revoke Runlight's access, delete the token or the authorized application in your GitLab user settings.

### Our Applications Comply with the Children’s Online Privacy Protection Act

Our applications do not collect personal information from anyone, including children under the age of 13.

### Changes to this Privacy Policy

If Runlight's handling of data changes, I'll update this page and the date at the top.

### Contact

If you have any questions about this Privacy Policy, feel free to get in touch with [me](/contact/) or email [{{ site.social.email }}](mailto:{{ site.social.email }}).
