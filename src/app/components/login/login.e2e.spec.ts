import { test, expect } from '@playwright/test';

test('Login to Angular Blog', async ({ page }) => {
  // Naviguer vers la page de connexion
  await page.goto('http://localhost:4200/login');

  // Laisser les champs de formulaire vides

  // Cliquer sur le bouton de connexion
  await page.click('button[type=submit]');

  // Attendez un court instant pour permettre l'affichage des pop-ups natifs
  await page.waitForTimeout(500);

  // je change bien de page

  // Prendre une capture d'écran pour vérification manuelle
  await page.screenshot({ path: 'login-required-popups.png' });
});
