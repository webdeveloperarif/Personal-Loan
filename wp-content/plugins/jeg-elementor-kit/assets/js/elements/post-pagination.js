!(function (t) {
  var e = {};
  function n(a) {
    if (e[a]) return e[a].exports;
    var o = (e[a] = { i: a, l: !1, exports: {} });
    return t[a].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = t),
    (n.c = e),
    (n.d = function (t, e, a) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: a });
    }),
    (n.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (n.t = function (t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var a = Object.create(null);
      if (
        (n.r(a),
        Object.defineProperty(a, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var o in t)
          n.d(
            a,
            o,
            function (e) {
              return t[e];
            }.bind(null, o)
          );
      return a;
    }),
    (n.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return n.d(e, "a", e), e;
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.p = ""),
    n((n.s = 0));
})([
  function (t, e) {
    class n extends elementorModules.frontend.handlers.Base {
      getDefaultSettings() {
        return {
          selectors: {
            wrapper: ".jeg-elementor-kit.post-element",
            pagination: ".jkit-block-pagination",
          },
        };
      }
      getDefaultElements() {
        const t = this.getSettings("selectors");
        return {
          $wrapper: this.$element.find(t.wrapper),
          $pagination: this.$element.find(t.pagination),
        };
      }
      bindEvents() {
        this.onInitPagination();
      }
      onInitPagination() {
        const t = this.elements.$wrapper,
          e = this.elements.$pagination,
          n = t.data("settings"),
          a = n.pagination_scroll_limit,
          o = n.pagination_mode,
          r = n.sg_content_sorting,
          i = t.find(".product-order select"),
          l = {
            action: jkit_element_pagination_option.element_prefix + n.class,
            data: { current_page: 1, attr: n, default_sortby: n.sort_by },
          },
          d = {
            parameter: {
              number_post: l.data.attr.number_post.size,
              current_page: l.data.current_page,
            },
          };
        let s = !1,
          u = [],
          c = 0;
        const p = function () {
            s ||
              e.hasClass("disabled") ||
              window.self != window.top ||
              ((a >= l.data.current_page || "0" == a) &&
                e.find(".jkit-block-scrollload").elementorWaypoint(
                  function () {
                    (l.data.current_page = l.data.current_page + 1),
                      c++,
                      m(),
                      this.destroy();
                  },
                  { offset: "100%", context: window }
                )),
              Waypoint.refreshAll();
          },
          f = function (t) {
            t.preventDefault(),
              s ||
                e.find(this).hasClass("disabled") ||
                ("prev" === t.data
                  ? (l.data.current_page = l.data.current_page - 1)
                  : (l.data.current_page = l.data.current_page + 1),
                m());
          },
          j = function (t) {
            t.content = "<div>" + t.content + "</div>";
            const e = jQuery(t.content);
            return (t.content = e.html()), t;
          },
          g = function (n) {
            ["loadmore", "scrollload"].includes(o)
              ? (function (n) {
                  const a = jQuery(n.content);
                  let r = 0;
                  a.each(function () {
                    (jQuery(this).hasClass("jkit-post") ||
                      jQuery(this).hasClass("jkit-product-block")) &&
                      jQuery(this).addClass("jkit-ajax-loaded anim-" + r),
                      r++;
                  }),
                    t.removeClass("loading"),
                    t.addClass("loaded"),
                    1 === l.data.current_page
                      ? (t.find(".jkit-ajax-flag").html(a),
                        e.removeClass("disabled"),
                        e.show())
                      : t.find(".jkit-ajax-flag").append(a),
                    n.next || (e.addClass("disabled"), e.hide()),
                    b(),
                    jQuery(window).trigger("resize"),
                    "scrollload" === o &&
                      setTimeout(function () {
                        p();
                      }, 500);
                })(n)
              : "nextprev" === o
              ? (function (n) {
                  const a = jQuery(n.content);
                  let o = 0;
                  a.each(function () {
                    (jQuery(this).hasClass("jkit-post") ||
                      jQuery(this).hasClass("jkit-product-block")) &&
                      jQuery(this).addClass("jkit-ajax-loaded anim-" + o),
                      o++;
                  }),
                    t.removeClass("loading"),
                    t.addClass("loaded"),
                    t.find(".jkit-ajax-flag").html(a),
                    n.next
                      ? e
                          .find(
                            ".jkit-pagination-button.jkit-block-nextprev .next"
                          )
                          .removeClass("disabled")
                      : e
                          .find(
                            ".jkit-pagination-button.jkit-block-nextprev .next"
                          )
                          .addClass("disabled"),
                    n.prev
                      ? e
                          .find(
                            ".jkit-pagination-button.jkit-block-nextprev .prev"
                          )
                          .removeClass("disabled")
                      : e
                          .find(
                            ".jkit-pagination-button.jkit-block-nextprev .prev"
                          )
                          .addClass("disabled"),
                    b(),
                    jQuery(window).trigger("resize"),
                    jQuery("html, body").animate(
                      { scrollTop: t.offset().top - 100 },
                      1e3
                    );
                })(n)
              : (function (e) {
                  const n = jQuery(e.content);
                  let a = 0;
                  n.each(function () {
                    (jQuery(this).hasClass("jkit-post") ||
                      jQuery(this).hasClass("jkit-product-block")) &&
                      jQuery(this).addClass("jkit-ajax-loaded anim-" + a),
                      a++;
                  }),
                    t.removeClass("loading"),
                    t.addClass("loaded"),
                    t.find(".jkit-ajax-flag").html(n),
                    b(),
                    jQuery(window).trigger("resize");
                })(n);
          },
          m = function () {
            return new Promise(function (t, e) {
              k();
              const n = (function (t) {
                const e = JSON.stringify(t);
                for (let t = 0; t < u.length; t++)
                  if (e === u[t].param) return j(u[t].result);
              })(l);
              n
                ? (g(n), t())
                : jQuery.ajax({
                    url: jkit_ajax_url,
                    type: "post",
                    dataType: "json",
                    data: l,
                    success: function (e) {
                      g(e),
                        (function (t, e) {
                          u.push({ param: JSON.stringify(t), result: e });
                        })(l, e),
                        t();
                    },
                  });
            });
          },
          k = function () {
            (s = !0),
              e.addClass("loading"),
              t.addClass("loading"),
              "nextprev" === o
                ? t.find(".jkit-preloader-overlay").show()
                : ["loadmore", "scrollload"].includes(o)
                ? e.find("a").text(e.find("a").data("loading"))
                : t.find(".jkit-preloader-overlay").show();
          },
          b = function () {
            (s = !1),
              e.removeClass("loading"),
              "nextprev" === o
                ? t.find(".jkit-preloader-overlay").hide()
                : ["loadmore", "scrollload"].includes(o)
                ? e.find("a").text(e.find("a").data("load"))
                : t.find(".jkit-preloader-overlay").hide();
          };
        ["loadmore", "scrollload"].includes(o) &&
          ("scrollload" === o && p(),
          e
            .find(
              ".jkit-pagination-button.jkit-block-loadmore, .jkit-pagination-button.jkit-block-scrollload"
            )
            .on("click", function (t) {
              t.preventDefault(),
                (l.data.current_page = l.data.current_page + 1),
                c++,
                s || e.hasClass("disabled") || m();
            })),
          "nextprev" === o &&
            (e
              .find(".jkit-pagination-button.jkit-block-nextprev .next")
              .on("click", null, "next", f),
            e
              .find(".jkit-pagination-button.jkit-block-nextprev .prev")
              .on("click", null, "prev", f)),
          "yes" === r &&
            i.length &&
            i.on("change", function () {
              const e =
                "default" !== this.value ? this.value : l.data.default_sortby;
              if (
                ((l.data.attr.sort_by = e),
                ["loadmore", "scrollload"].includes(o))
              )
                (d.parameter.current_page = l.data.current_page),
                  (l.data.current_page = 1),
                  (l.data.attr.number_post.size +=
                    l.data.attr.pagination_number_post.size * c),
                  m().then(function () {
                    (l.data.attr.number_post.size = d.parameter.number_post),
                      (l.data.current_page = d.parameter.current_page);
                  });
              else if ("disable" === o) {
                const e = t
                  .find(".jkit-products > .jkit-product-block > .button")
                  .map(function (t) {
                    return jQuery(this).data("product_id");
                  })
                  .get()
                  .join();
                (l.data.attr.wc_include_post = e), m();
              } else m();
            });
      }
    }
    jQuery(window).on("elementor/frontend/init", () => {
      const t = (t) => {
        elementorFrontend.elementsHandler.addHandler(n, { $element: t });
      };
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/jkit_post_block.default",
        t
      ),
        elementorFrontend.hooks.addAction(
          "frontend/element_ready/jkit_post_list.default",
          t
        ),
        elementorFrontend.hooks.addAction(
          "frontend/element_ready/jkit_product_grid.default",
          t
        );
    });
  },
]);
