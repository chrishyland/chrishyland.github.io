Chris Hyland academic website.

Working-paper buttons are configured in `_data/papers.yml`:

- **SSRN:** Set `url` to the paper's SSRN page. Working-paper titles are plain
  text; the SSRN button opens the external paper page.
- **PDF:** Add the file to `assets/papers/`, then set `pdf` to its path, such as
  `"/assets/papers/monetary-policy.pdf"`. The button opens the hosted PDF in the
  browser. No external paper service or forced download is required.
- **Abstract:** Replace `abstract: ""` with `abstract: |` and indent the full
  abstract below it by six spaces when ready.
- **Summary:** Edit the existing `summary` text, which contains the short
  descriptions previously labelled Abstract on the website. Abstracts and
  summaries support Markdown and expand on the research page. Use `|` for text
  containing multiple paragraphs.
- **Presentations:** Edit `presentations` to show a separate button alongside
  PDF, Abstract, and Summary. This button is omitted when no presentations are listed.

Blank PDF, Abstract, or Summary fields show a disabled button labelled “(soon)”.
Publications and work in progress keep their existing layout and title links.

The research page uses the theme's `wide` layout to fill the available space to
the right of the author sidebar on desktop.
