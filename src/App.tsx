/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, ArrowRight, ChevronRight,
  BookOpen, Users, Globe, Mail, Newspaper, Search,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import StatsPage from './StatsPage.tsx';

type Page = 'home' | 'stats';

// ─── Types ────────────────────────────────────────────────────────────────────

type Category =
  | 'All'
  | 'Period Poverty'
  | 'Advocacy'
  | 'Education'
  | 'Menstrual Justice'
  | 'Personal Stories'
  | 'Campus Action'
  | 'Culture';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  summary: string;
  externalUrl: string;
  category: Exclude<Category, 'All'>;
  author: string;
  authorInitials: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const categoryColors: Record<
  Exclude<Category, 'All'>,
  { bg: string; text: string; ring: string; bar: string }
> = {
  'Period Poverty':    { bg: 'bg-rose-50',    text: 'text-rose-600',    ring: 'ring-rose-200',    bar: 'bg-rose-500' },
  'Advocacy':         { bg: 'bg-violet-50',  text: 'text-violet-600',  ring: 'ring-violet-200',  bar: 'bg-violet-500' },
  'Education':        { bg: 'bg-sky-50',     text: 'text-sky-600',     ring: 'ring-sky-200',     bar: 'bg-sky-500' },
  'Menstrual Justice':{ bg: 'bg-purple-50',  text: 'text-purple-600',  ring: 'ring-purple-200',  bar: 'bg-purple-500' },
  'Personal Stories': { bg: 'bg-pink-50',    text: 'text-pink-600',    ring: 'ring-pink-200',    bar: 'bg-pink-500' },
  'Campus Action':    { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-200', bar: 'bg-emerald-500' },
  'Culture':          { bg: 'bg-amber-50',   text: 'text-amber-600',   ring: 'ring-amber-200',   bar: 'bg-amber-500' },
};

const posts: Post[] = [
  {
    id: 1,
    title: 'The Hidden Cost of Having a Period: Understanding Period Poverty in 2026',
    excerpt:
      'For more than 500 million people worldwide, getting through a period isn\'t just uncomfortable — it\'s financially devastating. We break down what period poverty really looks like today, who it affects most, and why the crisis is only deepening.',
    summary:
      'This policy analysis from the University of Minnesota argues that federal and state law must do more to address period poverty, which affects millions of Americans who cannot afford basic menstrual products. The authors document that 46% of low-income women report being unable to afford both food and period products, and call for SNAP and WIC eligibility to cover menstrual supplies. They point to Scotland\'s landmark legislation mandating free period products in schools and communities as a model for US lawmakers to follow.',
    externalUrl: 'https://genderpolicyreport.umn.edu/period-poverty-in-the-united-states-what-the-law-should-do/',
    category: 'Period Poverty',
    author: 'Maya Chen',
    authorInitials: 'MC',
    date: 'May 25, 2022',
    readTime: '7 min read',
    featured: true,
  },
  {
    id: 2,
    title: 'Tampon Tax: The Last States Still Treating Periods as Luxuries',
    excerpt:
      'While most states have eliminated the tampon tax, too many still treat menstrual products as non-essential luxury goods. Here\'s what the fight looks like on the ground — and who is still being left behind.',
    summary:
      'NBC News maps exactly which US states still apply a sales tax to tampons, pads, and other menstrual products — as of 2024, 21 states charge between 4% and 7% on period supplies. The article details Texas as the most recent state to eliminate the tax in September 2023, and notes that five states with no general sales tax — Alaska, Delaware, Montana, New Hampshire, and Oregon — also don\'t tax period products. Advocates quoted argue the tax is a form of gender discrimination that disproportionately burdens low-income menstruators.',
    externalUrl: 'https://www.nbcnews.com/health/womens-health/where-tampons-pads-period-products-are-taxed-map-rcna132874',
    category: 'Advocacy',
    author: 'Jordan Williams',
    authorInitials: 'JW',
    date: 'Jan 9, 2024',
    readTime: '5 min read',
  },
  {
    id: 3,
    title: 'Missing School Because of Your Period Should Not Be Normal',
    excerpt:
      'Two-thirds of students report missing class, sports, or exams because they couldn\'t afford or access period products. The data — and the voices — behind a preventable, systemic crisis.',
    summary:
      'PERIOD, the nation\'s largest youth-led menstrual equity organization, documents that nearly 1 in 4 students in the United States struggle to afford period products. Their research finds that 39% of teens report being unable to focus on schoolwork because they lack access, underscoring the direct connection between period poverty and educational outcomes. PERIOD advocates for free menstrual products in every school restroom and public facility as a baseline public health standard.',
    externalUrl: 'https://period.org/periodpoverty',
    category: 'Education',
    author: 'Priya Sharma',
    authorInitials: 'PS',
    date: 'Oct 2025',
    readTime: '6 min read',
  },
  {
    id: 4,
    title: 'Menstrual Justice Is Racial Justice',
    excerpt:
      'Black, Indigenous, and low-income communities face the sharpest end of period poverty. Understanding the intersection of race, class, and menstrual equity is not optional — it is the work.',
    summary:
      'This Brookings Institution analysis finds stark racial disparities in period poverty: 23–24% of Black and Latino households report struggles affording menstrual products, compared to just 8% of white households. The research draws on a St. Louis study in which 64% of low-income women couldn\'t afford period products at least once annually, and 21% faced that challenge every month. The authors argue that period poverty cannot be understood in isolation — it is a direct expression of the same socioeconomic inequities that drive racial gaps in health, education, and financial security.',
    externalUrl: 'https://www.brookings.edu/articles/period-poverty-and-its-reach-across-the-us/',
    category: 'Menstrual Justice',
    author: 'Amara Osei',
    authorInitials: 'AO',
    date: 'Nov 27, 2024',
    readTime: '9 min read',
  },
  {
    id: 5,
    title: "What It's Like to Experience a Period While Unhoused",
    excerpt:
      'Without a safe, private bathroom, clean water, or access to products, menstruating while unhoused is a crisis within a crisis. First-person accounts from advocates and survivors on the front lines.',
    summary:
      'Real stories and research on the daily struggle of managing periods without safe bathrooms, clean water, or access to products — and why unhoused menstruators are among the most overlooked in the period poverty conversation.',
    externalUrl: 'https://publichealthpost.org/health-equity/period-poverty-unhoused/',
    category: 'Personal Stories',
    author: 'Sofia Ramirez',
    authorInitials: 'SR',
    date: 'Feb 7, 2023',
    readTime: '8 min read',
  },
  {
    id: 6,
    title: 'Free Period Products in Schools: Which Districts Are Leading',
    excerpt:
      'A growing number of universities have installed free product dispensers in restrooms — but access remains deeply uneven. We map the progress and the gaps in campus menstrual equity.',
    summary:
      'Researchers at American University document that period poverty affects approximately 500 million people worldwide, with its sharpest impacts falling on low-income, homeless, and incarcerated populations even in wealthy nations like the United States. The piece highlights how American University addressed the crisis on its own campus by installing over 330 free menstrual product dispensers in restrooms following years of student advocacy. Experts argue that systemic solutions — including government investment, dismantling stigma, and guaranteed access to safe sanitation — are essential to solving a crisis that sits at the intersection of gender inequality and public health.',
    externalUrl: 'https://www.american.edu/sis/news/20230301-globally-to-locally-period-poverty-affects-millions.cfm',
    category: 'Campus Action',
    author: 'Taylor Brooks',
    authorInitials: 'TB',
    date: 'Mar 1, 2023',
    readTime: '4 min read'
  },
  {
    id: 7,
    title: 'Period Stigma Is a Global Problem — and Social Media Is Fighting Back',
    excerpt:
      'From #NormalizePeriodsNow to viral videos breaking taboos, a generation of activists is changing the conversation. Here\'s what the digital movement looks like — and where it still falls short.',
    summary:
      'How hashtag campaigns and online activists are challenging menstrual stigma worldwide — and where the movement still needs to go.',
    externalUrl: 'https://borgenproject.org/menstrual-stigma/',
    category: 'Culture',
    author: 'Maya Chen',
    authorInitials: 'MC',
    date: 'Jan 6, 2021',
    readTime: '5 min read',
  },
  {
    id: 8,
    title: 'How to Run a Period Product Drive That Actually Works',
    excerpt:
      'Fighting the tax that treats periods as a luxury.',
    summary:
      'The Alliance for Period Supplies tracks the ongoing campaign to eliminate sales taxes on menstrual products, noting that as of 2025, 19 states still classify period products as taxable goods despite widespread elimination efforts. The Alliance supports the Menstrual Equity for All Act of 2025, which would require schools, government facilities, and large employers to provide free menstrual products and expand Medicaid coverage for them. Their research documents how the tampon tax compounds the financial burden of period poverty, disproportionately hitting the people who can least afford it.',
    externalUrl: 'https://allianceforperiodsupplies.org/tampon-tax/',
    category: 'Advocacy',
    author: 'Jordan Williams',
    authorInitials: 'JW',
    date: 'May 2025',
    readTime: '6 min read',
  },
  {
    id: 9,
    title: 'What Period Poverty Actually Costs: A Lifetime Financial Breakdown',
    excerpt:
      'The average person spends over $6,000 on period products across their lifetime — but for those in poverty, that cost becomes a recurring crisis. We break down the real numbers and what they mean for financial security.',
    summary:
      'This policy brief from BYU\'s Ballard Center finds that 64% of menstruators have struggled to afford period products in the past year, with two-thirds of low-income women reporting consistent difficulty. Over a 40-year menstruating lifespan, individuals spend an estimated $6,000 on products — a figure further inflated by state sales taxes of up to 9.9% in states that still apply them. The brief advocates for the proposed Menstrual Equity Law, which would require free products in schools, government facilities, and large workplaces, and expand Medicaid coverage to include menstrual supplies.',
    externalUrl: 'https://ballardbrief.byu.edu/issue-briefs/period-poverty-in-the-united-states',
    category: 'Period Poverty',
    author: 'Priya Sharma',
    authorInitials: 'PS',
    date: 'Feb 10, 2023',
    readTime: '5 min read',
  },
  {
    id: 10,
    title: '"I Used Toilet Paper for a Week": Students on Facing Period Poverty',
    excerpt:
      'First-person accounts from college and high school students who have navigated period poverty — what it felt like, how it affected their ability to show up, and what they wish schools had done differently.',
    summary:
      'This University of Minnesota policy analysis makes the legal case for treating menstrual product access as a public health right, arguing that existing safety nets like SNAP and WIC leave a critical gap by excluding menstrual supplies. With approximately 61% of Americans living paycheck to paycheck, the authors show that the recurring cost of period products creates a structural barrier that disproportionately falls on students, low-income families, and incarcerated people. They propose a multi-pronged reform agenda — mandatory school provisions, SNAP and WIC eligibility expansions, and menstrual health education — modeled in part on Scotland\'s national policy.',
    externalUrl: 'https://genderpolicyreport.umn.edu/period-poverty-in-the-united-states-what-the-law-should-do/',
    category: 'Period Poverty',
    author: 'Sofia Ramirez',
    authorInitials: 'SR',
    date: 'May 25, 2022',
    readTime: '7 min read',
  },
];

const tickerStats = [
  { value: '500M+', label: 'people globally lack access to basic menstrual products' },
  { value: '2 in 3', label: 'students have missed school due to period poverty' },
  { value: '12 states', label: 'still charge a sales tax on menstrual products' },
  { value: '1 in 5', label: 'US teenagers struggle to afford period products' },
  { value: '$6,360', label: 'average lifetime spend on menstrual products per person' },
];

const categories: Category[] = [
  'All', 'Period Poverty', 'Advocacy', 'Education',
  'Menstrual Justice', 'Personal Stories', 'Campus Action', 'Culture',
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category: Exclude<Category, 'All'> }) {
  const c = categoryColors[category];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text} ring-1 ${c.ring}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.bar}`} />
      {category}
    </span>
  );
}

function AuthorChip({ post }: { post: Post }) {
  const c = categoryColors[post.category];
  return (
    <div className="flex items-center gap-2.5">
      <div className={`w-7 h-7 rounded-full ${c.bg} ${c.text} ring-1 ${c.ring} flex items-center justify-center text-xs font-bold flex-shrink-0`}>
        {post.authorInitials}
      </div>
      <div className="text-xs">
        <span className="font-semibold text-slate-700">{post.author}</span>
        <div className="text-slate-400">{post.date} · {post.readTime}</div>
      </div>
    </div>
  );
}

function PostModal({ post, onClose }: { post: Post; onClose: () => void }) {
  const c = categoryColors[post.category];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-8 overflow-y-auto"
      onClick={onClose}
    >
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-3xl max-w-2xl w-full my-8 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`h-2 ${c.bar}`} />
        <div className="p-7 sm:p-10">
          <div className="flex items-center justify-between mb-6">
            <CategoryBadge category={post.category} />
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mb-5 leading-tight">
            {post.title}
          </h1>

          <AuthorChip post={post} />

          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-slate-600 text-base leading-relaxed mb-4">
              {post.excerpt}
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              {post.summary}
            </p>
            <a
              href={post.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full font-semibold text-sm hover:bg-purple-700 transition-colors group"
            >
              Read Full Article
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function LargePostCard({ post, onClick }: { post: Post; onClick: () => void }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="group bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className={`h-2 ${categoryColors[post.category].bar}`} />
      <div className="p-6">
        <CategoryBadge category={post.category} />
        <h3 className="text-xl font-display font-bold text-slate-900 mt-4 mb-3 leading-tight group-hover:text-purple-700 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <AuthorChip post={post} />
          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
        </div>
      </div>
    </motion.article>
  );
}

function SmallPostCard({ post, onClick }: { post: Post; onClick: () => void }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      className="group flex flex-col bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className={`h-1.5 ${categoryColors[post.category].bar}`} />
      <div className="p-5 flex flex-col flex-1">
        <CategoryBadge category={post.category} />
        <h3 className="text-base font-display font-bold text-slate-900 mt-3 mb-2 leading-snug group-hover:text-purple-700 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2 flex-1">
          {post.excerpt}
        </p>
        <div className="pt-3 border-t border-slate-50">
          <AuthorChip post={post} />
        </div>
      </div>
    </motion.article>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const goHome = () => { setCurrentPage('home'); window.scrollTo(0, 0); };
  const goStats = () => { setCurrentPage('stats'); window.scrollTo(0, 0); };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigateToSection = (id: string) => {
    if (currentPage === 'stats') {
      setCurrentPage('home');
      window.scrollTo(0, 0);
      setTimeout(() => scrollToSection(id), 150);
    } else {
      scrollToSection(id);
    }
  };

  const filterAndGoToStories = (category: Category) => {
    setActiveCategory(category);
    if (currentPage === 'stats') {
      setCurrentPage('home');
      window.scrollTo(0, 0);
      setTimeout(() => scrollToSection('stories'), 150);
    } else {
      scrollToSection('stories');
    }
  };

  const featuredPost = posts.find((p) => p.featured)!;
  const otherPosts = posts.filter((p) => !p.featured);
  const filteredPosts =
    activeCategory === 'All'
      ? otherPosts
      : otherPosts.filter((p) => p.category === activeCategory);

  const navLinks = [
    { label: 'Stories', sectionId: 'stories' },
    { label: 'Statistics', action: goStats },
    { label: 'Issues', sectionId: 'issues' },
    { label: 'Resources', sectionId: 'resources' },
    { label: 'About', sectionId: 'about' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFF] selection:bg-purple-100 selection:text-purple-900">

      {/* ── Post Modal ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedPost && (
          <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
        )}
      </AnimatePresence>

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between h-16 items-center">

            <button
              onClick={() => { goHome(); setIsMenuOpen(false); }}
              className="flex items-center gap-2.5"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex-shrink-0" />
              <span className="font-display font-extrabold text-lg tracking-tight text-slate-900">
                The Flow Project
              </span>
              <span className="hidden sm:block text-xs font-medium text-slate-400 border-l border-slate-200 pl-2.5 ml-0.5">
                Menstrual Justice
              </span>
            </button>

            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    if (link.action) {
                      link.action();
                    } else if (link.sectionId) {
                      navigateToSection(link.sectionId);
                    }
                  }}
                  className={`text-sm font-medium transition-colors ${
                    link.label === 'Statistics' && currentPage === 'stats'
                      ? 'text-purple-600'
                      : 'text-slate-600 hover:text-purple-600'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => navigateToSection('stories')}
                className="p-2 text-slate-500 hover:text-slate-800 transition-colors"
                aria-label="Search stories"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            <button
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-100 bg-white overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (link.action) {
                        link.action();
                      } else if (link.sectionId) {
                        navigateToSection(link.sectionId);
                      }
                    }}
                    className={`text-base font-medium py-1 transition-colors text-left ${
                      link.label === 'Statistics' && currentPage === 'stats'
                        ? 'text-purple-600'
                        : 'text-slate-700 hover:text-purple-600'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence mode="wait">
      {currentPage === 'stats' ? (
        <StatsPage key="stats" onBack={goHome} />
      ) : null}
      </AnimatePresence>

      <main className={currentPage === 'stats' ? 'hidden' : ''}>

        {/* ── Featured Story ──────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-white border-b border-slate-100 py-14 lg:py-24">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-purple-50 rounded-full blur-[140px] opacity-70 translate-x-1/3 -translate-y-1/4" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-50 rounded-full blur-[120px] opacity-50 -translate-x-1/4 translate-y-1/4" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            >
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-xs font-bold uppercase tracking-widest text-purple-500">
                    Featured Story
                  </span>
                  <span className="text-slate-300">·</span>
                  <CategoryBadge category={featuredPost.category} />
                </div>

                <h1 className="text-4xl lg:text-5xl xl:text-[3.25rem] font-display font-black text-slate-900 leading-[1.1] mb-6">
                  {featuredPost.title}
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-3 mb-8">
                  <AuthorChip post={featuredPost} />
                </div>

                <button
                  onClick={() => setSelectedPost(featuredPost)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-semibold text-sm hover:bg-slate-800 transition-colors group"
                >
                  Read Story
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] rounded-[32px] bg-gradient-to-br from-rose-100 via-purple-100 to-pink-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-200/20 to-purple-300/20" />
                  <div className="text-center p-8 relative z-10 select-none">
                    <div className="text-7xl font-display font-black text-rose-400/30 leading-none mb-3">
                      500M+
                    </div>
                    <div className="text-lg font-display font-bold text-slate-500/60">
                      people lack access
                    </div>
                    <div className="text-sm text-slate-400/60 mt-1">
                      to basic menstrual products
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-5 text-xs text-slate-300 font-medium tracking-wide">
                    The Flow Project
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Stats Ticker ────────────────────────────────────────────────── */}
        <div className="bg-slate-900 py-3.5 overflow-hidden">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            className="flex gap-10 whitespace-nowrap will-change-transform"
          >
            {[...tickerStats, ...tickerStats].map((s, i) => (
              <div key={i} className="flex items-center gap-3 flex-shrink-0">
                <span className="text-purple-400 font-display font-bold text-sm">{s.value}</span>
                <span className="text-slate-400 text-sm">{s.label}</span>
                <span className="text-slate-700 mx-1">·</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Stories Grid ────────────────────────────────────────────────── */}
        <section id="stories" className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            <div className="mb-10">
              <h2 className="text-2xl lg:text-3xl font-display font-black text-slate-900 mb-1">
                Latest Stories
              </h2>
              <p className="text-slate-500 text-sm">
                Education, advocacy, and lived experience from our community
              </p>
            </div>

            {/* Category filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {filteredPosts.length > 0 ? (
                  <>
                    <div className="grid md:grid-cols-2 gap-5 mb-5">
                      {filteredPosts.slice(0, 2).map((post) => (
                        <LargePostCard key={post.id} post={post} onClick={() => setSelectedPost(post)} />
                      ))}
                    </div>
                    {filteredPosts.length > 2 && (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredPosts.slice(2).map((post) => (
                          <SmallPostCard key={post.id} post={post} onClick={() => setSelectedPost(post)} />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-20 text-slate-400">
                    <BookOpen className="w-8 h-8 mx-auto mb-3 opacity-40" />
                    <p className="font-medium text-slate-500">No stories in this category yet.</p>
                    <p className="text-sm mt-1">Check back soon or browse another topic.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── Issue Spotlight ─────────────────────────────────────────────── */}
        <section id="issues" className="py-16 lg:py-24 bg-purple-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              <span className="text-purple-300 text-xs font-bold uppercase tracking-widest mb-5 block">
                Issue Spotlight
              </span>
              <h2 className="text-3xl lg:text-5xl font-display font-black text-white mb-6 leading-tight">
                Menstrual justice is not a niche issue.{' '}
                <span className="text-purple-300">It is a human rights issue.</span>
              </h2>
              <p className="text-purple-200 text-lg leading-relaxed mb-10">
                Period poverty sits at the intersection of gender, race, class, and systemic
                inequality. When someone cannot manage their period with dignity, every other
                aspect of their life is affected — their education, their work, their health,
                their sense of self. This is what we mean by menstrual justice.
              </p>

              <div className="grid sm:grid-cols-3 gap-5 mb-10">
                {[
                  { value: '87%', label: 'of those most affected by period poverty are people of color and low-income communities' },
                  { value: '3.3M', label: 'people in the US cannot afford period products each month' },
                  { value: '$0', label: 'guaranteed funding for menstrual products for incarcerated people in most states' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-purple-800 bg-purple-900/40 p-5"
                  >
                    <div className="text-3xl font-display font-black text-purple-300 mb-2">
                      {stat.value}
                    </div>
                    <p className="text-purple-200 text-sm leading-relaxed">{stat.label}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => filterAndGoToStories('Menstrual Justice')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-400 text-purple-950 rounded-full font-bold text-sm hover:bg-purple-300 transition-colors"
              >
                Read All Menstrual Justice Stories
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ── Resources ───────────────────────────────────────────────────── */}
        <section id="resources" className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-display font-black text-slate-900 mb-3">
                Resources & Tools
              </h2>
              <p className="text-slate-500 max-w-lg mx-auto text-sm">
                Everything you need to learn, advocate, and take action on menstrual equity.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  icon: BookOpen,
                  title: 'Education Hub',
                  desc: 'Research, guides, and myth-busting on menstrual health and period poverty.',
                  cls: 'bg-sky-50 text-sky-600',
                  onClick: () => filterAndGoToStories('Education'),
                },
                {
                  icon: Newspaper,
                  title: 'Policy Tracker',
                  desc: 'Current legislation on menstrual equity, the tampon tax, and campus bills.',
                  cls: 'bg-violet-50 text-violet-600',
                  onClick: () => goStats(),
                },
                {
                  icon: Globe,
                  title: 'Find Support',
                  desc: 'Locate free product dispensaries and menstrual aid organizations near you.',
                  cls: 'bg-rose-50 text-rose-600',
                  onClick: () => filterAndGoToStories('Period Poverty'),
                },
                {
                  icon: Users,
                  title: 'Advocacy Toolkit',
                  desc: 'Templates, playbooks, and guides to organize a drive in your community.',
                  cls: 'bg-emerald-50 text-emerald-600',
                  onClick: () => filterAndGoToStories('Advocacy'),
                },
              ].map((item, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  onClick={item.onClick}
                  className="group p-6 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all cursor-pointer text-left w-full"
                >
                  <div className={`w-10 h-10 ${item.cls} rounded-xl flex items-center justify-center mb-4`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                  <span className="text-sm font-semibold text-purple-600 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore <ChevronRight className="w-4 h-4" />
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer id="about" className="bg-slate-950 text-slate-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0" />
                <span className="font-display font-extrabold text-white text-lg">
                  The Flow Project
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
                A publication dedicated to menstrual justice and period poverty awareness.
                Founded by student advocates at UW Bothell. Stories, data, and resources
                for a world where everyone can manage their period with dignity.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => scrollToSection('about')}
                  className="w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
                  aria-label="About us"
                >
                  <Globe className="w-4 h-4" />
                </button>
                <button
                  onClick={() => filterAndGoToStories('Campus Action')}
                  className="w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
                  aria-label="Community"
                >
                  <Users className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
                  aria-label="Contact"
                >
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white text-sm mb-4">Topics</h4>
              <ul className="space-y-2.5 text-sm">
                {categories
                  .filter((c) => c !== 'All')
                  .map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => filterAndGoToStories(cat)}
                        className="text-slate-400 hover:text-white transition-colors text-left"
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white text-sm mb-4">Publication</h4>
              <ul className="space-y-2.5 text-sm">
                {[
                  { label: 'About Us', sectionId: 'about' },
                  { label: 'Write for Us', sectionId: 'about' },
                  { label: 'Editorial Standards', sectionId: 'about' },
                  { label: 'Contact', sectionId: 'about' },
                  { label: 'Privacy Policy', sectionId: 'about' },
                ].map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => scrollToSection(item.sectionId)}
                      className="text-slate-400 hover:text-white transition-colors text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
            <p>© 2026 The Flow Project. All rights reserved.</p>
            <p>Built with care by UW Bothell student advocates.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
