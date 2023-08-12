import { test, expect } from '@playwright/test';

/**
 * Test format
*/
/*
test('description-- what functionality/flow are we testing', async({page}) => {
  // 1. navigate to the page
  // 2. locate the component
  // 3. action using await
  // 4. assert using await
  // Note: locator can be done once and need not be awaited. but while taking action(click) and asserting use await. 
  // playwright will take the latest dom value whenever action/assert is defined for the same locator 
  //

})
*/
test('Should talk to React starter Vite page', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("React starter Vite");
});

test.only('StartPage: Enter the no.of questions and submit; should start the quiz', async ({ page }) => {
  // navigate
  await page.goto('/');

  // locator
  const countInput = page.getByText('5');
  const submitBtn = page.getByRole('button', { name: 'Start'});

  // action
  await submitBtn.click();

  // assert
  await expect(page).toHaveURL(/questions/);
  
  // Note: 
  // No need to test default input value, min, max case as it is covered by unit tests

});
