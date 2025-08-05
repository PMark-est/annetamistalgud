import { google } from 'googleapis';
import { SheetsGoals } from '../../../types/donations';
import GoogleAuthService from './google-auth-service';

let cachedData: number | null = null;
let lastCacheTimestamp = Date.now();

export async function getHoiukoduAmount(refresh = false): Promise<number> {
  const twoHours = 2 * 60 * 60 * 1000;
  const now = Date.now();

  if (!refresh && cachedData !== null && now - lastCacheTimestamp < twoHours) {
    return cachedData;
  }

  try {
    const sheets = google.sheets({
      version: 'v4',
      auth: GoogleAuthService.getInstance().getAuth(),
    });
    const data = await sheets.spreadsheets.get({
      auth: GoogleAuthService.getInstance().getAuth(),
      spreadsheetId: process.env.SHEETS_ID,
      ranges: ['Sheet1'],
      includeGridData: true,
    });

    const rows = data.data.sheets![0].data!;
    const sheetsData: SheetsGoals[] = [];
    const rowData = rows[0].rowData!;
    for (let i = 1; i < rowData.length; i++) {
      const rowValues = rowData[i].values;
      if (rowValues === undefined) {
        continue;
      }
      if (rowValues[0].hyperlink) {
        continue;
      }
      const type = rowValues[0].formattedValue;
      if (type === null || type === undefined) {
        continue;
      }
      const amountDonated = Number(rowValues[1].formattedValue);
      const donationGoal = Number(rowValues[2].formattedValue);

      sheetsData.push({
        type,
        amountDonated,
        donationGoal,
      });
    }

    return sheetsData.find(goal => goal.type === 'hoiukodu')!.amountDonated;
  } catch (err) {
    console.error('Google Sheets fetch failed:', err);
  }

  return 0;
}
