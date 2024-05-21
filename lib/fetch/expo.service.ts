import { ZodStringCheck } from 'zod';
import { SliderTypes } from '../types/SliderData.type';

class ExpoService {
  private URL = 'https://turkmenexpo.com/app/api/v1';

  async getBanners(localization: string, choose: string) {
    try {
      const response = await fetch(`${this.URL}banners/${choose}`, {
        headers: {
          'Accept-Language': localization,
        },
      });

      const data: SliderTypes = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default new ExpoService();
