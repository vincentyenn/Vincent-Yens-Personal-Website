export type ProjectTrack = {
  id: 'overview' | 'process' | 'tools' | 'result' | 'links'
  title: string
  description: string
  duration: string
  body: string[]
}

export type Project = {
  slug: string
  title: string
  category: string
  year: string
  status: string
  summary: string
  coverPosition: 'left' | 'center' | 'right'
  tracks: ProjectTrack[]
  tools: string[]
  repository?: string
}

export type SearchItem = {
  id: string
  type: 'Page' | 'Project' | 'Track' | 'Skill'
  title: string
  subtitle: string
  href: string
}

export const projects: Project[] = [
  {
    slug: 'the-connection',
    title: 'The Connection',
    category: 'Portfolio system',
    year: '2026',
    status: 'In progress',
    summary: 'A personal portfolio shaped like a music library, built to make exploring work feel natural.',
    coverPosition: 'left',
    tools: ['React', 'TypeScript', 'GSAP', 'Lenis', 'Vanta'],
    repository: 'https://github.com/vincentyenn/Vincent-Yens-Personal-Website',
    tracks: [
      {
        id: 'overview', title: 'Overview', description: 'The idea and the experience it creates.', duration: '1:12',
        body: [
          'The Connection reframes a portfolio as a library people can browse at their own pace. Pages become destinations, projects become playlists, and case-study sections become tracks.',
          'The interface keeps Vincent Yen visible without turning every label into personal branding. The result feels familiar at first, then becomes more individual as the content unfolds.',
        ],
      },
      {
        id: 'process', title: 'Process', description: 'How the interface became a connected system.', duration: '2:08',
        body: [
          'The process began with Spotify desktop and mobile references, then separated recognizable interaction patterns from protected branding and media. The library, centered search, contextual panel, and player became the core shell.',
          'Each part was tested against one question: does it help someone understand the work, or is it decoration? That rule keeps the theme useful rather than costume-like.',
        ],
      },
      {
        id: 'tools', title: 'Tools', description: 'The focused stack behind the site.', duration: '0:54',
        body: [
          'React and TypeScript organize the routes and content model. Lenis handles smooth navigation, GSAP handles interface choreography, and Vanta provides one contained generative visual.',
          'React Bits contributes a single spotlight interaction. Every library has one job, which keeps the experience expressive without making the stack difficult to maintain.',
        ],
      },
      {
        id: 'result', title: 'Result', description: 'A portfolio that rewards exploration.', duration: '1:36',
        body: [
          'The first release creates a responsive shell, a strong landing experience, a searchable project library, and reusable project-detail structure.',
          'Future pages can use the same system while developing their own visual ideas, including a profile-inspired About page and a resume playlist.',
        ],
      },
      {
        id: 'links', title: 'Links', description: 'Repository and project access.', duration: '0:28',
        body: ['The source repository is available now. A public deployment link can be added when the first release is published.'],
      },
    ],
  },
  {
    slug: 'coursework-archive',
    title: 'Coursework Archive',
    category: 'Web collection',
    year: '2026',
    status: 'Curating',
    summary: 'Selected technical work organized around the decisions, constraints, and lessons behind each build.',
    coverPosition: 'center',
    tools: ['JavaScript', 'HTML', 'CSS'],
    tracks: [
      { id: 'overview', title: 'Overview', description: 'A focused collection of academic work.', duration: '0:48', body: ['This collection will turn selected coursework into concise case studies. Each entry will focus on the problem, implementation choices, and what changed after testing.'] },
      { id: 'process', title: 'Process', description: 'Turning assignments into useful case studies.', duration: '1:44', body: ['The archive keeps the useful context from each assignment while removing classroom-only detail. The goal is to show how Vincent approaches constraints, debugging, and iteration.'] },
      { id: 'tools', title: 'Tools', description: 'Languages and systems used across the work.', duration: '0:52', body: ['The initial collection centers on browser fundamentals: semantic HTML, maintainable CSS, JavaScript, version control, and accessible interaction patterns.'] },
      { id: 'result', title: 'Result', description: 'A clearer record of growth over time.', duration: '1:05', body: ['The finished archive will make progress visible without presenting every assignment. Strong examples stay detailed; smaller lessons are grouped into shorter notes.'] },
      { id: 'links', title: 'Links', description: 'Selected source and documentation.', duration: '0:24', body: ['Links will be added as individual coursework projects are selected and prepared for public viewing.'] },
    ],
  },
  {
    slug: 'interface-experiments',
    title: 'Interface Experiments',
    category: 'Interaction studies',
    year: '2026',
    status: 'Ongoing',
    summary: 'Small interaction studies exploring motion, hierarchy, and the feel of responsive interfaces.',
    coverPosition: 'right',
    tools: ['React', 'GSAP', 'Prototyping'],
    tracks: [
      { id: 'overview', title: 'Overview', description: 'A collection of compact interaction ideas.', duration: '0:42', body: ['Interface Experiments is a home for focused prototypes that are too small to be full products but useful enough to document and revisit.'] },
      { id: 'process', title: 'Process', description: 'Short loops from observation to prototype.', duration: '1:35', body: ['Each study starts with one behavior, such as a transition, search interaction, or responsive pattern. The prototype stays narrow until the behavior feels clear and dependable.'] },
      { id: 'tools', title: 'Tools', description: 'A selective creative development stack.', duration: '0:46', body: ['React provides reusable structure, while CSS and GSAP handle visual feedback. Heavier visual tools are reserved for experiments that truly need them.'] },
      { id: 'result', title: 'Result', description: 'Reusable lessons for future products.', duration: '1:14', body: ['Successful studies become patterns that can move into larger projects. Unsuccessful ones still document why an interaction felt distracting, unclear, or too expensive.'] },
      { id: 'links', title: 'Links', description: 'Experiments and source files.', duration: '0:20', body: ['Individual experiment links will appear here as the collection grows.'] },
    ],
  },
]

export const pageSearchItems: SearchItem[] = [
  { id: 'page-home', type: 'Page', title: 'Home', subtitle: 'Introduction and featured work', href: '/' },
  { id: 'page-projects', type: 'Page', title: 'Projects', subtitle: 'Browse project playlists', href: '/projects' },
]

export const searchItems: SearchItem[] = [
  ...pageSearchItems,
  ...projects.flatMap((project) => [
    {
      id: `project-${project.slug}`,
      type: 'Project' as const,
      title: project.title,
      subtitle: project.summary,
      href: `/projects/${project.slug}`,
    },
    ...project.tracks.map((track) => ({
      id: `${project.slug}-${track.id}`,
      type: 'Track' as const,
      title: track.title,
      subtitle: `${project.title}: ${track.description}`,
      href: `/projects/${project.slug}#${track.id}`,
    })),
    ...project.tools.map((tool) => ({
      id: `${project.slug}-skill-${tool}`,
      type: 'Skill' as const,
      title: tool,
      subtitle: `Used in ${project.title}`,
      href: `/projects/${project.slug}#tools`,
    })),
  ]),
]
