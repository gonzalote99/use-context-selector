import e from"react";var r=function(e){return e+1},t=function(){return 0},n=function(e){return e},u=Symbol("CONTEXT_LISTENERS"),c=function(r){var n=e.createContext(r,t),c=new Set;return n[u]=c,n.Provider=function(r,t){return e.memo(function(n){var u=n.value,c=n.children;return e.useLayoutEffect(function(){t.forEach(function(e){return e(u)})},[u]),e.createElement(r,{value:u},c)})}(n.Provider,c),delete n.Consumer,n},o=function(t,n){var c=t[u];if(!c)throw new Error("useContextSelector requires special context");var o=e.useReducer(r,0)[1],f=e.useContext(t),i=n(f),a=e.useRef(null);return e.useLayoutEffect(function(){a.current={selector:n,value:f,selected:i}}),e.useLayoutEffect(function(){var e=function(e){try{if(a.current.value===e||Object.is(a.current.selected,a.current.selector(e)))return}catch(e){}a.current.value=e,o()};return c.add(e),function(){c.delete(e)}},[o,c]),i},f=function(e){return o(e,n)};export{c as createContext,f as useContext,o as useContextSelector};
//# sourceMappingURL=index.esm.js.map
