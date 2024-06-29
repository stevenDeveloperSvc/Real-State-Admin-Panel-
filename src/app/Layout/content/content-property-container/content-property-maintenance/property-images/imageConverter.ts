export class ImageConverter {
    static async addWatermark(file: File, watermarkSrc: string): Promise<string> {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
  
        fileReader.onload = (e: any) => {
          const img = new Image();
          img.src = e.target.result;
  
          img.onload = () => {
            const watermark = new Image();
            watermark.src = watermarkSrc;
  
            watermark.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
  
              canvas.width = img.width;
              canvas.height = img.height;
  
              ctx?.drawImage(img, 0, 0);
  
              const xPos = canvas.width - watermark.width - 90;
              const yPos = canvas.height - watermark.height - 90;
  
              ctx?.drawImage(watermark, xPos, yPos);
  
              resolve(canvas.toDataURL('image/png'));
            };
  
            watermark.onerror = reject;
          };
  
          img.onerror = reject;
        };
  
        fileReader.onerror = reject;
  
        fileReader.readAsDataURL(file);
      });
    }
  }
  