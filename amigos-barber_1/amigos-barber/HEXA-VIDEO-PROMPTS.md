# Amigos Barber Shop: Hexa.ai video prompts

All five clips are **illustrative footage**, not footage of Amigos Barber Shop. Never label them as the real shop or its staff. Real photos always take priority on the site.

Shared rules for every clip: 16:9 landscape, high resolution, no text, no logos, no watermarks, no audio needed (the site plays muted), warm directional light with controlled shadows, shallow depth of field.

Shared negative prompt: text, captions, logos, watermarks, neon colours, sparks, distorted hands, extra fingers, warped faces, impossible hair transitions, plastic skin, excessive camera shake, fake-looking tools, blood, unsafe blade handling.

---

## Video 1: Hero background (6–10 s, seamless loop)

**Prompt:**
Cinematic close-up of a barber's scissors gliding through short dark hair, cutting to a clipper creating a clean skin fade. Warm side light glints off polished steel. Natural hair and skin texture, shallow depth of field, soft bokeh of a dark timber-and-mirror shop behind. Slow, deliberate push-in with subtle parallax. Subject sits in the right two-thirds of frame; the left third is dark, calm negative space for headline text. Confident, welcoming, premium mood. Loops seamlessly: the last frame matches the first.

**Site use:** desktop hero only, muted, with a poster image. Mobile and reduced-motion users get the still image.

---

## Video 2: Barber tools macro (5–8 s)

**Prompt:**
Macro cinematic sequence on a dark matte surface: straight scissors, clippers, a fine comb, a shaving brush and razor handle arranged with care. Realistic reflections on steel, restrained warm highlights, deep shadows, shallow depth of field. Slow lateral camera slide, then a gentle orbit. Quiet, premium, tactile.

**Site use:** optional divider between hero and services.

---

## Video 3: Traditional shave (5–8 s)

**Prompt:**
Cinematic close-up of a professional barber carrying out a careful traditional shave: warm folded towel beside the client's jaw, lather applied, short controlled razor strokes with correct technique. Realistic skin texture, clean white towels, warm natural window light. Calm, precise, unhurried movement. Camera holds almost still with a very slow drift. Safe, professional handling only.

**Site use:** supports the Hot Towel Shave service card (lazy-loaded).

---

## Video 4: Shop atmosphere (6–10 s)

**Prompt:**
Cinematic interior of a welcoming contemporary local barber shop in daytime: two barber chairs, large mirrors, tidy workstations with combs and tools, warm pendant lighting, dust motes drifting in a shaft of window light. Gentle dolly forward along the row of chairs. Unoccupied or softly out-of-focus figures only. A generic invented interior, not a copy of any real shop.

**Site use:** About section only if no genuine interior photo or video exists. Replace with real footage as soon as it is filmed.

---

## Video 5: Haircut detail (5–8 s)

**Prompt:**
Close-up of a barber refining a haircut: clipper-over-comb blending at the side of the head, then a final comb-through. Precise, realistic hand and tool movement, natural skin and hair, clean finish. Warm directional light, shallow depth of field, steady camera with slight slow push-in. Faces mostly out of frame or in soft focus to avoid distortion.

**Site use:** supports the Services or Gallery sections (lazy-loaded).

---

## Wiring a clip into the site

1. Compress to H.264 MP4 (and optionally WebM), under about 3 MB for the hero. Export a JPG poster frame.
2. Put files in `/videos` and `/images`.
3. In `config.js` set `video.hero: "videos/hero.mp4"` and `video.heroPoster: "images/hero-poster.jpg"`.
4. The hero video plays only on desktop-width screens, with motion allowed and data-saver off. Everywhere else the image or gradient hero is shown.
