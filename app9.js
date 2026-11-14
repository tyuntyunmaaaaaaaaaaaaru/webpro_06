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
  { id:1, genreId:1, name:"XS Project", intro:"2002年に結成された、サンクトペテルブルクのハードバスのプロデューサーユニット。", region:"サンクトペテルブルク（ロシア）", song:"Bochka, Bass, Kolbasyor" },
  { id:2, genreId:1, name:"Hardbass School", intro:"ロシアのハードバスグループ。2010年の「Nash Gimn」でハードバスを広めた。", region:"ロシア", song:"Nash Gimn" },
  { id:3, genreId:1, name:"DJ Blyatman", intro:"スロバキア出身のDJ・プロデューサー。ハードバスを代表する存在の一人。", region:"スロバキア", song:"Gopnik" },
  { id:4, genreId:2, name:"Ploho", intro:"2013年にノヴォシビルスクで結成された、ポストパンクの3人組バンド。", region:"ノヴォシビルスク（ロシア）", song:"Gorod ustal" },
  { id:5, genreId:2, name:"Kino", intro:"1980年代のソ連を代表するポストパンクバンド。後のロシアのバンドに大きな影響を与えた。", region:"レニングラード（ロシア）", song:"Gruppa krovi" },
  { id:6, genreId:2, name:"Grazhdanskaya Oborona", intro:"シベリアのオムスクで結成された、ロシアのパンクロックバンド。", region:"オムスク（ロシア）", song:"Vsyo idyot po planu" },
  { id:7, genreId:3, name:"DJ Gollum", intro:"ドイツのDJ・プロデューサー。1993年ごろからDJとして活動している。", region:"ドイツ", song:"Fairytale Gone Bad" },
  { id:8, genreId:3, name:"Jeckyll & Hyde", intro:"オランダのジャンプスタイルブームを引っ張ったプロジェクト。2007年に「Freefall」で1位を獲得した。", region:"オランダ", song:"Freefall" },
  { id:9, genreId:3, name:"DJ Marcky", intro:"ベルギーを代表するジャンプスタイルDJの一人。", region:"ベルギー", song:"The Force" },
  { id:10, genreId:4, name:"usedcvnt", intro:"TikTokなどで人気になった、ブレイクコア系のプロデューサー。", region:"不明", song:"Wonderfulcore" },
  { id:11, genreId:4, name:"Venetian Snares", intro:"カナダ出身のプロデューサー。2000年代半ばにブレイクコアを広く知らせた。", region:"カナダ", song:"Hajnal" },
  { id:12, genreId:4, name:"Sewerslvt", intro:"オーストラリア出身とされる、ネット発のドラムンベース・ブレイクコアのプロジェクト。", region:"オーストラリア", song:"Cyberia Lyr1" },
];

let song = [
  { id:1, artistId:1, title:"Bochka, Bass, Kolbasyor", url:"https://www.youtube.com/results?search_query=XS+Project+Bochka%2C+Bass%2C+Kolbasyor" },
  { id:2, artistId:1, title:"Russian Army", url:"https://www.youtube.com/results?search_query=XS+Project+Russian+Army" },
  { id:3, artistId:2, title:"Nash Gimn", url:"https://www.youtube.com/results?search_query=Hardbass+School+Nash+Gimn" },
  { id:4, artistId:2, title:"Narkotik Kal", url:"https://www.youtube.com/results?search_query=Hardbass+School+Narkotik+Kal" },
  { id:5, artistId:3, title:"Gopnik", url:"https://www.youtube.com/results?search_query=DJ+Blyatman+Gopnik" },
  { id:6, artistId:3, title:"Cyka Blyat", url:"https://www.youtube.com/results?search_query=DJ+Blyatman+Cyka+Blyat" },
  { id:7, artistId:4, title:"Gorod ustal", url:"https://www.youtube.com/results?search_query=Ploho+Gorod+ustal" },
  { id:8, artistId:4, title:"Magnitofon", url:"https://www.youtube.com/results?search_query=Ploho+Magnitofon" },
  { id:9, artistId:5, title:"Gruppa krovi", url:"https://www.youtube.com/results?search_query=Kino+Gruppa+krovi" },
  { id:10, artistId:5, title:"Zvezda po imeni Solntse", url:"https://www.youtube.com/results?search_query=Kino+Zvezda+po+imeni+Solntse" },
  { id:11, artistId:6, title:"Vsyo idyot po planu", url:"https://www.youtube.com/results?search_query=Grazhdanskaya+Oborona+Vsyo+idyot+po+planu" },
  { id:12, artistId:6, title:"Poganaya molodyozh", url:"https://www.youtube.com/results?search_query=Grazhdanskaya+Oborona+Poganaya+molodyozh" },
  { id:13, artistId:7, title:"Fairytale Gone Bad", url:"https://www.youtube.com/results?search_query=DJ+Gollum+Fairytale+Gone+Bad" },
  { id:14, artistId:7, title:"Only You", url:"https://www.youtube.com/results?search_query=DJ+Gollum+Only+You" },
  { id:15, artistId:8, title:"Freefall", url:"https://www.youtube.com/results?search_query=Jeckyll+%26+Hyde+Freefall" },
  { id:16, artistId:8, title:"Frozen Flame", url:"https://www.youtube.com/results?search_query=Jeckyll+%26+Hyde+Frozen+Flame" },
  { id:17, artistId:9, title:"The Force", url:"https://www.youtube.com/results?search_query=DJ+Marcky+The+Force" },
  { id:18, artistId:9, title:"Vive la France", url:"https://www.youtube.com/results?search_query=DJ+Marcky+Vive+la+France" },
  { id:19, artistId:10, title:"Wonderfulcore", url:"https://www.youtube.com/results?search_query=usedcvnt+Wonderfulcore" },
  { id:20, artistId:10, title:"ultraviolet", url:"https://www.youtube.com/results?search_query=usedcvnt+ultraviolet" },
  { id:21, artistId:11, title:"Hajnal", url:"https://www.youtube.com/results?search_query=Venetian+Snares+Hajnal" },
  { id:22, artistId:11, title:"Szamar Madar", url:"https://www.youtube.com/results?search_query=Venetian+Snares+Szamar+Madar" },
  { id:23, artistId:12, title:"Cyberia Lyr1", url:"https://www.youtube.com/results?search_query=Sewerslvt+Cyberia+Lyr1" },
  { id:24, artistId:12, title:"Newlove", url:"https://www.youtube.com/results?search_query=Sewerslvt+Newlove" },
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
  const list = song.filter(row => row.artistId == detail.id);
  res.render('artist_detail', {number: number, data: detail, songs: list});
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
