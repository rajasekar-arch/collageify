export interface CollageOptions {
  images: (File | string)[];
  rows?: number;
  cols?: number;
  width?: number;
  height?: number;
  padding?: number;
  backgroundColor?: string;
}

export async function createCollage({
  images,
  rows = 2,
  cols = 2,
  width = 800,
  height = 800,
  padding = 10,
  backgroundColor = '#ffffff',
}: CollageOptions): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  const imageElements = await Promise.all(
    images.map(src => loadImage(src))
  );

  const cellWidth = (width - padding * (cols + 1)) / cols;
  const cellHeight = (height - padding * (rows + 1)) / rows;

  imageElements.forEach((img, index) => {
    const row = Math.floor(index / cols);
    const col = index % cols;
    const x = padding + col * (cellWidth + padding);
    const y = padding + row * (cellHeight + padding);
    ctx.drawImage(img, x, y, cellWidth, cellHeight);
  });

  return canvas;
}

function loadImage(src: File | string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    if (typeof src === 'string') {
      img.src = src;
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        img.src = reader.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(src);
    }
  });
}

export function downloadCanvas(canvas: HTMLCanvasElement, filename = 'collage.png') {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export async function getDominantColorsFromImage(
  file: File,
  colorCount = 5
): Promise<string[]> {
  const image = await loadImage(file);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error("Canvas is not supported");

  const width = (canvas.width = image.width);
  const height = (canvas.height = image.height);
  ctx.drawImage(image, 0, 0, width, height);

  const imageData = ctx.getImageData(0, 0, width, height);
  const colorMap: Record<string, number> = {};

  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    const a = imageData.data[i + 3];
    if (a < 128) continue; // Ignore transparent pixels

    const hex = rgbToHex(r, g, b);
    colorMap[hex] = (colorMap[hex] || 0) + 1;
  }

  const sortedColors = Object.entries(colorMap)
    .sort((a, b) => b[1] - a[1]) // Sort by frequency
    .slice(0, colorCount) // Top N
    .map(([hex]) => hex);

  return sortedColors;
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map((x) => x.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  );
}
