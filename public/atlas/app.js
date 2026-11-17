"use strict";
const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(t)n.textContent=t;return n};
const importedKey = "atlas:github-imports:v1";
const data = [...window.projects];
const graphTokens = new Map();
const { appendGraphify, appendRepositoryGraph, readLocal, saveLocal } = window.graphifyUI;

for (const project of readLocal(importedKey, [])) {
  const existing = data.find(item => item.repo?.toLowerCase() === project.repo.toLowerCase());
  if (existing) existing.github = project.github;
  else data.push(project);
}
function anchor(label,url){const a=el("a",null,label+" ↗");a.href=url;a.target="_blank";a.rel="noopener noreferrer";return a;}
function renderStats(){
$("stats").replaceChildren();
const stats=[["전체",data.length],["공개 확인",data.filter(p=>p.state==="공개 확인").length],["기획",data.filter(p=>p.state==="기획").length],["미확인",data.filter(p=>p.state==="미확인").length]];
for(const [label,num] of stats){let n=el("div","stat");n.append(el("b",null,String(num)),el("span",null,label));$("stats").append(n)}
}
renderStats();
function render(){const q=$("query").value.trim().toLowerCase(),state=$("filter").value;const matches=data.filter(p=>(!state||p.state===state)&&[p.name,p.slug,p.purpose,p.desc,p.version,...p.flow].join(" ").toLowerCase().includes(q));$("results").textContent=matches.length+"개 프로젝트";$("cards").replaceChildren();
for(const p of matches){const card=el("article","card"),head=el("div","head"),icon=el("span","icon",p.icon),title=el("div");icon.setAttribute("aria-hidden","true");title.append(el("h3",null,p.name),el("div","slug",p.slug));head.append(icon,title);const chips=el("div","chips"),stateChip=el("span","chip",p.state);stateChip.dataset.state=p.state;chips.append(stateChip,el("span","chip",p.version||"버전 미확인"));if(p.github?.private)chips.append(el("span","chip","비공개 저장소"));const details=el("details");details.append(el("summary",null,"프로젝트 흐름 · 상세"));if(p.flow.length){const list=el("ol");for(const step of p.flow)list.append(el("li",null,step));details.append(list);}if(p.note)details.append(el("p",null,p.note));if(p.github)appendGitHubMetadata(details,p.github);if(p.repo === "https://github.com/clevekim00/mj_repo_saas"){const graph=$("graphify-template").content.cloneNode(true);appendGraphify(details,graph.querySelector("#graphify-inline"));}else if(p.repo?.startsWith("https://github.com/"))appendRepositoryGraph(details,p.repo,()=>graphTokens.get(p.repo.toLowerCase()));const links=el("div","links");if(p.repo)links.append(anchor("저장소",p.repo));if(p.live)links.append(anchor("공개 페이지",p.live));if(!p.repo&&!p.live)links.append(el("span","slug","링크 미확인"));card.append(head,chips);if(p.purpose)card.append(el("p","purpose",p.purpose));if(p.desc)card.append(el("p","desc",p.desc));card.append(details,links);$("cards").append(card)}
if(!matches.length)$("cards").append(el("p","hint","조건에 맞는 프로젝트가 없어요."));
}
$("query").addEventListener("input",render);$("filter").addEventListener("change",render);render();

function appendGitHubMetadata(details, metadata) {
  const values = [
    metadata.language,
    Number.isInteger(metadata.stars) ? "Star " + metadata.stars : "",
    Number.isInteger(metadata.watchers) ? "Watch " + metadata.watchers : "",
    Number.isInteger(metadata.forks) ? "Fork " + metadata.forks : "",
  ].filter(Boolean);
  if (values.length) details.append(el("p", "github-metadata", values.join(" · ")));
}
