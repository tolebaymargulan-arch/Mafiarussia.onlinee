const header = document.getElementById('siteHeader');
const menuBtn = document.getElementById('menuBtn');

if (header && menuBtn) {
  menuBtn.addEventListener('click', () => {
    const opened = header.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(opened));
    document.body.classList.toggle('menu-opened', opened);
  });

  header.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      header.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-opened');
    });
  });
}

const amountInput = document.getElementById('amount');
const payAmount = document.getElementById('payAmount');
const receiveAmount = document.getElementById('receiveAmount');
const donateForm = document.getElementById('donateForm');
const modal = document.getElementById('donateModal');
const closeModal = document.querySelector('.modal-close');

function getMoscowDay() {
  const formatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    timeZone: 'Europe/Moscow'
  });
  return formatter.format(new Date());
}

function isMoscowWeekend() {
  const day = getMoscowDay();
  return day === 'Sat' || day === 'Sun';
}

function updateDonateCalc() {
  if (!amountInput || !payAmount || !receiveAmount) return;
  const amount = Math.max(0, Math.floor(Number(amountInput.value || 0)));
  const receive = isMoscowWeekend() ? amount * 2 : amount;
  payAmount.textContent = `${amount} ₽`;
  receiveAmount.textContent = `${receive} доната`;
}

if (amountInput) {
  amountInput.addEventListener('input', updateDonateCalc);
  updateDonateCalc();
}

function openModal() {
  if (!modal) return;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function closeDonateModal() {
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
}

if (donateForm) {
  donateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    updateDonateCalc();
    openModal();
  });
}

if (closeModal) closeModal.addEventListener('click', closeDonateModal);
if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeDonateModal();
  });
}
