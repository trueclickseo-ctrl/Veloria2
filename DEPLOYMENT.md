# Deployment Guide: Veloria Magazine

This repository is configured to build and deploy automatically to Hostinger static hosting (`public_html`) on every push to the `main` branch.

## Setting Up GitHub Secrets

To allow the GitHub Actions workflow to deploy to Hostinger, you must add three secrets in your GitHub repository settings:

1. Go to your repository on GitHub.
2. Navigate to **Settings** > **Secrets and variables** > **Actions**.
3. Click on **New repository secret**.
4. Add the following secrets:
   - `HOSTINGER_FTP_HOST`: The FTP server hostname (e.g., `ftp.veloriamag.com` or Hostinger's FTP IP).
   - `HOSTINGER_FTP_USERNAME`: Your FTP account username.
   - `HOSTINGER_FTP_PASSWORD`: Your FTP account password.

## Manual Deployment Trigger

You can also trigger the build and deploy pipeline manually:
1. Go to the **Actions** tab in your GitHub repository.
2. Select the **Deploy Website to Hostinger** workflow from the left sidebar.
3. Click the **Run workflow** dropdown and select the branch (e.g., `main`).
4. Click **Run workflow**.

## Verification Post-Deploy

Once a deployment finishes successfully:
1. Confirm that the website is accessible at [https://veloriamag.com/](https://veloriamag.com/).
2. Verify that technical SEO assets are loaded:
   - Sitemap: [https://veloriamag.com/sitemap.xml](https://veloriamag.com/sitemap.xml)
   - RSS Feed: [https://veloriamag.com/rss.xml](https://veloriamag.com/rss.xml)
   - Robots Config: [https://veloriamag.com/robots.txt](https://veloriamag.com/robots.txt)
3. Check structured schema data (JSON-LD) using the [Schema Markup Validator](https://validator.schema.org/).
