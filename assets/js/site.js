/* Junbo Food · vote + sign-up form
 *
 * SETUP: paste your email tool's form endpoint into FORM_ENDPOINT.
 *  - Kit (ConvertKit): https://app.kit.com/forms/<FORM_ID>/subscriptions
 *    The vote is saved in the Kit custom field with key "vote".
 *  - Mailchimp: use the embedded form "action" URL and add a merge field "VOTE".
 *    Set EMAIL_FIELD to "EMAIL" and VOTE_FIELD to "VOTE".
 * While FORM_ENDPOINT is empty nothing can be saved, so the form tells
 * visitors sign-ups open soon (it never pretends to have saved an email).
 */
const FORM_ENDPOINT = 'https://app.kit.com/forms/10210327/subscriptions'; // Kit form "baab408a72"
const EMAIL_FIELD = 'email_address';
const VOTE_FIELD = 'fields[vote]'; // Kit custom field "Vote for Next Sauce" (key: vote)

(function () {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById('vote-form');
  if (!form) return;
  const msg = document.getElementById('form-msg');
  const email = form.querySelector('#email');
  const button = form.querySelector('button[type="submit"]');
  const otherBox = document.getElementById('other-idea');
  const otherText = document.getElementById('other-text');
  form.addEventListener('change', function () {
    const picked = form.querySelector('input[name="vote"]:checked');
    if (otherBox) otherBox.hidden = !(picked && picked.value === 'other');
  });

  function say(text, state) {
    msg.textContent = text;
    msg.dataset.state = state || '';
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const value = email.value.trim();
    if (!value || !email.checkValidity()) {
      say('Please enter a valid email address.', 'error');
      email.focus();
      return;
    }
    if (!FORM_ENDPOINT) {
      say('Sign-ups open very soon. Follow @junbofood on Instagram for the first batch news.', 'error');
      return;
    }
    const picked = form.querySelector('input[name="vote"]:checked');
    let vote = picked ? picked.value : '';
    if (vote === 'other' && otherText && otherText.value.trim()) {
      vote = 'other: ' + otherText.value.trim().slice(0, 80);
    }

    button.disabled = true;
    try {
      const body = new FormData();
      body.append(EMAIL_FIELD, value);
      if (vote) body.append(VOTE_FIELD, vote);
      await fetch(FORM_ENDPOINT, { method: 'POST', body: body, mode: 'no-cors' });
      form.reset();
      if (otherBox) otherBox.hidden = true;
      say(vote ? "Thanks, your vote is in. Check your inbox to confirm your email." : "Thanks. Check your inbox to confirm your email.", 'ok');
    } catch (err) {
      say('Something went wrong. Please try again in a moment.', 'error');
    } finally {
      button.disabled = false;
    }
  });
})();
