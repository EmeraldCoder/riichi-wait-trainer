function K(e, s) {
  const n = e[1], r = s[1];
  if (n < r)
    return -1;
  if (n > r)
    return 1;
  const t = parseInt(e[0]), u = parseInt(s[0]);
  return t < u ? -1 : t > u ? 1 : 0;
}
const k = ["m", "p", "s", "z"], b = k.reduce((e, s) => {
  const n = s === "z" ? 7 : 9;
  for (let r = 1; r <= n; r++)
    e.push(`${r}${s}`);
  return e;
}, []);
function P(e) {
  return e.reduce((s, n) => {
    const r = s.findIndex((t) => t.key === n);
    return r === -1 ? s.push({ key: n, value: [n] }) : s[r].value.push(n), s;
  }, []);
}
function A(e) {
  let s = [];
  return e.split("").reduce((n, r) => (k.includes(r) ? (n.push(...s.map((t) => `${t}${r}`)), s = []) : s.push(r), n), []);
}
function O(e) {
  if (typeof e == "string")
    return O({ hand: A(e), calls: [] });
  if (Array.isArray(e))
    return O({ hand: e, calls: [] });
  const s = e.calls.map((n) => ({ tiles: n.tiles.slice() }));
  return P(e.hand).map((n) => n.key).reduce((n, r) => {
    const t = e.hand.slice();
    t.unshift(t.splice(t.findIndex((h) => h === r), 1)[0]);
    const u = t.slice(), o = [
      ...s,
      ...T(u, !0),
      ...z(u, !0)
    ].sort(p);
    o.length !== 0 && !n.some((h) => x(h, o)) && n.push(o);
    const c = t.slice(), f = [
      ...s,
      ...$(c, c[0]),
      // give priority to toitsu
      ...T(c, !0),
      ...z(c, !0)
    ].sort(p);
    f.length !== 0 && !n.some((h) => x(h, f)) && n.push(f);
    const l = t.slice(), i = [
      ...s,
      ...T(l, !1),
      ...z(l, !1)
    ].sort(p);
    i.length !== 0 && !n.some((h) => x(h, i)) && n.push(i);
    const m = t.slice(), y = [
      ...s,
      ...$(m, m[0]),
      // give priority to toitsu
      ...T(m, !1),
      ...z(m, !1)
    ].sort(p);
    return y.length !== 0 && !n.some((h) => x(h, y)) && n.push(y), n;
  }, []);
}
function T(e, s) {
  const n = [];
  let r = 0;
  for (; r < e.length; ) {
    const t = e[r][1], u = parseInt(e[r][0]);
    let o;
    s ? o = [
      ...t !== "z" && u >= 3 ? a(e, t, u - 2) : [],
      ...t !== "z" && u >= 2 ? a(e, t, u - 1) : [],
      ...t !== "z" ? a(e, t, u) : [],
      ...F(e, e[r])
    ] : o = [
      ...F(e, e[r]),
      ...t !== "z" && u >= 3 ? a(e, t, u - 2) : [],
      ...t !== "z" && u >= 2 ? a(e, t, u - 1) : [],
      ...t !== "z" ? a(e, t, u) : []
    ], o.length === 0 ? r++ : n.push(...o);
  }
  return n;
}
function a(e, s, n) {
  const r = e.find((o) => o === `${n}${s}`), t = e.find((o) => o === `${n + 1}${s}`), u = e.find((o) => o === `${n + 2}${s}`);
  return r && t && u ? (e.splice(e.indexOf(r), 1), e.splice(e.indexOf(t), 1), e.splice(e.indexOf(u), 1), [{ tiles: [r, t, u] }, ...a(e, s, n)]) : [];
}
function F(e, s) {
  const n = e.filter((r) => r === s).slice(0, 3);
  return n.length === 3 ? (n.forEach((r) => e.splice(e.indexOf(r), 1)), [{ tiles: n }]) : [];
}
function z(e, s) {
  const n = [];
  let r = 0;
  for (; r < e.length; ) {
    const t = e[r][1], u = parseInt(e[r][0]);
    let o;
    s ? o = [
      ...t !== "z" && u >= 3 ? d(e, t, u - 2) : [],
      ...t !== "z" && u >= 2 ? d(e, t, u - 1) : [],
      ...t !== "z" ? d(e, t, u) : [],
      ...$(e, e[r])
    ] : o = [
      ...$(e, e[r]),
      ...t !== "z" && u >= 3 ? d(e, t, u - 2) : [],
      ...t !== "z" && u >= 2 ? d(e, t, u - 1) : [],
      ...t !== "z" ? d(e, t, u) : []
    ], o.length === 0 ? r++ : n.push(...o);
  }
  return n;
}
function d(e, s, n) {
  if (n > 7)
    return [];
  const r = n, t = n + 1, u = n + 2, o = e.find((i) => i === `${r}${s}`), c = e.find((i) => i === `${t}${s}`), f = e.find((i) => i === `${u}${s}`), l = [];
  return o != null && c != null && f == null && l.push(o, c), o != null && c == null && f != null && l.push(o, f), o == null && c != null && f != null && l.push(c, f), l.length === 2 ? (l.forEach((i) => e.splice(e.indexOf(i), 1)), [{ tiles: l }, ...d(e, s, n)]) : [];
}
function $(e, s) {
  const n = e.filter((r) => r === s).slice(0, 2);
  return n.length === 2 ? (n.forEach((r) => e.splice(e.indexOf(r), 1)), [{ tiles: n }]) : [];
}
function p(e, s) {
  const n = K(e.tiles[0], s.tiles[0]);
  if (n !== 0)
    return n;
  const r = e.tiles[0] !== e.tiles[1], t = s.tiles[0] !== s.tiles[1];
  return r && !t ? 1 : !r && t || e.tiles.length > s.tiles.length ? -1 : e.tiles.length < s.tiles.length ? 1 : 0;
}
function x(e, s) {
  if (e.length !== s.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (p(e[n], s[n]) !== 0)
      return !1;
  return !0;
}
function S(e) {
  return typeof e == "string" ? S({ hand: A(e), calls: [] }) : Array.isArray(e) ? S({ hand: e, calls: [] }) : e.calls.length > 0 ? I(e) : Math.min(
    I(e),
    B(e),
    C(e)
  );
}
function I(e) {
  return O(e).reduce((n, r) => {
    let t = !1, u = 0, o = 0;
    r.forEach((i) => {
      i.tiles.length >= 3 ? u++ : !t && i.tiles[0] === i.tiles[1] ? t = !0 : o++;
    });
    const c = Math.min(4, u), f = Math.min(4 - u, o), l = 8 - c * 2 - f - (t ? 1 : 0);
    return l < n ? l : n;
  }, 8);
}
function B(e) {
  return 6 - P(e.hand).filter((n) => n.value.length >= 2).length;
}
function C(e) {
  let s = !1;
  return 13 - e.hand.reduce((r, t) => {
    const u = parseInt(t[0]);
    return (t[1] === "z" || u === 1 || u === 9) && (r.includes(t) ? s || (r.push(t), s = !0) : r.push(t)), r;
  }, []).length;
}
function M(e) {
  if (typeof e == "string")
    return M({ hand: A(e), calls: [] });
  if (Array.isArray(e))
    return M({ hand: e, calls: [] });
  const s = S(e);
  return b.reduce((n, r) => (S({ ...e, hand: [...e.hand, r] }) < s && n.push(r), n), []);
}
export {
  K as compareTiles,
  b as distinctTiles,
  O as getBlocks,
  S as getShanten,
  M as getUkeire,
  P as groupIdenticalTiles,
  A as mapTilesFromMPSZFormat,
  k as suitCharacters
};
