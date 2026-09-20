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

export type AboutActivity = {
  title: string
  description: string
  icon: 'code' | 'camera' | 'music' | 'security'
}

export type RecentUpdate = AboutActivity & {
  category: string
  status: string
}

export type ExperienceRole = {
  id: string
  mark: string
  role: string
  company: string
  location: string
  period: string
  summary: string
  achievements: string[]
  tools: string[]
}

export type ExperienceHighlight = {
  value: string
  label: string
}

export type ExperienceProfile = {
  introduction: string
  roles: ExperienceRole[]
  highlights: ExperienceHighlight[]
  education: {
    school: string
    degree: string
    period: string
    detail: string
  }
  skillGroups: Array<{
    label: string
    items: string[]
  }>
  exploring: {
    introduction: string
    communities: string[]
    interests: string[]
  }
}

export const aboutProfile: {
  shortBio: string
  introduction: string
  activities: AboutActivity[]
  recent: RecentUpdate[]
} = {
  shortBio: 'A computer science student who enjoys building thoughtful interfaces, learning secure systems, and creating behind the camera.',
  introduction: 'Hi, I am Vincent Yen, a computer science student at Texas A&M pursuing a cybersecurity minor. I enjoy building interactive web experiences, learning how systems stay secure, discovering new music, and working behind the camera for Aggie football. Those interests shape how I approach projects: curious, detail-oriented, and always willing to iterate.',
  activities: [
    { title: 'Building software', description: 'Turning ideas into useful, polished web experiences.', icon: 'code' },
    { title: 'Sports videography', description: 'Capturing the energy and details around Aggie football.', icon: 'camera' },
    { title: 'Music discovery', description: 'Finding new artists, sounds, and ideas to keep in rotation.', icon: 'music' },
    { title: 'Learning security', description: 'Understanding how reliable systems are designed and protected.', icon: 'security' },
  ],
  recent: [
    { title: 'Building this portfolio', description: 'Designing a Spotify-inspired home for my work.', category: 'Portfolio system', status: 'In progress', icon: 'code' },
    { title: 'Studying secure systems', description: 'Developing stronger computer science and cybersecurity foundations.', category: 'Coursework', status: 'Ongoing', icon: 'security' },
    { title: 'Capturing Aggie football', description: 'Creating sports media and improving my visual storytelling.', category: 'Videography', status: 'In season', icon: 'camera' },
    { title: 'Exploring new music', description: 'Keeping up with artists and sounds that inspire me.', category: 'Music', status: 'Always', icon: 'music' },
  ],
}

export const experienceProfile: ExperienceProfile = {
  introduction: 'I am a computer science student and software engineer who enjoys learning unfamiliar systems, taking on new challenges, and turning ideas into dependable products.',
  roles: [
    {
      id: 'usaa',
      mark: 'USAA',
      role: 'Software Engineering Intern',
      company: 'USAA',
      location: 'Plano, Texas',
      period: 'May 2026 - August 2026',
      summary: 'Improved a production auto claims experience used across hundreds of thousands of claims each year.',
      achievements: [
        'Delivered more than 20 production enhancements for the React 18 Auto DFNOL experience.',
        'Supported a Guidewire ClaimCenter platform handling roughly 600,000 to 670,000 auto claims annually.',
        'Used React Context to keep state reliable across multi-step customer workflows.',
        'Strengthened React and Java Spring Boot API payload handling and Formik/Yup validation across more than 35 workflow sections.',
      ],
      tools: ['React 18', 'TypeScript', 'Java', 'Spring Boot', 'Formik', 'Yup', 'Guidewire'],
    },
    {
      id: 'ut-dallas',
      mark: 'UTD',
      role: 'Research Intern',
      company: 'The University of Texas at Dallas',
      location: 'Richardson, Texas',
      period: 'June 2023 - August 2023',
      summary: 'Explored accessible text simplification with machine learning as part of a five-person research team.',
      achievements: [
        'Built a BERT-based text simplification workflow that reached more than 85% accuracy.',
        'Tuned TensorFlow models to reduce training time by 25% and improve classification accuracy by 10%.',
        'Collaborated with a five-person team to turn research work into deployable accessibility-focused software tools.',
      ],
      tools: ['Python', 'BERT', 'TensorFlow', 'Machine Learning', 'NLP'],
    },
  ],
  highlights: [
    { value: '20+', label: 'production enhancements' },
    { value: '600K-670K', label: 'claims supported annually' },
    { value: '25%', label: 'faster model training' },
    { value: '+10%', label: 'classification accuracy' },
  ],
  education: {
    school: 'Texas A&M University',
    degree: 'B.S. in Computer Science',
    period: 'August 2024 - May 2028',
    detail: 'Cybersecurity minor',
  },
  skillGroups: [
    { label: 'Languages', items: ['Java', 'Python', 'C++', 'SQL', 'JavaScript', 'HTML/CSS'] },
    { label: 'Frameworks', items: ['React', 'Node.js', 'Flask', 'TensorFlow', 'PyTorch'] },
    { label: 'Tools', items: ['Git', 'GitHub', 'GitLab'] },
  ],
  exploring: {
    introduction: 'I like stepping outside one specialty. Hackathons, research, student organizations, sports, and creative work keep me learning from different people and problems.',
    communities: ['Aggie Coding Club', 'TAMU Computing Society', 'SASE', 'TAMUHack'],
    interests: ['Volleyball', 'Baseball', 'Basketball', 'Music', 'Videography', 'Photography', 'Traveling'],
  },
}

export const projects: Project[] = [
  {
    slug: 'the-connection',
    title: 'Personal Website',
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
          'This portfolio reframes a portfolio as a library people can browse at their own pace. Pages become destinations, projects become playlists, and case-study sections become tracks.',
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
  { id: 'page-about', type: 'Page', title: 'Profile', subtitle: 'About Vincent, favorite activities, and recent updates', href: '/about' },
  { id: 'page-experience', type: 'Page', title: 'Experience', subtitle: 'Resume, work history, education, and skills', href: '/experience' },
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
