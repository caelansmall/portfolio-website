var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, useNavigate, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import React, { createElement, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { motion as motion$1 } from "motion/react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Renderer, Camera, Transform, Plane, Texture, Program, Mesh } from "ogl";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const Navbar = ({ logoComponent }) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0
  });
  return /* @__PURE__ */ jsxs("div", { className: "fixed top-0 left-0 flex w-full box-border align-center justify-between pt-8 pb-16 pl-32 pr-32 z-999999", children: [
    logoComponent && /* @__PURE__ */ jsx("div", { style: { display: "flex", alignItems: "center", marginRight: 32 }, children: logoComponent }),
    /* @__PURE__ */ jsxs(
      "ul",
      {
        onMouseLeave: () => {
          setPosition((pv) => ({
            ...pv,
            opacity: 0
          }));
        },
        className: "relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1",
        children: [
          /* @__PURE__ */ jsx(Tab, { setPosition, path: "/", children: "Home" }),
          /* @__PURE__ */ jsx(Tab, { setPosition, path: "/skills", children: "Skills" }),
          /* @__PURE__ */ jsx(Tab, { setPosition, path: "/projects", children: "Projects" }),
          /* @__PURE__ */ jsx(Tab, { setPosition, path: "/about", children: "About" }),
          /* @__PURE__ */ jsx(Tab, { setPosition, path: "/contact", children: "Contact" }),
          /* @__PURE__ */ jsx(Cursor, { position })
        ]
      }
    )
  ] });
};
const Tab = ({ children, setPosition, path }) => {
  const ref = useRef(null);
  const navigate = useNavigate();
  return /* @__PURE__ */ jsx(
    "li",
    {
      ref,
      onMouseEnter: () => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft
        });
      },
      onClick: () => {
        console.log("in on click");
        navigate(path);
      },
      className: "relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base",
      children
    }
  );
};
const Cursor = ({ position }) => {
  return /* @__PURE__ */ jsx(
    motion.li,
    {
      animate: position,
      className: "absolute z-0 h-7 w-24 rounded-full bg-black md:h-12"
    }
  );
};
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Fredoka:wght@600&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
function LogoButton() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsx("button", {
    onClick: () => navigate("/"),
    "aria-label": "Go to Home",
    role: "link",
    tabIndex: 0,
    style: {
      display: "flex",
      alignItems: "center",
      fontFamily: "Fredoka, Inter, Segoe UI, Arial, sans-serif",
      fontWeight: 600,
      fontSize: "1.35rem",
      color: "#e6e6e6",
      letterSpacing: "0.14em",
      marginLeft: "-48px",
      marginRight: 28,
      userSelect: "none",
      background: "none",
      border: "none",
      padding: 0,
      cursor: "pointer",
      outline: "none",
      transition: "color 0.15s"
    },
    onKeyDown: (e) => {
      if (e.key === "Enter" || e.key === " ") {
        navigate("/");
      }
    },
    children: "CKFS"
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsxs("div", {
    className: "absolute top-0 left-0 h-full w-full",
    children: [/* @__PURE__ */ jsx(Navbar, {
      logoComponent: /* @__PURE__ */ jsx(LogoButton, {})
    }), /* @__PURE__ */ jsx(Outlet, {})]
  });
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const BoxesCore = ({ className, ...rest }) => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);
  let colors = [
    "#93c5fd",
    "#f9a8d4",
    "#86efac",
    "#fde047",
    "#fca5a5",
    "#d8b4fe",
    "#93c5fd",
    "#a5b4fc",
    "#c4b5fd"
  ];
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: {
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`
      },
      className: cn(
        "absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4",
        className
      ),
      ...rest,
      children: rows.map((_, i) => /* @__PURE__ */ jsx(
        motion$1.div,
        {
          className: "relative h-8 w-16 border-l border-slate-700",
          children: cols.map((_2, j) => /* @__PURE__ */ jsx(
            motion$1.div,
            {
              whileHover: {
                backgroundColor: `${getRandomColor()}`,
                transition: { duration: 0 }
              },
              animate: {
                transition: { duration: 2 }
              },
              className: "relative h-8 w-16 border-t border-r border-slate-700",
              children: j % 2 === 0 && i % 2 === 0 ? /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  strokeWidth: "1.5",
                  stroke: "currentColor",
                  className: "pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px] text-slate-700",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M12 6v12m6-6H6"
                    }
                  )
                }
              ) : null
            },
            `col` + j
          ))
        },
        `row` + i
      ))
    }
  );
};
const Boxes = React.memo(BoxesCore);
function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(/* @__PURE__ */ new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);
  useEffect(() => {
    let interval;
    let currentIteration = 0;
    const getNextIndex = (revealedSet) => {
      const textLength = text.length;
      switch (revealDirection) {
        case "start":
          return revealedSet.size;
        case "end":
          return textLength - 1 - revealedSet.size;
        case "center": {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;
          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
            return nextIndex;
          }
          for (let i = 0; i < textLength; i++) {
            if (!revealedSet.has(i)) return i;
          }
          return 0;
        }
        default:
          return revealedSet.size;
      }
    };
    const availableChars = useOriginalCharsOnly ? Array.from(new Set(text.split(""))).filter((char) => char !== " ") : characters.split("");
    const shuffleText = (originalText, currentRevealed) => {
      if (useOriginalCharsOnly) {
        const positions = originalText.split("").map((char, i) => ({
          char,
          isSpace: char === " ",
          index: i,
          isRevealed: currentRevealed.has(i)
        }));
        const nonSpaceChars = positions.filter((p) => !p.isSpace && !p.isRevealed).map((p) => p.char);
        for (let i = nonSpaceChars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]];
        }
        let charIndex = 0;
        return positions.map((p) => {
          if (p.isSpace) return " ";
          if (p.isRevealed) return originalText[p.index];
          return nonSpaceChars[charIndex++];
        }).join("");
      } else {
        return originalText.split("").map((char, i) => {
          if (char === " ") return " ";
          if (currentRevealed.has(i)) return originalText[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        }).join("");
      }
    };
    if (isHovering) {
      setIsScrambling(true);
      interval = setInterval(() => {
        setRevealedIndices((prevRevealed) => {
          if (sequential) {
            if (prevRevealed.size < text.length) {
              const nextIndex = getNextIndex(prevRevealed);
              const newRevealed = new Set(prevRevealed);
              newRevealed.add(nextIndex);
              setDisplayText(shuffleText(text, newRevealed));
              return newRevealed;
            } else {
              clearInterval(interval);
              setIsScrambling(false);
              return prevRevealed;
            }
          } else {
            setDisplayText(shuffleText(text, prevRevealed));
            currentIteration++;
            if (currentIteration >= maxIterations) {
              clearInterval(interval);
              setIsScrambling(false);
              setDisplayText(text);
            }
            return prevRevealed;
          }
        });
      }, speed);
    } else {
      setDisplayText(text);
      setRevealedIndices(/* @__PURE__ */ new Set());
      setIsScrambling(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    isHovering,
    text,
    speed,
    maxIterations,
    sequential,
    revealDirection,
    characters,
    useOriginalCharsOnly
  ]);
  useEffect(() => {
    if (animateOn !== "view") return;
    const observerCallback = (entries) => {
      entries.forEach((entry2) => {
        if (entry2.isIntersecting && !hasAnimated) {
          setIsHovering(true);
          setHasAnimated(true);
        }
      });
    };
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [animateOn, hasAnimated]);
  const hoverProps = animateOn === "hover" ? {
    onMouseEnter: () => setIsHovering(true),
    onMouseLeave: () => setIsHovering(false)
  } : {};
  return /* @__PURE__ */ jsxs(
    motion.span,
    {
      ref: containerRef,
      className: `inline-block whitespace-pre-wrap ${parentClassName}`,
      ...hoverProps,
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: displayText }),
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: displayText.split("").map((char, index) => {
          const isRevealedOrDone = revealedIndices.has(index) || !isScrambling || !isHovering;
          return /* @__PURE__ */ jsx(
            "span",
            {
              className: isRevealedOrDone ? className : encryptedClassName,
              children: char
            },
            index
          );
        }) })
      ]
    }
  );
}
function Hero() {
  return /* @__PURE__ */ jsxs("div", { className: "h-230 relative w-full overflow-hidden bg-slate-900 flex flex-col justify-center items-start rounded-lg", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" }),
    /* @__PURE__ */ jsx(Boxes, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col pl-15", children: [
      /* @__PURE__ */ jsx(
        DecryptedText,
        {
          text: "Caelan Small",
          speed: 80,
          maxIterations: 30,
          sequential: true,
          className: "relative justify-center items-start font-light z-999 text-8xl text-left text-white font-mono pl",
          parentClassName: "relative justify-center items-start font-light z-999 text-8xl text-left text-white font-mono",
          encryptedClassName: "relative justify-center items-start font-light z-999 text-8xl text-left text-white font-mono",
          animateOn: "view"
        }
      ),
      /* @__PURE__ */ jsx(
        DecryptedText,
        {
          text: "Software Engineer",
          speed: 80,
          maxIterations: 30,
          sequential: true,
          className: "relative justify-center items-start font-light z-999 text-5xl text-left text-white font-mono",
          parentClassName: "relative justify-center items-start font-light z-999 text-5xl text-left text-white font-mono",
          encryptedClassName: "relative justify-center items-start font-light z-999 text-5xl text-left text-white font-mono",
          animateOn: "view"
        }
      )
    ] })
  ] });
}
function meta({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = withComponentProps(function Home() {
  return /* @__PURE__ */ jsx("div", {
    style: {
      width: "100vw",
      height: "100vh",
      minHeight: "100vh",
      minWidth: "100vw",
      overflow: "hidden",
      position: "relative",
      padding: 0,
      margin: 0,
      boxSizing: "border-box"
    },
    children: /* @__PURE__ */ jsx(Hero, {})
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(this, args), wait);
  };
}
function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}
function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== "constructor" && typeof instance[key] === "function") {
      instance[key] = instance[key].bind(instance);
    }
  });
}
function getFontSize(font) {
  const match = font.match(/(\d+)px/);
  return match ? parseInt(match[1], 10) : 30;
}
function createTextTexture(gl, text, font = "bold 30px monospace", color = "black") {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not get 2d context");
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const fontSize = getFontSize(font);
  const textHeight = Math.ceil(fontSize * 1.2);
  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}
class Title {
  constructor({
    gl,
    plane,
    renderer,
    text,
    textColor = "#545050",
    font = "30px monospace"
  }) {
    __publicField(this, "gl");
    __publicField(this, "plane");
    __publicField(this, "renderer");
    __publicField(this, "text");
    __publicField(this, "textColor");
    __publicField(this, "font");
    __publicField(this, "mesh");
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }
  createMesh() {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor
    );
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeightScaled = this.plane.scale.y * 0.15;
    const textWidthScaled = textHeightScaled * aspect;
    this.mesh.scale.set(textWidthScaled, textHeightScaled, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeightScaled * 0.5 - 0.05;
    this.mesh.setParent(this.plane);
  }
}
class Media {
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font
  }) {
    __publicField(this, "extra", 0);
    __publicField(this, "geometry");
    __publicField(this, "gl");
    __publicField(this, "image");
    __publicField(this, "index");
    __publicField(this, "length");
    __publicField(this, "renderer");
    __publicField(this, "scene");
    __publicField(this, "screen");
    __publicField(this, "text");
    __publicField(this, "viewport");
    __publicField(this, "bend");
    __publicField(this, "textColor");
    __publicField(this, "borderRadius");
    __publicField(this, "font");
    __publicField(this, "program");
    __publicField(this, "plane");
    __publicField(this, "title");
    __publicField(this, "scale");
    __publicField(this, "padding");
    __publicField(this, "width");
    __publicField(this, "widthTotal");
    __publicField(this, "x");
    __publicField(this, "speed", 0);
    __publicField(this, "isBefore", false);
    __publicField(this, "isAfter", false);
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }
  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        // Rounded box SDF for UV space
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          // Apply rounded corners (assumes vUv in [0,1])
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          if(d > 0.0) {
            discard;
          }
          
          gl_FragColor = vec4(color.rgb, 1.0);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    });
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [
        img.naturalWidth,
        img.naturalHeight
      ];
    };
  }
  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }
  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      font: this.font
    });
  }
  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;
    const H = this.viewport.width / 2;
    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }
    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;
    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }
  onResize({
    screen,
    viewport
  } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [
          this.viewport.width,
          this.viewport.height
        ];
      }
    }
    this.scale = this.screen.height / 1500;
    this.plane.scale.y = this.viewport.height * (900 * this.scale) / this.screen.height;
    this.plane.scale.x = this.viewport.width * (700 * this.scale) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [
      this.plane.scale.x,
      this.plane.scale.y
    ];
    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}
class App2 {
  constructor(container, {
    items,
    bend = 1,
    textColor = "#ffffff",
    borderRadius = 0,
    font = "bold 30px monospace"
  }) {
    __publicField(this, "_wheelHandler");
    __publicField(this, "container");
    __publicField(this, "scroll");
    __publicField(this, "onCheckDebounce");
    __publicField(this, "renderer");
    __publicField(this, "gl");
    __publicField(this, "camera");
    __publicField(this, "scene");
    __publicField(this, "planeGeometry");
    __publicField(this, "medias", []);
    __publicField(this, "mediasImages", []);
    __publicField(this, "screen");
    __publicField(this, "viewport");
    __publicField(this, "raf", 0);
    __publicField(this, "boundOnResize");
    __publicField(this, "boundOnWheel");
    __publicField(this, "boundOnTouchDown");
    __publicField(this, "boundOnTouchMove");
    __publicField(this, "boundOnTouchUp");
    __publicField(this, "isDown", false);
    __publicField(this, "start", 0);
    document.documentElement.classList.remove("no-js");
    this.container = container;
    this.scroll = { ease: 0.09, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.update();
    this.addEventListeners();
  }
  createRenderer() {
    this.renderer = new Renderer({ alpha: true });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.renderer.gl.canvas);
  }
  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }
  createScene() {
    this.scene = new Transform();
  }
  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100
    });
  }
  createMedias(items, bend = 1, textColor, borderRadius, font) {
    const defaultItems = [
      {
        image: `https://picsum.photos/seed/1/800/600?grayscale`,
        text: "Bridge"
      },
      {
        image: `https://picsum.photos/seed/2/800/600?grayscale`,
        text: "Desk Setup"
      },
      {
        image: `https://picsum.photos/seed/3/800/600?grayscale`,
        text: "Waterfall"
      },
      {
        image: `https://picsum.photos/seed/4/800/600?grayscale`,
        text: "Strawberries"
      },
      {
        image: `https://picsum.photos/seed/5/800/600?grayscale`,
        text: "Deep Diving"
      },
      {
        image: `https://picsum.photos/seed/16/800/600?grayscale`,
        text: "Train Track"
      },
      {
        image: `https://picsum.photos/seed/17/800/600?grayscale`,
        text: "Santorini"
      },
      {
        image: `https://picsum.photos/seed/8/800/600?grayscale`,
        text: "Blurry Lights"
      },
      {
        image: `https://picsum.photos/seed/9/800/600?grayscale`,
        text: "New York"
      },
      {
        image: `https://picsum.photos/seed/10/800/600?grayscale`,
        text: "Good Boy"
      },
      {
        image: `https://picsum.photos/seed/21/800/600?grayscale`,
        text: "Coastline"
      },
      {
        image: `https://picsum.photos/seed/12/800/600?grayscale`,
        text: "Palm Trees"
      }
    ];
    const galleryItems = items && items.length ? items : defaultItems;
    this.mediasImages = galleryItems.concat(galleryItems);
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font
      });
    });
  }
  onTouchDown(e) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = "touches" in e ? e.touches[0].clientX : e.clientX;
  }
  onTouchMove(e) {
    if (!this.isDown) return;
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * 0.05;
    this.scroll.target = (this.scroll.position ?? 0) + distance;
  }
  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }
  onWheel(e) {
    if (e) {
      e.preventDefault();
      this.scroll.target += e.deltaY > 0 ? 2 : -2;
    } else {
      this.scroll.target += 2;
    }
    this.onCheckDebounce();
  }
  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }
  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    });
    const fov = this.camera.fov * Math.PI / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach(
        (media) => media.onResize({ screen: this.screen, viewport: this.viewport })
      );
    }
  }
  update() {
    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    );
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }
  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    window.addEventListener("resize", this.boundOnResize);
    this._wheelHandler = (e) => this.boundOnWheel(e);
    window.addEventListener("wheel", this._wheelHandler, { passive: false });
    window.addEventListener("mousedown", this.boundOnTouchDown);
    window.addEventListener("mousemove", this.boundOnTouchMove);
    window.addEventListener("mouseup", this.boundOnTouchUp);
    window.addEventListener("touchstart", this.boundOnTouchDown);
    window.addEventListener("touchmove", this.boundOnTouchMove);
    window.addEventListener("touchend", this.boundOnTouchUp);
  }
  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.boundOnResize);
    if (this._wheelHandler) {
      window.removeEventListener("wheel", this._wheelHandler);
    }
    window.removeEventListener("mousedown", this.boundOnTouchDown);
    window.removeEventListener("mousemove", this.boundOnTouchMove);
    window.removeEventListener("mouseup", this.boundOnTouchUp);
    window.removeEventListener("touchstart", this.boundOnTouchDown);
    window.removeEventListener("touchmove", this.boundOnTouchMove);
    window.removeEventListener("touchend", this.boundOnTouchUp);
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(
        this.renderer.gl.canvas
      );
    }
  }
}
function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 30px monospace"
}) {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const app = new App2(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      font
    });
    return () => {
      app.destroy();
    };
  }, [items, bend, textColor, borderRadius, font]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "w-full h-full overflow-hidden cursor-grab active:cursor-grabbing",
      ref: containerRef
    }
  );
}
const SkillsGallery = () => {
  const skillList = [
    {
      image: "/icons/icon_angular_wht.png",
      text: "Angular"
    },
    {
      image: "/icons/ansible.jpg",
      text: "Ansible"
    },
    {
      image: "/icons/sql.png",
      text: "SQL"
    },
    {
      image: "/icons/react.png",
      text: "React.js"
    },
    {
      image: "/icons/python.png",
      text: "Python"
    },
    {
      image: "/icons/docker.svg",
      text: "Docker"
    },
    {
      image: "/icons/java.png",
      text: "Java"
    },
    {
      image: "/icons/git.png",
      text: "Git"
    },
    {
      image: "/icons/node.png",
      text: "Node"
    },
    {
      image: "/icons/typescript.png",
      text: "TypeScript"
    },
    {
      image: "/icons/bash.jpg",
      text: "Shell Scripting"
    },
    {
      image: "/icons/api.png",
      text: "REST APIs"
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "h-full relative pt-25 pb-25 bg-[#0e172a]", style: { overflow: "hidden", minHeight: "100vh" }, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          position: "fixed",
          zIndex: 0,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          background: `radial-gradient(circle at 25% 30%, rgba(64,142,255,0.20) 0, rgba(64,142,255,0.08) 40%, transparent 70%),
                                 radial-gradient(circle at 75% 70%, rgba(180,64,255,0.16) 0, rgba(180,64,255,0.07) 35%, transparent 70%)`,
          filter: "blur(32px)",
          transition: "background 0.5s"
        }
      }
    ),
    /* @__PURE__ */ jsx("div", { style: { position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 500, height: "70vh", maxHeight: 750, width: "100vw", marginTop: 56 }, children: /* @__PURE__ */ jsx("div", { style: { width: "100vw", height: "100%", minWidth: 320 }, children: /* @__PURE__ */ jsx(
      CircularGallery,
      {
        items: skillList,
        bend: 2.2,
        textColor: "#ffffff",
        borderRadius: 0.05,
        font: "700 2.1rem Inter, Segoe UI, Arial, sans-serif"
      }
    ) }) })
  ] });
};
const skills = withComponentProps(function Skills() {
  return /* @__PURE__ */ jsx(SkillsGallery, {});
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: skills
}, Symbol.toStringTag, { value: "Module" }));
const projects$1 = [
  {
    title: "Semi-Autonomous RC Car",
    description: "Developed a semi-autonomous Arduino-powered RC car with multiple driving modes—including remote control, roaming, parking, and summoning—using custom RF controllers and advanced line tracking with an RGB sensor for path differentiation.",
    imageUrl: "/images/seniorDesign.jpg"
    // link: "https://your-portfolio-link.com",
  },
  {
    title: "COVID-19 Auto Counter",
    description: "Designed and implemented an automated occupancy counter using IR sensors and an LCD display on the 8051 microcontroller, enabling essential businesses to safely monitor store capacity and enforce social distancing without additional staffing.",
    imageUrl: "/images/covidAutoCounter.png"
    // link: "https://your-task-tracker-link.com",
  }
  // Add more projects here
];
const ProjectSection = ({ project, reverse = false }) => {
  const [hovered, setHovered] = React.useState(false);
  const sectionStyle = {
    display: "flex",
    flexDirection: reverse ? "row-reverse" : "row",
    alignItems: "center",
    background: hovered ? "#f6f7fa" : "#f8f9fa",
    borderRadius: 26,
    boxShadow: hovered ? "0 6px 24px rgba(0,0,0,0.12)" : "0 4px 18px rgba(0,0,0,0.09)",
    padding: hovered ? "56px 38px" : "48px 32px",
    gap: 64,
    maxWidth: 1700,
    minHeight: 210,
    margin: "0 auto",
    transition: "background 0.18s, box-shadow 0.18s cubic-bezier(.4,2,.6,1), transform 0.15s cubic-bezier(.4,2,.6,1), padding 0.15s cubic-bezier(.4,2,.6,1)",
    transform: hovered ? "scale(1.013)" : "scale(1)"
  };
  const imgStyle = {
    width: hovered ? 260 : 240,
    height: hovered ? 210 : 190,
    objectFit: "cover",
    borderRadius: 20,
    boxShadow: hovered ? "0 4px 24px rgba(0,0,0,0.13)" : "0 2px 12px rgba(0,0,0,0.09)",
    background: "#e9ecef",
    transition: "box-shadow 0.15s, width 0.15s, height 0.15s, border-radius 0.15s"
  };
  return /* @__PURE__ */ jsxs(
    "section",
    {
      style: sectionStyle,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      children: [
        /* @__PURE__ */ jsx("img", { src: project.imageUrl, alt: project.title, style: imgStyle }),
        /* @__PURE__ */ jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx("h2", { style: { margin: 0, fontSize: "2.2rem", color: "#343a40", lineHeight: 1.18 }, children: project.title }),
          /* @__PURE__ */ jsx("p", { style: { margin: "1.1rem 0 1.3rem 0", color: "#495057", fontSize: "1.17rem", lineHeight: 1.62, maxWidth: 700 }, children: project.description }),
          project.link && /* @__PURE__ */ jsx(
            "a",
            {
              href: project.link,
              target: "_blank",
              rel: "noopener noreferrer",
              style: {
                color: hovered ? "#0056b3" : "#007bff",
                textDecoration: hovered ? "underline" : "none",
                fontWeight: 600,
                fontSize: "1.15rem",
                transition: "color 0.14s, text-decoration 0.14s"
              },
              children: "View Project"
            }
          )
        ] })
      ]
    }
  );
};
const ProjectsPage = () => {
  return /* @__PURE__ */ jsxs("div", { style: { background: "#0e172a", minHeight: "100vh", width: "100vw", margin: 0, padding: 0, overflow: "hidden" }, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          position: "fixed",
          zIndex: 0,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          background: `radial-gradient(circle at 25% 30%, rgba(64,142,255,0.20) 0, rgba(64,142,255,0.08) 40%, transparent 70%),
                       radial-gradient(circle at 75% 70%, rgba(180,64,255,0.16) 0, rgba(180,64,255,0.07) 35%, transparent 70%)`,
          filter: "blur(32px)",
          transition: "background 0.5s"
        }
      }
    ),
    /* @__PURE__ */ jsx("div", { style: { position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "3.5rem 1rem 3.5rem 1rem", paddingTop: "140px" }, children: /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: "3.5rem" }, children: projects$1.map((project, idx) => /* @__PURE__ */ jsx(ProjectSection, { project, reverse: idx % 2 === 1 }, idx)) }) })
  ] });
};
const projects = withComponentProps(function Projects() {
  return /* @__PURE__ */ jsx(ProjectsPage, {});
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: projects
}, Symbol.toStringTag, { value: "Module" }));
const AccentSVG$1 = ({
  style
}) => /* @__PURE__ */ jsxs("svg", {
  width: "700",
  height: "700",
  viewBox: "0 0 700 700",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  style: {
    position: "absolute",
    ...style,
    zIndex: 0,
    filter: "blur(48px)",
    opacity: 0.22,
    pointerEvents: "none"
  },
  children: [/* @__PURE__ */ jsx("circle", {
    cx: "350",
    cy: "350",
    r: "280",
    fill: "url(#paint0_radial)"
  }), /* @__PURE__ */ jsx("defs", {
    children: /* @__PURE__ */ jsxs("radialGradient", {
      id: "paint0_radial",
      cx: "0",
      cy: "0",
      r: "1",
      gradientTransform: "translate(350 350) scale(280)",
      children: [/* @__PURE__ */ jsx("stop", {
        stopColor: "#408EFF"
      }), /* @__PURE__ */ jsx("stop", {
        offset: "1",
        stopColor: "#B440FF",
        stopOpacity: "0.7"
      })]
    })
  })]
});
const aboutText = ["Hi, I’m Caelan Small — a passionate and versatile Software Engineer with a strong foundation in computer engineering and a knack for building efficient, scalable, and user-focused solutions.", "I currently work at Northrop Grumman, where I develop full-stack applications, automate infrastructure with tools like Ansible and Docker, and craft backend systems that streamline internal processes. I hold a Bachelor of Science in Computer Engineering with a minor in Mathematics from Merrimack College, where I also earned President’s List honors.", "My experience spans a wide range of technologies, from developing Angular/Node.js web applications to programming embedded systems and microcontrollers. I’ve worked on projects like a semi-autonomous RC car and a COVID-19 occupancy counter, combining hardware and software to solve real-world problems. I thrive in collaborative environments where I can tackle complex challenges, continuously learn, and contribute to impactful projects.", "I’m committed to building reliable, well-crafted solutions that make a tangible impact."];
const about = withComponentProps(function About() {
  return /* @__PURE__ */ jsxs("div", {
    style: {
      background: "#0e172a",
      minHeight: "100vh",
      width: "100vw",
      overflowX: "hidden",
      overflowY: "auto",
      position: "relative",
      padding: 0,
      margin: 0,
      boxSizing: "border-box"
    },
    children: [/* @__PURE__ */ jsx("div", {
      style: {
        position: "fixed",
        zIndex: 0,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        background: `radial-gradient(circle at 25% 30%, rgba(64,142,255,0.20) 0, rgba(64,142,255,0.08) 40%, transparent 70%),
                       radial-gradient(circle at 75% 70%, rgba(180,64,255,0.16) 0, rgba(180,64,255,0.07) 35%, transparent 70%)`,
        filter: "blur(32px)"
      }
    }), /* @__PURE__ */ jsx(AccentSVG$1, {
      style: {
        top: -120,
        left: -180
      }
    }), /* @__PURE__ */ jsx(AccentSVG$1, {
      style: {
        bottom: -120,
        right: -180,
        transform: "rotate(180deg)"
      }
    }), /* @__PURE__ */ jsxs("main", {
      style: {
        position: "relative",
        zIndex: 1,
        maxWidth: 900,
        margin: "0 auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: 120,
        paddingLeft: 32,
        paddingRight: 32,
        color: "#fff",
        fontFamily: "Inter, Segoe UI, Arial, sans-serif",
        boxSizing: "border-box",
        overflow: "visible",
        textAlign: "left"
      },
      children: [/* @__PURE__ */ jsx("h1", {
        style: {
          fontSize: "2.9rem",
          fontWeight: 800,
          marginBottom: "2.1rem",
          letterSpacing: "-1.5px",
          background: "linear-gradient(90deg,#408EFF,#B440FF 85%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textAlign: "left"
        },
        children: "About Me"
      }), aboutText.map((p, i) => /* @__PURE__ */ jsx("p", {
        style: {
          fontSize: "1.32rem",
          lineHeight: 1.7,
          marginBottom: "1.8rem",
          fontWeight: 400,
          letterSpacing: "-0.2px",
          color: "rgba(255,255,255,0.92)",
          textAlign: "left"
        },
        children: p
      }, i))]
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about
}, Symbol.toStringTag, { value: "Module" }));
const AccentSVG = ({
  style
}) => /* @__PURE__ */ jsxs("svg", {
  width: "700",
  height: "700",
  viewBox: "0 0 700 700",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  style: {
    position: "absolute",
    ...style,
    zIndex: 0,
    filter: "blur(48px)",
    opacity: 0.22,
    pointerEvents: "none"
  },
  children: [/* @__PURE__ */ jsx("circle", {
    cx: "350",
    cy: "350",
    r: "280",
    fill: "url(#paint0_radial)"
  }), /* @__PURE__ */ jsx("defs", {
    children: /* @__PURE__ */ jsxs("radialGradient", {
      id: "paint0_radial",
      cx: "0",
      cy: "0",
      r: "1",
      gradientTransform: "translate(350 350) scale(280)",
      children: [/* @__PURE__ */ jsx("stop", {
        stopColor: "#408EFF"
      }), /* @__PURE__ */ jsx("stop", {
        offset: "1",
        stopColor: "#B440FF",
        stopOpacity: "0.7"
      })]
    })
  })]
});
const EMAIL = "smallc@merrimack.edu";
const LINKEDIN = "https://www.linkedin.com/in/caelan-small/";
const contact = withComponentProps(function Contact() {
  return /* @__PURE__ */ jsxs("div", {
    style: {
      background: "#0e172a",
      minHeight: "100vh",
      width: "100vw",
      overflowX: "hidden",
      overflowY: "auto",
      position: "relative",
      padding: 0,
      margin: 0,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    children: [/* @__PURE__ */ jsx("div", {
      style: {
        position: "fixed",
        zIndex: 0,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        background: `radial-gradient(circle at 25% 30%, rgba(64,142,255,0.20) 0, rgba(64,142,255,0.08) 40%, transparent 70%),
                       radial-gradient(circle at 75% 70%, rgba(180,64,255,0.16) 0, rgba(180,64,255,0.07) 35%, transparent 70%)`,
        filter: "blur(32px)"
      }
    }), /* @__PURE__ */ jsx(AccentSVG, {
      style: {
        top: -120,
        left: -180
      }
    }), /* @__PURE__ */ jsx(AccentSVG, {
      style: {
        bottom: -120,
        right: -180,
        transform: "rotate(180deg)"
      }
    }), /* @__PURE__ */ jsxs("main", {
      style: {
        position: "relative",
        zIndex: 1,
        maxWidth: 600,
        margin: "0 auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "48px 32px",
        color: "#fff",
        fontFamily: "Inter, Segoe UI, Arial, sans-serif",
        boxSizing: "border-box",
        textAlign: "center"
      },
      children: [/* @__PURE__ */ jsx("h1", {
        style: {
          fontSize: "2.4rem",
          fontWeight: 800,
          marginBottom: "2.1rem",
          letterSpacing: "-1.2px",
          background: "linear-gradient(90deg,#408EFF,#B440FF 85%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textAlign: "left"
        },
        children: "Get in Touch"
      }), /* @__PURE__ */ jsx("p", {
        style: {
          fontSize: "1.18rem",
          lineHeight: 1.7,
          marginBottom: "2.2rem",
          color: "rgba(255,255,255,0.92)"
        },
        children: "I’m always open to connecting with fellow engineers, collaborators, or anyone interested in my work. Feel free to reach out!"
      }), /* @__PURE__ */ jsxs("div", {
        style: {
          display: "flex",
          flexDirection: "row",
          gap: 28,
          marginBottom: 32
        },
        children: [/* @__PURE__ */ jsx("a", {
          href: `mailto:${EMAIL}`,
          style: {
            display: "inline-block",
            padding: "0.85em 2.1em",
            borderRadius: 8,
            background: "linear-gradient(90deg,#408EFF,#B440FF 85%)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.15rem",
            textDecoration: "none",
            boxShadow: "0 2px 16px 0 rgba(64,142,255,0.10)",
            transition: "transform 0.12s",
            outline: "none",
            border: "none"
          },
          onMouseOver: (e) => e.currentTarget.style.transform = "scale(1.05)",
          onMouseOut: (e) => e.currentTarget.style.transform = "scale(1)",
          children: "Email Me"
        }), /* @__PURE__ */ jsx("a", {
          href: LINKEDIN,
          target: "_blank",
          rel: "noopener noreferrer",
          style: {
            display: "inline-block",
            padding: "0.85em 2.1em",
            borderRadius: 8,
            background: "#232d3d",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.15rem",
            textDecoration: "none",
            boxShadow: "0 2px 16px 0 rgba(64,142,255,0.10)",
            border: "1.5px solid #408EFF",
            transition: "background 0.18s, color 0.18s, transform 0.12s",
            outline: "none"
          },
          onMouseOver: (e) => {
            e.currentTarget.style.background = "linear-gradient(90deg,#408EFF,#B440FF 85%)";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.transform = "scale(1.05)";
          },
          onMouseOut: (e) => {
            e.currentTarget.style.background = "#232d3d";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.transform = "scale(1)";
          },
          children: "LinkedIn"
        })]
      })]
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: contact
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CngWGZjh.js", "imports": ["/assets/chunk-KNED5TY2-CqQF2uaW.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-_TiOiZ-k.js", "imports": ["/assets/chunk-KNED5TY2-CqQF2uaW.js", "/assets/with-props-BIIjho7F.js", "/assets/proxy-ikO1CP5u.js"], "css": ["/assets/root-DL5DmqGW.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-Su1QmRSx.js", "imports": ["/assets/with-props-BIIjho7F.js", "/assets/chunk-KNED5TY2-CqQF2uaW.js", "/assets/proxy-ikO1CP5u.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/skills": { "id": "routes/skills", "parentId": "root", "path": "skills", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/skills-CgO4UqPP.js", "imports": ["/assets/with-props-BIIjho7F.js", "/assets/chunk-KNED5TY2-CqQF2uaW.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/projects": { "id": "routes/projects", "parentId": "root", "path": "projects", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/projects-CzF99969.js", "imports": ["/assets/with-props-BIIjho7F.js", "/assets/chunk-KNED5TY2-CqQF2uaW.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/about-wznY33c2.js", "imports": ["/assets/with-props-BIIjho7F.js", "/assets/chunk-KNED5TY2-CqQF2uaW.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/contact": { "id": "routes/contact", "parentId": "root", "path": "contact", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/contact-CWa5dwHB.js", "imports": ["/assets/with-props-BIIjho7F.js", "/assets/chunk-KNED5TY2-CqQF2uaW.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-5070e042.js", "version": "5070e042", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/skills": {
    id: "routes/skills",
    parentId: "root",
    path: "skills",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/projects": {
    id: "routes/projects",
    parentId: "root",
    path: "projects",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/contact": {
    id: "routes/contact",
    parentId: "root",
    path: "contact",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
