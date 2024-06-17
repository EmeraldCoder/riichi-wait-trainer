function k(e, r) {
  const t = e[1], s = r[1];
  if (t < s)
    return -1;
  if (t > s)
    return 1;
  const n = parseInt(e[0]), u = parseInt(r[0]);
  return n < u ? -1 : n > u ? 1 : 0;
}
const P = ["m", "p", "s", "z"], K = P.reduce((e, r) => {
  const t = r === "z" ? 7 : 9;
  for (let s = 1; s <= t; s++)
    e.push(`${s}${r}`);
  return e;
}, []);
function b(e) {
  return e.reduce((r, t) => {
    const s = r.findIndex((n) => n.key === t);
    return s === -1 ? r.push({ key: t, value: [t] }) : r[s].value.push(t), r;
  }, []);
}
function I(e) {
  let r = [];
  return e.split("").reduce((t, s) => (P.includes(s) ? (t.push(...r.map((n) => `${n}${s}`)), r = []) : r.push(s), t), []);
}
function F(e) {
  if (typeof e == "string")
    return F({ hand: I(e), calls: [] });
  if (Array.isArray(e))
    return F({ hand: e, calls: [] });
  const r = e.calls.map((t) => ({ tiles: t.tiles.slice() }));
  return b(e.hand).map((t) => t.key).reduce((t, s) => {
    const n = e.hand.slice();
    n.unshift(n.splice(n.findIndex((h) => h === s), 1)[0]);
    const u = n.slice(), o = [
      ...r,
      ...m(u, !0),
      ...z(u, !0)
    ].sort(p);
    o.length !== 0 && !t.some((h) => x(h, o)) && t.push(o);
    const i = n.slice(), f = [
      ...r,
      ...S(i, i[0]),
      // give priority to toitsu
      ...m(i, !0),
      ...z(i, !0)
    ].sort(p);
    f.length !== 0 && !t.some((h) => x(h, f)) && t.push(f);
    const l = n.slice(), c = [
      ...r,
      ...m(l, !1),
      ...z(l, !1)
    ].sort(p);
    c.length !== 0 && !t.some((h) => x(h, c)) && t.push(c);
    const T = n.slice(), y = [
      ...r,
      ...S(T, T[0]),
      // give priority to toitsu
      ...m(T, !1),
      ...z(T, !1)
    ].sort(p);
    return y.length !== 0 && !t.some((h) => x(h, y)) && t.push(y), t;
  }, []);
}
function m(e, r) {
  const t = [];
  let s = 0;
  for (; s < e.length; ) {
    const n = e[s][1], u = parseInt(e[s][0]);
    let o;
    r ? o = [
      ...n !== "z" && u >= 3 ? a(e, n, u - 2) : [],
      ...n !== "z" && u >= 2 ? a(e, n, u - 1) : [],
      ...n !== "z" ? a(e, n, u) : [],
      ...M(e, e[s])
    ] : o = [
      ...M(e, e[s]),
      ...n !== "z" && u >= 3 ? a(e, n, u - 2) : [],
      ...n !== "z" && u >= 2 ? a(e, n, u - 1) : [],
      ...n !== "z" ? a(e, n, u) : []
    ], o.length === 0 ? s++ : t.push(...o);
  }
  return t;
}
function a(e, r, t) {
  const s = e.find((o) => o === `${t}${r}`), n = e.find((o) => o === `${t + 1}${r}`), u = e.find((o) => o === `${t + 2}${r}`);
  return s && n && u ? (e.splice(e.indexOf(s), 1), e.splice(e.indexOf(n), 1), e.splice(e.indexOf(u), 1), [{ tiles: [s, n, u] }, ...a(e, r, t)]) : [];
}
function M(e, r) {
  const t = e.filter((s) => s === r).slice(0, 3);
  return t.length === 3 ? (t.forEach((s) => e.splice(e.indexOf(s), 1)), [{ tiles: t }]) : [];
}
function z(e, r) {
  const t = [];
  let s = 0;
  for (; s < e.length; ) {
    const n = e[s][1], u = parseInt(e[s][0]);
    let o;
    r ? o = [
      ...n !== "z" && u >= 3 ? d(e, n, u - 2) : [],
      ...n !== "z" && u >= 2 ? d(e, n, u - 1) : [],
      ...n !== "z" ? d(e, n, u) : [],
      ...S(e, e[s])
    ] : o = [
      ...S(e, e[s]),
      ...n !== "z" && u >= 3 ? d(e, n, u - 2) : [],
      ...n !== "z" && u >= 2 ? d(e, n, u - 1) : [],
      ...n !== "z" ? d(e, n, u) : []
    ], o.length === 0 ? s++ : t.push(...o);
  }
  return t;
}
function d(e, r, t) {
  if (t > 7)
    return [];
  const s = t, n = t + 1, u = t + 2, o = e.find((c) => c === `${s}${r}`), i = e.find((c) => c === `${n}${r}`), f = e.find((c) => c === `${u}${r}`), l = [];
  return o != null && i != null && f == null && l.push(o, i), o != null && i == null && f != null && l.push(o, f), o == null && i != null && f != null && l.push(i, f), l.length === 2 ? (l.forEach((c) => e.splice(e.indexOf(c), 1)), [{ tiles: l }, ...d(e, r, t)]) : [];
}
function S(e, r) {
  const t = e.filter((s) => s === r).slice(0, 2);
  return t.length === 2 ? (t.forEach((s) => e.splice(e.indexOf(s), 1)), [{ tiles: t }]) : [];
}
function p(e, r) {
  const t = k(e.tiles[0], r.tiles[0]);
  if (t !== 0)
    return t;
  const s = e.tiles[0] !== e.tiles[1], n = r.tiles[0] !== r.tiles[1];
  return s && !n ? 1 : !s && n || e.tiles.length > r.tiles.length ? -1 : e.tiles.length < r.tiles.length ? 1 : 0;
}
function x(e, r) {
  if (e.length !== r.length)
    return !1;
  for (let t = 0; t < e.length; t++)
    if (p(e[t], r[t]) !== 0)
      return !1;
  return !0;
}
function $(e) {
  return typeof e == "string" ? $({ hand: I(e), calls: [] }) : Array.isArray(e) ? $({ hand: e, calls: [] }) : e.calls.length > 0 ? O(e) : Math.min(
    O(e),
    B(e),
    C(e)
  );
}
function O(e) {
  return F(e).reduce((t, s) => {
    let n = !1, u = 0, o = 0;
    s.forEach((c) => {
      c.tiles.length >= 3 ? u++ : !n && c.tiles[0] === c.tiles[1] ? n = !0 : o++;
    });
    const i = Math.min(4, u), f = Math.min(4 - u, o), l = 8 - i * 2 - f - (n ? 1 : 0);
    return l < t ? l : t;
  }, 8);
}
function B(e) {
  return 6 - b(e.hand).filter((t) => t.value.length >= 2).length;
}
function C(e) {
  let r = !1;
  return 13 - e.hand.reduce((s, n) => {
    const u = parseInt(n[0]);
    return (n[1] === "z" || u === 1 || u === 9) && (s.includes(n) ? r || (s.push(n), r = !0) : s.push(n)), s;
  }, []).length;
}
function A(e) {
  if (typeof e == "string")
    return A({ hand: I(e), calls: [] });
  if (Array.isArray(e))
    return A({ hand: e, calls: [] });
  const r = $(e), t = [...e.hand, ...e.calls.reduce((n, u) => (n.push(...u.tiles), n), [])];
  return K.slice().reduce((n, u) => (t.filter((i) => i === u).length < 4 && n.push(u), n), []).reduce((n, u) => ($({ ...e, hand: [...e.hand, u] }) < r && n.push(u), n), []);
}
function j(e) {
  if (e.length === 0)
    return "";
  const r = e.slice().sort(k);
  let t = "", s = r[0][1], n = [r[0][0]];
  for (let u = 1; u < r.length; u++) {
    const o = r[u][0], i = r[u][1];
    i === s ? n.push(o) : (t += n.join("") + s, s = i, n = [o]);
  }
  return t += n.join("") + s, t;
}
export {
  k as compareTiles,
  K as distinctTiles,
  F as getBlocks,
  $ as getShanten,
  A as getUkeire,
  b as groupIdenticalTiles,
  I as mapTilesFromMPSZFormat,
  j as mapTilesToMPSZFormat,
  P as suitCharacters
};
