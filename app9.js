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

let artist = [
  { id:1, genreId:1, name:"XS Project", region:"サンクトペテルブルク（ロシア）", song:"Bochka, Bass, Kolbasyor" },
  { id:2, genreId:1, name:"Hardbass School", region:"ロシア", song:"Nash Gimn" },
  { id:3, genreId:1, name:"DJ Blyatman", region:"スロバキア", song:"Gopnik" },
  { id:4, genreId:2, name:"Ploho", region:"ノヴォシビルスク（ロシア）", song:"Gorod ustal" },
  { id:5, genreId:2, name:"Kino", region:"レニングラード（ロシア）", song:"Gruppa krovi" },
  { id:6, genreId:2, name:"Grazhdanskaya Oborona", region:"オムスク（ロシア）", song:"Vsyo idyot po planu" },
  { id:7, genreId:3, name:"DJ Gollum", region:"ドイツ", song:"Fairytale Gone Bad" },
  { id:8, genreId:3, name:"Jeckyll & Hyde", region:"オランダ", song:"Freefall" },
  { id:9, genreId:3, name:"DJ Marcky", region:"ベルギー", song:"The Force" },
  { id:10, genreId:4, name:"usedcvnt", region:"不明", song:"Wonderfulcore" },
  { id:11, genreId:4, name:"Venetian Snares", region:"カナダ", song:"Hajnal" },
  { id:12, genreId:4, name:"Sewerslvt", region:"オーストラリア", song:"Cyberia Lyr1" },
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
  let list = artist.map((row, i) => ({number: i, ...row}));
  list = list.filter(row => row.genreId == detail.id);
  res.render('music_detail', {number: number, data: detail, artists: list});
});

app.get("/artist/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = artist[ number ];
  res.render('artist_detail', {number: number, data: detail});
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
