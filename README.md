Chris Hyland academic website.

Working-paper resources are configured in `_data/papers.yml`:

- **SSRN:** Set `url` to the paper's SSRN page. Working-paper titles are plain
  text; the SSRN text link opens the external paper page.
- **PDF:** Add the file to `assets/papers/`, then set `pdf` to its path, such as
  `"/assets/papers/monetary-policy.pdf"`. The button opens the hosted PDF in the
  browser. No external paper service or forced download is required.
- **Video:** Set `video` to a YouTube link. The Video control expands a player
  on the page; the video only loads from YouTube once the control is opened.
  Any other link is shown as a plain Video link that opens the address.
- **Abstract:** Replace `abstract: ""` with `abstract: |` and indent the full
  abstract below it by six spaces when ready.
- **Summary:** Edit the existing `summary` text, which contains the short
  descriptions previously labelled Abstract on the website. Abstracts and
  summaries support Markdown and expand on the research page. Use `|` for text
  containing multiple paragraphs.
- **Presentations:** Edit `presentations` to show a separate text control alongside
  PDF, Abstract, and Summary. This button is omitted when no presentations are listed.

Only available resources are shown; blank or omitted fields are hidden.
PDF appears first as the primary button. SSRN is a text link; Abstract, Summary,
and Presentations are text controls with arrows that expand their content.
Publications and work in progress keep their existing layout and title links.

The research page uses the theme's `wide` layout to fill the available space to
the right of the author sidebar on desktop.
