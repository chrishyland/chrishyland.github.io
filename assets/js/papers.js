// Keep native details usable when JavaScript is unavailable.
document.querySelectorAll('[data-paper-toggle]').forEach(function (button) {
  var panel = document.getElementById(button.getAttribute('aria-controls'));
  if (!panel) return;

  var summary = panel.querySelector('summary');
  if (!summary) return;

  function syncExpanded() {
    button.setAttribute('aria-expanded', String(panel.open));
  }

  button.addEventListener('click', function () {
    panel.open = !panel.open;
    syncExpanded();
  });
  panel.addEventListener('toggle', syncExpanded);
  syncExpanded();

  // Video panels: build the player on open so nothing loads from YouTube until
  // it is asked for, and remove it on close so playback stops.
  var embed = panel.querySelector('[data-video-embed]');
  if (embed) {
    var syncPlayer = function () {
      if (!panel.open) {
        embed.textContent = '';
        return;
      }
      if (embed.firstChild) return;
      var frame = document.createElement('iframe');
      frame.setAttribute('src', embed.getAttribute('data-video-embed'));
      frame.setAttribute('title', embed.getAttribute('data-video-title'));
      frame.setAttribute('allow', 'encrypted-media; picture-in-picture; fullscreen');
      frame.setAttribute('allowfullscreen', '');
      frame.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      embed.appendChild(frame);
    };
    panel.addEventListener('toggle', syncPlayer);
    embed.hidden = false;
    syncPlayer();
  }
  summary.hidden = true;
  button.hidden = false;
});
