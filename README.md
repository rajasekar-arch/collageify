# collageify

accepts images, creates a collage, and downloads it as a file, get the dominant colors in the uploaded image.
![npm](https://img.shields.io/npm/v/collageify)
![npm downloads](https://img.shields.io/npm/dm/collageify)
![License](https://img.shields.io/npm/l/collageify)
![build](https://img.shields.io/github/actions/workflow/status/rajasekar-arch/collageify/build.yml)

# 📸 Collageify

**Collageify** is a lightweight TypeScript library that allows you to:

- Create beautiful image collages in the browser
- Extract dominant color codes from uploaded images
- Download the final collage as a PNG file

Perfect for creative tools, photo editors, and AI image apps!

---

## ✨ Features

- 🖼️ Render collages from multiple images using HTML5 canvas
- 🎨 Get top dominant colors from any image (hex codes)
- 📥 Download the final collage in one click
- ⚙️ Customizable grid (rows, columns, padding, background)
- 💡 Supports file input or image URLs (in browser)

---

## 🚀 Installation

```bash
npm install collageify

or

yarn add collageify

```

📜 Example Usage (Browser)

```typescript
// Example : 1
import { createCollage, downloadCanvas } from 'collagify';

const files = [...]; // File[] from <input type="file" multiple>
createCollage({ images: files, rows: 2, cols: 2 }).then(canvas => {
  document.body.appendChild(canvas); // optional preview
  downloadCanvas(canvas); // triggers download
});

```
👉 Create a Collage

```typescript
// Example : 2
import { createCollage, downloadCanvas } from "collageify";

const files = [
  /* File[] from <input type="file" multiple /> */
];

const canvas = await createCollage({
  images: files,
  rows: 2,
  cols: 2,
  width: 800,
  height: 800,
  padding: 10,
  backgroundColor: "#ffffff",
});

document.body.appendChild(canvas); // Preview

downloadCanvas(canvas, "my-collage.png"); // Trigger download
```

🎨 Extract Dominant Colors
```typescript
import { getDominantColorsFromImage } from "collageify";

const file = myFileInput.files[0];

const colors = await getDominantColorsFromImage(file, 5);

console.log("Top colors:", colors); // ['#AABBCC', '#FF1234', ...]

```

📚 API Reference

```bash
createCollage(options: CollageOptions): Promise<HTMLCanvasElement>
```
```bash
| Option            | Type                 | Default   | Description               |
| ----------------- | -------------------- | --------- | ------------------------- |
| `images`          | `File[] \| string[]` | –         | Image sources             |
| `rows`            | `number`             | `2`       | Number of collage rows    |
| `cols`            | `number`             | `2`       | Number of collage columns |
| `width`           | `number`             | `800`     | Final collage width (px)  |
| `height`          | `number`             | `800`     | Final collage height (px) |
| `padding`         | `number`             | `10`      | Spacing between images    |
| `backgroundColor` | `string`             | `#ffffff` | Canvas background color   |
```

```bash
getDominantColorsFromImage(file: File, colorCount?: number): Promise<string[]>
Returns an array of hex color codes (#RRGGBB) extracted from the image.

downloadCanvas(canvas: HTMLCanvasElement, filename?: string): void
Downloads the canvas as a .png file.
```

👨‍💻 Author
Made with ❤️ by rajasekar-arch <rajasekar_e_c@outlook.com>
