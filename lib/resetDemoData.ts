import { resetClothing } from '../features/clothing/clothing.store';
import { resetOnboarding } from '../features/onboarding/onboarding.storage';
import { resetOutfits } from '../features/outfit/outfit.store';

export async function resetDemoData() {
  resetClothing();
  await Promise.all([resetOutfits(), resetOnboarding()]);
}
