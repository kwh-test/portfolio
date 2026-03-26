/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  Award, 
  BookOpen, 
  Briefcase, 
  Code, 
  Palette, 
  Languages, 
  X,
  ChevronRight,
  ArrowRight,
  Github,
  Globe,
  MapPin,
  CheckCircle2
} from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  achievement?: string;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Richman All-in-One Lotion",
    category: "Wadiz Funding / Design",
    description: "리치맨 올인원 로션 와디즈 펀딩 기획 및 디자인 (성공률 157%)",
    longDescription: "남성용 '리치맨 올인원 로션'의 와디즈 펀딩을 위해 상세페이지 기획부터 시각 디자인, SNS 광고 소재 제작까지 전 과정을 총괄했습니다. 제품의 '올인원' 편의성과 AHA 성분을 통한 각질 제거 효과를 시각적으로 강조하여 목표 금액의 157%를 달성했습니다.",
    image: "https://i.postimg.cc/Wb0gXqdm/seukeulinsyas-2026-03-27-ojeon-6-17-11.png/800/600",
    tags: ["Wadiz", "Product Design", "Marketing", "Copywriting"],
    achievement: "펀딩 성공률 157% 달성"
  },
  {
    id: 2,
    title: "Global E-commerce Management",
    category: "Online MD / Design",
    description: "쿠팡, 스마트스토어 등 국내외 쇼핑몰 운영 및 디자인",
    longDescription: "국내 주요 오픈마켓(쿠팡, 11번가, 스마트스토어) 및 해외 플랫폼의 입점부터 상품 등록, 운영 지원, 배너 및 상세페이지 디자인을 수행했습니다. 데이터 기반의 상품 노출 최적화와 브랜드 아이덴티티를 유지하는 디자인 작업을 병행했습니다.",
    image: "https://i.postimg.cc/Gm72Qbxr/seukeulinsyas-2026-03-27-ojeon-6-21-15.png/800/600",
    tags: ["E-commerce", "Web Design", "Operation"],
  },
  {
    id: 3,
    title: "Visual Identity Design",
    category: "Branding",
    description: "로고, 패키지 및 브랜드 아이덴티티 구축",
    longDescription: "다양한 클라이언트의 브랜드 가치를 시각화하는 로고 및 패키지 디자인을 진행했습니다. 시각 디자인 전공 지식을 바탕으로 브랜드의 핵심 메시지를 담은 일관된 비주얼 시스템을 구축했습니다.",
    image: "https://i.postimg.cc/nzvp6xBj/seukeulinsyas-2026-03-27-ojeon-6-22-37.png",
    tags: ["Logo", "Package", "Branding"],
  }
];

const SKILLS = {
  design: ["Photoshop", "Illustrator", "Figma", "Adobe XD", "상세페이지", "SNS 디자인", "배너", "로고", "패키지"],
  development: ["HTML5", "CSS3", "JavaScript", "Python", "Pandas", "Numpy", "flask", "Django","Dart", "Flutter", "jQuery", "Oracle SQL"]
};

// --- Components ---

const Modal = ({ project, onClose }: { project: Project; onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div 
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
      >
        <X size={20} />
      </button>
      
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 h-64 md:h-auto overflow-hidden bg-gray-50 flex items-center justify-center">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <span className="text-brand-accent font-semibold text-sm uppercase tracking-wider mb-2">
            {project.category}
          </span>
          <h3 className="heading-serif text-3xl mb-4">{project.title}</h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            {project.longDescription}
          </p>
          
          {project.achievement && (
            <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-xl p-4 mb-6">
              <p className="text-brand-accent font-bold flex items-center gap-2">
                <Award size={18} /> {project.achievement}
              </p>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:kmwh2367@gmail.com?subject=${subject}&body=${body}`;
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-ink rounded-full flex items-center justify-center text-white font-bold text-xl">W</div>
            <span className="font-bold text-lg tracking-tight hidden sm:block">Wonhyung Kim</span>
          </div>
          <div className="flex gap-8 items-center">
            <a href="#about" className="text-sm font-medium hover:text-brand-accent transition-colors">About</a>
            <a href="#work" className="text-sm font-medium hover:text-brand-accent transition-colors">Work</a>
            <a href="#skills" className="text-sm font-medium hover:text-brand-accent transition-colors">Skills</a>
            <a href="#contact" className="px-5 py-2.5 bg-brand-ink text-white rounded-full text-sm font-medium hover:bg-brand-accent transition-all">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-semibold uppercase tracking-widest mb-8">
              <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-pulse"></span>
              UI/UX Designer & Frontend Developer
            </div>
            <h1 className="heading-serif text-6xl md:text-8xl lg:text-9xl mb-8 leading-[0.9]">
              We build <span className="italic text-brand-accent">brands</span><br />
              that stand out
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
              "디자인의 감각과 개발의 논리를 연결합니다."<br />
              <span className="text-sm opacity-60">「デザインの感性と開発の論理をつなぎます」</span>
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#work" className="px-8 py-4 bg-brand-accent text-white rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-brand-accent/20">
                View My Work
              </a>
              <a href="#contact" className="px-8 py-4 bg-white border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 transition-colors">
                Let's Talk
              </a>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative rounded-[2.5rem] overflow-hidden aspect-[16/9] lg:aspect-[21/9] shadow-2xl"
          >
            <img 
              src="https://i.ifh.cc/Fj9qAN.jpg/1920/1080" 
              alt="Creative Workspace" 
              className="w-full h-full object-cover brightness-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
          </motion.div>
        </div>
      </section>

      {/* Stats / Intro Section */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="heading-serif text-4xl md:text-5xl mb-8 leading-tight">
                We create meaningful brand experiences that connect businesses with their ideal customers.
              </h2>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-5xl font-bold mb-2">8.9<span className="text-brand-accent">+</span></div>
                  <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Years Experience</p>
                </div>
                <div>
                  <div className="text-5xl font-bold mb-2">157<span className="text-brand-accent">%</span></div>
                  <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Wadiz Success Rate</p>
                </div>
                <div>
                  <div className="text-5xl font-bold mb-2">90<span className="text-brand-accent">%</span></div>
                  <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Project Dedication</p>
                </div>
                <div>
                  <div className="text-5xl font-bold mb-2">3<span className="text-brand-accent">L</span></div>
                  <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Languages (KR/JP/EN)</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="p-8 rounded-3xl bg-brand-bg border border-gray-100">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Briefcase className="text-brand-accent" size={24} /> Hybrid Expert
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  8년 이상의 시각 디자인 실무 경험과 Python 개발 지식을 겸비하여, 디자인과 개발 사이의 간극을 줄이는 전문가입니다.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-brand-bg border border-gray-100">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Globe className="text-brand-blue" size={24} /> Global Collaborator
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  현재 일본에서 언어 학교에 재학 중이며, 비대면 환경에서도 원활한 소통과 철저한 일정 준수를 실천합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Showcase */}
      <section id="work" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="heading-serif text-5xl md:text-6xl mb-4">We do some <br /><span className="italic text-brand-accent">great</span> work</h2>
            </div>
            <div className="hidden md:flex gap-4">
              <button className="p-4 rounded-full border border-gray-200 hover:bg-white transition-colors"><ChevronRight className="rotate-180" /></button>
              <button className="p-4 rounded-full border border-gray-200 hover:bg-white transition-colors"><ChevronRight /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project) => (
              <motion.div 
                key={project.id}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 shadow-lg">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="px-6 py-3 bg-white rounded-full font-bold flex items-center gap-2">
                      View Details <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
                <span className="text-brand-accent font-bold text-sm uppercase tracking-widest">{project.category}</span>
                <h3 className="heading-serif text-2xl mt-2 mb-3">{project.title}</h3>
                <p className="text-gray-500 line-clamp-2">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-brand-ink text-white rounded-[3rem] mx-4 my-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-serif text-5xl md:text-6xl mb-6">Skills & Tools</h2>
            <p className="text-gray-400 max-w-xl mx-auto">디자인 감각과 개발 논리를 모두 갖춘 하이브리드 역량</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-brand-accent rounded-2xl flex items-center justify-center">
                  <Palette size={24} />
                </div>
                <h3 className="text-2xl font-bold">Design Expertise</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {SKILLS.design.map(skill => (
                  <span key={skill} className="px-6 py-3 bg-white/10 rounded-2xl border border-white/10 hover:bg-brand-accent transition-colors cursor-default font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-brand-blue rounded-2xl flex items-center justify-center">
                  <Code size={24} />
                </div>
                <h3 className="text-2xl font-bold">Development Stack</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {SKILLS.development.map(skill => (
                  <span key={skill} className="px-6 py-3 bg-white/10 rounded-2xl border border-white/10 hover:bg-brand-blue transition-colors cursor-default font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Education */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-10 h-10 bg-brand-accent/10 text-brand-accent rounded-full flex items-center justify-center">
                <Briefcase size={20} />
              </div>
              <h2 className="heading-serif text-4xl">Work Experience</h2>
            </div>
            
            <div className="space-y-12">
              <div className="relative pl-8 border-l-2 border-gray-100">
                <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-brand-accent"></div>
                <div className="mb-2 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">Freelance Designer & Online MD</h3>
                    <p className="text-brand-accent font-medium">2019.04 ~ Present</p>
                  </div>
                </div>
                <ul className="space-y-3 text-gray-600 mt-4">
                  <li className="flex gap-3">
                    <CheckCircle2 size={18} className="text-brand-accent shrink-0 mt-1" />
                    <span>쿠팡, 스마트스토어, 11번가 등 국내외 쇼핑몰 운영 및 디자인 전반</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 size={18} className="text-brand-accent shrink-0 mt-1" />
                    <span>와디즈 펀딩 프로젝트 90% 이상 전담 및 성공률 157% 기록</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-16">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-10 h-10 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center">
                  <Award size={20} />
                </div>
                <h2 className="heading-serif text-4xl">Major Awards</h2>
              </div>
              <div className="space-y-6">
                {[
                  { year: "2017", title: "사이버디자인트렌드공모전 장려상/특선/입선" },
                  { year: "2016", title: "커뮤니케이션디자인국제공모전 특선" },
                  { year: "2016", title: "한국디자인트렌드공모전 특선" }
                ].map((award, i) => (
                  <div key={i} className="flex gap-6 p-4 rounded-2xl hover:bg-white transition-colors border border-transparent hover:border-gray-100">
                    <span className="font-bold text-brand-blue">{award.year}</span>
                    <span className="text-gray-700 font-medium">{award.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education & Languages */}
          <div>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-10 h-10 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center">
                <BookOpen size={20} />
              </div>
              <h2 className="heading-serif text-4xl">Education</h2>
            </div>
            <div className="space-y-8">
              <div className="p-6 rounded-3xl bg-white border border-gray-100">
                <h3 className="text-lg font-bold">Java Developer Program</h3>
                <p className="text-gray-500 text-sm mb-2">더휴먼아카데미 국비지원 과정 이수</p>
                <p className="text-brand-green font-medium text-sm">IT 교육과정 수료</p>
              </div>
              <div className="p-6 rounded-3xl bg-white border border-gray-100">
                <h3 className="text-lg font-bold">B.A. in Visual Design</h3>
                <p className="text-gray-500 text-sm mb-2">세명대학교 시각디자인과 졸업</p>
                <p className="text-brand-green font-medium text-sm">Bachelor of Arts</p>
              </div>
            </div>

            <div className="mt-16">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                  <Languages size={20} />
                </div>
                <h2 className="heading-serif text-4xl">Languages & Certs</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl bg-white border border-gray-100">
                  <div className="font-bold mb-1">Japanese</div>
                  <div className="text-purple-600 font-bold text-xl mb-2">JLPT N3</div>
                  <p className="text-gray-500 text-xs">일상회화 가능 (2025.12)</p>
                </div>
                <div className="p-6 rounded-3xl bg-white border border-gray-100">
                  <div className="font-bold mb-1">English</div>
                  <div className="text-purple-600 font-bold text-xl mb-2">TOEIC 850</div>
                  <p className="text-gray-500 text-xs">Business Level (2013.05)</p>
                </div>
                <div className="p-6 rounded-3xl bg-white border border-gray-100 col-span-full">
                  <div className="font-bold mb-1">IT Certs</div>
                  <div className="text-purple-600 font-bold text-lg">MOS - Microsoft Office Specialist</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-brand-accent text-white rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="heading-serif text-6xl md:text-8xl mb-8 leading-tight">
                How can we <br /><span className="italic opacity-80 underline decoration-white/30">help</span> you?
              </h2>
              <p className="text-xl opacity-90 mb-12 max-w-md">
                디자인과 개발의 시너지가 필요한 프로젝트가 있다면 언제든 연락주세요.
              </p>
              
              <div className="space-y-6">
                <a href="mailto:kmwh2367@gmail.com" className="flex items-center gap-4 text-2xl font-bold hover:translate-x-2 transition-transform">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"><Mail size={24} /></div>
                  kmwh2367@gmail.com
                </a>
                <div className="flex items-center gap-4 text-2xl font-bold">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"><Phone size={24} /></div>
                  <div>
                    <div className="text-sm opacity-60 font-medium">KR: 010-8815-2315</div>
                    <div className="text-sm opacity-60 font-medium">JP: +81-70-2319-4839</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-2xl font-bold">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"><MapPin size={24} /></div>
                  <div className="text-sm opacity-60 font-medium">현재 일본 거주 (2026년 3월 말 귀국 예정)</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-[3rem] p-10 text-brand-ink shadow-2xl">
              <h3 className="text-3xl font-bold mb-8">Send a message</h3>
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-0 py-3 border-b border-gray-200 focus:border-brand-accent outline-none transition-colors" 
                      placeholder="Your Name" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-0 py-3 border-b border-gray-200 focus:border-brand-accent outline-none transition-colors" 
                      placeholder="Email Address" 
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4} 
                    className="w-full px-0 py-3 border-b border-gray-200 focus:border-brand-accent outline-none transition-colors resize-none" 
                    placeholder="How can I help?"
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full py-5 bg-brand-ink text-white rounded-2xl font-bold text-lg hover:bg-brand-accent transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-brand-ink text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="heading-serif text-4xl mb-2">Wonhyung Kim</h2>
            <p className="text-gray-500 text-sm">© 2026 Wonhyung Kim. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <a href="http://java1022.cafe24.com/jsp/Test1.jsp" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-brand-accent transition-colors">
              <Globe size={20} />
            </a>
            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-brand-accent transition-colors">
              <Github size={20} />
            </a>
            <a href="mailto:kmwh2367@gmail.com" className="p-3 bg-white/5 rounded-full hover:bg-brand-accent transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-12 border-t border-white/5">
          <h1 className="text-[15vw] font-bold leading-none text-white/5 pointer-events-none select-none text-center">
            CREATIVE
          </h1>
        </div>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <Modal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
