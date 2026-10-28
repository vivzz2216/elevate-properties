/**
 * ELEVATE PROPERTIES — Site Integrity and Verification Suite
 */

const fs = require('fs');
const path = require('path');

let errors = 0;
let passed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    errors++;
  }
}

console.log('\n--- STARTING ELEVATE PROPERTIES VERIFICATION SUITE ---\n');

// 1. Asset Existence Tests
console.log('1. Checking Images and Assets:');
const requiredImages = [
  'hero-cliffside.jpg',
  'interior-philosophy.jpg',
  'project-horizon.jpg',
  'project-ridge.jpg',
  'project-stone-light.jpg',
  'material-travertine.jpg',
  'material-concrete.jpg',
  'material-stone.jpg',
  'material-timber.jpg',
  'journal-coastal.jpg',
  'journal-twilight.jpg',
  'ref-hero.jpg',
  'ref-hero-side.jpg',
  'ref-philosophy.jpg',
  'ref-project-1.jpg',
  'ref-project-2.jpg',
  'ref-project-3.jpg'
];

requiredImages.forEach(imgName => {
  const p = path.join(__dirname, 'images', imgName);
  const exists = fs.existsSync(p);
  const size = exists ? fs.statSync(p).size : 0;
  assert(exists && size > 1000, `Asset ${imgName} exists (${Math.round(size / 1024)} KB)`);
});

// 2. HTML Structure & Navigation Target Verification
console.log('\n2. Checking HTML Structure and Navigation Targets:');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const requiredSections = [
  'id="hero"',
  'id="studio"',
  'id="projects"',
  'id="philosophy"',
  'id="materials"',
  'id="principles"',
  'id="journal"',
  'id="contact"',
  'id="footer"'
];

requiredSections.forEach(secId => {
  assert(html.includes(secId), `Section target ${secId} present in HTML`);
});

// 3. Navigation Links Match Section IDs
console.log('\n3. Checking Navigation Target Links:');
const navLinks = ['#projects', '#studio', '#materials', '#journal', '#contact'];
navLinks.forEach(link => {
  assert(html.includes(`href="${link}"`), `Navigation link ${link} exists`);
  const targetId = `id="${link.slice(1)}"`;
  assert(html.includes(targetId), `Target ID ${targetId} exists for link ${link}`);
});

// 4. Checking Reference Headings and Copy
console.log('\n4. Checking Brand and Reference Copy:');
assert(html.includes('E L E V A T E'), 'Brand name E L E V A T E present');
assert(html.includes('PROPERTIES'), 'Brand subtitle PROPERTIES present');
assert(html.includes('BUILT TO ENDURE.'), 'Hero headline BUILT TO ENDURE. present');
assert(html.includes('Architecture with'), 'Mission headline "Architecture with" present');
assert(html.includes('a point of view'), 'Mission headline "a point of view" present');
assert(html.includes('FEATURED PROJECTS'), 'FEATURED PROJECTS section header present');
assert(html.includes('THE HORIZON HOUSE'), 'Card 1: THE HORIZON HOUSE present');
assert(html.includes('STONE / LIGHT'), 'Card 2: STONE / LIGHT present');
assert(html.includes('THE RIDGE RETREAT'), 'Card 3: THE RIDGE RETREAT present');
assert(html.includes('FORM FOLLOWS'), 'Philosophy headline "FORM FOLLOWS" present');
assert(html.includes('FEELING.'), 'Philosophy headline "FEELING." present');
assert(html.includes('YEARS OF'), 'Stat "YEARS OF PRACTICE" present');
assert(html.includes('BUILT'), 'Stat "BUILT PROJECTS" present');
assert(html.includes('COUNTRIES'), 'Stat "COUNTRIES" present');
assert(html.includes("LET'S TALK"), "Footer CTA LET'S TALK present");

// 5. Checking CSS Architecture
console.log('\n5. Checking CSS Tokens & Media Queries:');
const css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');
assert(css.includes('--color-bg-base: #0c0c0e'), 'Base nocturnal background color #0c0c0e configured');
assert(css.includes('--font-display: \'Barlow Condensed\''), 'Display font Barlow Condensed configured');
assert(css.includes('--font-serif: \'Cormorant Garamond\''), 'Serif font Cormorant Garamond configured');
assert(css.includes('@media (max-width: 1024px)'), 'Tablet breakpoint 1024px configured');
assert(css.includes('@media (max-width: 768px)'), 'Mobile breakpoint 768px configured');
assert(css.includes('@media (prefers-reduced-motion: reduce)'), 'Accessibility prefers-reduced-motion configured');

// 6. Checking JavaScript Architecture
console.log('\n6. Checking JavaScript Modules and Features:');
const js = fs.readFileSync(path.join(__dirname, 'main.js'), 'utf8');
assert(js.includes('switchHeroSlide'), 'Hero project switcher function present');
assert(js.includes('initAmbientAudio'), 'Web Audio ambient synthesizer present');
assert(js.includes('countUp'), 'Animated stats counter function present');
assert(js.includes('openProjectModal'), 'Project detail modal drawer function present');
assert(js.includes('materialsData'), 'Materiality archive dataset present');
assert(js.includes('toggleAssetBtn'), '4K Master vs Reference Asset comparator present');
assert(js.includes('revealObserver'), 'Entrance motion observer present');

console.log(`\n--- VERIFICATION SUMMARY: ${passed} PASSED, ${errors} FAILED ---\n`);
if (errors > 0) process.exit(1);
