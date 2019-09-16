import { check } from "meteor/check";

export default function calculateAerochange(trajectory) {

  if (!trajectory) {
    console.error("no flight provided");    
    return 0;
  }

  if (!trajectory.min_dist) {
    return 0;
  }

  if (!trajectory.savedCO2InKilograms) {
    trajectory.savedCO2InKilograms = 0;
  }
  
  if (trajectory.destination_city) {

    // 'planned' flight

    if (trajectory.savedCO2InKilograms > 0) {
      // you really saved some CO2 !
      return Math.floor(trajectory.savedCO2InKilograms * 10);
    }

    // no CO2 saved, at least you tried
    if (trajectory.min_dist > 0) {
      return Math.floor(10/trajectory.min_dist);
    }

    return 10;
  }

  // 'free' flight
  // are valued less...
  return Math.floor(trajectory.savedCO2InKilograms / 1000);
}



export function formatAerochange(amount) {
  return amount.toLocaleString('en');
}
