"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

//音楽ーーーーーーーーーー

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

let genre = [
  { id:1, name:"hardbass", country:"ロシア", related:"ガバ，ハードスタイル", artists:3, year:2000 },
  { id:2, name:"Russian Doomer Music", country:"ロシア", related:"ポストパンク，ウェーブ", artists:3, year:2018 },
  { id:3, name:"Jumpstyle", country:"ベルギー", related:"ハードスタイル，テクノ", artists:3, year:2000 },
  { id:4, name:"Breakcore", country:"イギリス", related:"ドラムンベース，ガバ", artists:3, year:1990 },
];

//アーティストーーーーーー

app.get("/music/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = genre[ number ];
  const list = artist.filter(row => row.genreId == detail.id);
  res.render('music_detail', {number: number, data: detail, artists: list});
});

let artist = [
  { id:1, genreId:1, name:"XS Project" },
  { id:2, genreId:1, name:"Hardbass School" },
  { id:3, genreId:1, name:"DJ Blyatman" },
  { id:4, genreId:2, name:"Ploho" },
  { id:5, genreId:2, name:"Kino" },
  { id:6, genreId:2, name:"Grazhdanskaya Oborona" },
  { id:7, genreId:3, name:"DJ Gollum" },
  { id:8, genreId:3, name:"Jeckyll & Hyde" },
  { id:9, genreId:3, name:"DJ Marcky" },
  { id:10, genreId:4, name:"usedcvnt" },
  { id:11, genreId:4, name:"Venetian Snares" },
  { id:12, genreId:4, name:"Sewerslvt" },
];

app.listen(8080, () => console.log("Example app listening on port 8080!"));

//代表曲ーーーーーーーーー