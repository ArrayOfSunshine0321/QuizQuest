const alertBox = document.querySelector('.alert-box');

function setupProfileMenu() {
  document.body.addEventListener('click', (event) => {
    const target = event.target;
    const profileBox = document.querySelector('.profile-box');
    const avatarCircle = document.querySelector('.avatar-circle');
    if (avatarCircle && profileBox && avatarCircle.contains(target)) {
      profileBox.classList.toggle('show');
    } else if (profileBox && !profileBox.contains(target)) {
      profileBox.classList.remove('show');
    }
  });
}

if (alertBox) {
  setTimeout(() => alertBox.classList.add('show'), 50);
  setTimeout(() => {
    alertBox.classList.remove('show');
    setTimeout(() => alertBox.remove(), 1000);
  }, 6000);
}

window.addEventListener('DOMContentLoaded', setupProfileMenu);
