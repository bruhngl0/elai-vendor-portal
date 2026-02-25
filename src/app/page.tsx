"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen text-[#34421E] font-sans overflow-hidden"
      style={{ backgroundColor: "#FFF7D4" }}
    >
      {/* Header */}
      <header className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <nav
            className="flex justify-center space-x-16 text-base font-medium tracking-wide"
            style={{ fontFamily: "Helvetica", fontSize: "12px" }}
          >
            <Link href="/" className="hover:opacity-60 transition-opacity">
              HOME
            </Link>
            <Link href="#about" className="hover:opacity-60 transition-opacity">
              ABOUT
            </Link>
            <Link
              href="#collection"
              className="hover:opacity-60 transition-opacity"
            >
              PRICING
            </Link>
            <Link
              href="#work"
              className="hover:opacity-60 transition-opacity flex items-center gap-1"
            >
              REACH OUT
            </Link>
          </nav>
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative" style={{ minHeight: "85vh" }}>
        {/* Botanical shadow — left side */}
        <div
          className="absolute top-0 left-0 h-full pointer-events-none select-none"
          style={{ width: "22%", zIndex: 1 }}
          aria-hidden="true"
        >
          {/* SVG botanical placeholder mimicking the leaf/branch shadow */}
          <svg
            viewBox="0 0 300 700"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            style={{ opacity: 0.18 }}
          >
            {/* Branches */}
            <path
              d="M80 0 Q90 120 60 200 Q40 280 80 400 Q100 500 70 700"
              stroke="#34421E"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M80 80 Q40 110 20 160"
              stroke="#34421E"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M75 140 Q110 150 130 190"
              stroke="#34421E"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M68 220 Q30 240 10 290"
              stroke="#34421E"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M72 300 Q105 310 125 355"
              stroke="#34421E"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M76 380 Q40 400 25 445"
              stroke="#34421E"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Leaves */}
            <ellipse
              cx="15"
              cy="160"
              rx="18"
              ry="10"
              transform="rotate(-30 15 160)"
              fill="#34421E"
              opacity="0.7"
            />
            <ellipse
              cx="133"
              cy="190"
              rx="18"
              ry="10"
              transform="rotate(20 133 190)"
              fill="#34421E"
              opacity="0.7"
            />
            <ellipse
              cx="8"
              cy="290"
              rx="18"
              ry="10"
              transform="rotate(-25 8 290)"
              fill="#34421E"
              opacity="0.7"
            />
            <ellipse
              cx="128"
              cy="355"
              rx="18"
              ry="10"
              transform="rotate(15 128 355)"
              fill="#34421E"
              opacity="0.7"
            />
            <ellipse
              cx="22"
              cy="445"
              rx="18"
              ry="10"
              transform="rotate(-20 22 445)"
              fill="#34421E"
              opacity="0.7"
            />
            <ellipse
              cx="80"
              cy="80"
              rx="14"
              ry="8"
              transform="rotate(10 80 80)"
              fill="#34421E"
              opacity="0.5"
            />
            <ellipse
              cx="75"
              cy="140"
              rx="14"
              ry="8"
              transform="rotate(-10 75 140)"
              fill="#34421E"
              opacity="0.5"
            />
            <ellipse
              cx="68"
              cy="220"
              rx="14"
              ry="8"
              transform="rotate(5 68 220)"
              fill="#34421E"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Product image placeholder — right side */}
        <div
          className="absolute bottom-0 right-0 pointer-events-none select-none"
          style={{ width: "100%", height: "100%", zIndex: 1 }}
          aria-hidden="true"
        >
          {/* Placeholder rectangle mimicking the lifestyle product photo */}
          <div className="w-full h-full flex items-end justify-center pb-0 pr-0 relative">
            <span
              className="absolute text-xs tracking-widest uppercase"
              style={{
                color: "#34421E",
                bottom: "0%",
                left: "80%",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",

                width: "700px",
              }}
            >
              <img src="/main.png" />
            </span>
          </div>
        </div>

        {/* Center content */}
        <div
          className="relative flex flex-col items-center text-center"
          style={{ paddingTop: "160px", zIndex: 2 }}
        >
          {/* Logo placeholder */}
          <div
            className=""
            style={{
              minHeight: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/*
              LOGO PLACEHOLDER
              Replace this block with your actual <Image> or <svg> logo.
              The logo in the design is a large, dark-green italic serif wordmark "elai"
              with a stylized dot above the "i".
            */}
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
              aria-label="Elai logo placeholder"
            >
              <img src="/logo.png" alt="logo" />
            </div>
          </div>

          <h2
            className="uppercase font-light mt-5 mb-10"
            style={{
              letterSpacing: "0.25em",
              fontSize: "1.1rem",
              color: "#34421E",
            }}
          >
            Elevated everyday essentials
          </h2>

          <Link
            href="/register"
            style={{
              border: "1.5px solid #34421E",
              borderRadius: 9999,
              padding: "14px 44px",
              fontSize: "1.05rem",
              color: "#34421E",
              textDecoration: "none",
              transition: "background 0.3s, color 0.3s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "#34421E";
              (e.currentTarget as HTMLAnchorElement).style.color = "#FFF7D4";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = "#34421E";
            }}
          >
            on board with us
          </Link>
        </div>
      </section>
      {/* Value Proposition Section */}
      {/* Value Proposition Section */}
      {/* Value Proposition Section */}
      {/* Value Proposition Section */}
      <section
        style={{
          backgroundColor: "#FFF7D4",
          position: "relative",
          overflow: "hidden",
          padding: "80px 0 100px",
        }}
      >
        {/* Botanical shadow top-left */}
        <svg
          viewBox="0 0 280 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 240,
            height: 220,
            opacity: 0.15,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          <path
            d="M50 0 Q70 50 45 100 Q25 150 55 230"
            stroke="#34421E"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M48 35 Q15 48 0 78"
            stroke="#34421E"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M46 80 Q88 90 108 118"
            stroke="#34421E"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M44 135 Q8 148 0 178"
            stroke="#34421E"
            strokeWidth="1.5"
            fill="none"
          />
          <ellipse
            cx="0"
            cy="78"
            rx="18"
            ry="10"
            transform="rotate(-30 0 78)"
            fill="#34421E"
            opacity="0.8"
          />
          <ellipse
            cx="110"
            cy="118"
            rx="18"
            ry="10"
            transform="rotate(20 110 118)"
            fill="#34421E"
            opacity="0.8"
          />
          <ellipse
            cx="0"
            cy="178"
            rx="18"
            ry="10"
            transform="rotate(-25 0 178)"
            fill="#34421E"
            opacity="0.8"
          />
          <ellipse
            cx="48"
            cy="35"
            rx="13"
            ry="7"
            fill="#34421E"
            opacity="0.5"
          />
          <ellipse
            cx="110"
            cy="0"
            rx="18"
            ry="10"
            transform="rotate(15 110 0)"
            fill="#34421E"
            opacity="0.5"
          />
          <path
            d="M100 0 Q135 15 155 48"
            stroke="#34421E"
            strokeWidth="1.5"
            fill="none"
          />
          <ellipse
            cx="155"
            cy="48"
            rx="19"
            ry="10"
            transform="rotate(15 155 48)"
            fill="#34421E"
            opacity="0.6"
          />
        </svg>

        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 48px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "center",
          }}
        >
          {/* Left: headline + subtext */}
          <div>
            <h2
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontVariant: "small-caps",
                fontWeight: 400,
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "#34421E",
                lineHeight: 1.25,
                letterSpacing: "0.04em",
                marginBottom: "32px",
              }}
            >
              Everyday essentials,
              <br />
              but chosen with taste.
            </h2>
            <p
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontVariant: "small-caps",
                fontSize: "0.85rem",
                letterSpacing: "0.14em",
                color: "#34421E",
                opacity: 0.7,
                lineHeight: 1.8,
                maxWidth: "380px",
              }}
            >
              We curate pieces that feel good to use, easy to style,
              <br />
              and made to stay in your life not your cart
            </p>
          </div>

          {/* Right: three stacked content cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              alignItems: "flex-end",
            }}
          >
            {[
              {
                title: "Global Reach",
                body: "Access customers in over 50 countries with our integrated shipping and payment solutions.",
              },
              {
                title: "Transparent Fees",
                body: "Keep 85% of every sale. No hidden costs, no listing fees, just straightforward pricing.",
              },
              {
                title: "Quick Setup",
                body: "Get started in minutes with our streamlined onboarding process and automated verification.",
              },
            ].map((card, i) => (
              <div
                key={i}
                style={{
                  width: "88%",
                  backgroundColor: "#FFF7D4",
                  borderRadius: "16px",
                  boxShadow: "4px 6px 24px rgba(52,66,30,0.13)",
                  border: "1px solid #2E3E20",
                  padding: "28px 32px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontVariant: "small-caps",
                    fontWeight: 400,
                    fontSize: "1rem",
                    letterSpacing: "0.12em",
                    color: "#34421E",
                    marginBottom: "10px",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontVariant: "small-caps",
                    fontSize: "0.78rem",
                    letterSpacing: "0.1em",
                    color: "#34421E",
                    opacity: 0.65,
                    lineHeight: 1.75,
                  }}
                >
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>{" "}
      {/* Footer */}
      <footer
        className="py-12 text-center text-xs tracking-widest uppercase"
        style={{ borderTop: "1px solid rgba(52,66,30,0.1)", opacity: 0.55 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <p>&copy; 2026 ELAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
