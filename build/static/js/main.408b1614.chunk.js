(this.webpackJsonpciter=this.webpackJsonpciter||[]).push([[0],{138:function(e,t,a){},140:function(e,t,a){"use strict";a.r(t);var n=a(3),r=a(1),o=a(70),i=a.n(o),s=a(49),c=a(23),l=a(55),u=a(54),p=a(15),h=a.n(p),d=a(31),b=a(40),f=a(41),m=a(4),j=a(217),v=a(77),x=a(218),y=a(95),g=a(219),O=a(225),k=a(212),S=a(206),w=a(211),C=a(74),L=a(114),_=a(220),P=a(221),R=a(7),A=a(216),M=a(34),K=a(190),B=a(203),T=a(32),E=a(9),I=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var r;Object(b.a)(this,a),(r=t.call(this,e))._onColumnClick=function(e,t){var a=r.state.columns,n=r.props.items,o=a.slice(),i=o.filter((function(e){return t.key===e.key}))[0];o.forEach((function(e){e===i?(i.isSortedDescending=!i.isSortedDescending,i.isSorted=!0,r.setState({announcedMessage:"".concat(i.name," is sorted ").concat(i.isSortedDescending?"descending":"ascending")})):(e.isSorted=!1,e.isSortedDescending=!0)}));var s=function(e,t,a){var n=t;return e.slice(0).sort((function(e,t){return(a?e[n]<t[n]:e[n]>t[n])?1:-1}))}(n,i.fieldName,i.isSortedDescending);r.setState({columns:o,items:s})};var o=r.props.onSelectSingle,i=[{key:"column1",name:"Relevance",fieldName:"relevance",minWidth:30,maxWidth:50,isSorted:!0,isSortedDescending:!0,onColumnClick:r._onColumnClick,onRender:function(e){return Object(n.jsx)("span",{children:(100*e.relevance).toFixed(2)+"%"})},data:"string",isPadded:!0},{key:"column2",name:"Name",fieldName:"name",maxWidth:350,sortAscendingAriaLabel:"Sorted A to Z",sortDescendingAriaLabel:"Sorted Z to A",onColumnClick:r._onColumnClick,data:"string",isPadded:!0,isMultiline:!0},{key:"column3",name:"Author/Year",fieldName:"authors",minWidth:75,maxWidth:150,onColumnClick:r._onColumnClick,data:"string",onRender:function(e){return Object(n.jsxs)("span",{children:[e.authors," (",e.year,")"]})},isPadded:!0,isMultiline:!0}];return r._selection=new K.a({onSelectionChanged:function(){1===r._selection.getSelectedCount()&&o(r._selection.getSelection()[0])}}),r.state={announcedMessage:null,columns:i,selectedItem:null,isModalSelection:!1,isCompactMode:!1},r}return Object(f.a)(a,[{key:"render",value:function(){var e=this.state.columns,t=this.props,a=t.items,r=t.isLoading;return Object(n.jsx)(B.a,{items:a,enableShimmer:r||0===a.length,compact:!1,onColumnClick:this._onColumnClick,columns:e,selectionMode:T.b.single,getKey:this._getKey,setKey:"multiple",layoutMode:E.e.fixedColumns,isHeaderVisible:!0,selection:this._selection,selectionPreservedOnEmptyClick:!0,enterModalSelectionOnTouch:!0,ariaLabelForSelectionColumn:"Toggle selection",ariaLabelForSelectAllCheckbox:"Toggle selection for all items",checkButtonAriaLabel:"Row checkbox"})}},{key:"_getKey",value:function(e,t){return e?e.key:t}}]),a}(r.Component);var N=a(118),D=a(27),H=a(200),F=a(119),z=a(214),G=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(b.a)(this,a),t.apply(this,arguments)}return Object(f.a)(a,[{key:"customElements",value:function(){return Object(n.jsx)(N.a,{flexWrap:!0,style:!0,width:"100%",shimmerElements:[{type:D.a.line},{type:D.a.line},{type:D.a.line},{type:D.a.line},{type:D.a.line}]})}},{key:"render",value:function(){var e=this.props,t=e.selectedPaper,a=e.onPaperAction,r=e.isLoading;return t?Object(n.jsxs)(j.a,{tokens:{childrenGap:5},children:[Object(n.jsxs)(j.a,{horizontal:!0,horizontalAlign:"space-evenly",tokens:{childrenGap:5},children:[t.inList!==$&&Object(n.jsx)(H.a,{text:"Back to Pool",iconProps:{iconName:"RevToggleKey"},onClick:function(){a(t,"move-to-result")}}),t.inList!==ee&&Object(n.jsx)(H.a,{text:"Mark relevant",iconProps:{iconName:"Accept"},onClick:function(){a(t,"move-to-relevant")}}),t.inList!==te&&Object(n.jsx)(F.a,{text:"Mark not relevant",iconProps:{iconName:"StatusCircleErrorX"},onClick:function(){a(t,"move-to-not-relevant")}})]}),Object(n.jsx)(z.a,{shimmerElements:[{type:D.a.line,height:22}],width:"80%",isDataLoaded:!r,children:Object(n.jsx)(x.a,{variant:"mediumPlus",children:t.name})}),Object(n.jsx)(z.a,{shimmerElements:[{type:D.a.line,width:"15%"},{type:D.a.gap,width:10},{type:D.a.line,width:"80%"}],width:"60%",isDataLoaded:!r,children:Object(n.jsxs)(x.a,{children:[Object(n.jsx)("b",{children:"Authors:"})," ",Object(n.jsx)("i",{children:t.authors})]})}),Object(n.jsx)(z.a,{isDataLoaded:!r,shimmerElements:[{type:D.a.line,width:"5%"},{type:D.a.gap,width:10},{type:D.a.line,width:"90%"}],children:Object(n.jsxs)(x.a,{children:[Object(n.jsx)("b",{children:"In:"})," ",Object(n.jsx)("i",{children:t.publication})]})}),Object(n.jsx)(z.a,{customElementsGroup:this.customElements(),isDataLoaded:!r,children:Object(n.jsx)(x.a,{children:t.abstract})}),Object(n.jsxs)(j.a,{horizontal:!0,horizontalAlign:"space-between",tokens:{childrenGap:5},children:[Object(n.jsxs)(x.a,{children:[Object(n.jsx)("b",{children:"Year:"})," ",t.year]}),Object(n.jsxs)(x.a,{children:[Object(n.jsx)("b",{children:"Type:"})," ",t.type]}),Object(n.jsxs)(x.a,{children:[Object(n.jsx)("b",{children:"DOI:"})," ",Object(n.jsx)(A.a,{target:"_blank",href:t.abstractlink,children:t.doi})]})]}),Object(n.jsxs)(j.a,{horizontal:!0,horizontalAlign:"space-between",tokens:{childrenGap:10},children:[Object(n.jsxs)(x.a,{children:[Object(n.jsx)("b",{children:"Relevance Score:"})," ",(100*t.relevance).toFixed(2)+"%"]}),Object(n.jsxs)(x.a,{children:[Object(n.jsx)("b",{children:"#Cited-by:"})," ",t.citedByCount]}),Object(n.jsxs)(x.a,{children:[Object(n.jsx)("b",{children:"#References:"})," ",t.refs.length]})]})]}):Object(n.jsxs)(j.a,{children:[Object(n.jsx)(x.a,{children:"Howdy, Partner!"}),Object(n.jsxs)(x.a,{children:["This website helps to discover exciting new papers in three easy steps:",Object(n.jsxs)("ol",{children:[Object(n.jsx)("li",{children:"To get started, use the search box above to start a search query on Scopus."}),Object(n.jsx)("li",{children:"Based on the results, we suggest relevant papers on the left, which you can mark as relevant or irrelevant using the buttons at the top. Your vote will automatically move the paper to the lists on the right side of the page. Based on the papers you rated as relevant, we will suggest new papers to rate. For this purpose, we use bibliometric data (i.e., co-citation & bibliometric coupling) to find papers that have a particularly high overlap with your selection."}),Object(n.jsx)("li",{children:"If you have identified enough papers or if our suggestions do not contain any more relevant papers, use the download function in the header to export your results as a list."})]})]})]})}}]),a}(r.Component),U=a.p+"static/media/header.56f2f34e.jpg",W=(a(138),a(209)),Y=a(208),q=Object(m.u)();function J(e){var t=e.isOpen,a=e.onClose,r=e.apiKey,o=e.onApiKeyChange,i=e.onClearCache;return Object(n.jsxs)(W.a,{isOpen:t,isBlocking:!1,containerClassName:X.container,children:[Object(n.jsxs)("div",{className:X.header,children:[Object(n.jsx)(x.a,{children:"Welcome to Potatosearch"}),Object(n.jsx)(O.a,{styles:Z,iconProps:{iconName:"Cancel"},ariaLabel:"Close popup modal",onClick:a})]}),Object(n.jsx)("div",{className:X.body,children:Object(n.jsxs)(j.a,{tokens:{childrenGap:5},children:[Object(n.jsx)(x.a,{variant:"mediumPlus",children:"This website helps to discover exciting new papers in three easy steps:"}),Object(n.jsx)(x.a,{children:Object(n.jsxs)("ol",{children:[Object(n.jsx)("li",{children:"To get started, use the search box above to start a search query on Scopus."}),Object(n.jsx)("li",{children:"Based on the results, we suggest relevant papers on the left, which you can mark as relevant or irrelevant using the buttons at the top. Your vote will automatically move the paper to the lists on the right side of the page. Based on the papers you rated as relevant, we will suggest new papers to rate. For this purpose, we use bibliometric data (i.e., co-citation & bibliometric coupling) to find papers that have a particularly high overlap with your selection."}),Object(n.jsx)("li",{children:"If you have identified enough papers or if our suggestions do not contain any more relevant papers, use the download function in the header to export your results as a list."})]})}),Object(n.jsx)(x.a,{variant:"mediumPlus",children:"Before you start: Please provide your Scopus API-Key:"}),Object(n.jsx)(A.a,{href:"https://github.com/dtdi/citetool/wiki/API-Key",target:"_blank",children:"Read here, how to obtain and configure your api key."}),Object(n.jsxs)(j.a,{horizontal:!0,verticalAlign:"end",tokens:{childrenGap:10},children:[Object(n.jsx)(Y.a,{label:"Provide in your API Code",style:{width:300},value:r,onChange:o}),Object(n.jsx)(H.a,{onClick:a,children:"Save"}),Object(n.jsx)(F.a,{onClick:i,children:"Clear Cache"})]})]})})]})}var X=Object(m.x)({container:{display:"flex",flexFlow:"column nowrap",alignItems:"stretch",width:"1000px",maxWidth:"100%"},header:[q.fonts.xLarge,{flex:"1 1 auto",borderTop:"4px solid ".concat(q.palette.themePrimary),color:q.palette.neutralPrimary,display:"flex",alignItems:"center",fontWeight:m.d.semibold,padding:"12px 12px 14px 24px"}],body:{flex:"4 4 auto",padding:"0 24px 24px 24px",overflowY:"hidden"}}),Z={root:{color:q.palette.neutralPrimary,marginLeft:"auto",marginTop:"4px",marginRight:"2px"},rootHovered:{color:q.palette.neutralDark}},Q=Object(m.u)(),V=Object(m.x)({paperFrame:{width:"40vw",padding:20,background:Q.palette.white},searchBar:{background:Q.palette.white}}),$="result",ee="relevant",te="not-relevant",ae=function(){function e(){Object(b.a)(this,e),this.prefix="paper_"}return Object(f.a)(e,[{key:"_getKey",value:function(e){return this.prefix+encodeURIComponent(e)}},{key:"getOrLoad",value:function(){var e=Object(d.a)(h.a.mark((function e(t,a,n){var r,o,i,s,c,l;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=this._getKey(t),e.next=3,Object(M.c)(r);case 3:if(!(o=e.sent)){e.next=8;break}return e.abrupt("return",o);case 8:return e.prev=8,e.next=11,fetch("https://api.semanticscholar.org/v1/paper/".concat(t,"?include_unknown_references=true"),{signal:n});case 11:i=e.sent,e.next=23;break;case 14:if(e.prev=14,e.t0=e.catch(8),!(e.t0 instanceof TypeError)){e.next=21;break}throw a.abort(),e.t0;case 21:throw e.t0;case 23:if(i.ok){e.next=35;break}if(404!==i.status){e.next=33;break}return e.next=27,i.json();case 27:return s=e.sent,Object(M.d)(r,s),console.log(404),e.abrupt("return",s);case 33:throw c="An error has occured: ".concat(i.status),new Error(c);case 35:return e.next=37,i.json();case 37:l=e.sent,e.prev=38,Object(M.d)(r,l),e.next=46;break;case 42:throw e.prev=42,e.t1=e.catch(38),"Unknown error",new Error("Unknown error",e.t1);case 46:return e.abrupt("return",l);case 47:case"end":return e.stop()}}),e,this,[[8,14],[38,42]])})));return function(t,a,n){return e.apply(this,arguments)}}()},{key:"remove",value:function(e){Object(M.b)(this._getKey(e))}}]),e}(),ne=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(b.a)(this,a),(n=t.call(this,e)).onSelectSingle=function(){var e=Object(d.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.setState({selectedPaper:t});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.onClearCache=function(){var e=Object(d.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Object(M.a)();case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.loadSemScholar=function(){var e=Object(d.a)(h.a.mark((function e(t,a,n){var r,o;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=new ae,e.prev=1,e.next=4,r.getOrLoad(t,a,n);case 4:return o=e.sent,e.abrupt("return",o);case 8:e.prev=8,e.t0=e.catch(1),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t,a,n){return e.apply(this,arguments)}}(),n.onLoadData=function(){var e=Object(d.a)(h.a.mark((function e(t){var a,r,o,i,s,l,u,p,d,b,f,m,j,v;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.setState({isLoading:!0,selectedPaper:null,searchString:t}),a=n.state.apiKey,r=encodeURIComponent(t),o=25,i=25,s=0,l="relevancy",d=0;case 8:return e.prev=8,e.next=11,fetch("https://api.elsevier.com/content/search/scopus?apiKey=".concat(a,"&query=").concat(r,"&count=").concat(o,"&start=").concat(s,"&sort=").concat(l));case 11:if((b=e.sent).ok){e.next=24;break}if(f="",400!==b.status){e.next=21;break}return e.next=17,b.json();case 17:m=e.sent,f="An error has occured (".concat(b.status,") ").concat(m["service-error"].status.statusCode,": ").concat(m["service-error"].status.statusText),e.next=22;break;case 21:f="An error has occured (".concat(b.status,")");case 22:return u={isLoading:!1,apiError:f},e.abrupt("break",44);case 24:return e.next=26,b.json();case 26:if(j=e.sent,p){e.next=35;break}if(p=j,0!==(d=Number(p["search-results"]["opensearch:totalResults"]))){e.next=33;break}return u={isLoading:!1,paperList:[],apiError:"Search did not return any results"},e.abrupt("break",44);case 33:e.next=36;break;case 35:(v=p["search-results"].entry).push.apply(v,Object(c.a)(j["search-results"].entry));case 36:e.next=42;break;case 38:return e.prev=38,e.t0=e.catch(8),u={isLoading:!1,apiError:e.t0.message},e.abrupt("break",44);case 42:s+=o;case 43:if(s<i&&s<=d){e.next=8;break}case 44:if(!u){e.next=47;break}return n.setState(u),e.abrupt("return");case 47:return e.next=49,Object(M.d)("lastSearch",{searchString:n.state.searchString,result:p});case 49:return e.next=51,n.processSearchResults(p);case 51:n.setState({isLoading:!1});case 52:case"end":return e.stop()}}),e,null,[[8,38]])})));return function(t){return e.apply(this,arguments)}}(),n.handleTabLinkClick=function(e){n.setState({selectedTabId:e.props.itemKey})},n.onPaperAction=function(){var e=Object(d.a)(h.a.mark((function e(t,a){var r,o;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=n.state.paperList,n.setState({isLoading:!0}),o=r.filter((function(e){return"remove-paper"!==a||t.key!==e.key})).map((function(e){return e.key===t.key?("move-to-result"===a?t.inList=$:"move-to-relevant"===a?t.inList=ee:"move-to-not-relevant"===a&&(t.inList=te),Object(s.a)(Object(s.a)({},e),t)):e})),"move-to-relevant"!==a){e.next=8;break}return t.refs.forEach((function(e){var a=o.find((function(t){return t.doi===e.doi}));a?a.inBatch.push(t.doi):o.push({key:e.doi||e.paperId,name:e.title,abstract:null,refs:[],cites:[],raw:{},ids:[],authors:e.authors?e.authors.map((function(e){return e.name})).join(", "):"",publication:e.venue,year:e.year,doi:e.doi,type:null,citedByCount:null,inBatch:[t.doi],inList:$})})),e.next=7,n.loadSemScholarForMany(o);case 7:o=e.sent;case 8:o=n.getPaperScores(o).sort((function(e,t){return t.relevance-e.relevance})),n.setState({paperList:o,isLoading:!1}),n.onSelectSingle(o[0]);case 11:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),n.onSettingsOpenClose=function(){var e=n.state,t=e.isApiKeyModalOpen,a=e.apiKey;if(a)Object(M.d)("apiKey",a),n.setState({isApiKeyModalOpen:!t});else{n.setState("api key not provided.")}},n.onApiKeyChange=function(e,t){n.setState({apiKey:t})},n.closeMessageBar=function(e){n.setState({apiError:null})},n.toggleSearchHelper=function(e){n.setState({isSearchHelper:!n.state.isSearchHelper})},n.clearSearch=function(){var e=Object(d.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(M.b)("lastSearch");case 2:n.setState({paperList:[],selectedPaper:null,isSearchHelper:!1,searchResultsList:[],relevantList:[],notRelevantList:[],selectedTabId:"searchResultsList",isLoading:!1,searchString:'TITLE-ABS-KEY("heart attack")'});case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.state={paperList:[],selectedPaper:null,isSearchHelper:!1,searchResultsList:[],relevantList:[],notRelevantList:[],selectedTabId:"searchResultsList",apiKey:"",isApiKeyModalOpen:!1,isLoading:!1,searchString:'TITLE-ABS-KEY("heart attack")'},n}return Object(f.a)(a,[{key:"componentDidMount",value:function(){var e=Object(d.a)(h.a.mark((function e(){var t,a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(M.c)("lastSearch");case 2:return t=e.sent,e.next=5,Object(M.c)("apiKey");case 5:if((a=e.sent)?this.setState({apiKey:a}):this.setState({isApiKeyModalOpen:!0}),!t){e.next=12;break}return this.setState({isLoading:!0,searchString:t.searchString}),e.next=11,this.processSearchResults(t.result);case 11:this.setState({isLoading:!1});case 12:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"_filterPapers",value:function(e){return this.state.paperList.filter((function(t){return t.inList===e}))}},{key:"componentDidUpdate",value:function(e,t){t.paperList!==this.state.paperList&&this.setState({searchResultsList:this._filterPapers($),relevantList:this._filterPapers(ee),notRelevantList:this._filterPapers(te)})}},{key:"render",value:function(){var e,t=this.state,a=t.selectedPaper,r=t.searchResultsList,o=t.searchString,i=t.isSearchHelper,s=t.relevantList,c=t.notRelevantList,l=t.selectedTabId,u=t.isApiKeyModalOpen,p=t.apiKey,h=t.isLoading,d=t.apiError;switch(l){case"searchResultsList":e=r;break;case"relevantList":e=s;break;case"notRelevantList":e=c;break;default:e=r}var b=[{key:"upload",text:"Upload",disabled:!0,iconProps:{iconName:"Upload"},href:"https://developer.microsoft.com/en-us/fluentui"},{key:"share",text:"Share",disabled:!0,iconProps:{iconName:"Share"},onClick:function(){return console.log("Share")}},{key:"download",text:"Download",disabled:!0,iconProps:{iconName:"Download"},onClick:function(){return console.log("Download")}}],f=[{key:"move",text:"Move to...",disabled:!0,onClick:function(){return console.log("Move to")},iconProps:{iconName:"MoveToFolder"}},{key:"copy",text:"Copy to...",disabled:!0,onClick:function(){return console.log("Copy to")},iconProps:{iconName:"Copy"}},{key:"rename",text:"Rename...",disabled:!0,onClick:function(){return console.log("Rename")},iconProps:{iconName:"Edit"}}],m=[{key:"settings",text:"Help & Settings",ariaLabel:"Help & Settings",iconOnly:!0,iconProps:{iconName:"Settings"},onClick:this.onSettingsOpenClose},{key:"info",text:"Info",ariaLabel:"Info",iconOnly:!0,iconProps:{iconName:"Info"},onClick:function(){return console.log("Info")}}];return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(J,{isOpen:u,apiKey:p,onClearCache:this.onClearCache,onApiKeyChange:this.onApiKeyChange,onClose:this.onSettingsOpenClose}),Object(n.jsxs)(j.a,{tokens:{padding:25,childrenGap:20},children:[Object(n.jsx)(v.a,{className:"header",src:U,alt:"Header"}),Object(n.jsxs)(j.a,{horizontal:!0,horizontalAlign:"space-around",verticalAlign:"center",tokens:{childrenGap:20},className:V.searchBar,children:[Object(n.jsx)(x.a,{style:{fontWeight:"bolder"},children:"Potatosearch"}),Object(n.jsx)(y.a,{children:Object(n.jsxs)(j.a,{horizontal:!0,children:[Object(n.jsx)(g.a,{styles:{root:{width:400}},placeholder:"Search",onSearch:this.onLoadData,value:o}),Object(n.jsx)(O.a,{iconProps:{iconName:"Delete"},title:"Clear current Search",id:"clearSearch",ariaLabel:"Help",onClick:this.clearSearch}),Object(n.jsx)(O.a,{iconProps:{iconName:"Help"},title:"Help",id:"searchHelpButton",ariaLabel:"Help",onClick:this.toggleSearchHelper}),i&&Object(n.jsx)(k.a,{target:"#searchHelpButton",hasCloseButton:!0,closeButtonAriaLabel:"Close",primaryButtonProps:{children:"Explore Search Tips",target:"_blank",href:"http://schema.elsevier.com/dtds/document/bkapi/search/SCOPUSSearchTips.htm"},onDismiss:this.toggleSearchHelper,headline:"SCOPUS Search Tips",children:'SCOPUS Search API supports a Boolean syntax, which is a type of search allowing users to combine keywords with operators such as AND, NOT and OR to further produce more relevant results. For example, a Boolean search could be "heart" AND "brain". This would limit the search results to only those documents containing the two keywords.'})]})}),Object(n.jsx)(S.a,{items:b,overflowItems:f,overflowButtonProps:{ariaLabel:"More Comands"},farItems:m,ariaLabel:"Use left and right arrow keys to navigate between commands"})]}),Object(n.jsx)(j.a,{className:"",tokens:{childrenGap:5},children:Object(n.jsxs)(j.a,{horizontal:!0,horizontalAlign:"space-evenly",tokens:{childrenGap:10},children:[Object(n.jsx)(y.a,{disableShrink:!0,className:V.paperFrame,children:Object(n.jsx)(G,{isLoading:h,selectedPaper:a,onPaperAction:this.onPaperAction})}),Object(n.jsx)(y.a,{grow:2,className:V.paperFrame,children:Object(n.jsxs)(j.a,{tokens:{childrenGap:5},children:[Object(n.jsxs)(w.a,{selectedKey:l,onLinkClick:this.handleTabLinkClick,headersOnly:!0,linkFormat:C.a.tabs,children:[Object(n.jsx)(L.a,{itemKey:"searchResultsList",itemIcon:"AllApps",headerText:"Paper Pool",itemCount:r.length}),Object(n.jsx)(L.a,{itemKey:"relevantList",itemIcon:"Accept",headerText:"Relevant Paper",itemCount:s.length}),Object(n.jsx)(L.a,{itemKey:"notRelevantList",itemIcon:"StatusCircleErrorX",headerText:"Not Relevant",itemCount:c.length})]}),h&&Object(n.jsx)(_.a,{label:"We're Loading",description:"Lots of data from semantic Scholar"}),d&&Object(n.jsxs)(P.a,{messageBarType:R.a.error,isMultiline:!1,onDismiss:this.closeMessageBar,dismissButtonAriaLabel:"Close",children:[d,Object(n.jsx)(A.a,{href:"https://github.com/dtdi/citetool/wiki/API-Key",target:"_blank",children:"Did you provide your API Key?"})]}),Object(n.jsx)(I,{items:e,isLoading:h,onSelectSingle:this.onSelectSingle})]})})]})})]})]})}},{key:"loadSemScholarForMany",value:function(){var e=Object(d.a)(h.a.mark((function e(t){var a,n,r=this;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=new AbortController,n=a.signal,e.next=4,Promise.all(t.map(function(){var e=Object(d.a)(h.a.mark((function e(t){var o,i,c;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.loadSemScholar(t.doi,a,n);case 2:if(o=e.sent){e.next=5;break}return e.abrupt("return",t);case 5:return i={abstract:o.abstract,refs:o.references||[],cites:o.citations||[],authors:o.authors?o.authors.map((function(e){return e.name})).join(", "):t.authors,ids:o.references?o.references.map((function(e){return e.doi||e.paperId})):[]},(c=Object(s.a)(Object(s.a)({},t),i)).raw.semScholar=o,e.abrupt("return",c);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 4:return t=e.sent,e.abrupt("return",t);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"processSearchResults",value:function(){var e=Object(d.a)(h.a.mark((function e(t){var a,n,r,o,i,s=this;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=[],t&&t["search-results"]){e.next=3;break}return e.abrupt("return");case 3:return r=t["search-results"],o=r["opensearch:Query"]["@searchTerms"],r.entry.forEach((function(e){var t="test";e.link.forEach((function(e){"scopus"===e["@ref"]&&(t=e["@href"])})),n.push({key:e["prism:doi"]||e["dc:identifier"],name:e["dc:title"],abstractlink:t,abstract:null,refs:[],cites:[],ids:[],authors:e["dc:creator"],publication:"".concat(e["prism:publicationName"]," ").concat(e["prism:volume"]),year:e["prism:coverDate"].substr(0,4),doi:e["prism:doi"],type:e.subtypeDescription,citedByCount:e["citedby-count"],inBatch:[s.state.searchString],raw:{scopusEntry:e,semScholar:null},inList:$})})),e.next=9,this.loadSemScholarForMany(n);case 9:n=e.sent,i=this.state.paperList,(a=n).push.apply(a,Object(c.a)(i)),n=(n=this.getPaperScores(n)).sort((function(e,t){return t.relevance-e.relevance})),this.setState({searchString:o,paperList:n,isLoading:!1}),this.onSelectSingle(n[0]);case 16:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getPaperScores",value:function(e){console.log(e);var t=new Array(e.length),a=e.map((function(e){return e.doi}));e.forEach((function(n,r){var o=new Array(e.length).fill(0);n.ids.forEach((function(e){var t=a.indexOf(e);-1!==t&&(o[t]=1)})),t[r]=o}));var n=e.map((function(e){return e.inList===ee}));e=e.map((function(e){return Object(s.a)(Object(s.a)({},e),{refs_relevant:0,refs_pool:0,cited_relevant:0,cited_pool:0,cocit_pool:0,cocit_relevant:0,bibcup_pool:0,bibcup_relevant:0})}));for(var r={},o=0;o<e.length;o++)for(var i=0;i<e.length;i++){1===t[o][i]&&(n[i]?e[o].refs_relevant++:e[o].refs_pool++),1===t[i][o]&&(n[i]?e[o].cited_relevant++:e[o].cited_pool++);for(var l=0;l<e.length;l++)1===t[i][o]&&1===t[i][l]&&o!==l&&(n[l]?e[o].cocit_relevant++:e[o].cocit_pool++),1===t[o][i]&&1===t[l][i]&&o!==l&&(n[l]?e[o].bibcup_relevant++:e[o].bibcup_pool++)}var u=e.filter((function(e,t){return n[t]})),p=e.filter((function(e,t){return!n[t]}));return r.poolPoolRefs=Math.max.apply(Math,[1].concat(Object(c.a)(p.map((function(e){return e.refs_pool}))))),r.poolPoolCited=Math.max.apply(Math,[1].concat(Object(c.a)(p.map((function(e){return e.cited_pool}))))),r.poolPoolCocit=Math.max.apply(Math,[1].concat(Object(c.a)(p.map((function(e){return e.cocit_pool}))))),r.poolPoolBibcup=Math.max.apply(Math,[1].concat(Object(c.a)(p.map((function(e){return e.bibcup_pool}))))),r.relRelRefs=Math.max.apply(Math,[1].concat(Object(c.a)(u.map((function(e){return e.refs_relevant}))))),r.relRelCited=Math.max.apply(Math,[1].concat(Object(c.a)(u.map((function(e){return e.cited_relevant}))))),r.relRelCocit=Math.max.apply(Math,[1].concat(Object(c.a)(u.map((function(e){return e.cocit_relevant}))))),r.relRelBibcup=Math.max.apply(Math,[1].concat(Object(c.a)(u.map((function(e){return e.bibcup_relevant}))))),r.poolRelRefs=Math.max.apply(Math,[1].concat(Object(c.a)(p.map((function(e){return e.refs_relevant}))))),r.poolRelCited=Math.max.apply(Math,[1].concat(Object(c.a)(p.map((function(e){return e.cited_relevant}))))),r.poolRelCocit=Math.max.apply(Math,[1].concat(Object(c.a)(p.map((function(e){return e.cocit_relevant}))))),r.poolRelBibcup=Math.max.apply(Math,[1].concat(Object(c.a)(p.map((function(e){return e.bibcup_relevant}))))),e.forEach((function(e,t){n[t]?(e.refs_relevant/=r.relRelRefs,e.cited_relevant/=r.relRelCited,e.cocit_relevant/=r.relRelCocit,e.bibcup_relevant/=r.relRelBibcup,delete e.refs_pool,delete e.cited_pool,delete e.cocit_pool,delete e.bibcup_pool,e.relevance=(e.refs_relevant+e.cited_relevant+e.cocit_relevant+e.bibcup_relevant)/4):(e.refs_pool/=r.poolPoolRefs,e.cited_pool/=r.poolPoolCited,e.cocit_pool/=r.poolPoolCocit,e.bibcup_pool/=r.poolPoolBibcup,e.refs_relevant/=r.poolRelRefs,e.cited_relevant/=r.poolRelCited,e.cocit_relevant/=r.poolRelCocit,e.bibcup_relevant/=r.poolRelBibcup,e.relevance=(e.refs_relevant+e.cited_relevant+e.cocit_relevant+e.bibcup_relevant+e.refs_pool+e.cited_pool+e.cocit_pool+e.bibcup_pool)/8)})),e}}]),a}(r.Component),re=a(205),oe=a(204),ie=a(117);oe.a({dsn:"https://6b5e57b77ebf466980c9e68d76da6978@o503871.ingest.sentry.io/5589576",autoSessionTracking:!0,integrations:[new ie.a.BrowserTracing],tracesSampleRate:1}),Object(m.y)({selectors:{":global(body), :global(html), :global(#app)":{margin:0,padding:0,height:"100vh"}}}),Object(re.a)(),i.a.render(Object(n.jsx)(ne,{}),document.getElementById("root"))}},[[140,1,2]]]);
//# sourceMappingURL=main.408b1614.chunk.js.map