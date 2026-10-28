# CLICKS — Photography Society of Delhi College of Arts & Commerce (DCAC)
**Independent Delhi Street-Photography Magazine & Darkroom Archive**  
*Delhi College of Arts & Commerce, University of Delhi • Established 2011*  
*Instagram: [@clicks.dcac](https://www.instagram.com/clicks.dcac/)*

---

## 📸 Architectural Philosophy & The Single Data Registry

All website content, photographs, metadata, council members, photographers, achievements, events, and copy live inside **ONE** centralized typed file:
```
src/data/clicks-data.ts
```

**Zero layout code modifications are needed** to update names, awards, quotes, or photography. The entire layout automatically reacts and dynamically computes frame indices, counts, filter chips, and interactive cards.

---

## 🛠️ How to Add & Swap Content

### 1. Adding or Updating Photos
1. Place your image file (JPEG, PNG, or WebP) inside:
   ```
   public/photos/your-image-name.jpg
   ```
2. Open `src/data/clicks-data.ts` and add an entry to the `PHOTO_ARCHIVE` array:
   ```typescript
   {
     id: "delhi-monsoon-2026",
     file: "/photos/your-image-name.jpg",
     title: "Monsoon Reflections at CP",
     photographer: "Photographer Name",
     photographerHandle: "@instagram_handle",
     location: "Connaught Place Inner Circle",
     coordinates: "28.6315° N, 77.2167° E",
     timeDate: "17:30 IST, Jul 2026",
     category: "street", // Options: 'street' | 'portrait' | 'documentary' | 'architecture' | 'people' | 'culture' | 'experimental'
     cameraLens: "Sony α7 IV • 35mm Prime",
     shutter: "1/500s",
     aperture: "ƒ/2.0",
     iso: "ISO 400",
     focalLength: "35mm",
     featuredInSelectedWork: true, // Appears on the pinned horizontal film strip
     featuredInHero: false,        // Appears as floating parallax plate in the Hero
     story: "A one-line reflection on the decisive moment captured in this frame."
   }
   ```

### 2. Updating Council Members
1. Place the council member's portrait inside:
   ```
   public/council/name.png
   ```
2. Edit `COUNCIL_MEMBERS` in `src/data/clicks-data.ts`:
   ```typescript
   {
     id: "member-id",
     name: "Full Name",
     position: "President / Vice President / etc.",
     year: "3rd Year (2025-26)",
     speciality: "Street Documentary & Curation",
     description: "One-line description of their role and lens style.",
     instagram: "https://www.instagram.com/their_handle/",
     portrait: "/council/name.png"
   }
   ```

### 3. Adding Achievements ("On Record")
The Achievements section is **100% data-driven**. Simply append an object to `ACHIEVEMENTS` in `src/data/clicks-data.ts`:
```typescript
{
  id: "achieve-fest-2026",
  rank: "1st PRIZE",
  rankBadge: "1st", // '1st' | '2nd' | 'Won' | 'Finalist'
  competition: "Spot On Street Challenge",
  institution: "Motilal Nehru College (MLNC)",
  year: "2026",
  winningPhotographer: "Photographer Name",
  winningPhotoTitle: "Title of the Winning Frame",
  proofImage: "/achievements/proof-file.jpg",
  story: "Brief one-line story of how the frame was made under competition conditions."
}
```
*The stack will automatically calculate the index, outline the numbers, render the hover citation, and increment the counter without touching any styling.*

### 4. Adding Events & Photowalks
Add entries to `EVENTS` in `src/data/clicks-data.ts`:
```typescript
{
  id: "ev-yamuna-walk-2026",
  date: "Oct 24, 2026 // 05:30 IST",
  title: "Yamuna Ghat Sunrise Expedition",
  location: "Kashmere Gate, Old Delhi",
  category: "photowalk", // 'photowalk' | 'workshop' | 'exhibition' | 'competition' | 'talk'
  coverPhoto: "/events/event-cover.jpg",
  description: "Description of the photowalk or exhibition agenda.",
  galleryCount: 48,
  highlight: "30 photographers • 400 frames archived"
}
```

### 5. Updating Contact, Formspree & Social Links
In `SITE_META` inside `src/data/clicks-data.ts`:
- `contactEmail`: Society official inquiries email.
- `joinFormUrl`: Google Form, Formspree, or recruitment portal URL.
- `applicationDeadline`: Visible deadline text on the recruitment module.
- `instagramUrl` & `instagramHandle`: Direct Instagram links.

---

## 🎯 Brand Rules: Strict Logo & Color Integrity

1. **Logo Geometry**: The official logo is placed cleanly without distortion, cropping, or forced redesign.
   - Transparent PNG: `public/clicks-logo.png`
   - Preserves the camera-as-letter-I concept, the aperture inside the O, and the iconic top red square.
2. **Clear Space**: Navigation and footer lockups maintain clear space equal to the height of the red square.
3. **Single Red Accent**: `#B3141B` (and vivid `#f70012`) is strictly the ONLY UI color accent. All other UI elements are deep black (`#050505`, `#080808`), graphite charcoal, or off-white paper. Color originates purely from the photographs.

---

## 🕹️ Keyboard Shortcuts & Easter Eggs

- **Press `C`**: Triggers a camera shutter snap (80ms white frame flash with synthesized dual-curtain shutter sound).
- **Click Logo 5 Times**: Triggers darkroom shutter release mode.
- **Photo Viewer**: Use `←` and `→` arrow keys to browse exposures; press `ESC` to close.
- **Audio Toggle**: Click the speaker icon in the navigation or loader to enable/disable mechanical Web Audio API shutter clicks.

---

## 🚀 Running the Project Locally

```bash
# Navigate to the project directory
cd clicks-dcac

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
