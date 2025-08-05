import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

export default class GoogleAuthService {
  private static instance: GoogleAuthService | null = null;
  private client: OAuth2Client;

  private constructor(client: OAuth2Client) {
    this.client = client;
  }

  /**
   * Initializes the singleton instance (if not already initialized).
   * This must be awaited ONCE at app startup.
   */
  public static async init(): Promise<void> {
    if (GoogleAuthService.instance) {
      return; // already initialized
    }

    const isProd = process.env.NODE_ENV === 'production';

    const keyFilePath = isProd
      ? process.env.PROD_CREDENTIALS_PATH
      : 'credentials.json';

    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
      ],
    });

    const client = (await auth.getClient()) as OAuth2Client;

    GoogleAuthService.instance = new GoogleAuthService(client);
  }

  /**
   * Returns the already-initialized singleton instance.
   * Throws if init() has not been called yet.
   */
  public static getInstance(): GoogleAuthService {
    if (!GoogleAuthService.instance) {
      throw new Error(
        'GoogleAuthService has not been initialized. Call GoogleAuthService.init() first.'
      );
    }
    return GoogleAuthService.instance;
  }

  public getAuth(): OAuth2Client {
    return this.client;
  }
}
