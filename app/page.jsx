"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* --- Reveal on scroll --- */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-scale").forEach((el) => io.observe(el));

    /* --- Count-up stats --- */
    const counterIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          counterIO.unobserve(e.target);
          const el = e.target;
          const target = +el.dataset.count;
          if (reduced) {
            el.textContent = target;
            return;
          }
          const t0 = performance.now();
          const dur = 1400;
          const tick = (now) => {
            const p = Math.min((now - t0) / dur, 1);
            el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(tick);
          };
          tick(t0);
        });
      },
      { threshold: 0.6 }
    );
    document.querySelectorAll("[data-count]").forEach((el) => counterIO.observe(el));

    /* --- Scroll-linked: nav, progress bar, hero fade, parallax --- */
    const nav = document.getElementById("nav");
    const progress = document.getElementById("navProgress");
    const hero = document.getElementById("heroContent");
    const parallaxEls = Array.from(document.querySelectorAll("[data-parallax]"));
    let ticking = false;

    function onScroll() {
      const y = window.scrollY;
      nav.classList.toggle("scrolled", y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";

      if (!reduced) {
        const vh = window.innerHeight;
        if (hero) {
          const p = Math.min(y / (vh * 0.85), 1);
          hero.style.opacity = String(1 - p * 0.95);
          hero.style.transform = "translateY(" + y * 0.28 + "px) scale(" + (1 - p * 0.06) + ")";
        }
        parallaxEls.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom < -100 || r.top > vh + 100) return;
          const centerOffset = r.top + r.height / 2 - vh / 2;
          el.style.transform = "translateY(" + centerOffset * +el.dataset.parallax * -1 + "px)";
        });
      }
      ticking = false;
    }
    const onScrollRaf = () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScrollRaf, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      counterIO.disconnect();
      window.removeEventListener("scroll", onScrollRaf);
    };
  }, []);

  return (
    <>
      <nav id="nav">
        <div className="wrap nav-inner">
          <a href="#top" className="nav-brand" aria-label="Taleel Software — home">
            Taleel<span>.</span>Software
          </a>
          <div className="nav-links">
            <a href="#systems">Ready Systems</a>
            <a href="#engineering">Engineering</a>
            <a href="#house">The House</a>
            <a href="#method">Method</a>
            <a href="#contact" className="nav-cta">Talk to us</a>
          </div>
        </div>
        <div className="nav-progress" id="navProgress"></div>
      </nav>

      {/* ============ HERO ============ */}
      <header className="hero" id="top">
        <div className="hero-glow" data-parallax="-0.15"></div>
        <div className="hero-content" id="heroContent">
          <span className="eyebrow reveal">Taleel Software · Nairobi, Kenya</span>
          <h1 className="reveal" data-delay="1">
            Software that runs your <span className="grad">business.</span>
          </h1>
          <p className="hero-sub reveal" data-delay="2">
            We build production systems for companies in Kenya and East Africa — ready-to-deploy
            platforms and custom AI that automate operations and grow profit.
          </p>
          <div className="hero-actions reveal" data-delay="3">
            <a className="btn btn-primary" href="#contact">Start a conversation</a>
            <a className="btn btn-ghost" href="#systems">Explore ready systems</a>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true">Scroll</div>
      </header>

      {/* ============ READY SYSTEMS ============ */}
      <section id="systems">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">Ready Systems</span>
            <h2 className="reveal" data-delay="1">
              Built. Proven.<br /><span className="grad">Ready to deploy.</span>
            </h2>
            <p className="reveal" data-delay="2">
              These aren&apos;t proposals — they&apos;re working platforms already running real
              businesses. Configured to your operation and live in weeks, not quarters.
            </p>
          </div>

          {/* Product 1: Rental Property Management */}
          <div className="product reveal-scale">
            <div className="product-copy">
              <span className="product-kicker">Property Management</span>
              <h3>Rent, collected and reconciled.</h3>
              <p>
                A complete rental property management system for landlords, agents, and property
                managers — tenant ledgers, automated invoicing, and payments matched across M-Pesa
                and five bank sources without a spreadsheet in sight.
              </p>
              <ul className="product-feats">
                <li>Automatic M-Pesa &amp; bank reconciliation</li>
                <li>Tenant ledgers, invoicing &amp; arrears tracking</li>
                <li>Owner statements and portfolio dashboards</li>
                <li>Built for multi-property, multi-agent operations</li>
              </ul>
              <a className="product-link" href="#contact">
                See it with your properties <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="product-visual">
              <div className="mock" data-parallax="0.06" aria-hidden="true">
                <div className="mock-bar"><i></i><i></i><i></i><span>Portfolio · July 2026</span></div>
                <div className="mock-stats">
                  <div className="mock-stat"><em>Collected</em><b>KES 4.2M</b><u>▲ 96% of due</u></div>
                  <div className="mock-stat"><em>Units</em><b>212</b><u>▲ 8 new leases</u></div>
                  <div className="mock-stat"><em>Arrears</em><b>KES 168K</b><u>▼ 12% this month</u></div>
                </div>
                <div className="mock-rows">
                  <div className="mock-row">
                    <div><b>Kilimani Court · A-14</b><em>M-Pesa · TXN QGH72…</em></div>
                    <span className="pill pill-ok">Reconciled</span>
                  </div>
                  <div className="mock-row">
                    <div><b>Westpark Suites · 3B</b><em>Equity Bank · Ref 88213</em></div>
                    <span className="pill pill-ok">Reconciled</span>
                  </div>
                  <div className="mock-row">
                    <div><b>Ridge View · B-07</b><em>Co-op Bank · pending match</em></div>
                    <span className="pill pill-wait">Matching…</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product 2: AI Conversational Vision */}
          <div className="product flip reveal-scale">
            <div className="product-copy">
              <span className="product-kicker">AI Conversational Vision</span>
              <h3>Software that sees. And speaks.</h3>
              <p>
                Vision-powered AI that understands what the camera sees and holds a conversation
                about it — product identification, document capture, visual quality checks, and
                customer-facing experiences like virtual try-on.
              </p>
              <ul className="product-feats">
                <li>Real-time image &amp; video understanding</li>
                <li>Natural conversation over what it sees</li>
                <li>Virtual try-on for live storefronts</li>
                <li>Document &amp; ID capture with extraction</li>
              </ul>
              <a className="product-link" href="#contact">
                Book a live demo <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="product-visual">
              <div className="mock" data-parallax="0.06" aria-hidden="true">
                <div className="mock-bar"><i></i><i></i><i></i><span>Vision Session · Live</span></div>
                <div className="mock-cam">
                  <div className="scanline"></div>
                  <div
                    className="cam-box"
                    style={{ top: "34%", left: "12%", width: "34%", height: "44%" }}
                    data-label="Denim jacket · 98%"
                  ></div>
                  <div
                    className="cam-box"
                    style={{ top: "52%", left: "58%", width: "28%", height: "34%" }}
                    data-label="Sneaker · 94%"
                  ></div>
                </div>
                <div className="mock-chat">
                  <div className="bubble bubble-user">Do you have this jacket in medium?</div>
                  <div className="bubble bubble-ai">
                    Yes — the indigo denim jacket is in stock in M and L. Want me to add the medium
                    to your cart, or show it on your photo first?
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product 3: AI Agents */}
          <div className="product reveal-scale">
            <div className="product-copy">
              <span className="product-kicker">AI Agents &amp; Automation</span>
              <h3>Your operations, on autopilot.</h3>
              <p>
                AI agents wired into your actual workflows — not chatbots bolted onto a website.
                They read the inbox, chase the payment, update the ledger, and flag what needs a
                human, so your team works the exceptions instead of the routine.
              </p>
              <ul className="product-feats">
                <li>Agents integrated into real business workflows</li>
                <li>Automated follow-ups, reporting &amp; data entry</li>
                <li>Profit optimization from your own numbers</li>
                <li>Human-in-the-loop where it matters</li>
              </ul>
              <a className="product-link" href="#contact">
                Map your first workflow <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="product-visual">
              <div className="mock" data-parallax="0.06" aria-hidden="true">
                <div className="mock-bar"><i></i><i></i><i></i><span>Agent Run · Collections</span></div>
                <div className="flow">
                  <div className="node">
                    <span className="node-dot">◈</span>
                    <div><b>Scan payment feeds</b><em>M-Pesa + 5 bank sources · every 10 min</em></div>
                    <span className="pill pill-ok">Done</span>
                  </div>
                  <div className="flow-link"></div>
                  <div className="node">
                    <span className="node-dot">◈</span>
                    <div><b>Match &amp; update ledgers</b><em>212 units · 3 unmatched</em></div>
                    <span className="pill pill-ok">Done</span>
                  </div>
                  <div className="flow-link"></div>
                  <div className="node node-live">
                    <span className="node-dot">◈</span>
                    <div><b>Draft arrears follow-ups</b><em>14 tenants · SMS + email queued</em></div>
                    <span className="pill pill-wait">Running</span>
                  </div>
                  <div className="flow-link"></div>
                  <div className="node">
                    <span className="node-dot">◈</span>
                    <div><b>Escalate exceptions</b><em>Flag 2 disputes for the manager</em></div>
                    <span className="pill pill-wait">Waiting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <div className="stats">
        <div className="wrap stats-grid">
          <div className="stat reveal">
            <b className="grad"><span data-count="4">0</span></b>
            <span>ventures run on our stack</span>
          </div>
          <div className="stat reveal" data-delay="1">
            <b className="grad"><span data-count="6">0</span></b>
            <span>payment sources reconciled</span>
          </div>
          <div className="stat reveal" data-delay="2">
            <b className="grad"><span data-count="24">0</span>/7</b>
            <span>monitored production systems</span>
          </div>
          <div className="stat reveal" data-delay="3">
            <b className="grad"><span data-count="2">0</span></b>
            <span>working days to a response</span>
          </div>
        </div>
      </div>

      {/* ============ CUSTOM ENGINEERING (light) ============ */}
      <section className="light" id="engineering">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">Custom Engineering</span>
            <h2 className="reveal" data-delay="1">When ready-made<br />isn&apos;t enough.</h2>
            <p className="reveal" data-delay="2">
              Four disciplines, one standard. Every build ships with documentation, monitoring, and
              a clear handover — because software you can&apos;t maintain is a liability, not an
              asset.
            </p>
          </div>
          <div className="disc-grid">
            <div className="disc reveal">
              <h3>Product engineering</h3>
              <p>
                Full-cycle web and mobile products — from schema design to app-store release. Built
                on a modern real-time stack so your product feels fast on day one and on day one
                thousand.
              </p>
              <div className="disc-tags">
                <span className="tag">Next.js</span><span className="tag">Convex</span>
                <span className="tag">React Native</span>
              </div>
            </div>
            <div className="disc reveal" data-delay="1">
              <h3>AI systems</h3>
              <p>
                Applied AI that earns its keep — agent pipelines, retrieval systems, and LLM-powered
                features integrated into real workflows, not bolted on as a demo.
              </p>
              <div className="disc-tags">
                <span className="tag">Claude API</span><span className="tag">Agent pipelines</span>
                <span className="tag">Vision</span>
              </div>
            </div>
            <div className="disc reveal" data-delay="2">
              <h3>Financial infrastructure</h3>
              <p>
                Payments, reconciliation, and money movement built for East African rails — M-Pesa,
                bank integrations, and IPN flows with idempotency and audit trails as first-class
                requirements.
              </p>
              <div className="disc-tags">
                <span className="tag">M-Pesa / Daraja</span><span className="tag">Bank APIs</span>
                <span className="tag">Reconciliation</span>
              </div>
            </div>
            <div className="disc reveal" data-delay="3">
              <h3>Operations platforms</h3>
              <p>
                Internal systems that run the business — admin portals, manager dashboards, field
                and rider apps, and the API layer that keeps them honest with each other.
              </p>
              <div className="disc-tags">
                <span className="tag">Multi-branch</span><span className="tag">Role-based access</span>
                <span className="tag">Reporting</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ THE HOUSE (dark register) ============ */}
      <section id="house">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">The House</span>
            <h2 className="reveal" data-delay="1">We run what we sell.</h2>
            <p className="reveal" data-delay="2">
              Taleel Software is the engineering division of Taleel Holdings. The holding company
              operates its own ventures — so the systems we sell are the systems we trust with our
              own revenue.
            </p>
          </div>
          <div className="register-list reveal" data-delay="2">
            <div className="reg-row">
              <span className="reg-no">TH—01</span>
              <span className="reg-name">Swyft</span>
              <span className="reg-desc">Proptech &amp; logistics platform for the Kenyan rental market.</span>
              <span className="reg-status">Operating</span>
            </div>
            <div className="reg-row">
              <span className="reg-no">TH—02</span>
              <span className="reg-name">Swyft Agent</span>
              <span className="reg-desc">Rent reconciliation SaaS across five bank and mobile-money sources.</span>
              <span className="reg-status">Operating</span>
            </div>
            <div className="reg-row">
              <span className="reg-no">TH—03</span>
              <span className="reg-name">Munchez</span>
              <span className="reg-desc">Cloud kitchen venture serving Nairobi.</span>
              <span className="reg-status">Operating</span>
            </div>
            <div className="reg-row active">
              <span className="reg-no">TH—04</span>
              <span className="reg-name">Taleel Software</span>
              <span className="reg-desc">
                The engineering division — client work, product builds, and the technical backbone
                of the house.
              </span>
              <span className="reg-status">This division</span>
            </div>
          </div>
          <p className="reg-note reveal">
            Every venture in the register runs on infrastructure built by this division. When we
            propose an architecture, it&apos;s one we&apos;ve already trusted with our own money.
          </p>
        </div>
      </section>

      {/* ============ METHOD (light) ============ */}
      <section className="light" id="method">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">Method</span>
            <h2 className="reveal" data-delay="1">How an engagement runs.</h2>
          </div>
          <div className="method-grid">
            <div className="method reveal">
              <h3>Findings before quotes</h3>
              <p>
                We start with a short discovery — your operations, your data, your constraints — and
                return a written findings document and a fixed-scope proposal. No estimates from
                thin air.
              </p>
            </div>
            <div className="method reveal" data-delay="1">
              <h3>Phased, visible delivery</h3>
              <p>
                Work ships in phases with working software at each gate. You see the product in your
                hands early, and every phase has a defined acceptance line.
              </p>
            </div>
            <div className="method reveal" data-delay="2">
              <h3>Handover or retainer</h3>
              <p>
                At delivery you get documentation, credentials, and a monitored, secured system.
                Keep us on retainer for evolution, or take the keys — either way, you own it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="cta" id="contact">
        <div className="cta-glow" data-parallax="-0.1"></div>
        <div className="wrap">
          <span className="eyebrow reveal">Start a conversation</span>
          <h2 className="reveal" data-delay="1">
            Tell us what the business needs to do.{" "}
            <span className="grad">We&apos;ll tell you what to build.</span>
          </h2>
          <p className="reveal" data-delay="2">
            Enquiries answered within two working days, with a discovery call proposed where
            there&apos;s a fit.
          </p>
          <div className="hero-actions reveal" data-delay="3">
            <a
              className="btn btn-primary"
              href="mailto:software@taleelholdings.com?subject=Project%20enquiry%20—%20Taleel%20Software"
            >
              Email the division
            </a>
            <a className="btn btn-ghost" href="#systems">Revisit the systems</a>
          </div>
          <span className="cta-mail reveal" data-delay="4">
            or write directly to <a href="mailto:software@taleelholdings.com">software@taleelholdings.com</a>
          </span>
        </div>
      </section>

      <footer>
        <div className="wrap foot-inner">
          <b>Taleel Software Ltd</b>
          <span>A division of Taleel Holdings Ltd · Nairobi, Kenya</span>
          <span>© 2026 Taleel Holdings Ltd. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
