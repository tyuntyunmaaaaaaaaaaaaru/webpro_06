"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

let genre = [
  { id:1, name:"hardbass", country:"ロシア", related:"ガバ，ハードスタイル", artists:3, year:2000 },
  { id:2, name:"Russian Doomer Music", country:"ロシア", related:"ポストパンク，ウェーブ", artists:3, year:2018 },
  { id:3, name:"Jumpstyle", country:"ベルギー", related:"ハードスタイル，テクノ", artists:3, year:2000 },
  { id:4, name:"Breakcore", country:"イギリス", related:"ドラムンベース，ガバ", artists:3, year:1990 },
];

app.get("/music", (req, res) => {
  const q = req.query.q || "";
  const sort = req.query.sort || "id";
  let list = genre.map((row, i) => ({number: i, ...row}));
  if (q !== "") {
    list = list.filter(row => row.name.includes(q));
  }
  if (sort === "year") list.sort((a, b) => a.year - b.year);
  if (sort === "artists") list.sort((a, b) => b.artists - a.artists);
  res.render('music', {data: list, q: q, sort: sort});
});

app.get("/music/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = genre[ number ];
  res.render('music_detail', {number: number, data: detail});
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
