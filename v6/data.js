/* ===== Edit your content here ===== */
const SV=[["film","Filmmaking","Brand films, music videos and documentaries, shot, cut and graded in-house.",["Concept and script","Shoot","Edit and grade","Sound"]],
["design","Graphic Design","Logos, colour and type systems, and packaging that stands out on a shelf.",["Logo","Brand system","Packaging","Social kits"]],
["web","Web Development","Fast, animated sites and stores built to turn visitors into enquiries.",["Design","Build","Online store","Hosting"]],
["app","App Development","Mobile apps with simple onboarding, tracking and payments.",["Prototype","iOS and Android","Payments","Launch"]],
["video","Video Editing","Launch reels and social campaigns cut to music and motion.",["Reels","Ads","Motion graphics","Subtitles"]]];
const PJ=[["Brand film","film","A short brand film shot, cut and graded in-house."],["Logo system","design","A logo, colour and type system built to work everywhere."],["Studio website","web","A fast, animated site that turns visitors into enquiries."],["Fitness app","app","A mobile app with workout tracking and simple onboarding."],["Launch reel","video","A 30-second launch reel cut to music and motion."],["Packaging set","design","Packaging artwork that stands out on a crowded shelf."],["Music video","film","A narrative music video shot over two nights."],["Online store","web","A custom storefront with quick checkout."],["Social campaign","video","Vertical edits and motion posters for a month-long campaign."],["Booking app","app","An app that lets customers book and pay in three taps."]];
/* ================================== */
const PAL=[['#3a2bff','#ff4d6d'],['#ff4d6d','#ffb347'],['#19d3da','#3a2bff'],['#7b2ff7','#ff4d6d'],['#ffb347','#3a2bff']];
const KI={film:0,design:1,web:2,app:3,video:4};
const tagOf=k=>SV[KI[k]][1];
const card=k=>`<div class="art" style="--a:${PAL[KI[k]][0]};--b:${PAL[KI[k]][1]}">${VIS[k]}</div>`;
