# Interactive Gym Experience

React · TypeScript · Vite · React Three Fiber · Rapier

## Projectbeschrijving

Dit project is een interactieve 3D gym-ervaring gebouwd met React Three Fiber.  
Gebruikers kunnen door verschillende zones navigeren, fitnessmachines selecteren, informatie bekijken en interactieve events activeren zoals vallende dumbbells met physics en audio.

Het project focust op duidelijke architectuur, interactieve beleving en een strikte scheiding tussen 3D-rendering, logica en UI.

---

## Features

- Interactieve 3D-scene met meerdere zones
- Points of Interest in de vorm van fitnessmachines
- Klik- en hover-interacties via raycasting
- Zoekfunctie om machines snel terug te vinden
- Geanimeerde camera’s en geforceerde camerastandpunten
- Physics met Rapier (vallende dumbbells en collisions)
- Audio feedback bij interacties
- UI volledig losgekoppeld van de 3D-scene

---

## Architectuur

### 3D Scene
De 3D-scene wordt opgebouwd in `components/scenes/SceneContents.tsx`.

Hier worden camera, zones, objecten, physics, interacties en visual effects samengebracht.

### Interacties
De interactielogica (raycasting, hover en klik) staat in `components/scenes/interactions/`.

### UI / HTML
De UI-componenten zoals modals, search en sliders staan in `components/ui/`.

De UI reageert op applicatie-state en staat los van de 3D-logica om overzichtelijkheid en schaalbaarheid te behouden.

### State & flow
`App.tsx` beheert application-state zoals:
- geselecteerde machine
- actieve zone
- UI-stat

---

## Zoekfunctie

De zoekfunctie is geïmplementeerd via de hook `useSearchMachines`.

Machines worden live gefilterd op basis van:
- titel
- categorie
- tags
- spiergroepen

De resultaten worden beperkt tot maximaal acht entries om de performance en UX overzichtelijk te houden.

---

## Physics (Rapier)

Voor interactieve elementen wordt Rapier gebruikt:

- Dynamische rigid bodies voor dumbbells
- Aangepaste gravity, friction en damping waarden
- Collision detection met impact-afhankelijke audio

Deze setup zorgt voor een realistische en fysieke beleving van vallende objecten.

---

## Camera & Animatie

- Zone-gebaseerde camera-aansturing via custom hooks
- Geforceerde camera’s gebruiken vooraf gedefinieerde cameras uit het 3D-model
- Cinematische focus zonder verlies van gebruikerscontrole

---

## Tech Stack

- React
- TypeScript
- Vite
- Three.js
- @react-three/fiber
- @react-three/drei
- @react-three/rapier
- ESLint

---

## Blender Model Credits

De 3D-fitnessapparatuur die in deze scène wordt gebruikt, is afkomstig van onderstaande asset:

**Gym Equipment Pack** – gedownload van CGTrader  
URL: https://www.cgtrader.com/3d-models/sports/equipment/35-gym-equipment-blender-fbx-obj-ready

Deze modellen zijn gebruikt conform de licentievoorwaarden zoals verstrekt door de maker.

---

## Installatie en gebruik

Terminal
npm install
npm run dev

Open vervolgens je browser op de getoonde localhost-URL om de applicatie te bekijken.

## Doel van het project

Dit project is ontwikkeld als educatief en interactief 3D-project met focus op:

- overzichtelijke en schaalbare code
- scheiding tussen 3D-scene, logica en UI
- performance en gebruikersbeleving

## Auteur

Teynur
Arteveldehogeschool - Interactive Media Development
Focus op UI/UX, frontend en interactieve 3D-ervaringen