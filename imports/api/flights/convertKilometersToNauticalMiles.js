const kmToNauticFactor = (1000 / 1852);

export default function convertKilometersToNauticalMiles(kilometers) {
  return kilometers * kmToNauticFactor;
}
