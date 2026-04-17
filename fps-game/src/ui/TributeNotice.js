/**
 * TributeNotice
 * Small disclaimer + opt-out contact shown on the lobby screen.
 * Legally-safe framing for the @levelsio / judges / sponsors boss tribute.
 *
 * EDIT HANDLE + EMAIL below to your real contact before final submit.
 */

const CONTACT_HANDLE = 'YOUR_HANDLE';   // replace with your Twitter handle (no @)
const CONTACT_EMAIL  = 'YOUR_EMAIL@example.com';

export function renderTributeNotice(parent) {
  const el = document.createElement('div');
  el.className = 'tribute-notice';
  el.style.cssText = [
    'margin-top:18px',
    'font-size:11px',
    'color:#999',
    'text-align:center',
    'line-height:1.5',
    'font-family:monospace',
    'max-width:520px',
    'padding:10px 14px',
    'border-top:1px solid rgba(255,255,255,.1)',
  ].join(';');
  el.innerHTML = `
    A respectful tribute to the builders who made this jam possible.<br>
    Not affiliated with any named individuals or companies.<br>
    Want your handle removed? DM
    <a href="https://twitter.com/${CONTACT_HANDLE}" target="_blank" rel="noopener" style="color:#8cf;text-decoration:none">@${CONTACT_HANDLE}</a>
    or email
    <a href="mailto:${CONTACT_EMAIL}" style="color:#8cf;text-decoration:none">${CONTACT_EMAIL}</a>.
  `;
  parent.appendChild(el);
  return el;
}
