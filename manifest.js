// Manifest of all pages + markdown rendering helpers.
// Add new essays by appending an entry to ESSAYS.
(function (global) {
  const f = (file, title) => ({ file, title: title || file.replace(/\.(html|md)$/, '').replace(/[-_]/g, ' ') });

  const ESSAYS = [
    f('A Unified Field Theory of Political Dynamics_ The Universalist–Tribal–Parasite Model.html', 'A Unified Field Theory of Political Dynamics: The Universalist–Tribal–Parasite Model'),
    f('Aggregated-B-Tree-PostgreSQL-Extended.md', 'Aggregated B-Tree PostgreSQL (Extended)'),
    f('Aggregated-B-Tree-PostgreSQL.md', 'Aggregated B-Tree PostgreSQL'),
    f('Alignment Is Not One Problem.html', 'Alignment Is Not One Problem'),
    f('Alignment as Cover Story_ What AI Policy Is Actually Optimizing.html', 'Alignment as Cover Story: What AI Policy Is Actually Optimizing'),
    f('Autorepair_ The Hidden Engine of Novelty, Utility, and Persistence.html', 'Autorepair: The Hidden Engine of Novelty, Utility, and Persistence'),
    f('Compression, Collapse, and the Moral Geometry of Detail.html', 'Compression, Collapse, and the Moral Geometry of Detail'),
    f('Fish People Becoming Gods_ Why the Molt Requires We Become Insect People First.html', 'Fish People Becoming Gods: Why the Molt Requires We Become Insect People First'),
    f('Good and Evil_ A Structural Essay.html', 'Good and Evil: A Structural Essay'),
    f('Gravitational Conductivity_ Dark-Matter Phenomenology as a Propagation Effect in Relational Spacetime.html', 'Gravitational Conductivity: Dark-Matter Phenomenology as a Propagation Effect in Relational Spacetime'),
    f('Gravitic-Portals-Field-Theory.md', 'Gravitic Portals Field Theory'),
    f('Group-Typed-Tensors-Research-Plan.md', 'Group-Typed Tensors Research Plan'),
    f('How We Are Building HAL.html', 'How We Are Building HAL'),
    f('How to Clean Your Room (Like a Champion!).html', 'How to Clean Your Room (Like a Champion!)'),
    f('How-Not-to-End-a-War-Appomattox-Versailles.md', 'How Not to End a War: Appomattox & Versailles'),
    f('In God\'s Image_ The Mathematical Metaphysics of Quantum Sentience.html', 'In God\'s Image: The Mathematical Metaphysics of Quantum Sentience'),
    f('Law and Violence_ The Mortar and the Monopoly.html', 'Law and Violence: The Mortar and the Monopoly'),
    f('Momentum-Exchange-Fields-Three-Body.md', 'Momentum Exchange Fields: Three-Body'),
    f('The Anchor and the Tribe_ On the True Nature of the Christian Category.html', 'The Anchor and the Tribe: On the True Nature of the Christian Category'),
    f('The Architecture of Adversity_ Rethinking Educational Structure and Childhood Development.html', 'The Architecture of Adversity: Rethinking Educational Structure and Childhood Development'),
    f('The Ego Manifesto — A Deconstruction of the Self as Political Artifact.html', 'The Ego Manifesto — A Deconstruction of the Self as Political Artifact'),
    f('The Ethics of Wealth_ Control, Capture, and the Story We Tell Ourselves.html', 'The Ethics of Wealth: Control, Capture, and the Story We Tell Ourselves'),
    f('The Function, Not the Failure_ Father\'s Mental Health as a Predictable Injury of Institutional Betrayal.html', 'The Function, Not the Failure: Father\'s Mental Health as a Predictable Injury of Institutional Betrayal'),
    f('The Hypocrisy of _Always Believe Women__ How a Corrective Slogan Became a Corrosive Doctrine.html', 'The Hypocrisy of "Always Believe Women": How a Corrective Slogan Became a Corrosive Doctrine'),
    f('The Last Librarian_ A Prepper\'s Perspective on AI Alignment.html', 'The Last Librarian: A Prepper\'s Perspective on AI Alignment'),
    f('The Mortar Problem.html', 'The Mortar Problem'),
    f('The Proxy Trap_ Watermarks, Institutions, and the Politics of Unauthorized Reason.html', 'The Proxy Trap: Watermarks, Institutions, and the Politics of Unauthorized Reason'),
    f('The Status-Bonding Sentence_ Sycophancy Disguised as Insight.html', 'The Status-Bonding Sentence: Sycophancy Disguised as Insight'),
    f('The Water Mob_ On Panic, Class, and the Authoritarian Reflex.html', 'The Water Mob: On Panic, Class, and the Authoritarian Reflex'),
    f('The-Collapse-of-Authority-Guilds.md', 'The Collapse of Authority Guilds'),
    f('Unwrapping-Christmas-The-Myth-and-Honesty.md', 'Unwrapping Christmas: The Myth and Honesty')
  ];

  const isMarkdown = (file) => /\.md$/i.test(file);

  // URL a page should be opened at: HTML directly, markdown through the viewer.
  const hrefFor = (entry) =>
    isMarkdown(entry.file)
      ? 'viewer.html?file=' + encodeURIComponent(entry.file)
      : encodeURI(entry.file).replace(/#/g, '%23').replace(/\?/g, '%3F');

  // Fetches a markdown file and renders it into `target` using marked.js (must be loaded).
  async function renderMarkdown(file, target) {
    if (!ESSAYS.some((e) => e.file === file)) {
      target.textContent = 'Unknown page: ' + file;
      return null;
    }
    const res = await fetch(encodeURI(file).replace(/#/g, '%23').replace(/\?/g, '%3F'));
    if (!res.ok) {
      target.textContent = 'Failed to load ' + file + ' (' + res.status + ')';
      return null;
    }
    const text = await res.text();
    target.innerHTML = global.marked.parse(text);
    const h1 = target.querySelector('h1');
    return h1 ? h1.textContent : file;
  }

  global.ESSAYS = ESSAYS;
  global.EssayManifest = { ESSAYS, isMarkdown, hrefFor, renderMarkdown };
})(window);
