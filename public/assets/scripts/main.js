// main.js — Entry point, initializes all modules

import { initNavbar } from './navbar.js';
import { initAnimations } from './animations.js';
import { initForms } from './forms.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAnimations();
  initForms();
});