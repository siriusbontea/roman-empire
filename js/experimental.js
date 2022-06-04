(function () {
    d3.quadTiles = function (h, m) {
        var M = [],
            b = 1 << (m = Math.max(0, m)),
            j = Math.max(.2, Math.min(1, m * .01)),
            d, t = h.precision(),
            n = h.precision(960).stream({
                point: function () {
                    d = !1
                },
                lineStart: r,
                lineEnd: r,
                polygonStart: r,
                polygonEnd: r
            });
        return i(-180, -180, 180, 180), h.precision(t), M;

        function i(e, a, o, u) {
            var s = o - e,
                k = p(a),
                l = p(u),
                c = j * s;
            d = !0, n.polygonStart(), n.lineStart();
            for (var f = e; f < o + c / 2 && d; f += c) n.point(f, k);
            for (var g = k;
                (g += c) < l && d;) n.point(o, g);
            for (var f = o; f > e - c / 2 && d; f -= c) n.point(f, l);
            for (var g = l;
                (g -= c) > k && d;) n.point(e, g);
            if (d && n.point(e, k), n.lineEnd(), n.polygonEnd(), s <= 360 / b) d || M.push({
                type: "Polygon",
                coordinates: [d3.range(e, o + c / 2, c).map(function (w) {
                    return [w, a]
                }).concat([
                    [o, .5 * (a + u)]
                ]).concat(d3.range(o, e - c / 2, -c).map(function (w) {
                    return [w, u]
                })).concat([
                    [e, .5 * (a + u)]
                ]).concat([
                    [e, a]
                ]).map(function (w) {
                    return [w[0], p(w[1])]
                })],
                key: [(180 + e) / 360 * b | 0, (180 + a) / 360 * b | 0, m],
                centroid: [.5 * (e + o), .5 * (k + l)]
            });
            else if (!d) {
                var f = .5 * (e + o),
                    g = .5 * (a + u);
                i(e, a, f, g), i(f, a, o, g), i(e, g, f, u), i(f, g, o, u)
            }
        }
    };

    function r() {}

    function p(h) {
        return Math.atan(Math.exp(-h * Math.PI / 180)) * 360 / Math.PI - 90
    }
})(),
function () {
    d3.geo.raster = function () {
        var t, n = d3.geo.path(),
            i = null,
            e = [0, 1 / 0],
            a = ["a", "b", "c", "d"],
            o = document.createElement("canvas"),
            u = o.getContext("2d");

        function s(l) {
            var c = Math.max(e[0], Math.min(e[1], (Math.log(t.scale()) / Math.LN2 | 0) - 6)),
                f = c + 6,
                g = t.scale() / (1 << f),
                w = t.translate(),
                C = l.selectAll("div").data([0]);
            C.enter().append("div").style(r + "transform-origin", "0 0 0"), C.style(r + "transform", "translate(" + w.map(m) + ")scale(" + g + ")");
            var P = C.selectAll(".tile").data(d3.quadTiles(t, c), h);
            P.enter().append("canvas").attr("class", "tile").style("position", "absolute").each(function (y) {
                var E = this,
                    x = y.image = new Image,
                    v = y.key;
                x.crossOrigin = !0, x.onload = function () {
                    setTimeout(function () {
                        k(y, E, f)
                    }, 1)
                }, x.src = i({
                    x: v[0],
                    y: v[1],
                    z: v[2],
                    subdomain: a[(v[0] * 31 + v[1]) % a.length]
                })
            }), P.exit().remove()
        }
        return s.projection = function (l) {
            return arguments.length ? (n.projection(t = l), s) : t
        }, s.url = function (l) {
            return arguments.length ? (i = typeof l == "string" ? j(l) : l, s) : i
        }, s.scaleExtent = function (l) {
            return arguments.length ? (e = l, s) : e
        }, s.subdomains = function (l) {
            return arguments.length ? (a = l, s) : a
        }, s;

        function k(l, c, f) {
            var g = t.translate(),
                w = t.scale(),
                C = t.clipExtent(),
                P = l.image,
                y = P.width,
                E = P.height,
                x = l.key,
                v = 1 << x[2];
            t.translate([0, 0]).scale(1 << f).clipExtent(null), o.width = y, o.height = E, u.drawImage(P, 0, 0, y, E);
            var S = n.bounds(l),
                q = l.x0 = S[0][0] | 0,
                R = l.y0 = S[0][1] | 0,
                K = S[1][0] + 1 | 0,
                Q = S[1][1] + 1 | 0,
                T = x[0] / v * 360 - 180,
                B = (x[0] + 1) / v * 360 - 180,
                N = x[1] / v * 360 - 180,
                D = (x[1] + 1) / v * 360 - 180;
            m\u03C60 = M(N), m\u03C61 = M(D);
            var v = c.width = K - q,
                U = c.height = Q - R,
                V = c.getContext("2d");
            if (v > 0 && U > 0) {
                for (var A = u.getImageData(0, 0, y, E).data, W = V.createImageData(v, U), L = W.data, $ = b(function (X, Y, Z) {
                        return A[(Y * y + X) * 4 + Z]
                    }), F = R, O = -1; F < Q; ++F)
                    for (var G = q; G < K; ++G) {
                        var H = t.invert([G, F]),
                            z, I;
                        if (!H || isNaN(z = H[0]) || isNaN(I = H[1]) || z > B || z < T || I > m\u03C60 || I < m\u03C61) {
                            O += 4;
                            continue
                        }
                        I = M.invert(I);
                        var _ = (z - T) / (B - T) * y,
                            tt = (I - N) / (D - N) * E,
                            J = (((z - T) / (B - T) * y | 0) + ((I - N) / (D - N) * E | 0) * y) * 4;
                        L[++O] = A[J], L[++O] = A[++J], L[++O] = A[++J], L[++O] = 255
                    }
                V.putImageData(W, 0, 0)
            }
            d3.selectAll([c]).style("left", q + "px").style("top", R + "px"), t.translate(g).scale(w).clipExtent(C)
        }
    };
    var r = d3.geo.raster.prefix = p(["webkit", "ms", "moz", "Moz", "o", "O"]);

    function p(t) {
        var n = -1,
            i = t.length,
            e = document.body.style;
        if (!("transformOrigin" in e)) {
            for (; ++n < i;)
                if (t[n] + "TransformOrigin" in e) return "-" + t[n].toLowerCase() + "-"
        }
        return ""
    }

    function h(t) {
        return t.key.join(", ")
    }

    function m(t) {
        return (t | 0) + "px"
    }

    function M(t) {
        return Math.atan(Math.exp(-t * Math.PI / 180)) * 360 / Math.PI - 90
    }
    M.invert = function (t) {
        return -Math.log(Math.tan(Math.PI * .25 + t * Math.PI / 360)) * 180 / Math.PI
    };

    function b(t) {
        return function (n, i, e) {
            var a = Math.floor(n),
                o = Math.floor(i),
                u = Math.ceil(n),
                s = Math.ceil(i);
            return a === u || o === s ? t(a, o, e) : (t(a, o, e) * (u - n) * (s - i) + t(u, o, e) * (n - a) * (s - i) + t(a, s, e) * (u - n) * (i - o) + t(u, s, e) * (n - a) * (i - o)) / ((u - a) * (s - o))
        }
    }

    function j(t) {
        return function (n) {
            return t.replace(/\{([^\}]+)\}/g, function (i, e) {
                var a = n[e];
                return a ? ? (e === "quadkey" && d(n.x, n.y, n.z))
            })
        }
    }

    function d(t, n, i) {
        for (var e = [], a = 1; a <= i; a++) e.push((n >> i - a & 1) << 1 | t >> i - a & 1);
        return e.join("")
    }
}();
var prefix = prefixMatch(["webkit", "ms", "Moz", "O"]);

function prefixMatch(r) {
    for (var p = -1, h = r.length, m = document.body.style; ++p < h;)
        if (r[p] + "Transform" in m) return "-" + r[p].toLowerCase() + "-";
    return ""
}(function () {
    var r = window.devicePixelRatio || 1,
        p = 960 * r,
        h = 600 * r,
        m = .5 * r,
        M = d3.geo.albers().rotate([0, 0]).center([0, 52]).scale(150 * r).translate([p / 2, h / 2]).clipExtent([
            [m, m],
            [p - m, h - m]
        ]),
        b = d3.geo.raster().projection(M).scaleExtent([0, 6]).url("https://stamen-tiles.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.jpg"),
        j = d3.select("#map").style("width", p / r + "px").style("height", h / r + "px").call(d3.behavior.zoom().translate([.5 * p / r, .5 * h / r]).scale(M.scale() / r).scaleExtent([100, 5e3]).on("zoom", function () {
            var d = d3.event.translate,
                t = d3.event.scale;
            M.translate([d[0] * r, d[1] * r]).scale(t * r), j.call(b)
        })).append("div").style(d3.geo.raster.prefix + "transform", "scale(" + 1 / r + ")").style(d3.geo.raster.prefix + "transform-origin", "0 0 0").append("div").style(d3.geo.raster.prefix + "transform-origin", "0 0 0").call(b)
})();
