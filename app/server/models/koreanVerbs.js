/*
  base: {
    stem: null,
    polite_present: null,
    polite_past: null,
    polite_future: null,
    ...
  }
*/

export default function(data = {}) {
  return {
    definition: data.definition,
    stem: data.stem,
    polite_present: data.polite_present,
    polite_past: data.polite_past,
    polite_future: data.polite_future
  }
}