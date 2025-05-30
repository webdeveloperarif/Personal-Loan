var tns = (function () {
  var t = window,
    e =
      t.requestAnimationFrame ||
      t.webkitRequestAnimationFrame ||
      t.mozRequestAnimationFrame ||
      t.msRequestAnimationFrame ||
      function (t) {
        return setTimeout(t, 16);
      },
    n = window,
    i =
      n.cancelAnimationFrame ||
      n.mozCancelAnimationFrame ||
      function (t) {
        clearTimeout(t);
      };
  function a() {
    for (
      var t, e, n, i = arguments[0] || {}, a = 1, r = arguments.length;
      a < r;
      a++
    )
      if (null !== (t = arguments[a]))
        for (e in t) i !== (n = t[e]) && void 0 !== n && (i[e] = n);
    return i;
  }
  function r(t) {
    return 0 <= ["true", "false"].indexOf(t) ? JSON.parse(t) : t;
  }
  function o(t, e, n, i) {
    if (i)
      try {
        t.setItem(e, n);
      } catch (t) {}
    return n;
  }
  function u() {
    var t = document,
      e = t.body;
    return e || ((e = t.createElement("body")).fake = !0), e;
  }
  var l = document.documentElement;
  function s(t) {
    var e = "";
    return (
      t.fake &&
        ((e = l.style.overflow),
        (t.style.background = ""),
        (t.style.overflow = l.style.overflow = "hidden"),
        l.appendChild(t)),
      e
    );
  }
  function c(t, e) {
    t.fake && (t.remove(), (l.style.overflow = e), l.offsetHeight);
  }
  function f(t, e, n, i) {
    "insertRule" in t ? t.insertRule(e + "{" + n + "}", i) : t.addRule(e, n, i);
  }
  function d(t) {
    return ("insertRule" in t ? t.cssRules : t.rules).length;
  }
  function v(t, e, n) {
    for (var i = 0, a = t.length; i < a; i++) e.call(n, t[i], i);
  }
  var p = "classList" in document.createElement("_"),
    h = p
      ? function (t, e) {
          return t.classList.contains(e);
        }
      : function (t, e) {
          return 0 <= t.className.indexOf(e);
        },
    m = p
      ? function (t, e) {
          h(t, e) || t.classList.add(e);
        }
      : function (t, e) {
          h(t, e) || (t.className += " " + e);
        },
    y = p
      ? function (t, e) {
          h(t, e) && t.classList.remove(e);
        }
      : function (t, e) {
          h(t, e) && (t.className = t.className.replace(e, ""));
        };
  function g(t, e) {
    return t.hasAttribute(e);
  }
  function x(t, e) {
    return t.getAttribute(e);
  }
  function b(t) {
    return void 0 !== t.item;
  }
  function w(t, e) {
    if (
      ((t = b(t) || t instanceof Array ? t : [t]),
      "[object Object]" === Object.prototype.toString.call(e))
    )
      for (var n = t.length; n--; ) for (var i in e) t[n].setAttribute(i, e[i]);
  }
  function C(t, e) {
    t = b(t) || t instanceof Array ? t : [t];
    for (var n = (e = e instanceof Array ? e : [e]).length, i = t.length; i--; )
      for (var a = n; a--; ) t[i].removeAttribute(e[a]);
  }
  function M(t) {
    for (var e = [], n = 0, i = t.length; n < i; n++) e.push(t[n]);
    return e;
  }
  function T(t, e) {
    "none" !== t.style.display && (t.style.display = "none");
  }
  function E(t, e) {
    "none" === t.style.display && (t.style.display = "");
  }
  function A(t) {
    return "none" !== window.getComputedStyle(t).display;
  }
  function N(t) {
    if ("string" == typeof t) {
      var e = [t],
        n = t.charAt(0).toUpperCase() + t.substr(1);
      ["Webkit", "Moz", "ms", "O"].forEach(function (i) {
        ("ms" === i && "transform" !== t) || e.push(i + n);
      }),
        (t = e);
    }
    for (
      var i = document.createElement("fakeelement"), a = (t.length, 0);
      a < t.length;
      a++
    ) {
      var r = t[a];
      if (void 0 !== i.style[r]) return r;
    }
    return !1;
  }
  function L(t, e) {
    var n = !1;
    return (
      /^Webkit/.test(t)
        ? (n = "webkit" + e + "End")
        : /^O/.test(t)
        ? (n = "o" + e + "End")
        : t && (n = e.toLowerCase() + "end"),
      n
    );
  }
  var B = !1;
  try {
    var S = Object.defineProperty({}, "passive", {
      get: function () {
        B = !0;
      },
    });
    window.addEventListener("test", null, S);
  } catch (t) {}
  var H = !!B && { passive: !0 };
  function O(t, e, n) {
    for (var i in e) {
      var a = 0 <= ["touchstart", "touchmove"].indexOf(i) && !n && H;
      t.addEventListener(i, e[i], a);
    }
  }
  function D(t, e) {
    for (var n in e) {
      var i = 0 <= ["touchstart", "touchmove"].indexOf(n) && H;
      t.removeEventListener(n, e[n], i);
    }
  }
  function k() {
    return {
      topics: {},
      on: function (t, e) {
        (this.topics[t] = this.topics[t] || []), this.topics[t].push(e);
      },
      off: function (t, e) {
        if (this.topics[t])
          for (var n = 0; n < this.topics[t].length; n++)
            if (this.topics[t][n] === e) {
              this.topics[t].splice(n, 1);
              break;
            }
      },
      emit: function (t, e) {
        (e.type = t),
          this.topics[t] &&
            this.topics[t].forEach(function (n) {
              n(e, t);
            });
      },
    };
  }
  Object.keys ||
    (Object.keys = function (t) {
      var e = [];
      for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.push(n);
      return e;
    }),
    "remove" in Element.prototype ||
      (Element.prototype.remove = function () {
        this.parentNode && this.parentNode.removeChild(this);
      });
  var R = function (t) {
    t = a(
      {
        container: ".slider",
        mode: "carousel",
        axis: "horizontal",
        items: 1,
        gutter: 0,
        edgePadding: 0,
        fixedWidth: !1,
        autoWidth: !1,
        viewportMax: !1,
        slideBy: 1,
        center: !1,
        controls: !0,
        controlsPosition: "top",
        controlsText: ["prev", "next"],
        controlsContainer: !1,
        prevButton: !1,
        nextButton: !1,
        nav: !0,
        navPosition: "top",
        navContainer: !1,
        navAsThumbnails: !1,
        arrowKeys: !1,
        speed: 300,
        autoplay: !1,
        autoplayPosition: "top",
        autoplayTimeout: 5e3,
        autoplayDirection: "forward",
        autoplayText: ["start", "stop"],
        autoplayHoverPause: !1,
        autoplayButton: !1,
        autoplayButtonOutput: !0,
        autoplayResetOnVisibility: !0,
        animateIn: "tns-fadeIn",
        animateOut: "tns-fadeOut",
        animateNormal: "tns-normal",
        animateDelay: !1,
        loop: !0,
        rewind: !1,
        autoHeight: !1,
        responsive: !1,
        lazyload: !1,
        lazyloadSelector: ".tns-lazy-img",
        touch: !0,
        mouseDrag: !1,
        swipeAngle: 15,
        nested: !1,
        preventActionWhenRunning: !1,
        preventScrollOnTouch: !1,
        freezable: !0,
        onInit: !1,
        useLocalStorage: !0,
        nonce: !1,
      },
      t || {}
    );
    var n = document,
      l = window,
      p = { ENTER: 13, SPACE: 32, LEFT: 37, RIGHT: 39 },
      b = {},
      B = t.useLocalStorage;
    if (B) {
      var S = navigator.userAgent,
        H = new Date();
      try {
        (b = l.localStorage)
          ? (b.setItem(H, H), (B = b.getItem(H) == H), b.removeItem(H))
          : (B = !1),
          B || (b = {});
      } catch (S) {
        B = !1;
      }
      B &&
        (b.tnsApp &&
          b.tnsApp !== S &&
          [
            "tC",
            "tPL",
            "tMQ",
            "tTf",
            "t3D",
            "tTDu",
            "tTDe",
            "tADu",
            "tADe",
            "tTE",
            "tAE",
          ].forEach(function (t) {
            b.removeItem(t);
          }),
        (localStorage.tnsApp = S));
    }
    var I = b.tC
        ? r(b.tC)
        : o(
            b,
            "tC",
            (function () {
              var t = document,
                e = u(),
                n = s(e),
                i = t.createElement("div"),
                a = !1;
              e.appendChild(i);
              try {
                for (
                  var r,
                    o = "(10px * 10)",
                    l = ["calc" + o, "-moz-calc" + o, "-webkit-calc" + o],
                    f = 0;
                  f < 3;
                  f++
                )
                  if (
                    ((r = l[f]), (i.style.width = r), 100 === i.offsetWidth)
                  ) {
                    a = r.replace(o, "");
                    break;
                  }
              } catch (t) {}
              return e.fake ? c(e, n) : i.remove(), a;
            })(),
            B
          ),
      P = b.tPL
        ? r(b.tPL)
        : o(
            b,
            "tPL",
            (function () {
              var t,
                e = document,
                n = u(),
                i = s(n),
                a = e.createElement("div"),
                r = e.createElement("div"),
                o = "";
              (a.className = "tns-t-subp2"), (r.className = "tns-t-ct");
              for (var l = 0; l < 70; l++) o += "<div></div>";
              return (
                (r.innerHTML = o),
                a.appendChild(r),
                n.appendChild(a),
                (t =
                  Math.abs(
                    a.getBoundingClientRect().left -
                      r.children[67].getBoundingClientRect().left
                  ) < 2),
                n.fake ? c(n, i) : a.remove(),
                t
              );
            })(),
            B
          ),
      z = b.tMQ
        ? r(b.tMQ)
        : o(
            b,
            "tMQ",
            (function () {
              if (window.matchMedia || window.msMatchMedia) return !0;
              var t,
                e = document,
                n = u(),
                i = s(n),
                a = e.createElement("div"),
                r = e.createElement("style"),
                o =
                  "@media all and (min-width:1px){.tns-mq-test{position:absolute}}";
              return (
                (r.type = "text/css"),
                (a.className = "tns-mq-test"),
                n.appendChild(r),
                n.appendChild(a),
                r.styleSheet
                  ? (r.styleSheet.cssText = o)
                  : r.appendChild(e.createTextNode(o)),
                (t = window.getComputedStyle
                  ? window.getComputedStyle(a).position
                  : a.currentStyle.position),
                n.fake ? c(n, i) : a.remove(),
                "absolute" === t
              );
            })(),
            B
          ),
      W = b.tTf ? r(b.tTf) : o(b, "tTf", N("transform"), B),
      q = b.t3D
        ? r(b.t3D)
        : o(
            b,
            "t3D",
            (function (t) {
              if (!t) return !1;
              if (!window.getComputedStyle) return !1;
              var e,
                n = document,
                i = u(),
                a = s(i),
                r = n.createElement("p"),
                o =
                  9 < t.length ? "-" + t.slice(0, -9).toLowerCase() + "-" : "";
              return (
                (o += "transform"),
                i.insertBefore(r, null),
                (r.style[t] = "translate3d(1px,1px,1px)"),
                (e = window.getComputedStyle(r).getPropertyValue(o)),
                i.fake ? c(i, a) : r.remove(),
                void 0 !== e && 0 < e.length && "none" !== e
              );
            })(W),
            B
          ),
      F = b.tTDu ? r(b.tTDu) : o(b, "tTDu", N("transitionDuration"), B),
      j = b.tTDe ? r(b.tTDe) : o(b, "tTDe", N("transitionDelay"), B),
      V = b.tADu ? r(b.tADu) : o(b, "tADu", N("animationDuration"), B),
      G = b.tADe ? r(b.tADe) : o(b, "tADe", N("animationDelay"), B),
      Q = b.tTE ? r(b.tTE) : o(b, "tTE", L(F, "Transition"), B),
      X = b.tAE ? r(b.tAE) : o(b, "tAE", L(V, "Animation"), B),
      Y = l.console && "function" == typeof l.console.warn,
      K = [
        "container",
        "controlsContainer",
        "prevButton",
        "nextButton",
        "navContainer",
        "autoplayButton",
      ],
      J = {};
    if (
      (K.forEach(function (e) {
        if ("string" == typeof t[e]) {
          var i = t[e],
            a = n.querySelector(i);
          if (((J[e] = i), !a || !a.nodeName))
            return void (Y && console.warn("Can't find", t[e]));
          t[e] = a;
        }
      }),
      !(t.container.children.length < 1))
    ) {
      var U = t.responsive,
        _ = t.nested,
        Z = "carousel" === t.mode;
      if (U) {
        0 in U && ((t = a(t, U[0])), delete U[0]);
        var $ = {};
        for (var tt in U) {
          var et = U[tt];
          (et = "number" == typeof et ? { items: et } : et), ($[tt] = et);
        }
        (U = $), ($ = null);
      }
      if (
        (Z ||
          (function t(e) {
            for (var n in e)
              Z ||
                ("slideBy" === n && (e[n] = "page"),
                "edgePadding" === n && (e[n] = !1),
                "autoHeight" === n && (e[n] = !1)),
                "responsive" === n && t(e[n]);
          })(t),
        !Z)
      ) {
        (t.axis = "horizontal"), (t.slideBy = "page"), (t.edgePadding = !1);
        var nt = t.animateIn,
          it = t.animateOut,
          at = t.animateDelay,
          rt = t.animateNormal;
      }
      var ot,
        ut,
        lt = "horizontal" === t.axis,
        st = n.createElement("div"),
        ct = n.createElement("div"),
        ft = t.container,
        dt = ft.parentNode,
        vt = ft.outerHTML,
        pt = ft.children,
        ht = pt.length,
        mt = On(),
        yt = !1;
      U && Zn(), Z && (ft.className += " tns-vpfix");
      var gt,
        xt,
        bt,
        wt,
        Ct,
        Mt,
        Tt,
        Et,
        At = t.autoWidth,
        Nt = In("fixedWidth"),
        Lt = In("edgePadding"),
        Bt = In("gutter"),
        St = kn(),
        Ht = In("center"),
        Ot = At ? 1 : Math.floor(In("items")),
        Dt = In("slideBy"),
        kt = t.viewportMax || t.fixedWidthViewportWidth,
        Rt = In("arrowKeys"),
        It = In("speed"),
        Pt = t.rewind,
        zt = !Pt && t.loop,
        Wt = In("autoHeight"),
        qt = In("controls"),
        Ft = In("controlsText"),
        jt = In("nav"),
        Vt = In("touch"),
        Gt = In("mouseDrag"),
        Qt = In("autoplay"),
        Xt = In("autoplayTimeout"),
        Yt = In("autoplayText"),
        Kt = In("autoplayHoverPause"),
        Jt = In("autoplayResetOnVisibility"),
        Ut =
          ((Tt = In("nonce")),
          (Et = document.createElement("style")),
          Tt && Et.setAttribute("nonce", Tt),
          document.querySelector("head").appendChild(Et),
          Et.sheet ? Et.sheet : Et.styleSheet),
        _t = t.lazyload,
        Zt = t.lazyloadSelector,
        $t = [],
        te = zt
          ? ((Ct = (function () {
              if (At || (Nt && !kt)) return ht - 1;
              var e = Nt ? "fixedWidth" : "items",
                n = [];
              if (((Nt || t[e] < ht) && n.push(t[e]), U))
                for (var i in U) {
                  var a = U[i][e];
                  a && (Nt || a < ht) && n.push(a);
                }
              return (
                n.length || n.push(0),
                Math.ceil(
                  Nt ? kt / Math.min.apply(null, n) : Math.max.apply(null, n)
                )
              );
            })()),
            (Mt = Z ? Math.ceil((5 * Ct - ht) / 2) : 4 * Ct - ht),
            (Mt = Math.max(Ct, Mt)),
            Rn("edgePadding") ? Mt + 1 : Mt)
          : 0,
        ee = Z ? ht + 2 * te : ht + te,
        ne = !((!Nt && !At) || zt),
        ie = Nt ? Ti() : null,
        ae = !Z || !zt,
        re = lt ? "left" : "top",
        oe = "",
        ue = "",
        le = Nt
          ? function () {
              return Ht && !zt ? ht - 1 : Math.ceil(-ie / (Nt + Bt));
            }
          : At
          ? function () {
              for (var t = 0; t < ee; t++) if (gt[t] >= -ie) return t;
            }
          : function () {
              return Ht && Z && !zt
                ? ht - 1
                : zt || Z
                ? Math.max(0, ee - Math.ceil(Ot))
                : ee - 1;
            },
        se = Bn(In("startIndex")),
        ce = se,
        fe = (Ln(), 0),
        de = At ? null : le(),
        ve = t.preventActionWhenRunning,
        pe = t.swipeAngle,
        he = !pe || "?",
        me = !1,
        ye = t.onInit,
        ge = new k(),
        xe = " tns-slider tns-" + t.mode,
        be =
          ft.id ||
          ((wt = window.tnsId),
          (window.tnsId = wt ? wt + 1 : 1),
          "tns" + window.tnsId),
        we = In("disable"),
        Ce = !1,
        Me = t.freezable,
        Te = !(!Me || At) && _n(),
        Ee = !1,
        Ae = {
          click: Di,
          keydown: function (t) {
            t = Fi(t);
            var e = [p.LEFT, p.RIGHT].indexOf(t.keyCode);
            0 <= e &&
              (0 === e ? Ke.disabled || Di(t, -1) : Je.disabled || Di(t, 1));
          },
        },
        Ne = {
          click: function (t) {
            if (me) {
              if (ve) return;
              Hi();
            }
            for (var e = ji((t = Fi(t))); e !== $e && !g(e, "data-nav"); )
              e = e.parentNode;
            if (g(e, "data-nav")) {
              var n = (an = Number(x(e, "data-nav"))),
                i = Nt || At ? (n * ht) / en : n * Ot;
              Oi(Re ? n : Math.min(Math.ceil(i), ht - 1), t),
                rn === n && (fn && zi(), (an = -1));
            }
          },
          keydown: function (t) {
            t = Fi(t);
            var e = n.activeElement;
            if (g(e, "data-nav")) {
              var i = [p.LEFT, p.RIGHT, p.ENTER, p.SPACE].indexOf(t.keyCode),
                a = Number(x(e, "data-nav"));
              0 <= i &&
                (0 === i
                  ? 0 < a && qi(Ze[a - 1])
                  : 1 === i
                  ? a < en - 1 && qi(Ze[a + 1])
                  : Oi((an = a), t));
            }
          },
        },
        Le = {
          mouseover: function () {
            fn && (Ri(), (dn = !0));
          },
          mouseout: function () {
            dn && (ki(), (dn = !1));
          },
        },
        Be = {
          visibilitychange: function () {
            n.hidden ? fn && (Ri(), (pn = !0)) : pn && (ki(), (pn = !1));
          },
        },
        Se = {
          keydown: function (t) {
            t = Fi(t);
            var e = [p.LEFT, p.RIGHT].indexOf(t.keyCode);
            0 <= e && Di(t, 0 === e ? -1 : 1);
          },
        },
        He = { touchstart: Xi, touchmove: Yi, touchend: Ki, touchcancel: Ki },
        Oe = { mousedown: Xi, mousemove: Yi, mouseup: Ki, mouseleave: Ki },
        De = Rn("controls"),
        ke = Rn("nav"),
        Re = !!At || t.navAsThumbnails,
        Ie = Rn("autoplay"),
        Pe = Rn("touch"),
        ze = Rn("mouseDrag"),
        We = "tns-slide-active",
        qe = "tns-slide-cloned",
        Fe = "tns-complete",
        je = {
          load: function (t) {
            ui(ji(t));
          },
          error: function (t) {
            var e;
            (e = ji(t)), m(e, "failed"), li(e);
          },
        },
        Ve = "force" === t.preventScrollOnTouch;
      if (De)
        var Ge,
          Qe,
          Xe = t.controlsContainer,
          Ye = t.controlsContainer ? t.controlsContainer.outerHTML : "",
          Ke = t.prevButton,
          Je = t.nextButton,
          Ue = t.prevButton ? t.prevButton.outerHTML : "",
          _e = t.nextButton ? t.nextButton.outerHTML : "";
      if (ke)
        var Ze,
          $e = t.navContainer,
          tn = t.navContainer ? t.navContainer.outerHTML : "",
          en = At ? ht : Ui(),
          nn = 0,
          an = -1,
          rn = Hn(),
          on = rn,
          un = "tns-nav-active",
          ln = "Carousel Page ",
          sn = " (Current Slide)";
      if (Ie)
        var cn,
          fn,
          dn,
          vn,
          pn,
          hn = "forward" === t.autoplayDirection ? 1 : -1,
          mn = t.autoplayButton,
          yn = t.autoplayButton ? t.autoplayButton.outerHTML : "",
          gn = ["<span class='tns-visually-hidden'>", " animation</span>"];
      if (Pe || ze)
        var xn,
          bn,
          wn = {},
          Cn = {},
          Mn = !1,
          Tn = lt
            ? function (t, e) {
                return t.x - e.x;
              }
            : function (t, e) {
                return t.y - e.y;
              };
      At || Nn(we || Te),
        W &&
          ((re = W),
          (oe = "translate"),
          q
            ? ((oe += lt ? "3d(" : "3d(0px, "),
              (ue = lt ? ", 0px, 0px)" : ", 0px)"))
            : ((oe += lt ? "X(" : "Y("), (ue = ")"))),
        Z && (ft.className = ft.className.replace("tns-vpfix", "")),
        (function () {
          (Rn("gutter"),
          (st.className = "tns-outer"),
          (ct.className = "tns-inner"),
          (st.id = be + "-ow"),
          (ct.id = be + "-iw"),
          "" === ft.id && (ft.id = be),
          (xe += P || At ? " tns-subpixel" : " tns-no-subpixel"),
          (xe += I ? " tns-calc" : " tns-no-calc"),
          At && (xe += " tns-autowidth"),
          (xe += " tns-" + t.axis),
          (ft.className += xe),
          Z
            ? (((ot = n.createElement("div")).id = be + "-mw"),
              (ot.className = "tns-ovh"),
              st.appendChild(ot),
              ot.appendChild(ct))
            : st.appendChild(ct),
          Wt) && ((ot || ct).className += " tns-ah");
          if (
            (dt.insertBefore(st, ft),
            ct.appendChild(ft),
            v(pt, function (t, e) {
              m(t, "tns-item"),
                t.id || (t.id = be + "-item" + e),
                !Z && rt && m(t, rt),
                w(t, { "aria-hidden": "true", tabindex: "-1" });
            }),
            te)
          ) {
            for (
              var e = n.createDocumentFragment(),
                i = n.createDocumentFragment(),
                a = te;
              a--;

            ) {
              var r = a % ht,
                o = pt[r].cloneNode(!0);
              if ((m(o, qe), C(o, "id"), i.insertBefore(o, i.firstChild), Z)) {
                var u = pt[ht - 1 - r].cloneNode(!0);
                m(u, qe), C(u, "id"), e.appendChild(u);
              }
            }
            ft.insertBefore(e, ft.firstChild),
              ft.appendChild(i),
              (pt = ft.children);
          }
        })(),
        (function () {
          if (!Z)
            for (var e = se, n = se + Math.min(ht, Ot); e < n; e++) {
              var i = pt[e];
              (i.style.left = (100 * (e - se)) / Ot + "%"), m(i, nt), y(i, rt);
            }
          if (
            (lt &&
              (P || At
                ? (f(
                    Ut,
                    "#" + be + " > .tns-item",
                    "font-size:" + l.getComputedStyle(pt[0]).fontSize + ";",
                    d(Ut)
                  ),
                  f(Ut, "#" + be, "font-size:0;", d(Ut)))
                : Z &&
                  v(pt, function (t, e) {
                    var n;
                    t.style.marginLeft =
                      ((n = e),
                      I
                        ? I + "(" + 100 * n + "% / " + ee + ")"
                        : (100 * n) / ee + "%");
                  })),
            z)
          ) {
            if (F) {
              var a = ot && t.autoHeight ? jn(t.speed) : "";
              f(Ut, "#" + be + "-mw", a, d(Ut));
            }
            (a = Pn(
              t.edgePadding,
              t.gutter,
              t.fixedWidth,
              t.speed,
              t.autoHeight
            )),
              f(Ut, "#" + be + "-iw", a, d(Ut)),
              Z &&
                ((a =
                  lt && !At
                    ? "width:" + zn(t.fixedWidth, t.gutter, t.items) + ";"
                    : ""),
                F && (a += jn(It)),
                f(Ut, "#" + be, a, d(Ut))),
              (a = lt && !At ? Wn(t.fixedWidth, t.gutter, t.items) : ""),
              t.gutter && (a += qn(t.gutter)),
              Z || (F && (a += jn(It)), V && (a += Vn(It))),
              a && f(Ut, "#" + be + " > .tns-item", a, d(Ut));
          } else {
            Z && Wt && (ot.style[F] = It / 1e3 + "s"),
              (ct.style.cssText = Pn(Lt, Bt, Nt, Wt)),
              Z && lt && !At && (ft.style.width = zn(Nt, Bt, Ot));
            a = lt && !At ? Wn(Nt, Bt, Ot) : "";
            Bt && (a += qn(Bt)),
              a && f(Ut, "#" + be + " > .tns-item", a, d(Ut));
          }
          if (U && z)
            for (var r in U) {
              r = parseInt(r);
              var o = U[r],
                u = ((a = ""), ""),
                s = "",
                c = "",
                p = "",
                h = At ? null : In("items", r),
                g = In("fixedWidth", r),
                x = In("speed", r),
                b = In("edgePadding", r),
                w = In("autoHeight", r),
                C = In("gutter", r);
              F &&
                ot &&
                In("autoHeight", r) &&
                "speed" in o &&
                (u = "#" + be + "-mw{" + jn(x) + "}"),
                ("edgePadding" in o || "gutter" in o) &&
                  (s = "#" + be + "-iw{" + Pn(b, C, g, x, w) + "}"),
                Z &&
                  lt &&
                  !At &&
                  ("fixedWidth" in o ||
                    "items" in o ||
                    (Nt && "gutter" in o)) &&
                  (c = "width:" + zn(g, C, h) + ";"),
                F && "speed" in o && (c += jn(x)),
                c && (c = "#" + be + "{" + c + "}"),
                ("fixedWidth" in o ||
                  (Nt && "gutter" in o) ||
                  (!Z && "items" in o)) &&
                  (p += Wn(g, C, h)),
                "gutter" in o && (p += qn(C)),
                !Z && "speed" in o && (F && (p += jn(x)), V && (p += Vn(x))),
                p && (p = "#" + be + " > .tns-item{" + p + "}"),
                (a = u + s + c + p) &&
                  Ut.insertRule(
                    "@media (min-width: " + r / 16 + "em) {" + a + "}",
                    Ut.cssRules.length
                  );
            }
        })(),
        Gn();
      var En = zt
          ? Z
            ? function () {
                var t = fe,
                  e = de;
                (t += Dt),
                  (e -= Dt),
                  Lt
                    ? ((t += 1), (e -= 1))
                    : Nt && (St + Bt) % (Nt + Bt) && (e -= 1),
                  te && (e < se ? (se -= ht) : se < t && (se += ht));
              }
            : function () {
                if (de < se) for (; fe + ht <= se; ) se -= ht;
                else if (se < fe) for (; se <= de - ht; ) se += ht;
              }
          : function () {
              se = Math.max(fe, Math.min(de, se));
            },
        An = Z
          ? function () {
              var t, e, n, i, a, r, o, u, l, s, c;
              Ci(ft, ""),
                F || !It
                  ? (Ni(), (It && A(ft)) || Hi())
                  : ((t = ft),
                    (e = re),
                    (n = oe),
                    (i = ue),
                    (a = Ei()),
                    (r = It),
                    (o = Hi),
                    (u = Math.min(r, 10)),
                    (l = 0 <= a.indexOf("%") ? "%" : "px"),
                    (a = a.replace(l, "")),
                    (s = Number(
                      t.style[e].replace(n, "").replace(i, "").replace(l, "")
                    )),
                    (c = ((a - s) / r) * u),
                    setTimeout(function a() {
                      (r -= u),
                        (s += c),
                        (t.style[e] = n + s + l + i),
                        0 < r ? setTimeout(a, u) : o();
                    }, u)),
                lt || Ji();
            }
          : function () {
              $t = [];
              var t = {};
              (t[Q] = t[X] = Hi),
                D(pt[ce], t),
                O(pt[se], t),
                Li(ce, nt, it, !0),
                Li(se, rt, nt),
                (Q && X && It && A(ft)) || Hi();
            };
      return {
        version: "2.9.3",
        getInfo: Zi,
        events: ge,
        goTo: Oi,
        play: function () {
          Qt && !fn && (Pi(), (vn = !1));
        },
        pause: function () {
          fn && (zi(), (vn = !0));
        },
        isOn: yt,
        updateSliderHeight: pi,
        refresh: Gn,
        destroy: function () {
          if (
            ((Ut.disabled = !0),
            Ut.ownerNode && Ut.ownerNode.remove(),
            D(l, { resize: Jn }),
            Rt && D(n, Se),
            Xe && D(Xe, Ae),
            $e && D($e, Ne),
            D(ft, Le),
            D(ft, Be),
            mn && D(mn, { click: Wi }),
            Qt && clearInterval(cn),
            Z && Q)
          ) {
            var e = {};
            (e[Q] = Hi), D(ft, e);
          }
          Vt && D(ft, He), Gt && D(ft, Oe);
          var i = [vt, Ye, Ue, _e, tn, yn];
          for (var a in (K.forEach(function (e, n) {
            var a = "container" === e ? st : t[e];
            if ("object" == typeof a && a) {
              var r = !!a.previousElementSibling && a.previousElementSibling,
                o = a.parentNode;
              (a.outerHTML = i[n]),
                (t[e] = r ? r.nextElementSibling : o.firstElementChild);
            }
          }),
          (K =
            nt =
            it =
            at =
            rt =
            lt =
            st =
            ct =
            ft =
            dt =
            vt =
            pt =
            ht =
            ut =
            mt =
            At =
            Nt =
            Lt =
            Bt =
            St =
            Ot =
            Dt =
            kt =
            Rt =
            It =
            Pt =
            zt =
            Wt =
            Ut =
            _t =
            gt =
            $t =
            te =
            ee =
            ne =
            ie =
            ae =
            re =
            oe =
            ue =
            le =
            se =
            ce =
            fe =
            de =
            pe =
            he =
            me =
            ye =
            ge =
            xe =
            be =
            we =
            Ce =
            Me =
            Te =
            Ee =
            Ae =
            Ne =
            Le =
            Be =
            Se =
            He =
            Oe =
            De =
            ke =
            Re =
            Ie =
            Pe =
            ze =
            We =
            Fe =
            je =
            xt =
            qt =
            Ft =
            Xe =
            Ye =
            Ke =
            Je =
            Ge =
            Qe =
            jt =
            $e =
            tn =
            Ze =
            en =
            nn =
            an =
            rn =
            on =
            un =
            ln =
            sn =
            Qt =
            Xt =
            hn =
            Yt =
            Kt =
            mn =
            yn =
            Jt =
            gn =
            cn =
            fn =
            dn =
            vn =
            pn =
            wn =
            Cn =
            xn =
            Mn =
            bn =
            Tn =
            Vt =
            Gt =
              null),
          this))
            "rebuild" !== a && (this[a] = null);
          yt = !1;
        },
        rebuild: function () {
          return R(a(t, J));
        },
      };
    }
    function Nn(t) {
      t && (qt = jt = Vt = Gt = Rt = Qt = Kt = Jt = !1);
    }
    function Ln() {
      for (var t = Z ? se - te : se; t < 0; ) t += ht;
      return (t % ht) + 1;
    }
    function Bn(t) {
      return (
        (t = t ? Math.max(0, Math.min(zt ? ht - 1 : ht - Ot, t)) : 0),
        Z ? t + te : t
      );
    }
    function Sn(t) {
      for (null == t && (t = se), Z && (t -= te); t < 0; ) t += ht;
      return Math.floor(t % ht);
    }
    function Hn() {
      var t,
        e = Sn();
      return (
        (t = Re
          ? e
          : Nt || At
          ? Math.ceil(((e + 1) * en) / ht - 1)
          : Math.floor(e / Ot)),
        !zt && Z && se === de && (t = en - 1),
        t
      );
    }
    function On() {
      return (
        l.innerWidth || n.documentElement.clientWidth || n.body.clientWidth
      );
    }
    function Dn(t) {
      return "top" === t ? "afterbegin" : "beforeend";
    }
    function kn() {
      var t = Lt ? 2 * Lt - Bt : 0;
      return (
        (function t(e) {
          if (null != e) {
            var i,
              a,
              r = n.createElement("div");
            return (
              e.appendChild(r),
              (a = (i = r.getBoundingClientRect()).right - i.left),
              r.remove(),
              a || t(e.parentNode)
            );
          }
        })(dt) - t
      );
    }
    function Rn(e) {
      if (t[e]) return !0;
      if (U) for (var n in U) if (U[n][e]) return !0;
      return !1;
    }
    function In(e, n) {
      if ((null == n && (n = mt), "items" === e && Nt))
        return Math.floor((St + Bt) / (Nt + Bt)) || 1;
      var i = t[e];
      if (U) for (var a in U) n >= parseInt(a) && e in U[a] && (i = U[a][e]);
      return (
        "slideBy" === e && "page" === i && (i = In("items")),
        Z || ("slideBy" !== e && "items" !== e) || (i = Math.floor(i)),
        i
      );
    }
    function Pn(t, e, n, i, a) {
      var r = "";
      if (void 0 !== t) {
        var o = t;
        e && (o -= e),
          (r = lt
            ? "margin: 0 " + o + "px 0 " + t + "px;"
            : "margin: " + t + "px 0 " + o + "px 0;");
      } else if (e && !n) {
        var u = "-" + e + "px";
        r = "margin: 0 " + (lt ? u + " 0 0" : "0 " + u + " 0") + ";";
      }
      return !Z && a && F && i && (r += jn(i)), r;
    }
    function zn(t, e, n) {
      return t
        ? (t + e) * ee + "px"
        : I
        ? I + "(" + 100 * ee + "% / " + n + ")"
        : (100 * ee) / n + "%";
    }
    function Wn(t, e, n) {
      var i;
      if (t) i = t + e + "px";
      else {
        Z || (n = Math.floor(n));
        var a = Z ? ee : n;
        i = I ? I + "(100% / " + a + ")" : 100 / a + "%";
      }
      return (i = "width:" + i), "inner" !== _ ? i + ";" : i + " !important;";
    }
    function qn(t) {
      var e = "";
      return (
        !1 !== t &&
          (e =
            (lt ? "padding-" : "margin-") +
            (lt ? "right" : "bottom") +
            ": " +
            t +
            "px;"),
        e
      );
    }
    function Fn(t, e) {
      var n = t.substring(0, t.length - e).toLowerCase();
      return n && (n = "-" + n + "-"), n;
    }
    function jn(t) {
      return Fn(F, 18) + "transition-duration:" + t / 1e3 + "s;";
    }
    function Vn(t) {
      return Fn(V, 17) + "animation-duration:" + t / 1e3 + "s;";
    }
    function Gn() {
      if (Rn("autoHeight") || At || !lt) {
        var t = ft.querySelectorAll("img");
        v(t, function (t) {
          var e = t.src;
          _t ||
            (e && e.indexOf("data:image") < 0
              ? ((t.src = ""), O(t, je), m(t, "loading"), (t.src = e))
              : ui(t));
        }),
          e(function () {
            fi(M(t), function () {
              xt = !0;
            });
          }),
          Rn("autoHeight") && (t = si(se, Math.min(se + Ot - 1, ee - 1))),
          _t
            ? Qn()
            : e(function () {
                fi(M(t), Qn);
              });
      } else Z && Ai(), Yn(), Kn();
    }
    function Qn() {
      if (At && 1 < ht) {
        var t = zt ? se : ht - 1;
        !(function e() {
          var n = pt[t].getBoundingClientRect().left,
            i = pt[t - 1].getBoundingClientRect().right;
          Math.abs(n - i) <= 1
            ? Xn()
            : setTimeout(function () {
                e();
              }, 16);
        })();
      } else Xn();
    }
    function Xn() {
      (lt && !At) ||
        (hi(),
        At
          ? ((ie = Ti()), Me && (Te = _n()), (de = le()), Nn(we || Te))
          : Ji()),
        Z && Ai(),
        Yn(),
        Kn();
    }
    function Yn() {
      if (
        (mi(),
        st.insertAdjacentHTML(
          "afterbegin",
          '<div class="tns-liveregion tns-visually-hidden" aria-live="polite" aria-atomic="true">slide <span class="current">' +
            ai() +
            "</span>  of " +
            ht +
            "</div>"
        ),
        (bt = st.querySelector(".tns-liveregion .current")),
        Ie)
      ) {
        var e = Qt ? "stop" : "start";
        mn
          ? w(mn, { "data-action": e })
          : t.autoplayButtonOutput &&
            (st.insertAdjacentHTML(
              Dn(t.autoplayPosition),
              '<button type="button" data-action="' +
                e +
                '">' +
                gn[0] +
                e +
                gn[1] +
                Yt[0] +
                "</button>"
            ),
            (mn = st.querySelector("[data-action]"))),
          mn && O(mn, { click: Wi }),
          Qt && (Pi(), Kt && O(ft, Le), Jt && O(ft, Be));
      }
      if (ke) {
        if ($e)
          w($e, { "aria-label": "Carousel Pagination" }),
            v((Ze = $e.children), function (t, e) {
              w(t, {
                "data-nav": e,
                tabindex: "-1",
                "aria-label": ln + (e + 1),
                "aria-controls": be,
              });
            });
        else {
          for (
            var n = "", i = Re ? "" : 'style="display:none"', a = 0;
            a < ht;
            a++
          )
            n +=
              '<button type="button" data-nav="' +
              a +
              '" tabindex="-1" aria-controls="' +
              be +
              '" ' +
              i +
              ' aria-label="' +
              ln +
              (a + 1) +
              '"></button>';
          (n =
            '<div class="tns-nav" aria-label="Carousel Pagination">' +
            n +
            "</div>"),
            st.insertAdjacentHTML(Dn(t.navPosition), n),
            ($e = st.querySelector(".tns-nav")),
            (Ze = $e.children);
        }
        if ((_i(), F)) {
          var r = F.substring(0, F.length - 18).toLowerCase(),
            o = "transition: all " + It / 1e3 + "s";
          r && (o = "-" + r + "-" + o),
            f(Ut, "[aria-controls^=" + be + "-item]", o, d(Ut));
        }
        w(Ze[rn], { "aria-label": ln + (rn + 1) + sn }),
          C(Ze[rn], "tabindex"),
          m(Ze[rn], un),
          O($e, Ne);
      }
      De &&
        (Xe ||
          (Ke && Je) ||
          (st.insertAdjacentHTML(
            Dn(t.controlsPosition),
            '<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button type="button" data-controls="prev" tabindex="-1" aria-controls="' +
              be +
              '">' +
              Ft[0] +
              '</button><button type="button" data-controls="next" tabindex="-1" aria-controls="' +
              be +
              '">' +
              Ft[1] +
              "</button></div>"
          ),
          (Xe = st.querySelector(".tns-controls"))),
        (Ke && Je) || ((Ke = Xe.children[0]), (Je = Xe.children[1])),
        t.controlsContainer &&
          w(Xe, { "aria-label": "Carousel Navigation", tabindex: "0" }),
        (t.controlsContainer || (t.prevButton && t.nextButton)) &&
          w([Ke, Je], { "aria-controls": be, tabindex: "-1" }),
        (t.controlsContainer || (t.prevButton && t.nextButton)) &&
          (w(Ke, { "data-controls": "prev" }),
          w(Je, { "data-controls": "next" })),
        (Ge = gi(Ke)),
        (Qe = gi(Je)),
        wi(),
        Xe ? O(Xe, Ae) : (O(Ke, Ae), O(Je, Ae))),
        $n();
    }
    function Kn() {
      if (Z && Q) {
        var e = {};
        (e[Q] = Hi), O(ft, e);
      }
      Vt && O(ft, He, t.preventScrollOnTouch),
        Gt && O(ft, Oe),
        Rt && O(n, Se),
        "inner" === _
          ? ge.on("outerResized", function () {
              Un(), ge.emit("innerLoaded", Zi());
            })
          : (U || Nt || At || Wt || !lt) && O(l, { resize: Jn }),
        Wt && ("outer" === _ ? ge.on("innerLoaded", ci) : we || ci()),
        oi(),
        we ? ni() : Te && ei(),
        ge.on("indexChanged", di),
        "inner" === _ && ge.emit("innerLoaded", Zi()),
        "function" == typeof ye && ye(Zi()),
        (yt = !0);
    }
    function Jn(t) {
      e(function () {
        Un(Fi(t));
      });
    }
    function Un(e) {
      if (yt) {
        "outer" === _ && ge.emit("outerResized", Zi(e)), (mt = On());
        var i,
          a = ut,
          r = !1;
        U && (Zn(), (i = a !== ut) && ge.emit("newBreakpointStart", Zi(e)));
        var o,
          u,
          l,
          s,
          c = Ot,
          p = we,
          h = Te,
          g = Rt,
          x = qt,
          b = jt,
          w = Vt,
          C = Gt,
          M = Qt,
          A = Kt,
          N = Jt,
          L = se;
        if (i) {
          var B = Nt,
            S = Wt,
            H = Ft,
            k = Ht,
            R = Yt;
          if (!z)
            var I = Bt,
              P = Lt;
        }
        if (
          ((Rt = In("arrowKeys")),
          (qt = In("controls")),
          (jt = In("nav")),
          (Vt = In("touch")),
          (Ht = In("center")),
          (Gt = In("mouseDrag")),
          (Qt = In("autoplay")),
          (Kt = In("autoplayHoverPause")),
          (Jt = In("autoplayResetOnVisibility")),
          i &&
            ((we = In("disable")),
            (Nt = In("fixedWidth")),
            (It = In("speed")),
            (Wt = In("autoHeight")),
            (Ft = In("controlsText")),
            (Yt = In("autoplayText")),
            (Xt = In("autoplayTimeout")),
            z || ((Lt = In("edgePadding")), (Bt = In("gutter")))),
          Nn(we),
          (St = kn()),
          (lt && !At) || we || (hi(), lt || (Ji(), (r = !0))),
          (Nt || At) && ((ie = Ti()), (de = le())),
          (i || Nt) &&
            ((Ot = In("items")),
            (Dt = In("slideBy")),
            (u = Ot !== c) && (Nt || At || (de = le()), En())),
          i &&
            we !== p &&
            (we
              ? ni()
              : (function () {
                  if (Ce) {
                    if (((Ut.disabled = !1), (ft.className += xe), Ai(), zt))
                      for (var t = te; t--; ) Z && E(pt[t]), E(pt[ee - t - 1]);
                    if (!Z)
                      for (var e = se, n = se + ht; e < n; e++) {
                        var i = pt[e],
                          a = e < se + Ot ? nt : rt;
                        (i.style.left = (100 * (e - se)) / Ot + "%"), m(i, a);
                      }
                    ti(), (Ce = !1);
                  }
                })()),
          Me &&
            (i || Nt || At) &&
            (Te = _n()) !== h &&
            (Te
              ? (Ni(Ei(Bn(0))), ei())
              : ((function () {
                  if (Ee) {
                    if ((Lt && z && (ct.style.margin = ""), te))
                      for (var t = "tns-transparent", e = te; e--; )
                        Z && y(pt[e], t), y(pt[ee - e - 1], t);
                    ti(), (Ee = !1);
                  }
                })(),
                (r = !0))),
          Nn(we || Te),
          Qt || (Kt = Jt = !1),
          Rt !== g && (Rt ? O(n, Se) : D(n, Se)),
          qt !== x &&
            (qt
              ? Xe
                ? E(Xe)
                : (Ke && E(Ke), Je && E(Je))
              : Xe
              ? T(Xe)
              : (Ke && T(Ke), Je && T(Je))),
          jt !== b && (jt ? (E($e), _i()) : T($e)),
          Vt !== w && (Vt ? O(ft, He, t.preventScrollOnTouch) : D(ft, He)),
          Gt !== C && (Gt ? O(ft, Oe) : D(ft, Oe)),
          Qt !== M &&
            (Qt ? (mn && E(mn), fn || vn || Pi()) : (mn && T(mn), fn && zi())),
          Kt !== A && (Kt ? O(ft, Le) : D(ft, Le)),
          Jt !== N && (Jt ? O(n, Be) : D(n, Be)),
          i)
        ) {
          if (
            ((Nt === B && Ht === k) || (r = !0),
            Wt !== S && (Wt || (ct.style.height = "")),
            qt && Ft !== H && ((Ke.innerHTML = Ft[0]), (Je.innerHTML = Ft[1])),
            mn && Yt !== R)
          ) {
            var W = Qt ? 1 : 0,
              q = mn.innerHTML,
              F = q.length - R[W].length;
            q.substring(F) === R[W] &&
              (mn.innerHTML = q.substring(0, F) + Yt[W]);
          }
        } else Ht && (Nt || At) && (r = !0);
        if (
          ((u || (Nt && !At)) && ((en = Ui()), _i()),
          (o = se !== L)
            ? (ge.emit("indexChanged", Zi()), (r = !0))
            : u
            ? o || di()
            : (Nt || At) && (oi(), mi(), ii()),
          u &&
            !Z &&
            (function () {
              for (var t = se + Math.min(ht, Ot), e = ee; e--; ) {
                var n = pt[e];
                se <= e && e < t
                  ? (m(n, "tns-moving"),
                    (n.style.left = (100 * (e - se)) / Ot + "%"),
                    m(n, nt),
                    y(n, rt))
                  : n.style.left && ((n.style.left = ""), m(n, rt), y(n, nt)),
                  y(n, it);
              }
              setTimeout(function () {
                v(pt, function (t) {
                  y(t, "tns-moving");
                });
              }, 300);
            })(),
          !we && !Te)
        ) {
          if (
            i &&
            !z &&
            ((Lt === P && Bt === I) ||
              (ct.style.cssText = Pn(Lt, Bt, Nt, It, Wt)),
            lt)
          ) {
            Z && (ft.style.width = zn(Nt, Bt, Ot));
            var j = Wn(Nt, Bt, Ot) + qn(Bt);
            (s = d((l = Ut)) - 1),
              "deleteRule" in l ? l.deleteRule(s) : l.removeRule(s),
              f(Ut, "#" + be + " > .tns-item", j, d(Ut));
          }
          Wt && ci(), r && (Ai(), (ce = se));
        }
        i && ge.emit("newBreakpointEnd", Zi(e));
      }
    }
    function _n() {
      if (!Nt && !At) return ht <= (Ht ? Ot - (Ot - 1) / 2 : Ot);
      var t = Nt ? (Nt + Bt) * ht : gt[ht],
        e = Lt ? St + 2 * Lt : St + Bt;
      return (
        Ht && (e -= Nt ? (St - Nt) / 2 : (St - (gt[se + 1] - gt[se] - Bt)) / 2),
        t <= e
      );
    }
    function Zn() {
      for (var t in ((ut = 0), U)) (t = parseInt(t)) <= mt && (ut = t);
    }
    function $n() {
      !Qt && mn && T(mn),
        !jt && $e && T($e),
        qt || (Xe ? T(Xe) : (Ke && T(Ke), Je && T(Je)));
    }
    function ti() {
      Qt && mn && E(mn),
        jt && $e && E($e),
        qt && (Xe ? E(Xe) : (Ke && E(Ke), Je && E(Je)));
    }
    function ei() {
      if (!Ee) {
        if ((Lt && (ct.style.margin = "0px"), te))
          for (var t = "tns-transparent", e = te; e--; )
            Z && m(pt[e], t), m(pt[ee - e - 1], t);
        $n(), (Ee = !0);
      }
    }
    function ni() {
      if (!Ce) {
        if (
          ((Ut.disabled = !0),
          (ft.className = ft.className.replace(xe.substring(1), "")),
          C(ft, ["style"]),
          zt)
        )
          for (var t = te; t--; ) Z && T(pt[t]), T(pt[ee - t - 1]);
        if (((lt && Z) || C(ct, ["style"]), !Z))
          for (var e = se, n = se + ht; e < n; e++) {
            var i = pt[e];
            C(i, ["style"]), y(i, nt), y(i, rt);
          }
        $n(), (Ce = !0);
      }
    }
    function ii() {
      var t = ai();
      bt.innerHTML !== t && (bt.innerHTML = t);
    }
    function ai() {
      var t = ri(),
        e = t[0] + 1,
        n = t[1] + 1;
      return e === n ? e + "" : e + " to " + n;
    }
    function ri(t) {
      null == t && (t = Ei());
      var e,
        n,
        i,
        a = se;
      if (
        (Ht || Lt
          ? (At || Nt) && ((n = -(parseFloat(t) + Lt)), (i = n + St + 2 * Lt))
          : At && ((n = gt[se]), (i = n + St)),
        At)
      )
        gt.forEach(function (t, r) {
          r < ee &&
            ((Ht || Lt) && t <= n + 0.5 && (a = r), 0.5 <= i - t && (e = r));
        });
      else {
        if (Nt) {
          var r = Nt + Bt;
          Ht || Lt
            ? ((a = Math.floor(n / r)), (e = Math.ceil(i / r - 1)))
            : (e = a + Math.ceil(St / r) - 1);
        } else if (Ht || Lt) {
          var o = Ot - 1;
          if ((Ht ? ((a -= o / 2), (e = se + o / 2)) : (e = se + o), Lt)) {
            var u = (Lt * Ot) / St;
            (a -= u), (e += u);
          }
          (a = Math.floor(a)), (e = Math.ceil(e));
        } else e = a + Ot - 1;
        (a = Math.max(a, 0)), (e = Math.min(e, ee - 1));
      }
      return [a, e];
    }
    function oi() {
      if (_t && !we) {
        var t = ri();
        t.push(Zt),
          si.apply(null, t).forEach(function (t) {
            if (!h(t, Fe)) {
              var e = {};
              (e[Q] = function (t) {
                t.stopPropagation();
              }),
                O(t, e),
                O(t, je),
                (t.src = x(t, "data-src"));
              var n = x(t, "data-srcset");
              n && (t.srcset = n), m(t, "loading");
            }
          });
      }
    }
    function ui(t) {
      m(t, "loaded"), li(t);
    }
    function li(t) {
      m(t, Fe), y(t, "loading"), D(t, je);
    }
    function si(t, e, n) {
      var i = [];
      for (n || (n = "img"); t <= e; )
        v(pt[t].querySelectorAll(n), function (t) {
          i.push(t);
        }),
          t++;
      return i;
    }
    function ci() {
      var t = si.apply(null, ri());
      e(function () {
        fi(t, pi);
      });
    }
    function fi(t, n) {
      return xt
        ? n()
        : (t.forEach(function (e, n) {
            !_t && e.complete && li(e), h(e, Fe) && t.splice(n, 1);
          }),
          t.length
            ? void e(function () {
                fi(t, n);
              })
            : n());
    }
    function di() {
      oi(),
        mi(),
        ii(),
        wi(),
        (function () {
          if (jt && ((rn = 0 <= an ? an : Hn()), (an = -1), rn !== on)) {
            var t = Ze[on],
              e = Ze[rn];
            w(t, { tabindex: "-1", "aria-label": ln + (on + 1) }),
              y(t, un),
              w(e, { "aria-label": ln + (rn + 1) + sn }),
              C(e, "tabindex"),
              m(e, un),
              (on = rn);
          }
        })();
    }
    function vi(t, e) {
      for (var n = [], i = t, a = Math.min(t + e, ee); i < a; i++)
        n.push(pt[i].offsetHeight);
      return Math.max.apply(null, n);
    }
    function pi() {
      var t = Wt ? vi(se, Ot) : vi(te, ht),
        e = ot || ct;
      e.style.height !== t && (e.style.height = t + "px");
    }
    function hi() {
      gt = [0];
      var t = lt ? "left" : "top",
        e = lt ? "right" : "bottom",
        n = pt[0].getBoundingClientRect()[t];
      v(pt, function (i, a) {
        a && gt.push(i.getBoundingClientRect()[t] - n),
          a === ee - 1 && gt.push(i.getBoundingClientRect()[e] - n);
      });
    }
    function mi() {
      var t = ri(),
        e = t[0],
        n = t[1];
      v(pt, function (t, i) {
        e <= i && i <= n
          ? g(t, "aria-hidden") && (C(t, ["aria-hidden", "tabindex"]), m(t, We))
          : g(t, "aria-hidden") ||
            (w(t, { "aria-hidden": "true", tabindex: "-1" }), y(t, We));
      });
    }
    function yi(t) {
      return t.nodeName.toLowerCase();
    }
    function gi(t) {
      return "button" === yi(t);
    }
    function xi(t) {
      return "true" === t.getAttribute("aria-disabled");
    }
    function bi(t, e, n) {
      t ? (e.disabled = n) : e.setAttribute("aria-disabled", n.toString());
    }
    function wi() {
      if (qt && !Pt && !zt) {
        var t = Ge ? Ke.disabled : xi(Ke),
          e = Qe ? Je.disabled : xi(Je),
          n = se <= fe,
          i = !Pt && de <= se;
        n && !t && bi(Ge, Ke, !0),
          !n && t && bi(Ge, Ke, !1),
          i && !e && bi(Qe, Je, !0),
          !i && e && bi(Qe, Je, !1);
      }
    }
    function Ci(t, e) {
      F && (t.style[F] = e);
    }
    function Mi(t) {
      return (
        null == t && (t = se),
        At
          ? (St - (Lt ? Bt : 0) - (gt[t + 1] - gt[t] - Bt)) / 2
          : Nt
          ? (St - Nt) / 2
          : (Ot - 1) / 2
      );
    }
    function Ti() {
      var t = St + (Lt ? Bt : 0) - (Nt ? (Nt + Bt) * ee : gt[ee]);
      return (
        Ht &&
          !zt &&
          (t = Nt ? -(Nt + Bt) * (ee - 1) - Mi() : Mi(ee - 1) - gt[ee - 1]),
        0 < t && (t = 0),
        t
      );
    }
    function Ei(t) {
      var e;
      if ((null == t && (t = se), lt && !At))
        if (Nt) (e = -(Nt + Bt) * t), Ht && (e += Mi());
        else {
          var n = W ? ee : Ot;
          Ht && (t -= Mi()), (e = (100 * -t) / n);
        }
      else (e = -gt[t]), Ht && At && (e += Mi());
      return ne && (e = Math.max(e, ie)), e + (!lt || At || Nt ? "px" : "%");
    }
    function Ai(t) {
      Ci(ft, "0s"), Ni(t);
    }
    function Ni(t) {
      null == t && (t = Ei()), (ft.style[re] = oe + t + ue);
    }
    function Li(t, e, n, i) {
      var a = t + Ot;
      zt || (a = Math.min(a, ee));
      for (var r = t; r < a; r++) {
        var o = pt[r];
        i || (o.style.left = (100 * (r - se)) / Ot + "%"),
          at && j && (o.style[j] = o.style[G] = (at * (r - t)) / 1e3 + "s"),
          y(o, e),
          m(o, n),
          i && $t.push(o);
      }
    }
    function Bi(t, e) {
      ae && En(),
        (se !== ce || e) &&
          (ge.emit("indexChanged", Zi()),
          ge.emit("transitionStart", Zi()),
          Wt && ci(),
          fn && t && 0 <= ["click", "keydown"].indexOf(t.type) && zi(),
          (me = !0),
          An());
    }
    function Si(t) {
      return t.toLowerCase().replace(/-/g, "");
    }
    function Hi(t) {
      if (Z || me) {
        if ((ge.emit("transitionEnd", Zi(t)), !Z && 0 < $t.length))
          for (var e = 0; e < $t.length; e++) {
            var n = $t[e];
            (n.style.left = ""),
              G && j && ((n.style[G] = ""), (n.style[j] = "")),
              y(n, it),
              m(n, rt);
          }
        if (
          !t ||
          (!Z && t.target.parentNode === ft) ||
          (t.target === ft && Si(t.propertyName) === Si(re))
        ) {
          if (!ae) {
            var i = se;
            En(), se !== i && (ge.emit("indexChanged", Zi()), Ai());
          }
          "inner" === _ && ge.emit("innerLoaded", Zi()), (me = !1), (ce = se);
        }
      }
    }
    function Oi(t, e) {
      if (!Te)
        if ("prev" === t) Di(e, -1);
        else if ("next" === t) Di(e, 1);
        else {
          if (me) {
            if (ve) return;
            Hi();
          }
          var n = Sn(),
            i = 0;
          if (
            ("first" === t
              ? (i = -n)
              : "last" === t
              ? (i = Z ? ht - Ot - n : ht - 1 - n)
              : ("number" != typeof t && (t = parseInt(t)),
                isNaN(t) ||
                  (e || (t = Math.max(0, Math.min(ht - 1, t))), (i = t - n))),
            !Z && i && Math.abs(i) < Ot)
          ) {
            var a = 0 < i ? 1 : -1;
            i += fe <= se + i - ht ? ht * a : 2 * ht * a * -1;
          }
          (se += i),
            Z && zt && (se < fe && (se += ht), de < se && (se -= ht)),
            Sn(se) !== Sn(ce) && Bi(e);
        }
    }
    function Di(t, e) {
      if (me) {
        if (ve) return;
        Hi();
      }
      var n;
      if (!e) {
        for (var i = ji((t = Fi(t))); i !== Xe && [Ke, Je].indexOf(i) < 0; )
          i = i.parentNode;
        var a = [Ke, Je].indexOf(i);
        0 <= a && ((n = !0), (e = 0 === a ? -1 : 1));
      }
      if (Pt) {
        if (se === fe && -1 === e) return void Oi("last", t);
        if (se === de && 1 === e) return void Oi("first", t);
      }
      e &&
        ((se += Dt * e),
        At && (se = Math.floor(se)),
        Bi(n || (t && "keydown" === t.type) ? t : null));
    }
    function ki() {
      (cn = setInterval(function () {
        Di(null, hn);
      }, Xt)),
        (fn = !0);
    }
    function Ri() {
      clearInterval(cn), (fn = !1);
    }
    function Ii(t, e) {
      w(mn, { "data-action": t }), (mn.innerHTML = gn[0] + t + gn[1] + e);
    }
    function Pi() {
      ki(), mn && Ii("stop", Yt[1]);
    }
    function zi() {
      Ri(), mn && Ii("start", Yt[0]);
    }
    function Wi() {
      fn ? (zi(), (vn = !0)) : (Pi(), (vn = !1));
    }
    function qi(t) {
      t.focus();
    }
    function Fi(t) {
      return Vi((t = t || l.event)) ? t.changedTouches[0] : t;
    }
    function ji(t) {
      return t.target || l.event.srcElement;
    }
    function Vi(t) {
      return 0 <= t.type.indexOf("touch");
    }
    function Gi(t) {
      t.preventDefault ? t.preventDefault() : (t.returnValue = !1);
    }
    function Qi() {
      return (
        (r = Cn.y - wn.y),
        (o = Cn.x - wn.x),
        (e = Math.atan2(r, o) * (180 / Math.PI)),
        (i = !1),
        90 - (n = pe) <= (a = Math.abs(90 - Math.abs(e)))
          ? (i = "horizontal")
          : a <= n && (i = "vertical"),
        i === t.axis
      );
      var e, n, i, a, r, o;
    }
    function Xi(t) {
      if (me) {
        if (ve) return;
        Hi();
      }
      Qt && fn && Ri(), (Mn = !0), bn && (i(bn), (bn = null));
      var e = Fi(t);
      ge.emit(Vi(t) ? "touchStart" : "dragStart", Zi(t)),
        !Vi(t) && 0 <= ["img", "a"].indexOf(yi(ji(t))) && Gi(t),
        (Cn.x = wn.x = e.clientX),
        (Cn.y = wn.y = e.clientY),
        Z && ((xn = parseFloat(ft.style[re].replace(oe, ""))), Ci(ft, "0s"));
    }
    function Yi(t) {
      if (Mn) {
        var n = Fi(t);
        (Cn.x = n.clientX),
          (Cn.y = n.clientY),
          Z
            ? bn ||
              (bn = e(function () {
                !(function t(n) {
                  if (he) {
                    if (
                      (i(bn),
                      Mn &&
                        (bn = e(function () {
                          t(n);
                        })),
                      "?" === he && (he = Qi()),
                      he)
                    ) {
                      !Ve && Vi(n) && (Ve = !0);
                      try {
                        n.type &&
                          ge.emit(Vi(n) ? "touchMove" : "dragMove", Zi(n));
                      } catch (t) {}
                      var a = xn,
                        r = Tn(Cn, wn);
                      if (!lt || Nt || At) (a += r), (a += "px");
                      else
                        (a += W
                          ? (r * Ot * 100) / ((St + Bt) * ee)
                          : (100 * r) / (St + Bt)),
                          (a += "%");
                      ft.style[re] = oe + a + ue;
                    }
                  } else Mn = !1;
                })(t);
              }))
            : ("?" === he && (he = Qi()), he && (Ve = !0)),
          ("boolean" != typeof t.cancelable || t.cancelable) &&
            Ve &&
            t.preventDefault();
      }
    }
    function Ki(n) {
      if (Mn) {
        bn && (i(bn), (bn = null)), Z && Ci(ft, ""), (Mn = !1);
        var a = Fi(n);
        (Cn.x = a.clientX), (Cn.y = a.clientY);
        var r = Tn(Cn, wn);
        if (Math.abs(r)) {
          if (!Vi(n)) {
            var o = ji(n);
            O(o, {
              click: function t(e) {
                Gi(e), D(o, { click: t });
              },
            });
          }
          Z
            ? (bn = e(function () {
                if (lt && !At) {
                  var t = (-r * Ot) / (St + Bt);
                  (t = 0 < r ? Math.floor(t) : Math.ceil(t)), (se += t);
                } else {
                  var e = -(xn + r);
                  if (e <= 0) se = fe;
                  else if (e >= gt[ee - 1]) se = de;
                  else
                    for (var i = 0; i < ee && e >= gt[i]; )
                      e > gt[(se = i)] && r < 0 && (se += 1), i++;
                }
                Bi(n, r), ge.emit(Vi(n) ? "touchEnd" : "dragEnd", Zi(n));
              }))
            : he && Di(n, 0 < r ? -1 : 1);
        }
      }
      "auto" === t.preventScrollOnTouch && (Ve = !1),
        pe && (he = "?"),
        Qt && !fn && ki();
    }
    function Ji() {
      (ot || ct).style.height = gt[se + Ot] - gt[se] + "px";
    }
    function Ui() {
      var t = Nt ? ((Nt + Bt) * ht) / St : ht / Ot;
      return Math.min(Math.ceil(t), ht);
    }
    function _i() {
      if (jt && !Re && en !== nn) {
        var t = nn,
          e = en,
          n = E;
        for (en < nn && ((t = en), (e = nn), (n = T)); t < e; ) n(Ze[t]), t++;
        nn = en;
      }
    }
    function Zi(t) {
      return {
        container: ft,
        slideItems: pt,
        navContainer: $e,
        navItems: Ze,
        controlsContainer: Xe,
        hasControls: De,
        prevButton: Ke,
        nextButton: Je,
        items: Ot,
        slideBy: Dt,
        cloneCount: te,
        slideCount: ht,
        slideCountNew: ee,
        index: se,
        indexCached: ce,
        displayIndex: Ln(),
        navCurrentIndex: rn,
        navCurrentIndexCached: on,
        pages: en,
        pagesCached: nn,
        sheet: Ut,
        isOn: yt,
        event: t || {},
      };
    }
    Y && console.warn("No slides found in", t.container);
  };
  return R;
})();
