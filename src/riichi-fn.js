function A(e, s) {
  const n = e[1], t = s[1];
  if (n < t)
    return -1;
  if (n > t)
    return 1;
  const r = parseInt(e[0]), u = parseInt(s[0]);
  return r < u ? -1 : r > u ? 1 : 0;
}
const M = ["m", "p", "s", "z"], B = M.reduce((e, s) => {
  const n = s === "z" ? 7 : 9;
  for (let t = 1; t <= n; t++)
    e.push(`${t}${s}`);
  return e;
}, []);
function F(e) {
  return e.reduce((s, n) => {
    const t = s.findIndex((r) => r.key === n);
    return t === -1 ? s.push({ key: n, value: [n] }) : s[t].value.push(n), s;
  }, []);
}
function T(e) {
  let s = [];
  return e.split("").reduce((n, t) => (M.includes(t) ? (n.push(...s.map((r) => `${r}${t}`)), s = []) : s.push(t), n), []);
}
function $(e) {
  if (typeof e == "string")
    return $({ hand: T(e), calls: [] });
  if (Array.isArray(e))
    return $({ hand: e, calls: [] });
  const s = e.calls.map((n) => ({ tiles: n.tiles.slice(), ukeire: [] }));
  return F(e.hand).map((n) => n.key).reduce((n, t) => {
    const r = e.hand.slice();
    r.unshift(r.splice(r.findIndex((c) => c === t), 1)[0]);
    const u = r.slice(), o = [
      ...s,
      ...x(u, !0),
      ...k(u, !0)
    ].sort(m);
    o.length !== 0 && !n.some((c) => O(c, o)) && n.push(o);
    const f = r.slice(), i = [
      ...s,
      ...x(f, !1),
      ...k(f, !1)
    ].sort(m);
    return i.length !== 0 && !n.some((c) => O(c, i)) && n.push(i), n;
  }, []);
}
function x(e, s) {
  const n = [];
  let t = 0;
  for (; t < e.length; ) {
    const r = e[t][1], u = parseInt(e[t][0]);
    let o;
    s ? o = [
      ...r !== "z" && u >= 3 ? h(e, r, u - 2) : [],
      ...r !== "z" && u >= 2 ? h(e, r, u - 1) : [],
      ...r !== "z" ? h(e, r, u) : [],
      ...z(e, e[t])
    ] : o = [
      ...z(e, e[t]),
      ...r !== "z" && u >= 3 ? h(e, r, u - 2) : [],
      ...r !== "z" && u >= 2 ? h(e, r, u - 1) : [],
      ...r !== "z" ? h(e, r, u) : []
    ], o.length === 0 ? t++ : n.push(...o);
  }
  return n;
}
function h(e, s, n) {
  const t = e.find((o) => o === `${n}${s}`), r = e.find((o) => o === `${n + 1}${s}`), u = e.find((o) => o === `${n + 2}${s}`);
  return t && r && u ? (e.splice(e.indexOf(t), 1), e.splice(e.indexOf(r), 1), e.splice(e.indexOf(u), 1), [{ tiles: [t, r, u], ukeire: [] }, ...h(e, s, n)]) : [];
}
function z(e, s) {
  const n = e.filter((t) => t === s).slice(0, 3);
  return n.length === 3 ? (n.forEach((t) => e.splice(e.indexOf(t), 1)), [{ tiles: n, ukeire: [] }]) : [];
}
function k(e, s) {
  const n = [];
  let t = 0;
  for (; t < e.length; ) {
    const r = e[t][1], u = parseInt(e[t][0]);
    let o;
    s ? o = [
      ...r !== "z" && u >= 3 ? d(e, r, u - 2) : [],
      ...r !== "z" && u >= 2 ? d(e, r, u - 1) : [],
      ...r !== "z" ? d(e, r, u) : [],
      ...y(e, e[t])
    ] : o = [
      ...y(e, e[t]),
      ...r !== "z" && u >= 3 ? d(e, r, u - 2) : [],
      ...r !== "z" && u >= 2 ? d(e, r, u - 1) : [],
      ...r !== "z" ? d(e, r, u) : []
    ], o.length === 0 ? t++ : n.push(...o);
  }
  return n;
}
function d(e, s, n) {
  if (n > 7)
    return [];
  const t = n, r = n + 1, u = n + 2, o = e.find((a) => a === `${t}${s}`), f = e.find((a) => a === `${r}${s}`), i = e.find((a) => a === `${u}${s}`), c = [], l = [];
  return o != null && f != null && i == null && (t > 1 && l.push(`${t - 1}${s}`), l.push(`${u}${s}`), c.push(o, f)), o != null && f == null && i != null && (l.push(`${r}${s}`), c.push(o, i)), o == null && f != null && i != null && (l.push(`${t}${s}`), u < 9 && l.push(`${u + 1}${s}`), c.push(f, i)), c.length === 2 ? (c.forEach((a) => e.splice(e.indexOf(a), 1)), [{ tiles: c, ukeire: l }, ...d(e, s, n)]) : [];
}
function y(e, s) {
  const n = e.filter((t) => t === s).slice(0, 2);
  return n.length === 2 ? (n.forEach((t) => e.splice(e.indexOf(t), 1)), [{ tiles: n, ukeire: [s] }]) : [];
}
function m(e, s) {
  const n = A(e.tiles[0], s.tiles[0]);
  if (n !== 0)
    return n;
  const t = e.tiles[0] !== e.tiles[1], r = s.tiles[0] !== s.tiles[1];
  return t && !r ? 1 : !t && r || e.tiles.length > s.tiles.length ? -1 : e.tiles.length < s.tiles.length ? 1 : 0;
}
function O(e, s) {
  if (e.length !== s.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (m(e[n], s[n]) !== 0)
      return !1;
  return !0;
}
function p(e) {
  return typeof e == "string" ? p({ hand: T(e), calls: [] }) : Array.isArray(e) ? p({ hand: e, calls: [] }) : e.calls.length > 0 ? S(e) : Math.min(
    S(e),
    C(e),
    K(e)
  );
}
function S(e) {
  return $(e).reduce((n, t) => {
    let r = !1, u = 0, o = 0;
    t.forEach((l) => {
      l.tiles.length >= 3 ? u++ : !r && l.tiles[0] === l.tiles[1] ? r = !0 : o++;
    });
    const f = Math.min(4, u), i = Math.min(4 - u, o), c = 8 - f * 2 - i - (r ? 1 : 0);
    return c < n ? c : n;
  }, 8);
}
function C(e) {
  return 6 - F(e.hand).filter((n) => n.value.length >= 2).length;
}
function K(e) {
  let s = !1;
  return 13 - e.hand.reduce((t, r) => {
    const u = parseInt(r[0]);
    return (r[1] === "z" || u === 1 || u === 9) && (t.includes(r) ? s || (t.push(r), s = !0) : t.push(r)), t;
  }, []).length;
}
function I(e) {
  if (typeof e == "string")
    return I({ hand: T(e), calls: [] });
  if (Array.isArray(e))
    return I({ hand: e, calls: [] });
  const s = p(e);
  return B.reduce((n, t) => (p({ ...e, hand: [...e.hand, t] }) < s && n.push(t), n), []);
}
export {
  A as compareTiles,
  B as distinctTiles,
  $ as getBlocks,
  p as getShanten,
  I as getUkeire,
  F as groupIdenticalTiles,
  T as mapTilesFromMPSZFormat,
  M as suitCharacters
};
