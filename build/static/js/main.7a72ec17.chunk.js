(this.webpackJsonpciter=this.webpackJsonpciter||[]).push([[0],{143:function(e,t,a){},145:function(e,t,a){"use strict";a.r(t);var n=a(3),r=a(1),i=a.n(r),o=a(72),s=a.n(o),c=a(49),l=a(23),p=a(73),d=a(56),h=a(55),u=a(15),b=a.n(u),f=a(31),m=a(40),j=a(41),x=a(4),v=a(222),g=a(81),y=a(99),O=a(223),k=a(225),w=a(231),S=a(217),C=a(211),L=a(224),P=a(77),_=a(206),R=a(59),M=a(216),A=a(78),I=a(118),T=a(226),N=a(227),B=a(7),K=a(221),E=a(34),D=a(194),F=a(208),W=a(32),H=a(9),G=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var r;Object(m.a)(this,a),(r=t.call(this,e))._onColumnClick=function(e,t){var a=r.state.columns,n=r.props.items,i=a.slice(),o=i.filter((function(e){return t.key===e.key}))[0];i.forEach((function(e){e===o?(o.isSortedDescending=!o.isSortedDescending,o.isSorted=!0,r.setState({announcedMessage:"".concat(o.name," is sorted ").concat(o.isSortedDescending?"descending":"ascending")})):(e.isSorted=!1,e.isSortedDescending=!0)}));var s=function(e,t,a){var n=t;return e.slice(0).sort((function(e,t){return(a?e[n]<t[n]:e[n]>t[n])?1:-1}))}(n,o.fieldName,o.isSortedDescending);r.setState({columns:i,items:s})};var i=r.props,o=i.onSelectSingle,s=i.selectedKey,c=[{key:"column1",name:"Relevance",fieldName:"relevance",minWidth:30,maxWidth:50,isSorted:!0,isSortedDescending:!0,onColumnClick:r._onColumnClick,onRender:function(e){return Object(n.jsx)("span",{children:(100*e.relevance).toFixed(2)+"%"})},data:"string",isPadded:!0},{key:"column2",name:"Name",fieldName:"name",maxWidth:350,sortAscendingAriaLabel:"Sorted A to Z",sortDescendingAriaLabel:"Sorted Z to A",onColumnClick:r._onColumnClick,data:"string",isPadded:!0,isMultiline:!0},{key:"column3",name:"Author/Year",fieldName:"authors",minWidth:75,maxWidth:150,onColumnClick:r._onColumnClick,data:"string",onRender:function(e){return Object(n.jsxs)("span",{children:[e.authors," (",e.year,")"]})},isPadded:!0,isMultiline:!0}];return r._selection=new D.a({onSelectionChanged:function(){1===r._selection.getSelectedCount()&&o(r._selection.getSelection()[0])}}),r.state={announcedMessage:null,columns:c,selectedItem:null,isModalSelection:!1,isCompactMode:!1},r._selection.selectToKey(s,!0),r}return Object(j.a)(a,[{key:"render",value:function(){var e=this.state.columns,t=this.props,a=t.items,r=t.isLoading;return Object(n.jsx)(F.a,{items:a,enableShimmer:r||0===a.length,compact:!1,onColumnClick:this._onColumnClick,columns:e,selectionMode:W.b.single,getKey:this._getKey,setKey:"multiple",layoutMode:H.e.fixedColumns,isHeaderVisible:!0,selection:this._selection,selectionPreservedOnEmptyClick:!0,enterModalSelectionOnTouch:!0,ariaLabelForSelectionColumn:"Toggle selection",ariaLabelForSelectAllCheckbox:"Toggle selection for all items",checkButtonAriaLabel:"Row checkbox"})}},{key:"_getKey",value:function(e,t){return e?e.key:t}}]),a}(r.Component);var z,U=a(64),Y=a(122),J=a(27),q=a(204),V=a(123),X=a(219),Z=a.p+"static/media/potato.b60e5447.svg",Q=Object(x.x)({relative:{position:"relative"},abstract:(z={"-moz-osx-font-smoothing":"grayscale","-webkit-font-smoothing":"antialiased !important","-moz-font-smoothing":"antialiased !important","text-rendering":"optimizelegibility !important","letter-spacing":".03em","line-height":"1.25em","font-weight":"400","font-size":"1rem"},Object(U.a)(z,"line-height","1.8"),Object(U.a)(z,"text-align","justify"),z)}),$=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(){return Object(m.a)(this,a),t.apply(this,arguments)}return Object(j.a)(a,[{key:"customElements",value:function(){return Object(n.jsx)(Y.a,{flexWrap:!0,style:!0,width:"100%",shimmerElements:[{type:J.a.line},{type:J.a.line},{type:J.a.line},{type:J.a.line},{type:J.a.line}]})}},{key:"render",value:function(){var e=this.props,t=e.selectedPaper,a=e.onPaperAction,r=e.isLoading;return t?Object(n.jsxs)(v.a,{style:{position:"relative",height:"100%"},tokens:{childrenGap:5},children:[Object(n.jsxs)(v.a,{horizontal:!0,horizontalAlign:"space-evenly",tokens:{childrenGap:5},children:[t.inList!==je&&Object(n.jsx)(q.a,{text:"Back to Pool",iconProps:{iconName:"RevToggleKey"},onClick:function(){a(t,"move-to-result")}}),t.inList!==xe&&Object(n.jsx)(q.a,{text:"Mark relevant",iconProps:{iconName:"Accept"},onClick:function(){a(t,"move-to-relevant")}}),t.inList!==ve&&Object(n.jsx)(V.a,{text:"Mark not relevant",iconProps:{iconName:"StatusCircleErrorX"},onClick:function(){a(t,"move-to-not-relevant")}})]}),Object(n.jsx)(y.a,{grow:!0,className:Q.relative,children:Object(n.jsx)(L.a,{scrollbarVisibility:P.b.auto,children:Object(n.jsxs)(v.a,{tokens:{childrenGap:5},children:[Object(n.jsx)(X.a,{shimmerElements:[{type:J.a.line,height:22}],width:"80%",isDataLoaded:!r,children:Object(n.jsx)(O.a,{style:{fontWeight:x.d.semibold},variant:"mediumPlus",id:"selectedPaperTitle",children:t.name})}),Object(n.jsx)(X.a,{shimmerElements:[{type:J.a.line,width:"15%"},{type:J.a.gap,width:10},{type:J.a.line,width:"80%"}],width:"60%",isDataLoaded:!r,children:Object(n.jsxs)(O.a,{children:[Object(n.jsxs)(O.a,{style:{fontWeight:x.d.semibold},children:["Authors:"," "]}),t.authors]})}),Object(n.jsx)(X.a,{isDataLoaded:!r,shimmerElements:[{type:J.a.line,width:"5%"},{type:J.a.gap,width:10},{type:J.a.line,width:"90%"}],children:Object(n.jsxs)(O.a,{children:[Object(n.jsx)(O.a,{style:{fontWeight:x.d.semibold},children:"In: "})," ",t.publication]})}),Object(n.jsx)(X.a,{customElementsGroup:this.customElements(),isDataLoaded:!r,children:Object(n.jsx)(O.a,{className:Q.abstract,children:t.abstract})}),Object(n.jsxs)(X.a,{customElementsGroup:this.customElements(),isDataLoaded:!r,children:[Object(n.jsxs)(v.a,{horizontal:!0,horizontalAlign:"space-between",tokens:{childrenGap:5},children:[Object(n.jsxs)(O.a,{children:[Object(n.jsxs)(O.a,{style:{fontWeight:x.d.semibold},children:["Year:"," "]})," ",t.year]}),Object(n.jsxs)(O.a,{children:[Object(n.jsxs)(O.a,{style:{fontWeight:x.d.semibold},children:["Type:"," "]})," ",t.type]}),Object(n.jsxs)(O.a,{children:[Object(n.jsxs)(O.a,{style:{fontWeight:x.d.semibold},children:["DOI:"," "]}),Object(n.jsx)(K.a,{target:"_blank",href:t.abstractlink,children:t.doi})]})]}),Object(n.jsxs)(v.a,{horizontal:!0,horizontalAlign:"space-between",tokens:{childrenGap:10},children:[Object(n.jsxs)(O.a,{children:[Object(n.jsxs)(O.a,{style:{fontWeight:x.d.semibold},children:["Score:"," "]}),(100*t.relevance).toFixed(2)+"%"]}),Object(n.jsxs)(O.a,{children:[Object(n.jsxs)(O.a,{style:{fontWeight:x.d.semibold},children:["#CitedBy:"," "]})," ",t.citedByCount]}),Object(n.jsxs)(O.a,{children:[Object(n.jsxs)(O.a,{style:{fontWeight:x.d.semibold},children:["#References:"," "]})," ",t.refs.length]})]})]})]})})})]}):Object(n.jsxs)(v.a,{className:Q.abstract,children:[Object(n.jsx)(O.a,{children:"Howdy, Partner!"}),Object(n.jsxs)(O.a,{children:["This website helps you discover exciting new papers in three easy steps:",Object(n.jsxs)("ol",{children:[Object(n.jsx)("li",{children:"To get started, use the search box above to run a search query on Scopus."}),Object(n.jsx)("li",{children:'Based on the results, a relevance score is calculated for each paper - based on bibliometric data (i.e., co-citation & bibliometric coupling). The paper with the highest relevance score will be presented to you in this box. It is, then, your task to mark the paper as "relevant" or "not relevant" using the buttons that will be placed above the paper. Your input will automatically move the paper to the according list on the right side of this page. When a paper is marked "relevant", a forward-backward-search is run, the citing and cited papers are added to the Paper Pool, and the relevance score for each paper is updated.'}),Object(n.jsx)("li",{children:'If you have identified enough papers or if our suggestions do not contain any more relevant papers, use the "To Citavi" function to export your results.'})]})]}),Object(n.jsx)(g.a,{style:{margin:"0 auto"},src:Z,height:120})]})}}]),a}(r.Component),ee=a.p+"static/media/header.56f2f34e.jpg",te=(a(143),a(214)),ae=a(213),ne=Object(x.u)();function re(e){var t=e.isOpen,a=e.onClose,r=e.apiKey,i=e.onApiKeyChange,o=e.onClearCache;return Object(n.jsxs)(te.a,{isOpen:t,isBlocking:!1,containerClassName:ie.container,children:[Object(n.jsxs)("div",{className:ie.header,children:[Object(n.jsx)(O.a,{children:"Welcome to Potatosearch"}),Object(n.jsx)(w.a,{styles:oe,iconProps:{iconName:"Cancel"},ariaLabel:"Close popup modal",onClick:a})]}),Object(n.jsx)("div",{className:ie.body,children:Object(n.jsxs)(v.a,{tokens:{childrenGap:5},children:[Object(n.jsx)(O.a,{variant:"mediumPlus",children:"This website helps to discover exciting new papers in three easy steps:"}),Object(n.jsx)(O.a,{children:Object(n.jsxs)("ol",{children:[Object(n.jsx)("li",{children:"To get started, use the search box above to start a search query on Scopus."}),Object(n.jsx)("li",{children:"Based on the results, we suggest relevant papers on the left, which you can mark as relevant or irrelevant using the buttons at the top. Your vote will automatically move the paper to the lists on the right side of the page. Based on the papers you rated as relevant, we will suggest new papers to rate. For this purpose, we use bibliometric data (i.e., co-citation & bibliometric coupling) to find papers that have a particularly high overlap with your selection."}),Object(n.jsx)("li",{children:"If you have identified enough papers or if our suggestions do not contain any more relevant papers, use the download function in the header to export your results as a list."})]})}),Object(n.jsx)(O.a,{variant:"mediumPlus",children:"Before you start: Please provide your Scopus API-Key:"}),Object(n.jsx)(K.a,{href:"https://github.com/dtdi/citetool/wiki/API-Key",target:"_blank",children:"Read here, how to obtain and configure your api key."}),Object(n.jsxs)(v.a,{horizontal:!0,verticalAlign:"end",tokens:{childrenGap:10},children:[Object(n.jsx)(ae.a,{label:"Provide in your API Code",style:{width:300},value:r,onChange:i}),Object(n.jsx)(q.a,{onClick:a,children:"Save"}),Object(n.jsx)(V.a,{onClick:o,children:"Clear Cache"})]})]})})]})}var ie=Object(x.x)({container:{display:"flex",flexFlow:"column nowrap",alignItems:"stretch",width:"1000px",maxWidth:"100%"},header:[ne.fonts.xLarge,{flex:"1 1 auto",borderTop:"4px solid ".concat(ne.palette.themePrimary),color:ne.palette.neutralPrimary,display:"flex",alignItems:"center",fontWeight:x.d.semibold,padding:"12px 12px 14px 24px"}],body:{flex:"4 4 auto",padding:"0 24px 24px 24px",overflowY:"hidden"}}),oe={root:{color:ne.palette.neutralPrimary,marginLeft:"auto",marginTop:"4px",marginRight:"2px"},rootHovered:{color:ne.palette.neutralDark}},se=Object(x.u)();function ce(e){var t=e.isOpen,a=e.onClose,r=e.onLoadFile;return Object(n.jsxs)(te.a,{isOpen:t,isBlocking:!1,containerClassName:le.container,children:[Object(n.jsxs)("div",{className:le.header,children:[Object(n.jsx)(O.a,{children:"Load your Data"}),Object(n.jsx)(w.a,{styles:pe,iconProps:{iconName:"Cancel"},ariaLabel:"Close popup modal",onClick:a})]}),Object(n.jsx)("div",{className:le.body,children:Object(n.jsxs)(v.a,{tokens:{childrenGap:5},children:[Object(n.jsx)(O.a,{variant:"mediumPlus",children:"Load data from a PotatoSeachData.json File. Make sure to save your current data before loading a file as the loading process will reset all tables"}),Object(n.jsx)(v.a,{vertical:!0,verticalAlign:"end",tokens:{childrenGap:10},children:Object(n.jsx)("input",{type:"file",id:"file",name:"file",style:{width:400},onChange:r})})]})})]})}var le=Object(x.x)({container:{display:"flex",flexFlow:"column nowrap",alignItems:"stretch",width:"1000px",maxWidth:"100%"},header:[se.fonts.xLarge,{flex:"1 1 auto",borderTop:"4px solid ".concat(se.palette.themePrimary),color:se.palette.neutralPrimary,display:"flex",alignItems:"center",fontWeight:x.d.semibold,padding:"12px 12px 14px 24px"}],body:{flex:"4 4 auto",padding:"0 24px 24px 24px",overflowY:"hidden"}}),pe={root:{color:se.palette.neutralPrimary,marginLeft:"auto",marginTop:"4px",marginRight:"2px"},rootHovered:{color:se.palette.neutralDark}},de=Object(x.u)();function he(e){var t=e.isOpen,a=e.onClose;return Object(n.jsxs)(te.a,{isOpen:t,isBlocking:!1,containerClassName:ue.container,children:[Object(n.jsxs)("div",{className:ue.header,children:[Object(n.jsx)(O.a,{children:"About Potatosearch"}),Object(n.jsx)(w.a,{styles:be,iconProps:{iconName:"Cancel"},ariaLabel:"Close popup modal",onClick:a})]}),Object(n.jsx)("div",{className:ue.body,children:Object(n.jsxs)(v.a,{tokens:{childrenGap:5},children:[Object(n.jsxs)(O.a,{children:["This website helps to discover exciting new papers. Source Code can be found at"," ",Object(n.jsx)(K.a,{href:"https://github.com/dtdi/citetool",children:"https://github.com/dtdi/citetool"}),"."]}),Object(n.jsxs)(O.a,{children:["Potatosearch makes heavy use of the"," ",Object(n.jsx)(K.a,{href:"https://www.semanticscholar.org/?utm_source=api",children:"SemanticScholar API"}),"."]}),Object(n.jsxs)(O.a,{children:["Potato Icon made by"," ",Object(n.jsx)(K.a,{href:"https://www.flaticon.com/authors/good-ware",title:"Good Ware",children:"Good Ware"})," ","from"," ",Object(n.jsx)(K.a,{href:"https://www.flaticon.com/",title:"Flaticon",children:"www.flaticon.com"})]})]})})]})}var ue=Object(x.x)({container:{display:"flex",flexFlow:"column nowrap",alignItems:"stretch",width:"1000px",maxWidth:"100%"},header:[de.fonts.xLarge,{flex:"1 1 auto",borderTop:"4px solid ".concat(de.palette.themePrimary),color:de.palette.neutralPrimary,display:"flex",alignItems:"center",fontWeight:x.d.semibold,padding:"12px 12px 14px 24px"}],body:{flex:"4 4 auto",padding:"0 24px 24px 24px",overflowY:"hidden"}}),be={root:{color:de.palette.neutralPrimary,marginLeft:"auto",marginTop:"4px",marginRight:"2px"},rootHovered:{color:de.palette.neutralDark}},fe=Object(x.u)(),me=Object(x.x)({paperFrame:{width:"45vw",padding:20,background:fe.palette.white,position:"relative",height:"100%","box-sizing":"border-box"},searchBar:{background:fe.palette.white}}),je="result",xe="relevant",ve="not-relevant",ge=function(){function e(){Object(m.a)(this,e),this.prefix="paper_"}return Object(j.a)(e,[{key:"_getKey",value:function(e){return this.prefix+encodeURIComponent(e)}},{key:"getOrLoad",value:function(){var e=Object(f.a)(b.a.mark((function e(t,a,n){var r,i,o,s,c,l;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=this._getKey(t),e.next=3,Object(E.c)(r);case 3:if(!(i=e.sent)){e.next=8;break}return e.abrupt("return",i);case 8:return e.prev=8,e.next=11,fetch("https://api.semanticscholar.org/v1/paper/".concat(t,"?include_unknown_references=true"),{signal:n});case 11:o=e.sent,e.next=22;break;case 14:if(e.prev=14,e.t0=e.catch(8),!(e.t0 instanceof TypeError)){e.next=21;break}throw a.abort(),e.t0;case 21:throw e.t0;case 22:if(o.ok){e.next=34;break}if(404!==o.status){e.next=32;break}return e.next=26,o.json();case 26:return s=e.sent,Object(E.d)(r,s),console.log(404),e.abrupt("return",s);case 32:throw c="An error has occured: ".concat(o.status),new Error(c);case 34:return e.next=36,o.json();case 36:l=e.sent,e.prev=37,Object(E.d)(r,l),e.next=45;break;case 41:throw e.prev=41,e.t1=e.catch(37),"Unknown error",new Error("Unknown error",e.t1);case 45:return e.abrupt("return",l);case 46:case"end":return e.stop()}}),e,this,[[8,14],[37,41]])})));return function(t,a,n){return e.apply(this,arguments)}}()},{key:"remove",value:function(e){Object(E.b)(this._getKey(e))}}]),e}(),ye=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).onSelectSingle=function(){var e=Object(f.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.setState({selectedPaper:t});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.onClearCache=function(){var e=Object(f.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Object(E.a)();case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.loadSemScholar=function(){var e=Object(f.a)(b.a.mark((function e(t,a,n){var r,i;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=new ge,e.prev=1,e.next=4,r.getOrLoad(t,a,n);case 4:return i=e.sent,e.abrupt("return",i);case 8:e.prev=8,e.t0=e.catch(1),console.log("resource exhausted",e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t,a,n){return e.apply(this,arguments)}}(),n.onLoadData=function(){var e=Object(f.a)(b.a.mark((function e(t){var a,r,i,o,s,c,p,d,h,u,f,m,j,x;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.setState({isLoading:!0,selectedPaper:null,searchString:t}),a=n.state.apiKey,r=encodeURIComponent(t),i=25,o=25,s=0,c="relevancy",h=0;case 8:return e.prev=8,e.next=11,fetch("https://api.elsevier.com/content/search/scopus?apiKey=".concat(a,"&query=").concat(r,"&count=").concat(i,"&start=").concat(s,"&sort=").concat(c));case 11:if((u=e.sent).ok){e.next=24;break}if(f="",400!==u.status){e.next=21;break}return e.next=17,u.json();case 17:m=e.sent,f="An error has occured (".concat(u.status,") ").concat(m["service-error"].status.statusCode,": ").concat(m["service-error"].status.statusText),e.next=22;break;case 21:f="An error has occured (".concat(u.status,")");case 22:return p={isLoading:!1,apiError:f},e.abrupt("break",44);case 24:return e.next=26,u.json();case 26:if(j=e.sent,d){e.next=35;break}if(d=j,0!==(h=Number(d["search-results"]["opensearch:totalResults"]))){e.next=33;break}return p={isLoading:!1,paperList:[],apiError:"Search did not return any results"},e.abrupt("break",44);case 33:e.next=36;break;case 35:(x=d["search-results"].entry).push.apply(x,Object(l.a)(j["search-results"].entry));case 36:e.next=42;break;case 38:return e.prev=38,e.t0=e.catch(8),p={isLoading:!1,apiError:e.t0.message},e.abrupt("break",44);case 42:s+=i;case 43:if(s<o&&s<=h){e.next=8;break}case 44:if(!p){e.next=47;break}return n.setState({errorState:p}),e.abrupt("return");case 47:return e.next=49,Object(E.d)("lastSearch",{searchString:n.state.searchString,result:d});case 49:return e.next=51,n.processSearchResults(d);case 51:n.setState({isLoading:!1});case 52:case"end":return e.stop()}}),e,null,[[8,38]])})));return function(t){return e.apply(this,arguments)}}(),n.handleTabLinkClick=function(e){n.setState({selectedTabId:e.props.itemKey})},n.onPaperAction=function(){var e=Object(f.a)(b.a.mark((function e(t,a){var r,i;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=n.state.paperList,n.setState({isLoading:!0}),i=r.filter((function(e){return"remove-paper"!==a||t.key!==e.key})).map((function(e){return e.key===t.key?("move-to-result"===a?t.inList=je:"move-to-relevant"===a?t.inList=xe:"move-to-not-relevant"===a&&(t.inList=ve),Object(c.a)(Object(c.a)({},e),t)):e})),"move-to-relevant"!==a){e.next=8;break}return t.refs.forEach((function(e){var a=i.find((function(t){return t.doi===e.doi}));a?a.inBatch.push(t.doi):i.push({key:e.doi||e.paperId,name:e.title,abstract:null,refs:[],cites:[],raw:{},ids:[],authors:e.authors?e.authors.map((function(e){return e.name})).join(", "):"",publication:e.venue,year:e.year,doi:e.doi,type:null,citedByCount:null,inBatch:[t.doi],inList:je})})),e.next=7,n.loadSemScholarForMany(i);case 7:i=e.sent;case 8:i=n.getPaperScores(i).sort((function(e,t){return t.relevance-e.relevance})),n.setState({paperList:i,isLoading:!1}),n.onSelectSingle(i.find((function(e){return e.inList===je})));case 11:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),n.onToCitavi=function(){var e=n.state.relevantList,t="";e.forEach((function(e){t+=e.doi+"\n"}));var a=new Blob([t],{type:"text/plain"}),r=document.createElement("a");r.download="PotatoSearch2Citavi.txt",r.href=(window.webkitURL||window.URL).createObjectURL(a),r.dataset.downloadurl=["text/plain",r.download,r.href].join(":"),r.click()},n.onSave=function(){var e=Object(p.a)(n).state,t=JSON.stringify(e),a=new Blob([t],{type:"text/plain"}),r=document.createElement("a");r.download="PotatoSearchData.json",r.href=(window.webkitURL||window.URL).createObjectURL(a),r.dataset.downloadurl=["text/plain",r.download,r.href].join(":"),r.click()},n.onLoadFileOpenClose=function(){var e=n.state.isLoadFileModalOpen;n.setState({isLoadFileModalOpen:!e})},n.onInfoModalClose=function(){var e=n.state.isInfoModalOpen;n.setState({isInfoModalOpen:!e})},n.onSettingsOpenClose=function(){var e=n.state,t=e.isApiKeyModalOpen,a=e.apiKey;if(a)Object(E.d)("apiKey",a),n.setState({isApiKeyModalOpen:!t});else{n.setState("api key not provided.")}},n.onApiKeyChange=function(e,t){n.setState({apiKey:t})},n.onLoadFile=function(e){var t=e.target.files,a=new FileReader;a.onload=function(e){var t=a.result,r=JSON.parse(t);n.setState(r)},a.readAsText(t[0])},n.closeMessageBar=function(e){n.setState({apiError:null})},n.toggleSearchHelper=function(e){n.setState({isSearchHelper:!n.state.isSearchHelper})},n.clearSearch=function(){var e=Object(f.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(E.b)("lastSearch");case 2:n.setState({paperList:[],selectedPaper:null,isSearchHelper:!1,searchResultsList:[],relevantList:[],notRelevantList:[],selectedTabId:"searchResultsList",isLoading:!1});case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.listRef=i.a.createRef(),n.state={paperList:[],selectedPaper:null,isSearchHelper:!1,searchResultsList:[],relevantList:[],notRelevantList:[],selectedTabId:"searchResultsList",apiKey:"",fileLocation:"",isApiKeyModalOpen:!1,isLoadFileModalOpen:!1,isInfoModalOpen:!1,isLoading:!1,searchString:'TITLE("digital innovation" AND "literature review")'},n}return Object(j.a)(a,[{key:"componentDidMount",value:function(){var e=Object(f.a)(b.a.mark((function e(){var t,a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(E.c)("lastSearch");case 2:return t=e.sent,e.next=5,Object(E.c)("apiKey");case 5:if((a=e.sent)?this.setState({apiKey:a}):this.setState({isApiKeyModalOpen:!0}),!t){e.next=12;break}return this.setState({isLoading:!0,searchString:t.searchString}),e.next=11,this.processSearchResults(t.result);case 11:this.setState({isLoading:!1});case 12:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"_filterPapers",value:function(e){return this.state.paperList.filter((function(t){return t.inList===e}))}},{key:"componentDidUpdate",value:function(e,t){t.paperList!==this.state.paperList&&this.setState({searchResultsList:this._filterPapers(je),relevantList:this._filterPapers(xe),notRelevantList:this._filterPapers(ve)})}},{key:"render",value:function(){var e,t=this.state,a=t.selectedPaper,r=t.searchResultsList,i=t.searchString,o=t.isSearchHelper,s=t.relevantList,c=t.notRelevantList,l=t.selectedTabId,p=t.isApiKeyModalOpen,d=t.isLoadFileModalOpen,h=t.isInfoModalOpen,u=t.apiKey,b=t.fileLocation,f=t.isLoading,m=t.apiError;switch(l){case"searchResultsList":e=r;break;case"relevantList":e=s;break;case"notRelevantList":e=c;break;default:e=r}var j=[{key:"load",text:"Load File",disabled:!1,iconProps:{iconName:"Import"},onClick:this.onLoadFileOpenClose},{key:"save",text:"Save",disabled:!1,iconProps:{iconName:"Save"},onClick:this.onSave},{key:"toCitavi",text:"To Citavi",disabled:!1,iconProps:{iconName:"Share"},onClick:this.onToCitavi}],x=[{key:"settings",text:"Help & Settings",ariaLabel:"Help & Settings",iconOnly:!0,iconProps:{iconName:"Settings"},onClick:this.onSettingsOpenClose},{key:"info",text:"Info",ariaLabel:"Info",iconOnly:!0,iconProps:{iconName:"Info"},onClick:this.onInfoModalClose}];return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(re,{isOpen:p,apiKey:u,onClearCache:this.onClearCache,onApiKeyChange:this.onApiKeyChange,onClose:this.onSettingsOpenClose}),Object(n.jsx)(ce,{isOpen:d,fileLocation:b,onLoadFile:this.onLoadFile,onClose:this.onLoadFileOpenClose}),Object(n.jsx)(he,{isOpen:h,onClose:this.onInfoModalClose}),Object(n.jsxs)(v.a,{style:{height:"100vh"},tokens:{padding:20,childrenGap:20},children:[Object(n.jsxs)(v.a,{horizontal:!0,horizontalAlign:"space-around",verticalAlign:"center",tokens:{childrenGap:20},className:me.searchBar,children:[Object(n.jsx)(g.a,{className:"header",src:ee,alt:"Header"}),Object(n.jsx)(y.a,{children:Object(n.jsxs)(v.a,{horizontal:!0,tokens:{childrenGap:10},horizontalAlign:"center",children:[Object(n.jsx)(g.a,{className:"logo",style:{width:28},src:Z,alt:"Potato Search"}),Object(n.jsx)(O.a,{style:{fontWeight:"bolder"},children:"Potato Search"})]})}),Object(n.jsx)(y.a,{children:Object(n.jsxs)(v.a,{horizontal:!0,children:[Object(n.jsx)(k.a,{styles:{root:{width:400}},placeholder:"Search",id:"searchBox",onSearch:this.onLoadData,value:i}),Object(n.jsx)(w.a,{iconProps:{iconName:"Delete"},title:"Clear all lists",id:"clearSearch",ariaLabel:"Help",onClick:this.clearSearch}),Object(n.jsx)(w.a,{iconProps:{iconName:"Help"},title:"Help",id:"searchHelpButton",ariaLabel:"Help",onClick:this.toggleSearchHelper}),o&&Object(n.jsx)(S.a,{target:"#searchHelpButton",hasCloseButton:!0,closeButtonAriaLabel:"Close",primaryButtonProps:{children:"Explore Search Tips",target:"_blank",href:"http://schema.elsevier.com/dtds/document/bkapi/search/SCOPUSSearchTips.htm"},onDismiss:this.toggleSearchHelper,headline:"SCOPUS Search Tips",children:'SCOPUS Search API supports a Boolean syntax, which is a type of search allowing users to combine keywords with operators such as AND, NOT and OR to further produce more relevant results. For example, a Boolean search could be "heart" AND "brain". This would limit the search results to only those documents containing the two keywords.'})]})}),Object(n.jsx)(C.a,{items:j,overflowItems:[],overflowButtonProps:{ariaLabel:"More Comands"},farItems:x,ariaLabel:"Use left and right arrow keys to navigate between commands"})]}),Object(n.jsx)(y.a,{grow:!0,children:Object(n.jsx)(v.a,{style:{height:"100%"},tokens:{childrenGap:5},children:Object(n.jsxs)(v.a,{horizontal:!0,style:{height:"100%"},horizontalAlign:"space-evenly",tokens:{childrenGap:10},children:[Object(n.jsx)(y.a,{className:me.paperFrame,children:Object(n.jsx)($,{isLoading:f,selectedPaper:a,onPaperAction:this.onPaperAction})}),Object(n.jsx)(y.a,{grow:2,className:me.paperFrame,children:Object(n.jsxs)(L.a,{scrollbarVisibility:P.b.auto,children:[Object(n.jsx)(_.a,{stickyPosition:R.a.Header,children:Object(n.jsxs)(v.a,{tokens:{padding:"15px 15px 0",childrenGap:5},children:[Object(n.jsxs)(M.a,{selectedKey:l,onLinkClick:this.handleTabLinkClick,headersOnly:!0,linkFormat:A.a.tabs,children:[Object(n.jsx)(I.a,{itemKey:"searchResultsList",itemIcon:"AllApps",headerText:"Paper Pool",itemCount:r.length}),Object(n.jsx)(I.a,{itemKey:"relevantList",itemIcon:"Accept",headerText:"Relevant Paper",itemCount:s.length}),Object(n.jsx)(I.a,{itemKey:"notRelevantList",itemIcon:"StatusCircleErrorX",headerText:"Not Relevant",itemCount:c.length})]}),f&&Object(n.jsx)(T.a,{label:"We're Loading",description:"Lots of data from semantic Scholar"}),m&&Object(n.jsxs)(N.a,{messageBarType:B.a.error,isMultiline:!1,onDismiss:this.closeMessageBar,dismissButtonAriaLabel:"Close",children:[m,Object(n.jsx)(K.a,{href:"https://github.com/dtdi/citetool/wiki/API-Key",target:"_blank",children:"Did you provide your API Key?"})]})]})}),Object(n.jsx)(v.a,{style:{padding:15},children:Object(n.jsx)(G,{items:e,selectedKey:a&&a.key,isLoading:f,ref:this.listRef,onSelectSingle:this.onSelectSingle})})]})})]})})})]})]})}},{key:"loadSemScholarForMany",value:function(){var e=Object(f.a)(b.a.mark((function e(t){var a,n,r=this;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=new AbortController,n=a.signal,e.next=4,Promise.all(t.map(function(){var e=Object(f.a)(b.a.mark((function e(t){var i,o,s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.loadSemScholar(t.doi,a,n);case 2:if(i=e.sent){e.next=5;break}return e.abrupt("return",t);case 5:return o={abstract:i.abstract,abstractlink:t.abstractlink||i.url,refs:i.references||[],cites:i.citations||[],authors:i.authors?i.authors.map((function(e){return e.name})).join(", "):t.authors,ids:i.references?i.references.map((function(e){return e.doi||e.paperId})):[]},(s=Object(c.a)(Object(c.a)({},t),o)).raw.semScholar=i,e.abrupt("return",s);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 4:return t=e.sent,e.abrupt("return",t);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"processSearchResults",value:function(){var e=Object(f.a)(b.a.mark((function e(t){var a,n,r,i,o,s,c=this;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=[],t&&t["search-results"]){e.next=3;break}return e.abrupt("return");case 3:return r=t["search-results"],i=r["opensearch:Query"]["@searchTerms"],o=r.entry,s=this.state.paperList,o.forEach((function(e){if(!s.some((function(t){return t.doi===e["prism:doi"]}))){var t="test";e.link.forEach((function(e){"scopus"===e["@ref"]&&(t=e["@href"])})),n.push({key:e["prism:doi"]||e["dc:identifier"],name:e["dc:title"],abstractlink:t,abstract:null,refs:[],cites:[],ids:[],authors:e["dc:creator"],publication:"".concat(e["prism:publicationName"]," ").concat(e["prism:volume"]),year:e["prism:coverDate"].substr(0,4),doi:e["prism:doi"],type:e.subtypeDescription,citedByCount:e["citedby-count"],inBatch:[c.state.searchString],raw:{scopusEntry:e,semScholar:null},inList:je})}})),e.next=10,this.loadSemScholarForMany(n);case 10:n=e.sent,(a=n).push.apply(a,Object(l.a)(s)),n=(n=this.getPaperScores(n)).sort((function(e,t){return t.relevance-e.relevance})),this.setState({searchString:i,paperList:n,isLoading:!1}),this.onSelectSingle(n[0]);case 16:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getPaperScores",value:function(e){var t=new Array(e.length),a=e.map((function(e){return e.doi}));e.forEach((function(n,r){var i=new Array(e.length).fill(0);n.ids.forEach((function(e){var t=a.indexOf(e);-1!==t&&(i[t]=1)})),t[r]=i}));var n=e.map((function(e){return e.inList===xe}));e=e.map((function(e){return Object(c.a)(Object(c.a)({},e),{refs_relevant:0,refs_pool:0,cited_relevant:0,cited_pool:0,cocit_pool:0,cocit_relevant:0,bibcup_pool:0,bibcup_relevant:0})}));for(var r={},i=0;i<e.length;i++)for(var o=0;o<e.length;o++){1===t[i][o]&&(n[o]?e[i].refs_relevant++:e[i].refs_pool++),1===t[o][i]&&(n[o]?e[i].cited_relevant++:e[i].cited_pool++);for(var s=0;s<e.length;s++)1===t[o][i]&&1===t[o][s]&&i!==s&&(n[s]?e[i].cocit_relevant++:e[i].cocit_pool++),1===t[i][o]&&1===t[s][o]&&i!==s&&(n[s]?e[i].bibcup_relevant++:e[i].bibcup_pool++)}var p=e.filter((function(e,t){return n[t]})),d=e.filter((function(e,t){return!n[t]}));return r.poolPoolRefs=Math.max.apply(Math,[1].concat(Object(l.a)(d.map((function(e){return e.refs_pool}))))),r.poolPoolCited=Math.max.apply(Math,[1].concat(Object(l.a)(d.map((function(e){return e.cited_pool}))))),r.poolPoolCocit=Math.max.apply(Math,[1].concat(Object(l.a)(d.map((function(e){return e.cocit_pool}))))),r.poolPoolBibcup=Math.max.apply(Math,[1].concat(Object(l.a)(d.map((function(e){return e.bibcup_pool}))))),r.relRelRefs=Math.max.apply(Math,[1].concat(Object(l.a)(p.map((function(e){return e.refs_relevant}))))),r.relRelCited=Math.max.apply(Math,[1].concat(Object(l.a)(p.map((function(e){return e.cited_relevant}))))),r.relRelCocit=Math.max.apply(Math,[1].concat(Object(l.a)(p.map((function(e){return e.cocit_relevant}))))),r.relRelBibcup=Math.max.apply(Math,[1].concat(Object(l.a)(p.map((function(e){return e.bibcup_relevant}))))),r.poolRelRefs=Math.max.apply(Math,[1].concat(Object(l.a)(d.map((function(e){return e.refs_relevant}))))),r.poolRelCited=Math.max.apply(Math,[1].concat(Object(l.a)(d.map((function(e){return e.cited_relevant}))))),r.poolRelCocit=Math.max.apply(Math,[1].concat(Object(l.a)(d.map((function(e){return e.cocit_relevant}))))),r.poolRelBibcup=Math.max.apply(Math,[1].concat(Object(l.a)(d.map((function(e){return e.bibcup_relevant}))))),e.forEach((function(e,t){n[t]?(e.refs_relevant/=r.relRelRefs,e.cited_relevant/=r.relRelCited,e.cocit_relevant/=r.relRelCocit,e.bibcup_relevant/=r.relRelBibcup,delete e.refs_pool,delete e.cited_pool,delete e.cocit_pool,delete e.bibcup_pool,e.relevance=(e.refs_relevant+e.cited_relevant+e.cocit_relevant+e.bibcup_relevant)/4):(e.refs_pool/=r.poolPoolRefs,e.cited_pool/=r.poolPoolCited,e.cocit_pool/=r.poolPoolCocit,e.bibcup_pool/=r.poolPoolBibcup,e.refs_relevant/=r.poolRelRefs,e.cited_relevant/=r.poolRelCited,e.cocit_relevant/=r.poolRelCocit,e.bibcup_relevant/=r.poolRelBibcup,e.relevance=(e.refs_relevant+e.cited_relevant+e.cocit_relevant+e.bibcup_relevant+e.refs_pool+e.cited_pool+e.cocit_pool+e.bibcup_pool)/8)})),e}}]),a}(r.Component),Oe=a(210),ke=a(209),we=a(121);ke.a({dsn:"https://6b5e57b77ebf466980c9e68d76da6978@o503871.ingest.sentry.io/5589576",autoSessionTracking:!0,integrations:[new we.a.BrowserTracing],tracesSampleRate:1}),Object(x.y)({selectors:{":global(body), :global(html), :global(#app)":{margin:0,padding:0,height:"100vh",overflow:"hidden"}}}),Object(Oe.a)(),s.a.render(Object(n.jsx)(ye,{}),document.getElementById("root"))}},[[145,1,2]]]);
//# sourceMappingURL=main.7a72ec17.chunk.js.map