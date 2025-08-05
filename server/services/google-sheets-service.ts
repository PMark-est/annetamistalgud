import axios from 'axios';

let cachedData: number | null = null;
let lastCacheTimestamp = Date.now();

export async function getHoiukoduAmount(refresh = false): Promise<number> {
  const twoHours = 2 * 60 * 60 * 1000;
  const now = Date.now();

  if (!refresh && cachedData !== null && now - lastCacheTimestamp < twoHours) {
    return cachedData;
  }

  try {
    const { data } = await axios(
      `https://sheets.googleapis.com/v4/spreadsheets/t/values/Sheet1!A1:C5?key=${process.env.GOOGLE_API_KEY}`
    );

    for (let i = 1; i < data.values.length; i++) {
      const [type, amount] = data.values[i];
      if (type === 'hoiukodu') {
        cachedData = parseFloat(amount) || 0;
        lastCacheTimestamp = now;
        return cachedData;
      }
    }
  } catch (err) {
    console.error('Google Sheets fetch failed:', err);
  }

  return 0;
}
