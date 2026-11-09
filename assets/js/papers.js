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
  summary.hidden = true;
  button.hidden = false;
});
