export function getCurrentAcademicYear() {
  const date = new Date();
  const Y = date.getFullYear();
  const M = date.getMonth() + 1;
  const D = date.getDate();

  if (M >= 9) {
    return `${Y}-${Y + 1}`;
  }
  if (M < 6 || (M === 6 && D <= 21)) {
    return `${Y - 1}-${Y}`;
  }

  return `${Y - 1}-${Y}`;
}
