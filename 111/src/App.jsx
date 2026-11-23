import {
  ArrowUpRight,
  BarChart3,
  Boxes,
  ChevronRight,
  CircleCheck,
  Database,
  Download,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PackageCheck,
  Phone,
  TrendingUp,
  Users,
  X,
} from 'lucide-react'
import { useLayoutEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ClickSpark from './ClickSpark'
import LightRays from './LightRays'
import BorderGlow from './BorderGlow'

gsap.registerPlugin(ScrollTrigger)

const nav = [
  ['关于我', '#about'],
  ['项目成果', '#projects'],
  ['个人优势', '#strengths'],
  ['联系我', '#contact'],
]

const stats = [
  ['72', '万英镑', '旺季月均销售额'],
  ['5.2', '万英镑', '淡季季月均销售额'],
  ['20', '+', '大型活动'],
  ['16', '+', 'Listing 优化'],
]

const skills = [
  {
    icon: BarChart3,
    index: '01',
    title: '数据分析与洞察',
    text: '以业务问题为起点，用 SPSS、Power BI、FineBI 与 Python 将数据转化为可执行结论。',
    tags: ['SPSS', 'Power BI', 'Python'],
  },
  {
    icon: TrendingUp,
    index: '02',
    title: '跨境电商运营',
    text: '覆盖选品调研、Listing 管理、广告优化、促销执行与 FBA 库存的完整运营链路。',
    tags: ['Amazon', 'ACOS', 'Listing'],
  },
  {
    icon: Users,
    index: '03',
    title: '项目统筹与协作',
    text: '从目标拆解到现场落地，擅长跨部门沟通、资源整合与多线程任务推进。',
    tags: ['策划', '协同', '执行'],
  },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="nav-shell">
      <a className="brand" href="#top" aria-label="返回首页">
        <span>Huang Tao</span><i />
      </a>
      <nav className={open ? 'nav-links is-open' : 'nav-links'}>
        {nav.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
      <a className="nav-cta" href="mailto:H081748abc@outlook.com"><Mail size={17} /> 联系我</a>
      <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="切换导航">{open ? <X /> : <Menu />}</button>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <LightRays raysOrigin="top-center" raysColor="#19c9e5" raysSpeed={1.2} lightSpread={0.75} rayLength={1.4} followMouse mouseInfluence={0.12} noiseAmount={0.08} distortion={0.06} />
      <div className="hero-shade" />
      <Navbar />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-wave" aria-hidden="true"><i /><i /><i /></div>
      <div className="hero-content shell">
        <h1><span className="hero-title-main">个人作品集<em className="hero-byline">——黄涛</em></span><strong>DATA × GROWTH</strong></h1>
        <div className="hero-bottom">
          <p>用数据理解市场，用执行推动增长。<br />聚焦数据运营与跨境电商。</p>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section about" id="about">
      <div className="shell">
        <div className="section-head"><span>01 / ABOUT</span><h2>项目经历</h2></div>
        <div className="about-layout">
          <div className="portrait-wrap">
            <div className="portrait">
              <img className="portrait-photo" src="/assets/huang-tao.webp" alt="黄涛个人照片" width="900" height="1200" loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="bio">
            <p className="bio-lead">大数据管理与应用专业本科毕业生，具备数据分析、商业决策与跨境电商运营的复合背景。</p>
            <p>在深圳市易佰网络有限公司担任亚马逊初级运营期间，我独立负责广告优化、促销执行与 Listing 管理，将旺季月均GMV稳定在 72 万英镑，净利润为6.8万英镑，淡季月均GMV为5.2万英镑，净利润为5300英镑。我重视数字背后的业务逻辑，也享受把分析真正落实到增长结果的过程。</p>
            <div className="contact-lines">
              <a href="mailto:H081748abc@outlook.com"><Mail size={16} /> H081748abc@outlook.com</a>
              <a href="tel:13536757317"><Phone size={16} /> 13536757317</a>
              <span><MapPin size={16} /> 广东河源</span>
            </div>
          </div>
        </div>
        <div className="stats">
          {stats.map(([n, unit, label]) => <div className="stat" key={label}><div><strong>{n}</strong><sup>{unit}</sup></div><span>{label}</span></div>)}
        </div>
      </div>
    </section>
  )
}

function SalesVisual() {
  return <div className="project-visual sales-visual"><div className="mock-top"><span>AMAZON / PERFORMANCE</span></div><div className="sales-number"><small>MONTHLY SALES</small><strong>￡52,000</strong></div><div className="chart-bars">{[28,42,36,55,48,64,71,67,82,91,88,100].map((h,i)=><i key={i} style={{height:`${h}%`}} />)}</div><div className="visual-grid" /></div>
}

function DashboardVisual() {
  return <div className="project-visual dashboard-visual"><div className="mock-top"><span>BUSINESS INTELLIGENCE</span></div><div className="dash-grid"><div className="dash-donut"><div><strong>5.75%</strong><span>TACOS</span></div></div><div className="dash-metrics"><span>净利率<strong>10.2%</strong></span><span>新品<strong>02</strong></span><span>Listing<strong>11</strong></span></div></div><svg viewBox="0 0 600 110" preserveAspectRatio="none"><polyline points="0,90 55,76 110,84 165,51 220,63 275,39 330,45 385,20 440,34 495,12 550,22 600,5" /></svg></div>
}

function EventVisual() {
  return <div className="project-visual event-visual"><div className="mock-top"><span>EVENT OPERATIONS</span></div><div className="event-core"><div className="event-orbit"><Users /><i /><i /><i /></div><strong>1,000+</strong><span>师生服务规模</span></div><div className="event-list"><span><CircleCheck /> 资源统筹</span><span><CircleCheck /> 现场执行</span><span><CircleCheck /> 跨部门协作</span></div></div>
}

function Projects() {
  const items = [
    {no:'01', tag:'ECOMMERCE OPERATIONS', title:'亚马逊店铺增长优化', desc:'关键词筛选、广告预算重组与 ACOS 控制，建立从数据复盘到投放调整的执行闭环。', Visual: SalesVisual},
    {no:'02', tag:'DATA ANALYTICS', title:'运营数据可视化看板', desc:'围绕销售额、毛利率、ACOS 与库存效率建立核心指标体系，让经营状态更易判断。', Visual: DashboardVisual},
    {no:'03', tag:'PROJECT MANAGEMENT', title:'校园大型活动统筹', desc:'两年统筹约 20 场大型活动，覆盖方案设计、资源协调、现场执行与复盘沉淀。', Visual: EventVisual},
  ]
  return <section className="section projects" id="projects"><div className="shell"><div className="section-head projects-head"><span>02 / EXPERIENCE</span><h2>项目成果</h2><p>以结果为导向的实践记录</p></div><div className="project-list">{items.map(({no,tag,title,desc,Visual})=><article className="project-card" key={no}><div className="project-copy"><span className="project-no">/ {no}</span><div><div className="project-tag">{tag}</div><h3>{title}</h3><p>{desc}</p></div></div><Visual /></article>)}</div></div></section>
}

function Strengths() {
  return <section className="section strengths" id="strengths"><div className="shell"><div className="section-head strength-head"><span>03 / CAPABILITIES</span><h2>专业技能</h2></div><div className="skill-grid">{skills.map(({icon:Icon,title,text})=><article className="skill-card" key={title}><div className="skill-top"><Icon /></div><h3>{title}</h3><p>{text}</p></article>)}</div><div className="awards"><span>SELECTED HONORS</span><p>iCAN 管理决策模拟挑战赛全国总决赛三等奖</p><p>“典阅杯”跨境电子商务综合能力大赛全国总决赛三等奖</p><p>优秀学生干部 · 校级优秀学生三等奖学金</p></div></div></section>
}

function Contact() {
  return <footer className="contact" id="contact"><div className="contact-grid" /><div className="shell contact-inner"><div className="contact-title-wrap"><h2>期待获得共事机会<br /><span>以AI赋能项目落地</span></h2></div><div className="contact-action"><BorderGlow className="contact-glow"><a href="https://mail.google.com/mail/?view=cm&fs=1&to=H081748abc%40outlook.com" target="_blank" rel="noreferrer" aria-label="使用 Gmail 发送邮件至 H081748abc@outlook.com">发一封邮件 <ArrowUpRight /></a></BorderGlow><BorderGlow className="contact-glow"><a className="resume-link" href="https://maipdf.cn/file/dt6a7497a1259a8/pdf" target="_blank" rel="noreferrer">下载简历 <Download /></a></BorderGlow></div><div className="footer-row"><a className="brand footer-brand" href="#top"><span>Huang Tao</span><i /></a><a href="#top">BACK TO TOP <ChevronRight /></a></div></div></footer>
}

function App() {
  useLayoutEffect(() => {
    document.querySelectorAll('.bio p,.project-copy p,.skill-card p,.awards p').forEach(root => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
      const textNodes = []
      while (walker.nextNode()) {
        if (!walker.currentNode.parentElement?.closest('.body-number')) textNodes.push(walker.currentNode)
      }
      textNodes.forEach(node => {
        const parts = node.textContent.split(/(\d+(?:\.\d+)?%?)/g)
        if (parts.length === 1) return
        const fragment = document.createDocumentFragment()
        parts.forEach(part => {
          if (/^\d+(?:\.\d+)?%?$/.test(part)) {
            const number = document.createElement('span')
            number.className = 'body-number'
            number.textContent = part
            fragment.appendChild(number)
          } else {
            fragment.appendChild(document.createTextNode(part))
          }
        })
        node.replaceWith(fragment)
      })
    })

    document.documentElement.classList.add('gsap-ready')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const context = gsap.context(() => {
      const revealTargets = '.section-head,.project-card,.skill-card,.stat,.about-layout,.awards,.contact-title-wrap,.contact-action'
      gsap.set(revealTargets, { opacity: 1, x: 0, y: 0, scale: 1 })
      if (reduceMotion) return

      const opening = gsap.timeline({ defaults: { ease: 'power4.out' } })
      opening
        .from('.nav-shell', { y: -45, opacity: 0, duration: 1.1 })
        .from('.hero-title-main', { clipPath: 'inset(0 100% 0 0)', x: -90, scaleX: .78, transformOrigin: 'left center', duration: 1.6 }, .15)
        .from('.hero-byline', { x: 90, opacity: 0, duration: 1.1 }, .85)
        .from('.hero h1 strong', { y: 55, opacity: 0, letterSpacing: '18px', duration: 1.2 }, .8)
        .from('.hero-bottom', { y: 45, opacity: 0, duration: 1.1 }, 1.15)
        .from('.hero-wave', { yPercent: 38, opacity: 0, duration: 1.8 }, .45)
        .from('.light-rays-container', { opacity: 0, scale: 1.08, duration: 2.1 }, 0)

      document.querySelectorAll('.section').forEach((section) => {
        const label = section.querySelector('.section-head > span')
        const title = section.querySelector('.section-head h2')
        if (label) gsap.from(label, { x: -150, opacity: 0, scale: 1.8, transformOrigin: 'left center', duration: 1.35, ease: 'power4.out', scrollTrigger: { trigger: section, start: 'top 78%' } })
        if (title) gsap.from(title, { clipPath: 'inset(0 0 100% 0)', y: 105, duration: 1.45, ease: 'power4.out', scrollTrigger: { trigger: section, start: 'top 74%' } })
      })

      gsap.from('.about-layout', { y: 110, opacity: 0, duration: 1.45, ease: 'power4.out', scrollTrigger: { trigger: '.about-layout', start: 'top 82%' } })
      gsap.from('.stat', { y: 85, opacity: 0, duration: 1.15, stagger: .16, ease: 'power3.out', scrollTrigger: { trigger: '.stats', start: 'top 84%' } })
      gsap.from('.project-card', { y: 130, opacity: 0, duration: 1.4, stagger: .24, ease: 'power4.out', scrollTrigger: { trigger: '.project-list', start: 'top 82%' } })
      document.querySelectorAll('.project-visual').forEach((visual) => {
        gsap.from(visual, { clipPath: 'inset(100% 0 0 0)', duration: 1.55, ease: 'power4.inOut', scrollTrigger: { trigger: visual, start: 'top 86%' } })
        if (window.matchMedia('(min-width: 769px)').matches) {
          gsap.fromTo(visual, { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: visual, start: 'top bottom', end: 'bottom top', scrub: 1.2 } })
        }
      })
      gsap.from('.skill-card', { y: 100, opacity: 0, scale: .96, duration: 1.3, stagger: .2, ease: 'power4.out', scrollTrigger: { trigger: '.skill-grid', start: 'top 82%' } })
      gsap.from('.awards > *', { x: -75, opacity: 0, duration: 1.1, stagger: .15, ease: 'power3.out', scrollTrigger: { trigger: '.awards', start: 'top 84%' } })
      gsap.from('.contact-title-wrap h2', { clipPath: 'inset(0 0 100% 0)', y: 100, scaleX: .86, duration: 1.7, ease: 'power4.out', scrollTrigger: { trigger: '.contact', start: 'top 70%' } })
      gsap.from('.contact-action > *', { y: 70, opacity: 0, duration: 1.2, stagger: .22, ease: 'power3.out', scrollTrigger: { trigger: '.contact-action', start: 'top 92%' } })
    })
    ScrollTrigger.refresh()
    return () => {
      context.revert()
      document.documentElement.classList.remove('gsap-ready')
    }
  }, [])
  return <ClickSpark><Hero /><main><About /><Projects /><Strengths /></main><Contact /></ClickSpark>
}

export default App
