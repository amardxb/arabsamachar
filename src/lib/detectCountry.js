 
export async function detectUserCountry() {
  try {
    const res = await fetch('/api/geo');
    const data = await res.json();
    return data?.country || null; // e.g. "AE", "IN", "QA"
  } catch (err) {
    console.error('Country detection failed:', err);
    return null;
  }
}

const countryCodeMap = {
  AE: 'uae',
  QA: 'qatar',
  SA: 'saudi',
  OM: 'oman',
  KW: 'kuwait',
  BH: 'bahrain',
};

export function mapToGulfCountry(countryCode) {
  return countryCodeMap[countryCode] || 'uae'; // fallback
}
