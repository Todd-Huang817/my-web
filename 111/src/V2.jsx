import { ArrowDown, ArrowRight, ArrowUpRight, BarChart3, Circle, Mail, Menu, MoveRight, Package, Phone, Target, Users } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const cases = [
  { id: 'CASE 001', type: 'AMAZON GROWTH', title: '把广告支出变成可判断的增长信号', text: '通过关键词筛选、预算重组和 ACOS 控制，将月均销售额稳定在 16.5 万元，毛利较初期提升 88.35%。', color: '#ff5c35', metric: '27.34%', label: 'ACOS', Icon: Target },
  { id: 'CASE 002', type: 'CONTENT SYSTEM', title: '让每一条 Listing 都更清晰、更合规', text: '独立完成约 50 条 Listing 的内容迭代与合规检查，同时参与 4 款新品的市场调研和选品论证。', color: '#1dbfaf', metric: '50+', label: 'LISTINGS', Icon: Package },
  { id: 'CASE 003', type: 'TEAM OPERATIONS', title: '把复杂现场拆成有秩序的协作', text: '两年统筹约 20 场大型活动，服务师生超千人，在资源整合、现场统筹与跨部门协作中积累方法。', color: '#f0c928', metric: '20+', label: 'EVENTS', Icon: Users },
]

function Header() {
  const [open, setOpen] = useState(false)
  return <header className="v2-nav">
    <a href="#v2-top" className="v2-logo">HUANG TAO<span>®</span></a>
    <nav className={open ? 'open' : ''}>
      <a href="#profile">简介</a><a href="#work">项目</a><a href="#ability">能力</a><a href="#hello">联系</a>
    </nav>
    <a className="v2-mail" href="mailto:H081748abc@outlook.com"><Mail size={15}/> OPEN TO WORK</a>
    <button onClick={() => setOpen(!open)} aria-label="菜单"><Menu /></button>
  </header>
}

function Hero() {
  const videoRef = useRef(null)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden) video.play().catch(() => {})
      else video.pause()
    }, { threshold: .05 })
    const visibility = () => document.hidden ? video.pause() : video.play().catch(() => {})
    observer.observe(video)
    document.addEventListener('visibilitychange', visibility)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility) }
  }, [])
  return <section className="v2-hero" id="v2-top">
    <Header />
    <video ref={videoRef} autoPlay muted loop playsInline preload="metadata" poster="/assets/earth-horizon.webp">
      <source src="https://videos.pexels.com/video-files/3130284/3130284-hd_1920_1080_30fps.mp4" type="video/mp4" />
    </video>
    <div className="v2-hero-inner">
      <div className="v2-name"><span>PORTFOLIO / 2026</span><h1>黄涛</h1><p>数据运营 × 跨境电商</p></div>
      <div className="v2-signal">
        <div className="signal-head"><span><i/> LIVE BUSINESS SIGNAL</span><span>GUANGDONG · CN</span></div>
        <div className="signal-main"><small>MONTHLY SALES</small><strong>¥165K</strong><span>实习阶段稳定月均销售额</span></div>
        <div className="signal-bars">{[32,44,37,62,54,71,66,82,75,92,86,100].map((x,i)=><i key={i} style={{height:`${x}%`}}/>)}</div>
      </div>
    </div>
    <a className="v2-scroll" href="#profile"><ArrowDown/> SCROLL TO EXPLORE</a>
  </section>
}

function Profile() {
  return <section className="v2-section v2-profile" id="profile"><div className="v2-shell">
    <div className="v2-label"><span>01</span> PROFILE</div>
    <div className="profile-grid">
      <div className="profile-intro"><p>我相信好的运营，<br/>不是追逐数字，<br/><em>而是看懂数字。</em></p></div>
      <div className="profile-copy"><p>你好，我是黄涛，湛江科技学院大数据管理与应用专业 2026 届本科毕业生。我将数据分析思维带进真实业务，用清晰判断和务实执行推动结果。</p><p>目标方向：数据运营 / 跨境电商</p></div>
      <div className="profile-stamp"><div><span>Huang Tao</span><small>DATA × GROWTH</small></div></div>
    </div>
    <div className="experience">
      <div className="exp-title">EXPERIENCE</div>
      <article><time>2025.12 — NOW</time><div><h3>广州荧链科技有限公司</h3><p>亚马逊运营助理</p></div><span>广告优化 · 促销执行 · Listing 管理 · FBA</span></article>
      <article><time>UNIVERSITY</time><div><h3>活动策划部 / 班级</h3><p>部长 · 学习委员</p></div><span>活动统筹 · 资源整合 · 知识共享体系</span></article>
    </div>
  </div></section>
}

function Work() {
  return <section className="v2-section v2-work" id="work"><div className="v2-shell">
    <div className="v2-label light"><span>02</span> SELECTED WORK</div>
    <div className="work-head"><h2>用项目说话。</h2><p>真实业务目标、清晰执行动作、可验证结果。</p></div>
    <div className="case-list">{cases.map(({id,type,title,text,color,metric,label,Icon})=><article className="case" key={id} style={{'--case':color}}>
      <div className="case-index"><span>{id}</span><span>{type}</span></div>
      <div className="case-title"><Icon/><h3>{title}</h3><p>{text}</p></div>
      <div className="case-metric"><strong>{metric}</strong><span>{label}</span></div>
      <button aria-label={`查看${title}`}><ArrowUpRight/></button>
    </article>)}</div>
  </div></section>
}

function Ability() {
  const abilities=[['A','分析','SPSS / Power BI / FineBI / Python'],['B','运营','选品 / 广告 / 内容 / 库存'],['C','协作','策划 / 统筹 / 沟通 / 复盘']]
  return <section className="v2-section v2-ability" id="ability"><div className="v2-shell">
    <div className="v2-label"><span>03</span> CAPABILITIES</div>
    <div className="ability-grid"><div className="ability-copy"><h2>能力不是标签，<br/>是解决问题的工具。</h2><p>具备数据与业务的双重视角，能从分析、判断走到执行与复盘。</p></div><div className="ability-list">{abilities.map(([n,title,desc])=><div key={n}><span>{n}</span><h3>{title}</h3><p>{desc}</p><MoveRight/></div>)}</div></div>
    <div className="honors"><span>HONORS / 03</span><p>iCAN 管理决策模拟挑战赛全国总决赛三等奖</p><p>“典阅杯”跨境电子商务综合能力大赛全国总决赛三等奖</p><p>优秀学生干部 · 校级优秀学生三等奖学金</p></div>
  </div></section>
}

function Contact() {
  return <footer className="v2-contact" id="hello"><div className="v2-shell">
    <div className="v2-label light"><span>04</span> CONTACT</div>
    <div className="contact-main"><span>LET'S BUILD WHAT'S NEXT</span><h2>有合适的机会？<br/>我们聊聊。</h2><a href="mailto:H081748abc@outlook.com">H081748abc@outlook.com <ArrowRight/></a></div>
    <div className="contact-meta"><span><Phone/> 13536757317</span><span>广东河源</span><a href="#v2-top">BACK TO TOP <ArrowUpRight/></a></div>
  </div></footer>
}

export default function V2(){useEffect(()=>{const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');ob.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.case,.profile-grid,.ability-grid,.experience article,.v2-label,.work-head,.honors,.contact-main,.contact-meta').forEach((x,i)=>{x.classList.add('v2-reveal');x.style.setProperty('--delay',`${(i%4)*90}ms`);ob.observe(x)});return()=>ob.disconnect()},[]);return <><Hero/><Profile/><Work/><Ability/><Contact/></>}
