import { check } from "meteor/check";

export default function calculateAerochange(flight) {
  check(flight, Object);

  if (!flight) {
    return 0;
  }
  if (!flight.flightType) {
    return 0;
  }
  if (flight.flightType === 'planned') {
    return Math.floor(flight.winningExplorerData.minDist * 100);
  }
  return Math.floor(flight.winningExplorerData.minDist * 0.5);
}

export function formatAerochange(amount) {
  return amount.toLocaleString('en');
}
