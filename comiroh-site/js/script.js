// ============================================================
// COMIROH — script partagé à toutes les pages
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Navigation mobile ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
      var expanded = mobileNav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
      toggle.textContent = expanded ? '✕' : '☰';
    });
  }

  /* ---------- Année dynamique dans le pied de page ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Validation générique de formulaire ---------- */
  function validateForm(form) {
    var valid = true;
    var firstInvalid = null;
    form.querySelectorAll('[required]').forEach(function (field) {
      var value = (field.value || '').trim();
      var errorEl = field.closest('.field') ? field.closest('.field').querySelector('.field-error') : null;
      var isValid = value.length > 0;

      if (isValid && field.type === 'email') {
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }
      if (isValid && field.type === 'tel') {
        isValid = /^[0-9+()\-\s]{8,}$/.test(value);
      }

      field.classList.toggle('field-invalid', !isValid);
      if (errorEl) errorEl.style.display = isValid ? 'none' : 'block';

      if (!isValid) {
        valid = false;
        if (!firstInvalid) firstInvalid = field;
      }
    });
    if (firstInvalid) firstInvalid.focus();
    return valid;
  }

  /* ---------- Envoi réel vers Formspree ---------- */
  function submitToFormspree(form) {
    var endpoint = form.getAttribute('data-endpoint');
    var data = new FormData(form);
    return fetch(endpoint, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });
  }

  function setSubmitting(button, isSubmitting, idleLabel) {
    if (!button) return;
    button.disabled = isSubmitting;
    button.textContent = isSubmitting ? 'Envoi en cours…' : idleLabel;
  }

  /* ---------- Formulaire de préinscription ---------- */
  var preForm = document.getElementById('preinscription-form');
  if (preForm) {
    var preSubmit = document.getElementById('preinscription-submit');
    var preIdleLabel = preSubmit ? preSubmit.textContent : 'Envoyer la demande de préinscription';

    preForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('preinscription-msg');

      if (!validateForm(preForm)) {
        msg.className = 'form-msg err';
        msg.textContent = "Merci de compléter tous les champs obligatoires (*) avant d'envoyer la demande.";
        return;
      }

      var eleve = preForm.querySelector('[name="eleve_prenom"]').value + ' ' + preForm.querySelector('[name="eleve_nom"]').value;
      var classeSel = preForm.querySelector('[name="classe_demandee"]');
      var classe = classeSel.options[classeSel.selectedIndex].text;

      setSubmitting(preSubmit, true, preIdleLabel);

      submitToFormspree(preForm)
        .then(function (response) {
          if (response.ok) {
            msg.className = 'form-msg ok';
            msg.textContent = 'Demande de préinscription envoyée pour ' + eleve + ' (' + classe + '). Le secrétariat de COMIROH vous contactera sous 48 heures pour la suite du dossier et les documents à fournir.';
            preForm.reset();
          } else {
            msg.className = 'form-msg err';
            msg.textContent = "L'envoi n'a pas abouti. Merci de réessayer, ou de contacter directement le secrétariat par téléphone.";
          }
        })
        .catch(function () {
          msg.className = 'form-msg err';
          msg.textContent = "Impossible d'envoyer la demande (problème de connexion). Merci de réessayer.";
        })
        .finally(function () {
          setSubmitting(preSubmit, false, preIdleLabel);
          msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
  }

  /* ---------- Formulaire de contact ---------- */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    var contactSubmit = document.getElementById('contact-submit');
    var contactIdleLabel = contactSubmit ? contactSubmit.textContent : 'Envoyer le message';

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('contact-msg');

      if (!validateForm(contactForm)) {
        msg.className = 'form-msg err';
        msg.textContent = "Merci de compléter les champs obligatoires (*) avant d'envoyer votre message.";
        return;
      }

      setSubmitting(contactSubmit, true, contactIdleLabel);

      submitToFormspree(contactForm)
        .then(function (response) {
          if (response.ok) {
            msg.className = 'form-msg ok';
            msg.textContent = "Merci ! Votre message a bien été envoyé. L'administration de COMIROH vous répondra dans les meilleurs délais.";
            contactForm.reset();
          } else {
            msg.className = 'form-msg err';
            msg.textContent = "L'envoi n'a pas abouti. Merci de réessayer, ou de nous contacter directement par téléphone.";
          }
        })
        .catch(function () {
          msg.className = 'form-msg err';
          msg.textContent = "Impossible d'envoyer le message (problème de connexion). Merci de réessayer.";
        })
        .finally(function () {
          setSubmitting(contactSubmit, false, contactIdleLabel);
          msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
  }

});
