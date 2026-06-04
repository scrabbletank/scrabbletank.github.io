import{A as ki,B as Ti,C as wi,Ca as _t,D as Mi,E as Ii,F as Di,G as Ne,I as jt,J as G,M as Si,N as te,O as wt,P as pt,Q as He,R as ut,S as ne,U as Z,V as $,W as Ei,X as Ve,Y as Ai,Z as Pi,a as ui,aa as ze,b as ct,ba as je,c as hi,ca as Fi,d as bi,f as lt,fa as qe,g as _i,ga as $e,i as Ht,ia as qt,j as fi,ja as $t,ka as Oi,l as gi,m as vi,ma as ht,na as We,o as xi,oa as Wt,p as Vt,pa as Ri,q as yi,qa as ce,r as zt,ra as Ee,sa as Qt,t as Se,u as hn,ua as Ut,v as Tt,va as Bi,w as Ci,wa as Li,x as dt,xa as bt,z as mt,za as Gt}from"./chunk-OIUA5W7T.js";import{g as di,h as mi,k as pi,m as me,n as pe}from"./chunk-AP2UPEPB.js";import{$a as Bt,$b as si,A as $n,Ab as F,Bb as st,C as Wn,Cb as yt,D as ve,Db as Lt,Eb as T,F as Qn,Fb as Ct,Gb as u,Hb as p,Ib as Y,J as Un,Jb as N,Kb as De,L as Gn,Lb as oe,M as he,Mb as I,N as Zn,Nb as D,O as Je,Oa as rt,Pb as ni,Q as Pt,Qa as d,Qb as ii,R as pn,Rb as tt,Sb as Oe,T as Xn,Tb as k,U as Fe,Ub as ke,V,Va as Ie,Vb as m,Wa as Ce,Wb as f,X as E,Xb as nt,Y as xt,Ya as et,Yb as ai,Z as l,Zb as oi,_b as ri,a as H,ac as Re,b as vt,bc as Be,ca as b,cc as J,d as ie,da as _,db as v,dc as re,ea as Ft,eb as j,ec as Nt,f as Hn,fa as Kn,fb as P,fc as ci,g as O,ga as z,gb as Yn,ha as de,hb as U,i as mn,ia as un,ib as K,ic as se,j as Et,jb as Jn,ka as A,kc as it,l as ge,la as ae,lc as kt,m as Vn,ma as Ot,mc as li,oc as ee,p as zn,pa as Q,pb as ei,q as ot,qb as R,qc as S,rb as x,rc as Le,sb as y,ta as xe,tb as ti,u as At,ua as ye,ub as q,v as jn,vb as w,w as qn,wa as B,wb as M,x as Pe,xa as Rt,xb as g,y as le,yb as r,zb as s}from"./chunk-QZESHWEQ.js";function ue(i,a){let t=!a?.manualCleanup?a?.injector?.get(un)??l(un):null,n=Ma(a?.equal),o;a?.requireSync?o=Q({kind:0},{equal:n}):o=Q({kind:1,value:a?.initialValue},{equal:n});let c,h=i.subscribe({next:C=>o.set({kind:1,value:C}),error:C=>{o.set({kind:2,error:C}),c?.()},complete:()=>{c?.()}});if(a?.requireSync&&o().kind===0)throw new pn(601,!1);return c=t?.onDestroy(h.unsubscribe.bind(h)),se(()=>{let C=o();switch(C.kind){case 1:return C.value;case 2:throw C.error;case 0:throw new pn(601,!1)}},{equal:a?.equal})}function Ma(i=Object.is){return(a,e)=>a.kind===1&&e.kind===1&&i(a.value,e.value)}function Ia(i,a){}var Qe=class{viewContainerRef;injector;id;role="dialog";panelClass="";hasBackdrop=!0;backdropClass="";disableClose=!1;closePredicate;width="";height="";minWidth;minHeight;maxWidth;maxHeight;positionStrategy;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus="first-tabbable";restoreFocus=!0;scrollStrategy;closeOnNavigation=!0;closeOnDestroy=!0;closeOnOverlayDetachments=!0;disableAnimations=!1;providers;container;templateContext};var _n=(()=>{class i extends Wt{_elementRef=l(B);_focusTrapFactory=l(Mi);_config;_interactivityChecker=l(wi);_ngZone=l(ae);_focusMonitor=l(Tt);_renderer=l(et);_changeDetectorRef=l(ee);_injector=l(z);_platform=l(Se);_document=l(de);_portalOutlet;_focusTrapped=new O;_focusTrap=null;_elementFocusedBeforeDialogWasOpened=null;_closeInteractionType=null;_ariaLabelledByQueue=[];_isDestroyed=!1;constructor(){super(),this._config=l(Qe,{optional:!0})||new Qe,this._config.ariaLabelledBy&&this._ariaLabelledByQueue.push(this._config.ariaLabelledBy)}_addAriaLabelledBy(e){this._ariaLabelledByQueue.push(e),this._changeDetectorRef.markForCheck()}_removeAriaLabelledBy(e){let t=this._ariaLabelledByQueue.indexOf(e);t>-1&&(this._ariaLabelledByQueue.splice(t,1),this._changeDetectorRef.markForCheck())}_contentAttached(){this._initializeFocusTrap(),this._captureInitialFocus()}_captureInitialFocus(){this._trapFocus()}ngOnDestroy(){this._focusTrapped.complete(),this._isDestroyed=!0,this._restoreFocus()}attachComponentPortal(e){this._portalOutlet.hasAttached();let t=this._portalOutlet.attachComponentPortal(e);return this._contentAttached(),t}attachTemplatePortal(e){this._portalOutlet.hasAttached();let t=this._portalOutlet.attachTemplatePortal(e);return this._contentAttached(),t}attachDomPortal=e=>{this._portalOutlet.hasAttached();let t=this._portalOutlet.attachDomPortal(e);return this._contentAttached(),t};_recaptureFocus(){this._containsFocus()||this._trapFocus()}_forceFocus(e,t){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let n=()=>{o(),c(),e.removeAttribute("tabindex")},o=this._renderer.listen(e,"blur",n),c=this._renderer.listen(e,"mousedown",n)})),e.focus(t)}_focusByCssSelector(e,t){let n=this._elementRef.nativeElement.querySelector(e);n&&this._forceFocus(n,t)}_trapFocus(e){this._isDestroyed||Ie(()=>{let t=this._elementRef.nativeElement;switch(this._config.autoFocus){case!1:case"dialog":this._containsFocus()||t.focus(e);break;case!0:case"first-tabbable":this._focusTrap?.focusInitialElement(e)||this._focusDialogContainer(e);break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]',e);break;default:this._focusByCssSelector(this._config.autoFocus,e);break}this._focusTrapped.next()},{injector:this._injector})}_restoreFocus(){let e=this._config.restoreFocus,t=null;if(typeof e=="string"?t=this._document.querySelector(e):typeof e=="boolean"?t=e?this._elementFocusedBeforeDialogWasOpened:null:e&&(t=e),this._config.restoreFocus&&t&&typeof t.focus=="function"){let n=zt(),o=this._elementRef.nativeElement;(!n||n===this._document.body||n===o||o.contains(n))&&(this._focusMonitor?(this._focusMonitor.focusVia(t,this._closeInteractionType),this._closeInteractionType=null):t.focus())}this._focusTrap&&this._focusTrap.destroy()}_focusDialogContainer(e){this._elementRef.nativeElement.focus?.(e)}_containsFocus(){let e=this._elementRef.nativeElement,t=zt();return e===t||e.contains(t)}_initializeFocusTrap(){this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=zt()))}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=v({type:i,selectors:[["cdk-dialog-container"]],viewQuery:function(t,n){if(t&1&&oe(ce,7),t&2){let o;I(o=D())&&(n._portalOutlet=o.first)}},hostAttrs:["tabindex","-1",1,"cdk-dialog-container"],hostVars:6,hostBindings:function(t,n){t&2&&R("id",n._config.id||null)("role",n._config.role)("aria-modal",n._config.ariaModal)("aria-labelledby",n._config.ariaLabel?null:n._ariaLabelledByQueue[0])("aria-label",n._config.ariaLabel)("aria-describedby",n._config.ariaDescribedBy||null)},features:[U],decls:1,vars:0,consts:[["cdkPortalOutlet",""]],template:function(t,n){t&1&&K(0,Ia,0,0,"ng-template",0)},dependencies:[ce],styles:[`.cdk-dialog-container {
  display: block;
  width: 100%;
  height: 100%;
  min-height: inherit;
  max-height: inherit;
}
`],encapsulation:2})}return i})(),Mt=class{overlayRef;config;componentInstance=null;componentRef=null;containerInstance;disableClose;closed=new O;backdropClick;keydownEvents;outsidePointerEvents;id;_detachSubscription;constructor(a,e){this.overlayRef=a,this.config=e,this.disableClose=e.disableClose,this.backdropClick=a.backdropClick(),this.keydownEvents=a.keydownEvents(),this.outsidePointerEvents=a.outsidePointerEvents(),this.id=e.id,this.keydownEvents.subscribe(t=>{t.keyCode===27&&!this.disableClose&&!Ne(t)&&(t.preventDefault(),this.close(void 0,{focusOrigin:"keyboard"}))}),this.backdropClick.subscribe(()=>{!this.disableClose&&this._canClose()?this.close(void 0,{focusOrigin:"mouse"}):this.containerInstance._recaptureFocus?.()}),this._detachSubscription=a.detachments().subscribe(()=>{e.closeOnOverlayDetachments!==!1&&this.close()})}close(a,e){if(this._canClose(a)){let t=this.closed;this.containerInstance._closeInteractionType=e?.focusOrigin||"program",this._detachSubscription.unsubscribe(),this.overlayRef.dispose(),t.next(a),t.complete(),this.componentInstance=this.containerInstance=null}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(a="",e=""){return this.overlayRef.updateSize({width:a,height:e}),this}addPanelClass(a){return this.overlayRef.addPanelClass(a),this}removePanelClass(a){return this.overlayRef.removePanelClass(a),this}_canClose(a){let e=this.config;return!!this.containerInstance&&(!e.closePredicate||e.closePredicate(a,e,this.componentInstance))}},Da=new E("DialogScrollStrategy",{providedIn:"root",factory:()=>{let i=l(z);return()=>Qt(i)}}),Sa=new E("DialogData"),Ea=new E("DefaultDialogConfig");function Aa(i){let a=Q(i),e=new A;return{valueSignal:a,get value(){return a()},change:e,ngOnDestroy(){e.complete()}}}var fn=(()=>{class i{_injector=l(z);_defaultOptions=l(Ea,{optional:!0});_parentDialog=l(i,{optional:!0,skipSelf:!0});_overlayContainer=l(Bi);_idGenerator=l(G);_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new O;_afterOpenedAtThisLevel=new O;_ariaHiddenElements=new Map;_scrollStrategy=l(Da);get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}afterAllClosed=At(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(he(void 0)));constructor(){}open(e,t){let n=this._defaultOptions||new Qe;t=H(H({},n),t),t.id=t.id||this._idGenerator.getId("cdk-dialog-"),t.id&&this.getDialogById(t.id);let o=this._getOverlayConfig(t),c=Gt(this._injector,o),h=new Mt(c,t),C=this._attachContainer(c,h,t);if(h.containerInstance=C,!this.openDialogs.length){let W=this._overlayContainer.getContainerElement();C._focusTrapped?C._focusTrapped.pipe(ve(1)).subscribe(()=>{this._hideNonDialogContentFromAssistiveTechnology(W)}):this._hideNonDialogContentFromAssistiveTechnology(W)}return this._attachDialogContent(e,h,C,t),this.openDialogs.push(h),h.closed.subscribe(()=>this._removeOpenDialog(h,!0)),this.afterOpened.next(h),h}closeAll(){bn(this.openDialogs,e=>e.close())}getDialogById(e){return this.openDialogs.find(t=>t.id===e)}ngOnDestroy(){bn(this._openDialogsAtThisLevel,e=>{e.config.closeOnDestroy===!1&&this._removeOpenDialog(e,!1)}),bn(this._openDialogsAtThisLevel,e=>e.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[]}_getOverlayConfig(e){let t=new Ut({positionStrategy:e.positionStrategy||bt().centerHorizontally().centerVertically(),scrollStrategy:e.scrollStrategy||this._scrollStrategy(),panelClass:e.panelClass,hasBackdrop:e.hasBackdrop,direction:e.direction,minWidth:e.minWidth,minHeight:e.minHeight,maxWidth:e.maxWidth,maxHeight:e.maxHeight,width:e.width,height:e.height,disposeOnNavigation:e.closeOnNavigation,disableAnimations:e.disableAnimations});return e.backdropClass&&(t.backdropClass=e.backdropClass),t}_attachContainer(e,t,n){let o=n.injector||n.viewContainerRef?.injector,c=[{provide:Qe,useValue:n},{provide:Mt,useValue:t},{provide:Li,useValue:e}],h;n.container?typeof n.container=="function"?h=n.container:(h=n.container.type,c.push(...n.container.providers(n))):h=_n;let C=new ht(h,n.viewContainerRef,z.create({parent:o||this._injector,providers:c}));return e.attach(C).instance}_attachDialogContent(e,t,n,o){if(e instanceof Ce){let c=this._createInjector(o,t,n,void 0),h={$implicit:o.data,dialogRef:t};o.templateContext&&(h=H(H({},h),typeof o.templateContext=="function"?o.templateContext():o.templateContext)),n.attachTemplatePortal(new We(e,null,h,c))}else{let c=this._createInjector(o,t,n,this._injector),h=n.attachComponentPortal(new ht(e,o.viewContainerRef,c));t.componentRef=h,t.componentInstance=h.instance}}_createInjector(e,t,n,o){let c=e.injector||e.viewContainerRef?.injector,h=[{provide:Sa,useValue:e.data},{provide:Mt,useValue:t}];return e.providers&&(typeof e.providers=="function"?h.push(...e.providers(t,e,n)):h.push(...e.providers)),e.direction&&(!c||!c.get(ut,null,{optional:!0}))&&h.push({provide:ut,useValue:Aa(e.direction)}),z.create({parent:c||o,providers:h})}_removeOpenDialog(e,t){let n=this.openDialogs.indexOf(e);n>-1&&(this.openDialogs.splice(n,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((o,c)=>{o?c.setAttribute("aria-hidden",o):c.removeAttribute("aria-hidden")}),this._ariaHiddenElements.clear(),t&&this._getAfterAllClosed().next()))}_hideNonDialogContentFromAssistiveTechnology(e){if(e.parentElement){let t=e.parentElement.children;for(let n=t.length-1;n>-1;n--){let o=t[n];o!==e&&o.nodeName!=="SCRIPT"&&o.nodeName!=="STYLE"&&!o.hasAttribute("aria-live")&&!o.hasAttribute("popover")&&(this._ariaHiddenElements.set(o,o.getAttribute("aria-hidden")),o.setAttribute("aria-hidden","true"))}}}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}static \u0275fac=function(t){return new(t||i)};static \u0275prov=Fe({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();function bn(i,a){let e=i.length;for(;e--;)a(i[e])}var Hi=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=j({type:i});static \u0275inj=V({providers:[fn],imports:[_t,Ee,Di,Ee]})}return i})();function Pa(i,a){}var Xt=class{viewContainerRef;injector;id;role="dialog";panelClass="";hasBackdrop=!0;backdropClass="";disableClose=!1;closePredicate;width="";height="";minWidth;minHeight;maxWidth;maxHeight;position;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus="first-tabbable";restoreFocus=!0;delayFocusTrap=!0;scrollStrategy;closeOnNavigation=!0;enterAnimationDuration;exitAnimationDuration},gn="mdc-dialog--open",Vi="mdc-dialog--opening",zi="mdc-dialog--closing",Fa=150,Oa=75,Ra=(()=>{class i extends _n{_animationStateChanged=new A;_animationsEnabled=!te();_actionSectionCount=0;_hostElement=this._elementRef.nativeElement;_enterAnimationDuration=this._animationsEnabled?qi(this._config.enterAnimationDuration)??Fa:0;_exitAnimationDuration=this._animationsEnabled?qi(this._config.exitAnimationDuration)??Oa:0;_animationTimer=null;_contentAttached(){super._contentAttached(),this._startOpenAnimation()}_startOpenAnimation(){this._animationStateChanged.emit({state:"opening",totalTime:this._enterAnimationDuration}),this._animationsEnabled?(this._hostElement.style.setProperty(ji,`${this._enterAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(Vi,gn)),this._waitForAnimationToComplete(this._enterAnimationDuration,this._finishDialogOpen)):(this._hostElement.classList.add(gn),Promise.resolve().then(()=>this._finishDialogOpen()))}_startExitAnimation(){this._animationStateChanged.emit({state:"closing",totalTime:this._exitAnimationDuration}),this._hostElement.classList.remove(gn),this._animationsEnabled?(this._hostElement.style.setProperty(ji,`${this._exitAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(zi)),this._waitForAnimationToComplete(this._exitAnimationDuration,this._finishDialogClose)):Promise.resolve().then(()=>this._finishDialogClose())}_updateActionSectionCount(e){this._actionSectionCount+=e,this._changeDetectorRef.markForCheck()}_finishDialogOpen=()=>{this._clearAnimationClasses(),this._openAnimationDone(this._enterAnimationDuration)};_finishDialogClose=()=>{this._clearAnimationClasses(),this._animationStateChanged.emit({state:"closed",totalTime:this._exitAnimationDuration})};_clearAnimationClasses(){this._hostElement.classList.remove(Vi,zi)}_waitForAnimationToComplete(e,t){this._animationTimer!==null&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(t,e)}_requestAnimationFrame(e){this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(e):e()})}_captureInitialFocus(){this._config.delayFocusTrap||this._trapFocus()}_openAnimationDone(e){this._config.delayFocusTrap&&this._trapFocus(),this._animationStateChanged.next({state:"opened",totalTime:e})}ngOnDestroy(){super.ngOnDestroy(),this._animationTimer!==null&&clearTimeout(this._animationTimer)}attachComponentPortal(e){let t=super.attachComponentPortal(e);return t.location.nativeElement.classList.add("mat-mdc-dialog-component-host"),t}static \u0275fac=(()=>{let e;return function(n){return(e||(e=ye(i)))(n||i)}})();static \u0275cmp=v({type:i,selectors:[["mat-dialog-container"]],hostAttrs:["tabindex","-1",1,"mat-mdc-dialog-container","mdc-dialog"],hostVars:10,hostBindings:function(t,n){t&2&&(Ct("id",n._config.id),R("aria-modal",n._config.ariaModal)("role",n._config.role)("aria-labelledby",n._config.ariaLabel?null:n._ariaLabelledByQueue[0])("aria-label",n._config.ariaLabel)("aria-describedby",n._config.ariaDescribedBy||null),k("_mat-animation-noopable",!n._animationsEnabled)("mat-mdc-dialog-container-with-actions",n._actionSectionCount>0))},features:[U],decls:3,vars:0,consts:[[1,"mat-mdc-dialog-inner-container","mdc-dialog__container"],[1,"mat-mdc-dialog-surface","mdc-dialog__surface"],["cdkPortalOutlet",""]],template:function(t,n){t&1&&(r(0,"div",0)(1,"div",1),K(2,Pa,0,0,"ng-template",2),s()())},dependencies:[ce],styles:[`.mat-mdc-dialog-container {
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  outline: 0;
}

.cdk-overlay-pane.mat-mdc-dialog-panel {
  max-width: var(--mat-dialog-container-max-width, 560px);
  min-width: var(--mat-dialog-container-min-width, 280px);
}
@media (max-width: 599px) {
  .cdk-overlay-pane.mat-mdc-dialog-panel {
    max-width: var(--mat-dialog-container-small-max-width, calc(100vw - 32px));
  }
}

.mat-mdc-dialog-inner-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  height: 100%;
  opacity: 0;
  transition: opacity linear var(--mat-dialog-transition-duration, 0ms);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
}
.mdc-dialog--closing .mat-mdc-dialog-inner-container {
  transition: opacity 75ms linear;
  transform: none;
}
.mdc-dialog--open .mat-mdc-dialog-inner-container {
  opacity: 1;
}
._mat-animation-noopable .mat-mdc-dialog-inner-container {
  transition: none;
}

.mat-mdc-dialog-surface {
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  outline: 0;
  transform: scale(0.8);
  transition: transform var(--mat-dialog-transition-duration, 0ms) cubic-bezier(0, 0, 0.2, 1);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  box-shadow: var(--mat-dialog-container-elevation-shadow, none);
  border-radius: var(--mat-dialog-container-shape, var(--mat-sys-corner-extra-large, 4px));
  background-color: var(--mat-dialog-container-color, var(--mat-sys-surface, white));
}
[dir=rtl] .mat-mdc-dialog-surface {
  text-align: right;
}
.mdc-dialog--open .mat-mdc-dialog-surface, .mdc-dialog--closing .mat-mdc-dialog-surface {
  transform: none;
}
._mat-animation-noopable .mat-mdc-dialog-surface {
  transition: none;
}
.mat-mdc-dialog-surface::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 2px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}

.mat-mdc-dialog-title {
  display: block;
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
  margin: 0 0 1px;
  padding: var(--mat-dialog-headline-padding, 6px 24px 13px);
}
.mat-mdc-dialog-title::before {
  display: inline-block;
  width: 0;
  height: 40px;
  content: "";
  vertical-align: 0;
}
[dir=rtl] .mat-mdc-dialog-title {
  text-align: right;
}
.mat-mdc-dialog-container .mat-mdc-dialog-title {
  color: var(--mat-dialog-subhead-color, var(--mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--mat-dialog-subhead-font, var(--mat-sys-headline-small-font, inherit));
  line-height: var(--mat-dialog-subhead-line-height, var(--mat-sys-headline-small-line-height, 1.5rem));
  font-size: var(--mat-dialog-subhead-size, var(--mat-sys-headline-small-size, 1rem));
  font-weight: var(--mat-dialog-subhead-weight, var(--mat-sys-headline-small-weight, 400));
  letter-spacing: var(--mat-dialog-subhead-tracking, var(--mat-sys-headline-small-tracking, 0.03125em));
}

.mat-mdc-dialog-content {
  display: block;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  overflow: auto;
  max-height: 65vh;
}
.mat-mdc-dialog-content > :first-child {
  margin-top: 0;
}
.mat-mdc-dialog-content > :last-child {
  margin-bottom: 0;
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  color: var(--mat-dialog-supporting-text-color, var(--mat-sys-on-surface-variant, rgba(0, 0, 0, 0.6)));
  font-family: var(--mat-dialog-supporting-text-font, var(--mat-sys-body-medium-font, inherit));
  line-height: var(--mat-dialog-supporting-text-line-height, var(--mat-sys-body-medium-line-height, 1.5rem));
  font-size: var(--mat-dialog-supporting-text-size, var(--mat-sys-body-medium-size, 1rem));
  font-weight: var(--mat-dialog-supporting-text-weight, var(--mat-sys-body-medium-weight, 400));
  letter-spacing: var(--mat-dialog-supporting-text-tracking, var(--mat-sys-body-medium-tracking, 0.03125em));
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  padding: var(--mat-dialog-content-padding, 20px 24px);
}
.mat-mdc-dialog-container-with-actions .mat-mdc-dialog-content {
  padding: var(--mat-dialog-with-actions-content-padding, 20px 24px 0);
}
.mat-mdc-dialog-container .mat-mdc-dialog-title + .mat-mdc-dialog-content {
  padding-top: 0;
}

.mat-mdc-dialog-actions {
  display: flex;
  position: relative;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  margin: 0;
  border-top: 1px solid transparent;
  padding: var(--mat-dialog-actions-padding, 16px 24px);
  justify-content: var(--mat-dialog-actions-alignment, flex-end);
}
@media (forced-colors: active) {
  .mat-mdc-dialog-actions {
    border-top-color: CanvasText;
  }
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-start, .mat-mdc-dialog-actions[align=start] {
  justify-content: start;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center, .mat-mdc-dialog-actions[align=center] {
  justify-content: center;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end, .mat-mdc-dialog-actions[align=end] {
  justify-content: flex-end;
}
.mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
.mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 8px;
}
[dir=rtl] .mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 0;
  margin-right: 8px;
}

.mat-mdc-dialog-component-host {
  display: contents;
}
`],encapsulation:2})}return i})(),ji="--mat-dialog-transition-duration";function qi(i){return i==null?null:typeof i=="number"?i:i.endsWith("ms")?hn(i.substring(0,i.length-2)):i.endsWith("s")?hn(i.substring(0,i.length-1))*1e3:i==="0"?0:null}var Zt=(function(i){return i[i.OPEN=0]="OPEN",i[i.CLOSING=1]="CLOSING",i[i.CLOSED=2]="CLOSED",i})(Zt||{}),be=class{_ref;_config;_containerInstance;componentInstance;componentRef=null;disableClose;id;_afterOpened=new mn(1);_beforeClosed=new mn(1);_result;_closeFallbackTimeout;_state=Zt.OPEN;_closeInteractionType;constructor(a,e,t){this._ref=a,this._config=e,this._containerInstance=t,this.disableClose=e.disableClose,this.id=a.id,a.addPanelClass("mat-mdc-dialog-panel"),t._animationStateChanged.pipe(le(n=>n.state==="opened"),ve(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),t._animationStateChanged.pipe(le(n=>n.state==="closed"),ve(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose()}),a.overlayRef.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._finishDialogClose()}),Pe(this.backdropClick(),this.keydownEvents().pipe(le(n=>n.keyCode===27&&!this.disableClose&&!Ne(n)))).subscribe(n=>{this.disableClose||(n.preventDefault(),$i(this,n.type==="keydown"?"keyboard":"mouse"))})}close(a){let e=this._config.closePredicate;e&&!e(a,this._config,this.componentInstance)||(this._result=a,this._containerInstance._animationStateChanged.pipe(le(t=>t.state==="closing"),ve(1)).subscribe(t=>{this._beforeClosed.next(a),this._beforeClosed.complete(),this._ref.overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),t.totalTime+100)}),this._state=Zt.CLOSING,this._containerInstance._startExitAnimation())}afterOpened(){return this._afterOpened}afterClosed(){return this._ref.closed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._ref.backdropClick}keydownEvents(){return this._ref.keydownEvents}updatePosition(a){let e=this._ref.config.positionStrategy;return a&&(a.left||a.right)?a.left?e.left(a.left):e.right(a.right):e.centerHorizontally(),a&&(a.top||a.bottom)?a.top?e.top(a.top):e.bottom(a.bottom):e.centerVertically(),this._ref.updatePosition(),this}updateSize(a="",e=""){return this._ref.updateSize(a,e),this}addPanelClass(a){return this._ref.addPanelClass(a),this}removePanelClass(a){return this._ref.removePanelClass(a),this}getState(){return this._state}_finishDialogClose(){this._state=Zt.CLOSED,this._ref.close(this._result,{focusOrigin:this._closeInteractionType}),this.componentInstance=null}};function $i(i,a,e){return i._closeInteractionType=a,i.close(e)}var It=new E("MatMdcDialogData"),Ba=new E("mat-mdc-dialog-default-options"),La=new E("mat-mdc-dialog-scroll-strategy",{providedIn:"root",factory:()=>{let i=l(z);return()=>Qt(i)}}),_e=(()=>{class i{_defaultOptions=l(Ba,{optional:!0});_scrollStrategy=l(La);_parentDialog=l(i,{optional:!0,skipSelf:!0});_idGenerator=l(G);_injector=l(z);_dialog=l(fn);_animationsDisabled=te();_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new O;_afterOpenedAtThisLevel=new O;dialogConfigClass=Xt;_dialogRefConstructor;_dialogContainerType;_dialogDataToken;get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}afterAllClosed=At(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(he(void 0)));constructor(){this._dialogRefConstructor=be,this._dialogContainerType=Ra,this._dialogDataToken=It}open(e,t){let n;t=H(H({},this._defaultOptions||new Xt),t),t.id=t.id||this._idGenerator.getId("mat-mdc-dialog-"),t.scrollStrategy=t.scrollStrategy||this._scrollStrategy();let o=this._dialog.open(e,vt(H({},t),{positionStrategy:bt(this._injector).centerHorizontally().centerVertically(),disableClose:!0,closePredicate:void 0,closeOnDestroy:!1,closeOnOverlayDetachments:!1,disableAnimations:this._animationsDisabled||t.enterAnimationDuration?.toLocaleString()==="0"||t.exitAnimationDuration?.toString()==="0",container:{type:this._dialogContainerType,providers:()=>[{provide:this.dialogConfigClass,useValue:t},{provide:Qe,useValue:t}]},templateContext:()=>({dialogRef:n}),providers:(c,h,C)=>(n=new this._dialogRefConstructor(c,t,C),n.updatePosition(t?.position),[{provide:this._dialogContainerType,useValue:C},{provide:this._dialogDataToken,useValue:h.data},{provide:this._dialogRefConstructor,useValue:n}])}));return n.componentRef=o.componentRef,n.componentInstance=o.componentInstance,this.openDialogs.push(n),this.afterOpened.next(n),n.afterClosed().subscribe(()=>{let c=this.openDialogs.indexOf(n);c>-1&&(this.openDialogs.splice(c,1),this.openDialogs.length||this._getAfterAllClosed().next())}),n}closeAll(){this._closeDialogs(this.openDialogs)}getDialogById(e){return this.openDialogs.find(t=>t.id===e)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}_closeDialogs(e){let t=e.length;for(;t--;)e[t].close()}static \u0275fac=function(t){return new(t||i)};static \u0275prov=Fe({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})(),Wi=(()=>{class i{dialogRef=l(be,{optional:!0});_elementRef=l(B);_dialog=l(_e);ariaLabel;type="button";dialogResult;_matDialogClose;constructor(){}ngOnInit(){this.dialogRef||(this.dialogRef=Ui(this._elementRef,this._dialog.openDialogs))}ngOnChanges(e){let t=e._matDialogClose||e._matDialogCloseResult;t&&(this.dialogResult=t.currentValue)}_onButtonClick(e){$i(this.dialogRef,e.screenX===0&&e.screenY===0?"keyboard":"mouse",this.dialogResult)}static \u0275fac=function(t){return new(t||i)};static \u0275dir=P({type:i,selectors:[["","mat-dialog-close",""],["","matDialogClose",""]],hostVars:2,hostBindings:function(t,n){t&1&&u("click",function(c){return n._onButtonClick(c)}),t&2&&R("aria-label",n.ariaLabel||null)("type",n.type)},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],type:"type",dialogResult:[0,"mat-dialog-close","dialogResult"],_matDialogClose:[0,"matDialogClose","_matDialogClose"]},exportAs:["matDialogClose"],features:[xe]})}return i})(),Qi=(()=>{class i{_dialogRef=l(be,{optional:!0});_elementRef=l(B);_dialog=l(_e);constructor(){}ngOnInit(){this._dialogRef||(this._dialogRef=Ui(this._elementRef,this._dialog.openDialogs)),this._dialogRef&&Promise.resolve().then(()=>{this._onAdd()})}ngOnDestroy(){this._dialogRef?._containerInstance&&Promise.resolve().then(()=>{this._onRemove()})}static \u0275fac=function(t){return new(t||i)};static \u0275dir=P({type:i})}return i})(),Ue=(()=>{class i extends Qi{id=l(G).getId("mat-mdc-dialog-title-");_onAdd(){this._dialogRef._containerInstance?._addAriaLabelledBy?.(this.id)}_onRemove(){this._dialogRef?._containerInstance?._removeAriaLabelledBy?.(this.id)}static \u0275fac=(()=>{let e;return function(n){return(e||(e=ye(i)))(n||i)}})();static \u0275dir=P({type:i,selectors:[["","mat-dialog-title",""],["","matDialogTitle",""]],hostAttrs:[1,"mat-mdc-dialog-title","mdc-dialog__title"],hostVars:1,hostBindings:function(t,n){t&2&&Ct("id",n.id)},inputs:{id:"id"},exportAs:["matDialogTitle"],features:[U]})}return i})(),Ge=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275dir=P({type:i,selectors:[["","mat-dialog-content",""],["mat-dialog-content"],["","matDialogContent",""]],hostAttrs:[1,"mat-mdc-dialog-content","mdc-dialog__content"],features:[Yn([$t])]})}return i})(),Ze=(()=>{class i extends Qi{align;_onAdd(){this._dialogRef._containerInstance?._updateActionSectionCount?.(1)}_onRemove(){this._dialogRef._containerInstance?._updateActionSectionCount?.(-1)}static \u0275fac=(()=>{let e;return function(n){return(e||(e=ye(i)))(n||i)}})();static \u0275dir=P({type:i,selectors:[["","mat-dialog-actions",""],["mat-dialog-actions"],["","matDialogActions",""]],hostAttrs:[1,"mat-mdc-dialog-actions","mdc-dialog__actions"],hostVars:6,hostBindings:function(t,n){t&2&&k("mat-mdc-dialog-actions-align-start",n.align==="start")("mat-mdc-dialog-actions-align-center",n.align==="center")("mat-mdc-dialog-actions-align-end",n.align==="end")},inputs:{align:"align"},features:[U]})}return i})();function Ui(i,a){let e=i.nativeElement.parentElement;for(;e&&!e.classList.contains("mat-mdc-dialog-container");)e=e.parentElement;return e?a.find(t=>t.id===e.id):null}var Xe=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=j({type:i});static \u0275inj=V({providers:[_e],imports:[Hi,_t,Ee,ne]})}return i})();function Na(i,a){if(i&1){let e=T();r(0,"div",1)(1,"button",2),u("click",function(){b(e);let n=p();return _(n.action())}),m(2),s()()}if(i&2){let e=p();d(2),nt(" ",e.data.action," ")}}var Ha=["label"];function Va(i,a){}var za=Math.pow(2,31)-1,Dt=class{_overlayRef;instance;containerInstance;_afterDismissed=new O;_afterOpened=new O;_onAction=new O;_durationTimeoutId;_dismissedByAction=!1;constructor(a,e){this._overlayRef=e,this.containerInstance=a,a._onExit.subscribe(()=>this._finishDismiss())}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId)}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=!0,this._onAction.next(),this._onAction.complete(),this.dismiss()),clearTimeout(this._durationTimeoutId)}closeWithAction(){this.dismissWithAction()}_dismissAfter(a){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(a,za))}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete())}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=!1}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}},Gi=new E("MatSnackBarData"),ft=class{politeness="polite";announcementMessage="";viewContainerRef;duration=0;panelClass;direction;data=null;horizontalPosition="center";verticalPosition="bottom"},ja=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275dir=P({type:i,selectors:[["","matSnackBarLabel",""]],hostAttrs:[1,"mat-mdc-snack-bar-label","mdc-snackbar__label"]})}return i})(),qa=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275dir=P({type:i,selectors:[["","matSnackBarActions",""]],hostAttrs:[1,"mat-mdc-snack-bar-actions","mdc-snackbar__actions"]})}return i})(),$a=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275dir=P({type:i,selectors:[["","matSnackBarAction",""]],hostAttrs:[1,"mat-mdc-snack-bar-action","mdc-snackbar__action"]})}return i})(),Zi=(()=>{class i{snackBarRef=l(Dt);data=l(Gi);constructor(){}action(){this.snackBarRef.dismissWithAction()}get hasAction(){return!!this.data.action}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=v({type:i,selectors:[["simple-snack-bar"]],hostAttrs:[1,"mat-mdc-simple-snack-bar"],exportAs:["matSnackBar"],decls:3,vars:2,consts:[["matSnackBarLabel",""],["matSnackBarActions",""],["matButton","","matSnackBarAction","",3,"click"]],template:function(t,n){t&1&&(r(0,"div",0),m(1),s(),x(2,Na,3,1,"div",1)),t&2&&(d(),nt(" ",n.data.message,`
`),d(),y(n.hasAction?2:-1))},dependencies:[Z,ja,qa,$a],styles:[`.mat-mdc-simple-snack-bar {
  display: flex;
}
.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-label {
  max-height: 50vh;
  overflow: auto;
}
`],encapsulation:2,changeDetection:0})}return i})(),vn="_mat-snack-bar-enter",xn="_mat-snack-bar-exit",Wa=(()=>{class i extends Wt{_ngZone=l(ae);_elementRef=l(B);_changeDetectorRef=l(ee);_platform=l(Se);_animationsDisabled=te();snackBarConfig=l(ft);_document=l(de);_trackedModals=new Set;_enterFallback;_exitFallback;_injector=l(z);_announceDelay=150;_announceTimeoutId;_destroyed=!1;_portalOutlet;_onAnnounce=new O;_onExit=new O;_onEnter=new O;_animationState="void";_live;_label;_role;_liveElementId=l(G).getId("mat-snack-bar-container-live-");constructor(){super();let e=this.snackBarConfig;e.politeness==="assertive"&&!e.announcementMessage?this._live="assertive":e.politeness==="off"?this._live="off":this._live="polite",this._platform.FIREFOX&&(this._live==="polite"&&(this._role="status"),this._live==="assertive"&&(this._role="alert"))}attachComponentPortal(e){this._assertNotAttached();let t=this._portalOutlet.attachComponentPortal(e);return this._afterPortalAttached(),t}attachTemplatePortal(e){this._assertNotAttached();let t=this._portalOutlet.attachTemplatePortal(e);return this._afterPortalAttached(),t}attachDomPortal=e=>{this._assertNotAttached();let t=this._portalOutlet.attachDomPortal(e);return this._afterPortalAttached(),t};onAnimationEnd(e){e===xn?this._completeExit():e===vn&&(clearTimeout(this._enterFallback),this._ngZone.run(()=>{this._onEnter.next(),this._onEnter.complete()}))}enter(){this._destroyed||(this._animationState="visible",this._changeDetectorRef.markForCheck(),this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce(),this._animationsDisabled?Ie(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(vn)))},{injector:this._injector}):(clearTimeout(this._enterFallback),this._enterFallback=setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-snack-bar-fallback-visible"),this.onAnimationEnd(vn)},200)))}exit(){return this._destroyed?ge(void 0):(this._ngZone.run(()=>{this._animationState="hidden",this._changeDetectorRef.markForCheck(),this._elementRef.nativeElement.setAttribute("mat-exit",""),clearTimeout(this._announceTimeoutId),this._animationsDisabled?Ie(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(xn)))},{injector:this._injector}):(clearTimeout(this._exitFallback),this._exitFallback=setTimeout(()=>this.onAnimationEnd(xn),200))}),this._onExit)}ngOnDestroy(){this._destroyed=!0,this._clearFromModals(),this._completeExit()}_completeExit(){clearTimeout(this._exitFallback),queueMicrotask(()=>{this._onExit.next(),this._onExit.complete()})}_afterPortalAttached(){let e=this._elementRef.nativeElement,t=this.snackBarConfig.panelClass;t&&(Array.isArray(t)?t.forEach(c=>e.classList.add(c)):e.classList.add(t)),this._exposeToModals();let n=this._label.nativeElement,o="mdc-snackbar__label";n.classList.toggle(o,!n.querySelector(`.${o}`))}_exposeToModals(){let e=this._liveElementId,t=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let n=0;n<t.length;n++){let o=t[n],c=o.getAttribute("aria-owns");this._trackedModals.add(o),c?c.indexOf(e)===-1&&o.setAttribute("aria-owns",c+" "+e):o.setAttribute("aria-owns",e)}}_clearFromModals(){this._trackedModals.forEach(e=>{let t=e.getAttribute("aria-owns");if(t){let n=t.replace(this._liveElementId,"").trim();n.length>0?e.setAttribute("aria-owns",n):e.removeAttribute("aria-owns")}}),this._trackedModals.clear()}_assertNotAttached(){this._portalOutlet.hasAttached()}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{if(this._destroyed)return;let e=this._elementRef.nativeElement,t=e.querySelector("[aria-hidden]"),n=e.querySelector("[aria-live]");if(t&&n){let o=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&t.contains(document.activeElement)&&(o=document.activeElement),t.removeAttribute("aria-hidden"),n.appendChild(t),o?.focus(),this._onAnnounce.next(),this._onAnnounce.complete()}},this._announceDelay)})}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=v({type:i,selectors:[["mat-snack-bar-container"]],viewQuery:function(t,n){if(t&1&&oe(ce,7)(Ha,7),t&2){let o;I(o=D())&&(n._portalOutlet=o.first),I(o=D())&&(n._label=o.first)}},hostAttrs:[1,"mdc-snackbar","mat-mdc-snack-bar-container"],hostVars:6,hostBindings:function(t,n){t&1&&u("animationend",function(c){return n.onAnimationEnd(c.animationName)})("animationcancel",function(c){return n.onAnimationEnd(c.animationName)}),t&2&&k("mat-snack-bar-container-enter",n._animationState==="visible")("mat-snack-bar-container-exit",n._animationState==="hidden")("mat-snack-bar-container-animations-enabled",!n._animationsDisabled)},features:[U],decls:6,vars:3,consts:[["label",""],[1,"mdc-snackbar__surface","mat-mdc-snackbar-surface"],[1,"mat-mdc-snack-bar-label"],["aria-hidden","true"],["cdkPortalOutlet",""]],template:function(t,n){t&1&&(r(0,"div",1)(1,"div",2,0)(3,"div",3),K(4,Va,0,0,"ng-template",4),s(),F(5,"div"),s()()),t&2&&(d(5),R("aria-live",n._live)("role",n._role)("id",n._liveElementId))},dependencies:[ce],styles:[`@keyframes _mat-snack-bar-enter {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes _mat-snack-bar-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-snack-bar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  margin: 8px;
}
.mat-mdc-snack-bar-handset .mat-mdc-snack-bar-container {
  width: 100vw;
}

.mat-snack-bar-container-animations-enabled {
  opacity: 0;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-fallback-visible {
  opacity: 1;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-enter {
  animation: _mat-snack-bar-enter 150ms cubic-bezier(0, 0, 0.2, 1) forwards;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-exit {
  animation: _mat-snack-bar-exit 75ms cubic-bezier(0.4, 0, 1, 1) forwards;
}

.mat-mdc-snackbar-surface {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding-left: 0;
  padding-right: 8px;
}
[dir=rtl] .mat-mdc-snackbar-surface {
  padding-right: 0;
  padding-left: 8px;
}
.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
  min-width: 344px;
  max-width: 672px;
}
.mat-mdc-snack-bar-handset .mat-mdc-snackbar-surface {
  width: 100%;
  min-width: 0;
}
@media (forced-colors: active) {
  .mat-mdc-snackbar-surface {
    outline: solid 1px;
  }
}
.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
  color: var(--mat-snack-bar-supporting-text-color, var(--mat-sys-inverse-on-surface));
  border-radius: var(--mat-snack-bar-container-shape, var(--mat-sys-corner-extra-small));
  background-color: var(--mat-snack-bar-container-color, var(--mat-sys-inverse-surface));
}

.mdc-snackbar__label {
  width: 100%;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  padding: 14px 8px 14px 16px;
}
[dir=rtl] .mdc-snackbar__label {
  padding-left: 8px;
  padding-right: 16px;
}
.mat-mdc-snack-bar-container .mdc-snackbar__label {
  font-family: var(--mat-snack-bar-supporting-text-font, var(--mat-sys-body-medium-font));
  font-size: var(--mat-snack-bar-supporting-text-size, var(--mat-sys-body-medium-size));
  font-weight: var(--mat-snack-bar-supporting-text-weight, var(--mat-sys-body-medium-weight));
  line-height: var(--mat-snack-bar-supporting-text-line-height, var(--mat-sys-body-medium-line-height));
}

.mat-mdc-snack-bar-actions {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  box-sizing: border-box;
}

.mat-mdc-snack-bar-handset,
.mat-mdc-snack-bar-container,
.mat-mdc-snack-bar-label {
  flex: 1 1 auto;
}

.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled).mat-unthemed {
  color: var(--mat-snack-bar-button-color, var(--mat-sys-inverse-primary));
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) {
  --mat-button-text-state-layer-color: currentColor;
  --mat-button-text-ripple-color: currentColor;
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element {
  opacity: 0.1;
}
`],encapsulation:2})}return i})(),Qa=new E("mat-snack-bar-default-options",{providedIn:"root",factory:()=>new ft}),yn=(()=>{class i{_live=l(Ii);_injector=l(z);_breakpointObserver=l(ki);_parentSnackBar=l(i,{optional:!0,skipSelf:!0});_defaultConfig=l(Qa);_animationsDisabled=te();_snackBarRefAtThisLevel=null;simpleSnackBarComponent=Zi;snackBarContainerComponent=Wa;handsetCssClass="mat-mdc-snack-bar-handset";get _openedSnackBarRef(){let e=this._parentSnackBar;return e?e._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(e){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=e:this._snackBarRefAtThisLevel=e}constructor(){}openFromComponent(e,t){return this._attach(e,t)}openFromTemplate(e,t){return this._attach(e,t)}open(e,t="",n){let o=H(H({},this._defaultConfig),n);return o.data={message:e,action:t},o.announcementMessage===e&&(o.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,o)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss()}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss()}_attachSnackBarContainer(e,t){let n=t&&t.viewContainerRef&&t.viewContainerRef.injector,o=z.create({parent:n||this._injector,providers:[{provide:ft,useValue:t}]}),c=new ht(this.snackBarContainerComponent,t.viewContainerRef,o),h=e.attach(c);return h.instance.snackBarConfig=t,h.instance}_attach(e,t){let n=H(H(H({},new ft),this._defaultConfig),t),o=this._createOverlay(n),c=this._attachSnackBarContainer(o,n),h=new Dt(c,o);if(e instanceof Ce){let C=new We(e,null,{$implicit:n.data,snackBarRef:h});h.instance=c.attachTemplatePortal(C)}else{let C=this._createInjector(n,h),W=new ht(e,void 0,C),Me=c.attachComponentPortal(W);h.instance=Me.instance}return this._breakpointObserver.observe(Si.HandsetPortrait).pipe(Je(o.detachments())).subscribe(C=>{o.overlayElement.classList.toggle(this.handsetCssClass,C.matches)}),n.announcementMessage&&c._onAnnounce.subscribe(()=>{this._live.announce(n.announcementMessage,n.politeness)}),this._animateSnackBar(h,n),this._openedSnackBarRef=h,this._openedSnackBarRef}_animateSnackBar(e,t){e.afterDismissed().subscribe(()=>{this._openedSnackBarRef==e&&(this._openedSnackBarRef=null),t.announcementMessage&&this._live.clear()}),t.duration&&t.duration>0&&e.afterOpened().subscribe(()=>e._dismissAfter(t.duration)),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{e.containerInstance.enter()}),this._openedSnackBarRef.dismiss()):e.containerInstance.enter()}_createOverlay(e){let t=new Ut;t.direction=e.direction;let n=bt(this._injector),o=e.direction==="rtl",c=e.horizontalPosition==="left"||e.horizontalPosition==="start"&&!o||e.horizontalPosition==="end"&&o,h=!c&&e.horizontalPosition!=="center";return c?n.left("0"):h?n.right("0"):n.centerHorizontally(),e.verticalPosition==="top"?n.top("0"):n.bottom("0"),t.positionStrategy=n,t.disableAnimations=this._animationsDisabled,Gt(this._injector,t)}_createInjector(e,t){let n=e&&e.viewContainerRef&&e.viewContainerRef.injector;return z.create({parent:n||this._injector,providers:[{provide:Dt,useValue:t},{provide:Gi,useValue:e.data}]})}static \u0275fac=function(t){return new(t||i)};static \u0275prov=Fe({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();var Xi=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=j({type:i});static \u0275inj=V({providers:[yn],imports:[_t,Ee,$,Zi,ne]})}return i})();var Ua=["*",[["mat-toolbar-row"]]],Ga=["*","mat-toolbar-row"],Za=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275dir=P({type:i,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"]})}return i})(),Ki=(()=>{class i{_elementRef=l(B);_platform=l(Se);_document=l(de);color;_toolbarRows;constructor(){}ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()))}_checkToolbarMixedModes(){this._toolbarRows.length}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=v({type:i,selectors:[["mat-toolbar"]],contentQueries:function(t,n,o){if(t&1&&De(o,Za,5),t&2){let c;I(c=D())&&(n._toolbarRows=c)}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(t,n){t&2&&(ke(n.color?"mat-"+n.color:""),k("mat-toolbar-multiple-rows",n._toolbarRows.length>0)("mat-toolbar-single-row",n._toolbarRows.length===0))},inputs:{color:"color"},exportAs:["matToolbar"],ngContentSelectors:Ga,decls:2,vars:0,template:function(t,n){t&1&&(Y(Ua),N(0),N(1,1))},styles:[`.mat-toolbar {
  background: var(--mat-toolbar-container-background-color, var(--mat-sys-surface));
  color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
}
.mat-toolbar, .mat-toolbar h1, .mat-toolbar h2, .mat-toolbar h3, .mat-toolbar h4, .mat-toolbar h5, .mat-toolbar h6 {
  font-family: var(--mat-toolbar-title-text-font, var(--mat-sys-title-large-font));
  font-size: var(--mat-toolbar-title-text-size, var(--mat-sys-title-large-size));
  line-height: var(--mat-toolbar-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-weight: var(--mat-toolbar-title-text-weight, var(--mat-sys-title-large-weight));
  letter-spacing: var(--mat-toolbar-title-text-tracking, var(--mat-sys-title-large-tracking));
  margin: 0;
}
@media (forced-colors: active) {
  .mat-toolbar {
    outline: solid 1px;
  }
}
.mat-toolbar .mat-form-field-underline,
.mat-toolbar .mat-form-field-ripple,
.mat-toolbar .mat-focused .mat-form-field-ripple {
  background-color: currentColor;
}
.mat-toolbar .mat-form-field-label,
.mat-toolbar .mat-focused .mat-form-field-label,
.mat-toolbar .mat-select-value,
.mat-toolbar .mat-select-arrow,
.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {
  color: inherit;
}
.mat-toolbar .mat-input-element {
  caret-color: currentColor;
}
.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed {
  --mat-button-text-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
  --mat-button-outlined-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
}

.mat-toolbar-row, .mat-toolbar-single-row {
  display: flex;
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  height: var(--mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-row, .mat-toolbar-single-row {
    height: var(--mat-toolbar-mobile-height, 56px);
  }
}

.mat-toolbar-multiple-rows {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  min-height: var(--mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-multiple-rows {
    min-height: var(--mat-toolbar-mobile-height, 56px);
  }
}
`],encapsulation:2,changeDetection:0})}return i})();var Yi=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=j({type:i});static \u0275inj=V({imports:[ne]})}return i})();var Ji={white:"#e0e0e0",green:"#4caf50",yellow:"#ffc107"};function ea(i,a){let e=Array(a).fill("white");for(let t=0;t<i;t++){let n=e.indexOf("green");if(n!==-1)e[n]="yellow";else{let o=e.indexOf("white");o!==-1?e[o]="green":e.push("green")}}return e}function Ka(i,a){if(i&1&&Lt(0,"span",2),i&2){let e=a.$implicit,t=p();Oe("background-color",t.dieColor(e))}}var gt=class i{score=kt.required();baseDice=kt(5);dice=se(()=>ea(this.score(),this.baseDice()));dieColor(a){return Ji[a]}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=v({type:i,selectors:[["app-dice-tooltip"]],inputs:{score:[1,"score"],baseDice:[1,"baseDice"]},decls:3,vars:0,consts:[[1,"dice-row"],[1,"die",3,"background-color"],[1,"die"]],template:function(e,t){e&1&&(st(0,"div",0),w(1,Ka,1,2,"span",1,ti),yt()),e&2&&(d(),M(t.dice()))},styles:[".dice-row[_ngcontent-%COMP%]{display:flex;gap:4px;padding:6px 8px;background:var(--mat-sys-surface);border:1px solid var(--mat-sys-outline-variant);border-radius:6px;box-shadow:0 2px 8px #00000026}.die[_ngcontent-%COMP%]{width:16px;height:16px;border-radius:4px;display:inline-block;flex-shrink:0}"]})};var Ya=["confirmImportTemplate"];function Ja(i,a){i&1&&(r(0,"h2",9),m(1,"Import Character"),s(),r(2,"mat-dialog-content"),m(3," Importing will overwrite your current character. This cannot be undone. "),s(),r(4,"mat-dialog-actions",10)(5,"button",11),m(6,"Cancel"),s(),r(7,"button",12),m(8,"Import Anyway"),s()()),i&2&&(d(5),g("mat-dialog-close",!1),d(2),g("mat-dialog-close",!0))}function eo(i,a){if(i&1&&(r(0,"div",33),F(1,"app-dice-tooltip",35),s()),i&2){let e=p();d(),g("score",e.armorRating)("baseDice",4)}}function to(i,a){if(i&1){let e=T();r(0,"div",8)(1,"div",13)(2,"div",14)(3,"mat-form-field",15)(4,"mat-label"),m(5,"Name"),s(),r(6,"input",16),u("blur",function(n){b(e);let o=p();return _(o.onNameBlur(n))}),s()(),r(7,"div",17)(8,"span",18),m(9,"Species"),s(),r(10,"span",19),m(11),s()(),r(12,"mat-form-field",15)(13,"mat-label"),m(14,"Level"),s(),r(15,"input",20),u("blur",function(n){b(e);let o=p();return _(o.onLevelBlur(n))}),s()(),r(16,"mat-form-field",15)(17,"mat-label"),m(18,"XP"),s(),r(19,"input",21),u("blur",function(n){b(e);let o=p();return _(o.onXpBlur(n))}),s()()(),r(20,"div",22)(21,"div",23)(22,"span",24),m(23,"Wounds"),s(),r(24,"div",25)(25,"input",26),u("blur",function(n){b(e);let o=p();return _(o.onCurrentWoundsBlur(n))}),s(),r(26,"span",27),m(27,"+"),s(),r(28,"input",28),u("blur",function(n){b(e);let o=p();return _(o.onTemporaryWoundsBlur(n))}),s(),r(29,"span",27),m(30,"/"),s(),r(31,"span",29),m(32),s()()(),r(33,"div",23)(34,"span",24),m(35,"Encounter Power"),s(),r(36,"div",25)(37,"input",26),u("blur",function(n){b(e);let o=p();return _(o.onEncounterPowerBlur(n))}),s(),r(38,"span",27),m(39,"/"),s(),r(40,"span",29),m(41),s()()(),r(42,"div",23)(43,"span",24),m(44,"Healing Surges"),s(),r(45,"div",25)(46,"input",26),u("blur",function(n){b(e);let o=p();return _(o.onHealingSurgesBlur(n))}),s(),r(47,"span",27),m(48,"/"),s(),r(49,"span",29),m(50),s()()(),r(51,"div",23)(52,"span",24),m(53,"Generic Spell Power"),s(),r(54,"div",25)(55,"input",26),u("blur",function(n){b(e);let o=p();return _(o.onGenericSpellPowerBlur(n))}),s(),r(56,"span",27),m(57,"/"),s(),r(58,"span",29),m(59),s()()(),r(60,"div",23)(61,"span",24),m(62,"Evocation Spell Power"),s(),r(63,"div",25)(64,"input",26),u("blur",function(n){b(e);let o=p();return _(o.onEvocationSpellPowerBlur(n))}),s(),r(65,"span",27),m(66,"/"),s(),r(67,"span",29),m(68),s()()(),r(69,"div",23)(70,"span",24),m(71,"Occult Spell Power"),s(),r(72,"div",25)(73,"input",26),u("blur",function(n){b(e);let o=p();return _(o.onOccultSpellPowerBlur(n))}),s(),r(74,"span",27),m(75,"/"),s(),r(76,"span",29),m(77),s()()(),r(78,"div",23)(79,"span",24),m(80,"Divine Spell Power"),s(),r(81,"div",25)(82,"input",26),u("blur",function(n){b(e);let o=p();return _(o.onDivineSpellPowerBlur(n))}),s(),r(83,"span",27),m(84,"/"),s(),r(85,"span",29),m(86),s()()()()(),r(87,"div",30)(88,"div",31),u("mouseenter",function(){b(e);let n=p();return _(n.armorHovered=!0)})("mouseleave",function(){b(e);let n=p();return _(n.armorHovered=!1)}),r(89,"mat-form-field",32)(90,"mat-label"),m(91,"Armor Rating"),s(),r(92,"input",21),u("blur",function(n){b(e);let o=p();return _(o.onArmorRatingBlur(n))}),s()(),x(93,eo,2,2,"div",33),s(),r(94,"div",34)(95,"span",18),m(96,"Move Speed"),s(),r(97,"span",19),m(98),s()()()()}if(i&2){let e=a,t=p();d(6),g("value",e.name),d(5),f(t.speciesName(e)),d(4),g("value",e.level),d(4),g("value",e.xp),d(6),g("value",e.currentWounds),d(3),g("value",e.temporaryWounds),d(4),f(t.svc.getMaxWounds(e)),d(5),g("value",e.currentEncounterPower),d(4),f(t.svc.getMaxEncounterPower(e)),d(5),g("value",e.currentHealingSurges),d(4),f(t.svc.getMaxHealingSurges(e)),d(5),g("value",e.currentGenericSpellPower),d(4),f(t.svc.getMaxGenericSpellPower(e)),d(5),g("value",e.currentEvocationSpellPower),d(4),f(t.svc.getMaxEvocationSpellPower(e)),d(5),g("value",e.currentOccultSpellPower),d(4),f(t.svc.getMaxOccultSpellPower(e)),d(5),g("value",e.currentDivineSpellPower),d(4),f(t.svc.getMaxDivineSpellPower(e)),d(6),g("value",e.armorRating),d(),y(t.armorHovered?93:-1),d(5),f(t.svc.getMoveSpeed(e))}}var Yt=class i{svc=l(pe);staticData=l(me);dialog=l(_e);snackBar=l(yn);confirmTemplate=li.required("confirmImportTemplate");character=ue(this.svc.character$);armorHovered=!1;pendingFile=null;speciesName(a){return this.staticData.getSpeciesById(a.speciesId)?.name??""}onNameBlur(a){this.svc.updateName(a.target.value)}onLevelBlur(a){let e=+a.target.value;isNaN(e)||this.svc.updateLevel(e)}onXpBlur(a){let e=+a.target.value;isNaN(e)||this.svc.updateXp(e)}onCurrentWoundsBlur(a){let e=+a.target.value;isNaN(e)||this.svc.updateCurrentWounds(e)}onTemporaryWoundsBlur(a){let e=+a.target.value;isNaN(e)||this.svc.updateTemporaryWounds(e)}onEncounterPowerBlur(a){let e=+a.target.value;isNaN(e)||this.svc.updateCurrentEncounterPower(e)}onHealingSurgesBlur(a){let e=+a.target.value;isNaN(e)||this.svc.updateCurrentHealingSurges(e)}onGenericSpellPowerBlur(a){let e=+a.target.value;isNaN(e)||this.svc.updateCurrentGenericSpellPower(e)}onEvocationSpellPowerBlur(a){let e=+a.target.value;isNaN(e)||this.svc.updateCurrentEvocationSpellPower(e)}onOccultSpellPowerBlur(a){let e=+a.target.value;isNaN(e)||this.svc.updateCurrentOccultSpellPower(e)}onDivineSpellPowerBlur(a){let e=+a.target.value;isNaN(e)||this.svc.updateCurrentDivineSpellPower(e)}onArmorRatingBlur(a){let e=+a.target.value;isNaN(e)||this.svc.updateArmorRating(e)}async onImportFileSelected(a){let e=a.target,t=e.files?.[0];if(e.value="",!t)return;this.pendingFile=t;let n=this.dialog.open(this.confirmTemplate(),{width:"380px"});if(!await zn(n.afterClosed())){this.pendingFile=null;return}try{await this.svc.importCharacter(this.pendingFile),this.snackBar.open("Character imported.",void 0,{duration:3e3})}catch{this.snackBar.open("Import failed: invalid character file.",void 0,{duration:4e3})}this.pendingFile=null}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=v({type:i,selectors:[["app-header"]],viewQuery:function(e,t){e&1&&ni(t.confirmTemplate,Ya,5),e&2&&ii()},decls:15,vars:1,consts:[["confirmImportTemplate",""],["fileInput",""],[1,"app-toolbar"],[1,"app-title"],[1,"toolbar-spacer"],["mat-button","","routerLink","/new"],["mat-button","",3,"click"],["type","file","accept",".json",1,"hidden-file-input",3,"change"],[1,"header-body"],["mat-dialog-title",""],["align","end"],["mat-button","",3,"mat-dialog-close"],["mat-button","","color","warn",3,"mat-dialog-close"],[1,"header-grid"],[1,"identity-col"],["appearance","outline","subscriptSizing","dynamic"],["matInput","",3,"blur","value"],[1,"species-row"],[1,"field-label"],[1,"field-value"],["matInput","","type","number","min","1",3,"blur","value"],["matInput","","type","number","min","0",3,"blur","value"],[1,"stats-col"],[1,"stat-row"],[1,"stat-label"],[1,"stat-values"],["type","number","min","0",1,"stat-input",3,"blur","value"],[1,"stat-sep"],["type","number","min","0","title","Temporary wounds",1,"stat-input","stat-input--temp",3,"blur","value"],[1,"stat-max"],[1,"standalone-row"],[1,"armor-hover-wrap",3,"mouseenter","mouseleave"],["appearance","outline","subscriptSizing","dynamic",1,"standalone-field"],[1,"dice-tooltip-anchor"],[1,"standalone-readonly"],[3,"score","baseDice"]],template:function(e,t){if(e&1){let n=T();K(0,Ja,9,2,"ng-template",null,0,ci),r(2,"mat-toolbar",2)(3,"span",3),m(4,"Farhome Character Sheet"),s(),F(5,"span",4),r(6,"button",5),m(7,"New Character"),s(),r(8,"button",6),u("click",function(){return t.svc.exportCharacter()}),m(9,"Export"),s(),r(10,"button",6),u("click",function(){b(n);let c=tt(13);return _(c.click())}),m(11,"Import"),s(),r(12,"input",7,1),u("change",function(c){return t.onImportFileSelected(c)}),s()(),x(14,to,99,22,"div",8)}if(e&2){let n;d(14),y((n=t.character())?14:-1,n)}},dependencies:[pi,gt,$,Z,Xe,Wi,Ue,Ze,Ge,je,ze,Ve,$e,qe,Xi,Yi,Ki],styles:[".app-toolbar[_ngcontent-%COMP%]{position:sticky;top:0;z-index:100}.app-title[_ngcontent-%COMP%]{font-size:1.1rem;font-weight:500}.toolbar-spacer[_ngcontent-%COMP%]{flex:1}.hidden-file-input[_ngcontent-%COMP%]{display:none}.header-body[_ngcontent-%COMP%]{padding:16px 24px 8px;border-bottom:1px solid var(--mat-sys-outline-variant)}.header-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;gap:16px 32px}.identity-col[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px}.identity-col[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:100%}.species-row[_ngcontent-%COMP%]{display:flex;align-items:baseline;gap:8px;padding:4px 0}.stats-col[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:6px}.stat-row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px}.stat-label[_ngcontent-%COMP%]{min-width:160px;font-size:.875rem;color:var(--mat-sys-on-surface-variant);flex-shrink:0}.stat-values[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px}.stat-input[_ngcontent-%COMP%]{width:52px;text-align:center;padding:4px 6px;border:1px solid var(--mat-sys-outline);border-radius:4px;background:transparent;color:var(--mat-sys-on-surface);font:inherit;font-size:.9375rem}.stat-input[_ngcontent-%COMP%]:focus{outline:2px solid var(--mat-sys-primary);outline-offset:-1px;border-color:transparent}.stat-input--temp[_ngcontent-%COMP%]{border-style:dashed;color:var(--mat-sys-on-surface-variant)}.stat-sep[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant);font-size:.9375rem;-webkit-user-select:none;user-select:none}.stat-max[_ngcontent-%COMP%]{font-weight:600;font-size:.9375rem;min-width:24px}.field-label[_ngcontent-%COMP%]{font-size:.75rem;color:var(--mat-sys-on-surface-variant);text-transform:uppercase;letter-spacing:.04em}.field-value[_ngcontent-%COMP%]{font-size:.9375rem;font-weight:500}.standalone-row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:32px;padding-top:8px}.standalone-field[_ngcontent-%COMP%]{width:160px}.armor-hover-wrap[_ngcontent-%COMP%]{position:relative}.dice-tooltip-anchor[_ngcontent-%COMP%]{position:absolute;bottom:calc(100% + 6px);left:50%;transform:translate(-50%);z-index:100;pointer-events:none;white-space:nowrap}.standalone-readonly[_ngcontent-%COMP%]{display:flex;align-items:baseline;gap:8px}"]})};var En=["*"];function no(i,a){i&1&&N(0)}var io=["tabListContainer"],ao=["tabList"],oo=["tabListInner"],ro=["nextPaginator"],so=["previousPaginator"],co=["content"];function lo(i,a){}var mo=["tabBodyWrapper"],po=["tabHeader"];function uo(i,a){}function ho(i,a){if(i&1&&K(0,uo,0,0,"ng-template",12),i&2){let e=p().$implicit;g("cdkPortalOutlet",e.templateLabel)}}function bo(i,a){if(i&1&&m(0),i&2){let e=p().$implicit;f(e.textLabel)}}function _o(i,a){if(i&1){let e=T();r(0,"div",7,2),u("click",function(){let n=b(e),o=n.$implicit,c=n.$index,h=p(),C=tt(1);return _(h._handleClick(o,C,c))})("cdkFocusChange",function(n){let o=b(e).$index,c=p();return _(c._tabFocusChanged(n,o))}),F(2,"span",8)(3,"div",9),r(4,"span",10)(5,"span",11),x(6,ho,1,1,null,12)(7,bo,1,1),s()()()}if(i&2){let e=a.$implicit,t=a.$index,n=tt(1),o=p();ke(e.labelClass),k("mdc-tab--active",o.selectedIndex===t),g("id",o._getTabLabelId(e,t))("disabled",e.disabled)("fitInkBarToContent",o.fitInkBarToContent),R("tabIndex",o._getTabIndex(t))("aria-posinset",t+1)("aria-setsize",o._tabs.length)("aria-controls",o._getTabContentId(t))("aria-selected",o.selectedIndex===t)("aria-label",e.ariaLabel||null)("aria-labelledby",!e.ariaLabel&&e.ariaLabelledby?e.ariaLabelledby:null),d(3),g("matRippleTrigger",n)("matRippleDisabled",e.disabled||o.disableRipple),d(3),y(e.templateLabel?6:7)}}function fo(i,a){i&1&&N(0)}function go(i,a){if(i&1){let e=T();r(0,"mat-tab-body",13),u("_onCentered",function(){b(e);let n=p();return _(n._removeTabBodyWrapperHeight())})("_onCentering",function(n){b(e);let o=p();return _(o._setTabBodyWrapperHeight(n))})("_beforeCentering",function(n){b(e);let o=p();return _(o._bodyCentered(n))}),s()}if(i&2){let e=a.$implicit,t=a.$index,n=p();ke(e.bodyClass),g("id",n._getTabContentId(t))("content",e.content)("position",e.position)("animationDuration",n.animationDuration)("preserveContent",n.preserveContent),R("tabindex",n.contentTabIndex!=null&&n.selectedIndex===t?n.contentTabIndex:null)("aria-labelledby",n._getTabLabelId(e,t))("aria-hidden",n.selectedIndex!==t)}}var vo=new E("MatTabContent"),xo=(()=>{class i{template=l(Ce);constructor(){}static \u0275fac=function(t){return new(t||i)};static \u0275dir=P({type:i,selectors:[["","matTabContent",""]],features:[re([{provide:vo,useExisting:i}])]})}return i})(),yo=new E("MatTabLabel"),aa=new E("MAT_TAB"),An=(()=>{class i extends Ri{_closestTab=l(aa,{optional:!0});static \u0275fac=(()=>{let e;return function(n){return(e||(e=ye(i)))(n||i)}})();static \u0275dir=P({type:i,selectors:[["","mat-tab-label",""],["","matTabLabel",""]],features:[re([{provide:yo,useExisting:i}]),U]})}return i})(),oa=new E("MAT_TAB_GROUP"),Pn=(()=>{class i{_viewContainerRef=l(Bt);_closestTabGroup=l(oa,{optional:!0});disabled=!1;get templateLabel(){return this._templateLabel}set templateLabel(e){this._setTemplateLabelInput(e)}_templateLabel;_explicitContent=void 0;_implicitContent;textLabel="";ariaLabel;ariaLabelledby;labelClass;bodyClass;id=null;_contentPortal=null;get content(){return this._contentPortal}_stateChanges=new O;position=null;origin=null;isActive=!1;constructor(){l(dt).load(pt)}ngOnChanges(e){(e.hasOwnProperty("textLabel")||e.hasOwnProperty("disabled"))&&this._stateChanges.next()}ngOnDestroy(){this._stateChanges.complete()}ngOnInit(){this._contentPortal=new We(this._explicitContent||this._implicitContent,this._viewContainerRef)}_setTemplateLabelInput(e){e&&e._closestTab===this&&(this._templateLabel=e)}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=v({type:i,selectors:[["mat-tab"]],contentQueries:function(t,n,o){if(t&1&&De(o,An,5)(o,xo,7,Ce),t&2){let c;I(c=D())&&(n.templateLabel=c.first),I(c=D())&&(n._explicitContent=c.first)}},viewQuery:function(t,n){if(t&1&&oe(Ce,7),t&2){let o;I(o=D())&&(n._implicitContent=o.first)}},hostAttrs:["hidden",""],hostVars:1,hostBindings:function(t,n){t&2&&R("id",null)},inputs:{disabled:[2,"disabled","disabled",S],textLabel:[0,"label","textLabel"],ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],labelClass:"labelClass",bodyClass:"bodyClass",id:"id"},exportAs:["matTab"],features:[re([{provide:aa,useExisting:i}]),xe],ngContentSelectors:En,decls:1,vars:0,template:function(t,n){t&1&&(Y(),Jn(0,no,1,0,"ng-template"))},encapsulation:2})}return i})(),Tn="mdc-tab-indicator--active",ta="mdc-tab-indicator--no-transition",wn=class{_items;_currentItem;constructor(a){this._items=a}hide(){this._items.forEach(a=>a.deactivateInkBar()),this._currentItem=void 0}alignToElement(a){let e=this._items.find(n=>n.elementRef.nativeElement===a),t=this._currentItem;if(e!==t&&(t?.deactivateInkBar(),e)){let n=t?.elementRef.nativeElement.getBoundingClientRect?.();e.activateInkBar(n),this._currentItem=e}}},Co=(()=>{class i{_elementRef=l(B);_inkBarElement=null;_inkBarContentElement=null;_fitToContent=!1;get fitInkBarToContent(){return this._fitToContent}set fitInkBarToContent(e){this._fitToContent!==e&&(this._fitToContent=e,this._inkBarElement&&this._appendInkBarElement())}activateInkBar(e){let t=this._elementRef.nativeElement;if(!e||!t.getBoundingClientRect||!this._inkBarContentElement){t.classList.add(Tn);return}let n=t.getBoundingClientRect(),o=e.width/n.width,c=e.left-n.left;t.classList.add(ta),this._inkBarContentElement.style.setProperty("transform",`translateX(${c}px) scaleX(${o})`),t.getBoundingClientRect(),t.classList.remove(ta),t.classList.add(Tn),this._inkBarContentElement.style.setProperty("transform","")}deactivateInkBar(){this._elementRef.nativeElement.classList.remove(Tn)}ngOnInit(){this._createInkBarElement()}ngOnDestroy(){this._inkBarElement?.remove(),this._inkBarElement=this._inkBarContentElement=null}_createInkBarElement(){let e=this._elementRef.nativeElement.ownerDocument||document,t=this._inkBarElement=e.createElement("span"),n=this._inkBarContentElement=e.createElement("span");t.className="mdc-tab-indicator",n.className="mdc-tab-indicator__content mdc-tab-indicator__content--underline",t.appendChild(this._inkBarContentElement),this._appendInkBarElement()}_appendInkBarElement(){this._inkBarElement;let e=this._fitToContent?this._elementRef.nativeElement.querySelector(".mdc-tab__content"):this._elementRef.nativeElement;e.appendChild(this._inkBarElement)}static \u0275fac=function(t){return new(t||i)};static \u0275dir=P({type:i,inputs:{fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",S]}})}return i})();var ra=(()=>{class i extends Co{elementRef=l(B);disabled=!1;focus(){this.elementRef.nativeElement.focus()}getOffsetLeft(){return this.elementRef.nativeElement.offsetLeft}getOffsetWidth(){return this.elementRef.nativeElement.offsetWidth}static \u0275fac=(()=>{let e;return function(n){return(e||(e=ye(i)))(n||i)}})();static \u0275dir=P({type:i,selectors:[["","matTabLabelWrapper",""]],hostVars:3,hostBindings:function(t,n){t&2&&(R("aria-disabled",!!n.disabled),k("mat-mdc-tab-disabled",n.disabled))},inputs:{disabled:[2,"disabled","disabled",S]},features:[U]})}return i})(),na={passive:!0},ko=650,To=100,wo=(()=>{class i{_elementRef=l(B);_changeDetectorRef=l(ee);_viewportRuler=l(Oi);_dir=l(ut,{optional:!0});_ngZone=l(ae);_platform=l(Se);_sharedResizeObserver=l(Ei);_injector=l(z);_renderer=l(et);_animationsDisabled=te();_eventCleanups;_scrollDistance=0;_selectedIndexChanged=!1;_destroyed=new O;_showPaginationControls=!1;_disableScrollAfter=!0;_disableScrollBefore=!0;_tabLabelCount;_scrollDistanceChanged=!1;_keyManager;_currentTextContent;_stopScrolling=new O;disablePagination=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(e){let t=isNaN(e)?0:e;this._selectedIndex!=t&&(this._selectedIndexChanged=!0,this._selectedIndex=t,this._keyManager&&this._keyManager.updateActiveItem(t))}_selectedIndex=0;selectFocusedIndex=new A;indexFocused=new A;constructor(){this._eventCleanups=this._ngZone.runOutsideAngular(()=>[this._renderer.listen(this._elementRef.nativeElement,"mouseleave",()=>this._stopInterval())])}ngAfterViewInit(){this._eventCleanups.push(this._renderer.listen(this._previousPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("before"),na),this._renderer.listen(this._nextPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("after"),na))}ngAfterContentInit(){let e=this._dir?this._dir.change:ge("ltr"),t=this._sharedResizeObserver.observe(this._elementRef.nativeElement).pipe(Wn(32),Je(this._destroyed)),n=this._viewportRuler.change(150).pipe(Je(this._destroyed)),o=()=>{this.updatePagination(),this._alignInkBarToSelectedTab()};this._keyManager=new jt(this._items).withHorizontalOrientation(this._getLayoutDirection()).withHomeAndEnd().withWrap().skipPredicate(()=>!1),this._keyManager.updateActiveItem(Math.max(this._selectedIndex,0)),Ie(o,{injector:this._injector}),Pe(e,n,t,this._items.changes,this._itemsResized()).pipe(Je(this._destroyed)).subscribe(()=>{this._ngZone.run(()=>{Promise.resolve().then(()=>{this._scrollDistance=Math.max(0,Math.min(this._getMaxScrollDistance(),this._scrollDistance)),o()})}),this._keyManager?.withHorizontalOrientation(this._getLayoutDirection())}),this._keyManager.change.subscribe(c=>{this.indexFocused.emit(c),this._setTabFocus(c)})}_itemsResized(){return typeof ResizeObserver!="function"?Et:this._items.changes.pipe(he(this._items),Zn(e=>new Hn(t=>this._ngZone.runOutsideAngular(()=>{let n=new ResizeObserver(o=>t.next(o));return e.forEach(o=>n.observe(o.elementRef.nativeElement)),()=>{n.disconnect()}}))),Gn(1),le(e=>e.some(t=>t.contentRect.width>0&&t.contentRect.height>0)))}ngAfterContentChecked(){this._tabLabelCount!=this._items.length&&(this.updatePagination(),this._tabLabelCount=this._items.length,this._changeDetectorRef.markForCheck()),this._selectedIndexChanged&&(this._scrollToLabel(this._selectedIndex),this._checkScrollingControls(),this._alignInkBarToSelectedTab(),this._selectedIndexChanged=!1,this._changeDetectorRef.markForCheck()),this._scrollDistanceChanged&&(this._updateTabScrollPosition(),this._scrollDistanceChanged=!1,this._changeDetectorRef.markForCheck())}ngOnDestroy(){this._eventCleanups.forEach(e=>e()),this._keyManager?.destroy(),this._destroyed.next(),this._destroyed.complete(),this._stopScrolling.complete()}_handleKeydown(e){if(!Ne(e))switch(e.keyCode){case 13:case 32:if(this.focusIndex!==this.selectedIndex){let t=this._items.get(this.focusIndex);t&&!t.disabled&&(this.selectFocusedIndex.emit(this.focusIndex),this._itemSelected(e))}break;default:this._keyManager?.onKeydown(e)}}_onContentChanges(){let e=this._elementRef.nativeElement.textContent;e!==this._currentTextContent&&(this._currentTextContent=e||"",this._ngZone.run(()=>{this.updatePagination(),this._alignInkBarToSelectedTab(),this._changeDetectorRef.markForCheck()}))}updatePagination(){this._checkPaginationEnabled(),this._checkScrollingControls(),this._updateTabScrollPosition()}get focusIndex(){return this._keyManager?this._keyManager.activeItemIndex:0}set focusIndex(e){!this._isValidIndex(e)||this.focusIndex===e||!this._keyManager||this._keyManager.setActiveItem(e)}_isValidIndex(e){return this._items?!!this._items.toArray()[e]:!0}_setTabFocus(e){if(this._showPaginationControls&&this._scrollToLabel(e),this._items&&this._items.length){this._items.toArray()[e].focus();let t=this._tabListContainer.nativeElement;this._getLayoutDirection()=="ltr"?t.scrollLeft=0:t.scrollLeft=t.scrollWidth-t.offsetWidth}}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_updateTabScrollPosition(){if(this.disablePagination)return;let e=this.scrollDistance,t=this._getLayoutDirection()==="ltr"?-e:e;this._tabList.nativeElement.style.transform=`translateX(${Math.round(t)}px)`,(this._platform.TRIDENT||this._platform.EDGE)&&(this._tabListContainer.nativeElement.scrollLeft=0)}get scrollDistance(){return this._scrollDistance}set scrollDistance(e){this._scrollTo(e)}_scrollHeader(e){let t=this._tabListContainer.nativeElement.offsetWidth,n=(e=="before"?-1:1)*t/3;return this._scrollTo(this._scrollDistance+n)}_handlePaginatorClick(e){this._stopInterval(),this._scrollHeader(e)}_scrollToLabel(e){if(this.disablePagination)return;let t=this._items?this._items.toArray()[e]:null;if(!t)return;let n=this._tabListContainer.nativeElement.offsetWidth,{offsetLeft:o,offsetWidth:c}=t.elementRef.nativeElement,h,C;this._getLayoutDirection()=="ltr"?(h=o,C=h+c):(C=this._tabListInner.nativeElement.offsetWidth-o,h=C-c);let W=this.scrollDistance,Me=this.scrollDistance+n;h<W?this.scrollDistance-=W-h:C>Me&&(this.scrollDistance+=Math.min(C-Me,h-W))}_checkPaginationEnabled(){if(this.disablePagination)this._showPaginationControls=!1;else{let e=this._tabListInner.nativeElement.scrollWidth,t=this._elementRef.nativeElement.offsetWidth,n=e-t>=5;n||(this.scrollDistance=0),n!==this._showPaginationControls&&(this._showPaginationControls=n,this._changeDetectorRef.markForCheck())}}_checkScrollingControls(){this.disablePagination?this._disableScrollAfter=this._disableScrollBefore=!0:(this._disableScrollBefore=this.scrollDistance==0,this._disableScrollAfter=this.scrollDistance==this._getMaxScrollDistance(),this._changeDetectorRef.markForCheck())}_getMaxScrollDistance(){let e=this._tabListInner.nativeElement.scrollWidth,t=this._tabListContainer.nativeElement.offsetWidth;return e-t||0}_alignInkBarToSelectedTab(){let e=this._items&&this._items.length?this._items.toArray()[this.selectedIndex]:null,t=e?e.elementRef.nativeElement:null;t?this._inkBar.alignToElement(t):this._inkBar.hide()}_stopInterval(){this._stopScrolling.next()}_handlePaginatorPress(e,t){t&&t.button!=null&&t.button!==0||(this._stopInterval(),qn(ko,To).pipe(Je(Pe(this._stopScrolling,this._destroyed))).subscribe(()=>{let{maxScrollDistance:n,distance:o}=this._scrollHeader(e);(o===0||o>=n)&&this._stopInterval()}))}_scrollTo(e){if(this.disablePagination)return{maxScrollDistance:0,distance:0};let t=this._getMaxScrollDistance();return this._scrollDistance=Math.max(0,Math.min(t,e)),this._scrollDistanceChanged=!0,this._checkScrollingControls(),{maxScrollDistance:t,distance:this._scrollDistance}}static \u0275fac=function(t){return new(t||i)};static \u0275dir=P({type:i,inputs:{disablePagination:[2,"disablePagination","disablePagination",S],selectedIndex:[2,"selectedIndex","selectedIndex",Le]},outputs:{selectFocusedIndex:"selectFocusedIndex",indexFocused:"indexFocused"}})}return i})(),Mo=(()=>{class i extends wo{_items;_tabListContainer;_tabList;_tabListInner;_nextPaginator;_previousPaginator;_inkBar;ariaLabel;ariaLabelledby;disableRipple=!1;ngAfterContentInit(){this._inkBar=new wn(this._items),super.ngAfterContentInit()}_itemSelected(e){e.preventDefault()}static \u0275fac=(()=>{let e;return function(n){return(e||(e=ye(i)))(n||i)}})();static \u0275cmp=v({type:i,selectors:[["mat-tab-header"]],contentQueries:function(t,n,o){if(t&1&&De(o,ra,4),t&2){let c;I(c=D())&&(n._items=c)}},viewQuery:function(t,n){if(t&1&&oe(io,7)(ao,7)(oo,7)(ro,5)(so,5),t&2){let o;I(o=D())&&(n._tabListContainer=o.first),I(o=D())&&(n._tabList=o.first),I(o=D())&&(n._tabListInner=o.first),I(o=D())&&(n._nextPaginator=o.first),I(o=D())&&(n._previousPaginator=o.first)}},hostAttrs:[1,"mat-mdc-tab-header"],hostVars:4,hostBindings:function(t,n){t&2&&k("mat-mdc-tab-header-pagination-controls-enabled",n._showPaginationControls)("mat-mdc-tab-header-rtl",n._getLayoutDirection()=="rtl")},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],disableRipple:[2,"disableRipple","disableRipple",S]},features:[U],ngContentSelectors:En,decls:13,vars:10,consts:[["previousPaginator",""],["tabListContainer",""],["tabList",""],["tabListInner",""],["nextPaginator",""],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-before",3,"click","mousedown","touchend","matRippleDisabled"],[1,"mat-mdc-tab-header-pagination-chevron"],[1,"mat-mdc-tab-label-container",3,"keydown"],["role","tablist",1,"mat-mdc-tab-list",3,"cdkObserveContent"],[1,"mat-mdc-tab-labels"],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-after",3,"mousedown","click","touchend","matRippleDisabled"]],template:function(t,n){t&1&&(Y(),r(0,"div",5,0),u("click",function(){return n._handlePaginatorClick("before")})("mousedown",function(c){return n._handlePaginatorPress("before",c)})("touchend",function(){return n._stopInterval()}),F(2,"div",6),s(),r(3,"div",7,1),u("keydown",function(c){return n._handleKeydown(c)}),r(5,"div",8,2),u("cdkObserveContent",function(){return n._onContentChanges()}),r(7,"div",9,3),N(9),s()()(),r(10,"div",10,4),u("mousedown",function(c){return n._handlePaginatorPress("after",c)})("click",function(){return n._handlePaginatorClick("after")})("touchend",function(){return n._stopInterval()}),F(12,"div",6),s()),t&2&&(k("mat-mdc-tab-header-pagination-disabled",n._disableScrollBefore),g("matRippleDisabled",n._disableScrollBefore||n.disableRipple),d(3),k("_mat-animation-noopable",n._animationsDisabled),d(2),R("aria-label",n.ariaLabel||null)("aria-labelledby",n.ariaLabelledby||null),d(5),k("mat-mdc-tab-header-pagination-disabled",n._disableScrollAfter),g("matRippleDisabled",n._disableScrollAfter||n.disableRipple))},dependencies:[wt,Ti],styles:[`.mat-mdc-tab-header {
  display: flex;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.mdc-tab-indicator .mdc-tab-indicator__content {
  transition-duration: var(--mat-tab-animation-duration, 250ms);
}

.mat-mdc-tab-header-pagination {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: none;
  justify-content: center;
  align-items: center;
  min-width: 32px;
  cursor: pointer;
  z-index: 2;
  -webkit-tap-highlight-color: transparent;
  touch-action: none;
  box-sizing: content-box;
  outline: 0;
}
.mat-mdc-tab-header-pagination::-moz-focus-inner {
  border: 0;
}
.mat-mdc-tab-header-pagination .mat-ripple-element {
  opacity: 0.12;
  background-color: var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination {
  display: flex;
}

.mat-mdc-tab-header-pagination-before,
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after {
  padding-left: 4px;
}
.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron {
  transform: rotate(-135deg);
}

.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,
.mat-mdc-tab-header-pagination-after {
  padding-right: 4px;
}
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron {
  transform: rotate(45deg);
}

.mat-mdc-tab-header-pagination-chevron {
  border-style: solid;
  border-width: 2px 2px 0 0;
  height: 8px;
  width: 8px;
  border-color: var(--mat-tab-pagination-icon-color, var(--mat-sys-on-surface));
}

.mat-mdc-tab-header-pagination-disabled {
  box-shadow: none;
  cursor: default;
  pointer-events: none;
}
.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron {
  opacity: 0.4;
}

.mat-mdc-tab-list {
  flex-grow: 1;
  position: relative;
  transition: transform 500ms cubic-bezier(0.35, 0, 0.25, 1);
}
._mat-animation-noopable .mat-mdc-tab-list {
  transition: none;
}

.mat-mdc-tab-label-container {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  z-index: 1;
  border-bottom-style: solid;
  border-bottom-width: var(--mat-tab-divider-height, 1px);
  border-bottom-color: var(--mat-tab-divider-color, var(--mat-sys-surface-variant));
}
.mat-mdc-tab-group-inverted-header .mat-mdc-tab-label-container {
  border-bottom: none;
  border-top-style: solid;
  border-top-width: var(--mat-tab-divider-height, 1px);
  border-top-color: var(--mat-tab-divider-color, var(--mat-sys-surface-variant));
}

.mat-mdc-tab-labels {
  display: flex;
  flex: 1 0 auto;
}
[mat-align-tabs=center] > .mat-mdc-tab-header .mat-mdc-tab-labels {
  justify-content: center;
}
[mat-align-tabs=end] > .mat-mdc-tab-header .mat-mdc-tab-labels {
  justify-content: flex-end;
}
.cdk-drop-list .mat-mdc-tab-labels, .mat-mdc-tab-labels.cdk-drop-list {
  min-height: var(--mat-tab-container-height, 48px);
}

.mat-mdc-tab::before {
  margin: 5px;
}
@media (forced-colors: active) {
  .mat-mdc-tab[aria-disabled=true] {
    color: GrayText;
  }
}
`],encapsulation:2})}return i})(),Io=new E("MAT_TABS_CONFIG"),ia=(()=>{class i extends ce{_host=l(Mn);_ngZone=l(ae);_centeringSub=ie.EMPTY;_leavingSub=ie.EMPTY;constructor(){super()}ngOnInit(){super.ngOnInit(),this._centeringSub=this._host._beforeCentering.pipe(he(this._host._isCenterPosition())).subscribe(e=>{this._host._content&&e&&!this.hasAttached()&&this._ngZone.run(()=>{Promise.resolve().then(),this.attach(this._host._content)})}),this._leavingSub=this._host._afterLeavingCenter.subscribe(()=>{this._host.preserveContent||this._ngZone.run(()=>this.detach())})}ngOnDestroy(){super.ngOnDestroy(),this._centeringSub.unsubscribe(),this._leavingSub.unsubscribe()}static \u0275fac=function(t){return new(t||i)};static \u0275dir=P({type:i,selectors:[["","matTabBodyHost",""]],features:[U]})}return i})(),Mn=(()=>{class i{_elementRef=l(B);_dir=l(ut,{optional:!0});_ngZone=l(ae);_injector=l(z);_renderer=l(et);_diAnimationsDisabled=te();_eventCleanups;_initialized=!1;_fallbackTimer;_positionIndex;_dirChangeSubscription=ie.EMPTY;_position;_previousPosition;_onCentering=new A;_beforeCentering=new A;_afterLeavingCenter=new A;_onCentered=new A(!0);_portalHost;_contentElement;_content;animationDuration="500ms";preserveContent=!1;set position(e){this._positionIndex=e,this._computePositionAnimationState()}constructor(){if(this._dir){let e=l(ee);this._dirChangeSubscription=this._dir.change.subscribe(t=>{this._computePositionAnimationState(t),e.markForCheck()})}}ngOnInit(){this._bindTransitionEvents(),this._position==="center"&&(this._setActiveClass(!0),Ie(()=>this._onCentering.emit(this._elementRef.nativeElement.clientHeight),{injector:this._injector})),this._initialized=!0}ngOnDestroy(){clearTimeout(this._fallbackTimer),this._eventCleanups?.forEach(e=>e()),this._dirChangeSubscription.unsubscribe()}_bindTransitionEvents(){this._ngZone.runOutsideAngular(()=>{let e=this._elementRef.nativeElement,t=n=>{n.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.remove("mat-tab-body-animating"),n.type==="transitionend"&&this._transitionDone())};this._eventCleanups=[this._renderer.listen(e,"transitionstart",n=>{n.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.add("mat-tab-body-animating"),this._transitionStarted())}),this._renderer.listen(e,"transitionend",t),this._renderer.listen(e,"transitioncancel",t)]})}_transitionStarted(){clearTimeout(this._fallbackTimer);let e=this._position==="center";this._beforeCentering.emit(e),e&&this._onCentering.emit(this._elementRef.nativeElement.clientHeight)}_transitionDone(){this._position==="center"?this._onCentered.emit():this._previousPosition==="center"&&this._afterLeavingCenter.emit()}_setActiveClass(e){this._elementRef.nativeElement.classList.toggle("mat-mdc-tab-body-active",e)}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_isCenterPosition(){return this._positionIndex===0}_computePositionAnimationState(e=this._getLayoutDirection()){this._previousPosition=this._position,this._positionIndex<0?this._position=e=="ltr"?"left":"right":this._positionIndex>0?this._position=e=="ltr"?"right":"left":this._position="center",this._animationsDisabled()?this._simulateTransitionEvents():this._initialized&&(this._position==="center"||this._previousPosition==="center")&&(clearTimeout(this._fallbackTimer),this._fallbackTimer=this._ngZone.runOutsideAngular(()=>setTimeout(()=>this._simulateTransitionEvents(),100)))}_simulateTransitionEvents(){this._transitionStarted(),Ie(()=>this._transitionDone(),{injector:this._injector})}_animationsDisabled(){return this._diAnimationsDisabled||this.animationDuration==="0ms"||this.animationDuration==="0s"}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=v({type:i,selectors:[["mat-tab-body"]],viewQuery:function(t,n){if(t&1&&oe(ia,5)(co,5),t&2){let o;I(o=D())&&(n._portalHost=o.first),I(o=D())&&(n._contentElement=o.first)}},hostAttrs:[1,"mat-mdc-tab-body"],hostVars:1,hostBindings:function(t,n){t&2&&R("inert",n._position==="center"?null:"")},inputs:{_content:[0,"content","_content"],animationDuration:"animationDuration",preserveContent:"preserveContent",position:"position"},outputs:{_onCentering:"_onCentering",_beforeCentering:"_beforeCentering",_onCentered:"_onCentered"},decls:3,vars:6,consts:[["content",""],["cdkScrollable","",1,"mat-mdc-tab-body-content"],["matTabBodyHost",""]],template:function(t,n){t&1&&(r(0,"div",1,0),K(2,lo,0,0,"ng-template",2),s()),t&2&&k("mat-tab-body-content-left",n._position==="left")("mat-tab-body-content-right",n._position==="right")("mat-tab-body-content-can-animate",n._position==="center"||n._previousPosition==="center")},dependencies:[ia,$t],styles:[`.mat-mdc-tab-body {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: block;
  overflow: hidden;
  outline: 0;
  flex-basis: 100%;
}
.mat-mdc-tab-body.mat-mdc-tab-body-active {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1;
  flex-grow: 1;
}
.mat-mdc-tab-group.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body.mat-mdc-tab-body-active {
  overflow-y: hidden;
}

.mat-mdc-tab-body-content {
  height: 100%;
  overflow: auto;
  transform: none;
  visibility: hidden;
}
.mat-tab-body-animating > .mat-mdc-tab-body-content, .mat-mdc-tab-body-active > .mat-mdc-tab-body-content {
  visibility: visible;
}
.mat-tab-body-animating > .mat-mdc-tab-body-content {
  min-height: 1px;
}
.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body-content {
  overflow: hidden;
}

.mat-tab-body-content-can-animate {
  transition: transform var(--mat-tab-animation-duration) 1ms cubic-bezier(0.35, 0, 0.25, 1);
}
.mat-mdc-tab-body-wrapper._mat-animation-noopable .mat-tab-body-content-can-animate {
  transition: none;
}

.mat-tab-body-content-left {
  transform: translate3d(-100%, 0, 0);
}

.mat-tab-body-content-right {
  transform: translate3d(100%, 0, 0);
}
`],encapsulation:2})}return i})(),sa=(()=>{class i{_elementRef=l(B);_changeDetectorRef=l(ee);_ngZone=l(ae);_tabsSubscription=ie.EMPTY;_tabLabelSubscription=ie.EMPTY;_tabBodySubscription=ie.EMPTY;_diAnimationsDisabled=te();_allTabs;_tabBodies;_tabBodyWrapper;_tabHeader;_tabs=new Rt;_indexToSelect=0;_lastFocusedTabIndex=null;_tabBodyWrapperHeight=0;color;get fitInkBarToContent(){return this._fitInkBarToContent}set fitInkBarToContent(e){this._fitInkBarToContent=e,this._changeDetectorRef.markForCheck()}_fitInkBarToContent=!1;stretchTabs=!0;alignTabs=null;dynamicHeight=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(e){this._indexToSelect=isNaN(e)?null:e}_selectedIndex=null;headerPosition="above";get animationDuration(){return this._animationDuration}set animationDuration(e){let t=e+"";this._animationDuration=/^\d+$/.test(t)?e+"ms":t}_animationDuration;get contentTabIndex(){return this._contentTabIndex}set contentTabIndex(e){this._contentTabIndex=isNaN(e)?null:e}_contentTabIndex=null;disablePagination=!1;disableRipple=!1;preserveContent=!1;get backgroundColor(){return this._backgroundColor}set backgroundColor(e){let t=this._elementRef.nativeElement.classList;t.remove("mat-tabs-with-background",`mat-background-${this.backgroundColor}`),e&&t.add("mat-tabs-with-background",`mat-background-${e}`),this._backgroundColor=e}_backgroundColor;ariaLabel;ariaLabelledby;selectedIndexChange=new A;focusChange=new A;animationDone=new A;selectedTabChange=new A(!0);_groupId;_isServer=!l(Se).isBrowser;constructor(){let e=l(Io,{optional:!0});this._groupId=l(G).getId("mat-tab-group-"),this.animationDuration=e&&e.animationDuration?e.animationDuration:"500ms",this.disablePagination=e&&e.disablePagination!=null?e.disablePagination:!1,this.dynamicHeight=e&&e.dynamicHeight!=null?e.dynamicHeight:!1,e?.contentTabIndex!=null&&(this.contentTabIndex=e.contentTabIndex),this.preserveContent=!!e?.preserveContent,this.fitInkBarToContent=e&&e.fitInkBarToContent!=null?e.fitInkBarToContent:!1,this.stretchTabs=e&&e.stretchTabs!=null?e.stretchTabs:!0,this.alignTabs=e&&e.alignTabs!=null?e.alignTabs:null}ngAfterContentChecked(){let e=this._indexToSelect=this._clampTabIndex(this._indexToSelect);if(this._selectedIndex!=e){let t=this._selectedIndex==null;if(!t){this.selectedTabChange.emit(this._createChangeEvent(e));let n=this._tabBodyWrapper.nativeElement;n.style.minHeight=n.clientHeight+"px"}Promise.resolve().then(()=>{this._tabs.forEach((n,o)=>n.isActive=o===e),t||(this.selectedIndexChange.emit(e),this._tabBodyWrapper.nativeElement.style.minHeight="")})}this._tabs.forEach((t,n)=>{t.position=n-e,this._selectedIndex!=null&&t.position==0&&!t.origin&&(t.origin=e-this._selectedIndex)}),this._selectedIndex!==e&&(this._selectedIndex=e,this._lastFocusedTabIndex=null,this._changeDetectorRef.markForCheck())}ngAfterContentInit(){this._subscribeToAllTabChanges(),this._subscribeToTabLabels(),this._tabsSubscription=this._tabs.changes.subscribe(()=>{let e=this._clampTabIndex(this._indexToSelect);if(e===this._selectedIndex){let t=this._tabs.toArray(),n;for(let o=0;o<t.length;o++)if(t[o].isActive){this._indexToSelect=this._selectedIndex=o,this._lastFocusedTabIndex=null,n=t[o];break}!n&&t[e]&&Promise.resolve().then(()=>{t[e].isActive=!0,this.selectedTabChange.emit(this._createChangeEvent(e))})}this._changeDetectorRef.markForCheck()})}ngAfterViewInit(){this._tabBodySubscription=this._tabBodies.changes.subscribe(()=>this._bodyCentered(!0))}_subscribeToAllTabChanges(){this._allTabs.changes.pipe(he(this._allTabs)).subscribe(e=>{this._tabs.reset(e.filter(t=>t._closestTabGroup===this||!t._closestTabGroup)),this._tabs.notifyOnChanges()})}ngOnDestroy(){this._tabs.destroy(),this._tabsSubscription.unsubscribe(),this._tabLabelSubscription.unsubscribe(),this._tabBodySubscription.unsubscribe()}realignInkBar(){this._tabHeader&&this._tabHeader._alignInkBarToSelectedTab()}updatePagination(){this._tabHeader&&this._tabHeader.updatePagination()}focusTab(e){let t=this._tabHeader;t&&(t.focusIndex=e)}_focusChanged(e){this._lastFocusedTabIndex=e,this.focusChange.emit(this._createChangeEvent(e))}_createChangeEvent(e){let t=new In;return t.index=e,this._tabs&&this._tabs.length&&(t.tab=this._tabs.toArray()[e]),t}_subscribeToTabLabels(){this._tabLabelSubscription&&this._tabLabelSubscription.unsubscribe(),this._tabLabelSubscription=Pe(...this._tabs.map(e=>e._stateChanges)).subscribe(()=>this._changeDetectorRef.markForCheck())}_clampTabIndex(e){return Math.min(this._tabs.length-1,Math.max(e||0,0))}_getTabLabelId(e,t){return e.id||`${this._groupId}-label-${t}`}_getTabContentId(e){return`${this._groupId}-content-${e}`}_setTabBodyWrapperHeight(e){if(!this.dynamicHeight||!this._tabBodyWrapperHeight){this._tabBodyWrapperHeight=e;return}let t=this._tabBodyWrapper.nativeElement;t.style.height=this._tabBodyWrapperHeight+"px",this._tabBodyWrapper.nativeElement.offsetHeight&&(t.style.height=e+"px")}_removeTabBodyWrapperHeight(){let e=this._tabBodyWrapper.nativeElement;this._tabBodyWrapperHeight=e.clientHeight,e.style.height="",this._ngZone.run(()=>this.animationDone.emit())}_handleClick(e,t,n){t.focusIndex=n,e.disabled||(this.selectedIndex=n)}_getTabIndex(e){let t=this._lastFocusedTabIndex??this.selectedIndex;return e===t?0:-1}_tabFocusChanged(e,t){e&&e!=="mouse"&&e!=="touch"&&(this._tabHeader.focusIndex=t)}_bodyCentered(e){e&&this._tabBodies?.forEach((t,n)=>t._setActiveClass(n===this._selectedIndex))}_animationsDisabled(){return this._diAnimationsDisabled||this.animationDuration==="0"||this.animationDuration==="0ms"}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=v({type:i,selectors:[["mat-tab-group"]],contentQueries:function(t,n,o){if(t&1&&De(o,Pn,5),t&2){let c;I(c=D())&&(n._allTabs=c)}},viewQuery:function(t,n){if(t&1&&oe(mo,5)(po,5)(Mn,5),t&2){let o;I(o=D())&&(n._tabBodyWrapper=o.first),I(o=D())&&(n._tabHeader=o.first),I(o=D())&&(n._tabBodies=o)}},hostAttrs:[1,"mat-mdc-tab-group"],hostVars:11,hostBindings:function(t,n){t&2&&(R("mat-align-tabs",n.alignTabs),ke("mat-"+(n.color||"primary")),Oe("--mat-tab-animation-duration",n.animationDuration),k("mat-mdc-tab-group-dynamic-height",n.dynamicHeight)("mat-mdc-tab-group-inverted-header",n.headerPosition==="below")("mat-mdc-tab-group-stretch-tabs",n.stretchTabs))},inputs:{color:"color",fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",S],stretchTabs:[2,"mat-stretch-tabs","stretchTabs",S],alignTabs:[0,"mat-align-tabs","alignTabs"],dynamicHeight:[2,"dynamicHeight","dynamicHeight",S],selectedIndex:[2,"selectedIndex","selectedIndex",Le],headerPosition:"headerPosition",animationDuration:"animationDuration",contentTabIndex:[2,"contentTabIndex","contentTabIndex",Le],disablePagination:[2,"disablePagination","disablePagination",S],disableRipple:[2,"disableRipple","disableRipple",S],preserveContent:[2,"preserveContent","preserveContent",S],backgroundColor:"backgroundColor",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"]},outputs:{selectedIndexChange:"selectedIndexChange",focusChange:"focusChange",animationDone:"animationDone",selectedTabChange:"selectedTabChange"},exportAs:["matTabGroup"],features:[re([{provide:oa,useExisting:i}])],ngContentSelectors:En,decls:9,vars:8,consts:[["tabHeader",""],["tabBodyWrapper",""],["tabNode",""],[3,"indexFocused","selectFocusedIndex","selectedIndex","disableRipple","disablePagination","aria-label","aria-labelledby"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"id","mdc-tab--active","class","disabled","fitInkBarToContent"],[1,"mat-mdc-tab-body-wrapper"],["role","tabpanel",3,"id","class","content","position","animationDuration","preserveContent"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"click","cdkFocusChange","id","disabled","fitInkBarToContent"],[1,"mdc-tab__ripple"],["mat-ripple","",1,"mat-mdc-tab-ripple",3,"matRippleTrigger","matRippleDisabled"],[1,"mdc-tab__content"],[1,"mdc-tab__text-label"],[3,"cdkPortalOutlet"],["role","tabpanel",3,"_onCentered","_onCentering","_beforeCentering","id","content","position","animationDuration","preserveContent"]],template:function(t,n){t&1&&(Y(),r(0,"mat-tab-header",3,0),u("indexFocused",function(c){return n._focusChanged(c)})("selectFocusedIndex",function(c){return n.selectedIndex=c}),w(2,_o,8,17,"div",4,q),s(),x(4,fo,1,0),r(5,"div",5,1),w(7,go,1,10,"mat-tab-body",6,q),s()),t&2&&(g("selectedIndex",n.selectedIndex||0)("disableRipple",n.disableRipple)("disablePagination",n.disablePagination),ei("aria-label",n.ariaLabel)("aria-labelledby",n.ariaLabelledby),d(2),M(n._tabs),d(2),y(n._isServer?4:-1),d(),k("_mat-animation-noopable",n._animationsDisabled()),d(2),M(n._tabs))},dependencies:[Mo,ra,Ci,wt,ce,Mn],styles:[`.mdc-tab {
  min-width: 90px;
  padding: 0 24px;
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  box-sizing: border-box;
  border: none;
  outline: none;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  z-index: 1;
  touch-action: manipulation;
}

.mdc-tab__content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  pointer-events: none;
}

.mdc-tab__text-label {
  transition: 150ms color linear;
  display: inline-block;
  line-height: 1;
  z-index: 2;
}

.mdc-tab--active .mdc-tab__text-label {
  transition-delay: 100ms;
}

._mat-animation-noopable .mdc-tab__text-label {
  transition: none;
}

.mdc-tab-indicator {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.mdc-tab-indicator__content {
  transition: var(--mat-tab-animation-duration, 250ms) transform cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: left;
  opacity: 0;
}

.mdc-tab-indicator__content--underline {
  align-self: flex-end;
  box-sizing: border-box;
  width: 100%;
  border-top-style: solid;
}

.mdc-tab-indicator--active .mdc-tab-indicator__content {
  opacity: 1;
}

._mat-animation-noopable .mdc-tab-indicator__content, .mdc-tab-indicator--no-transition .mdc-tab-indicator__content {
  transition: none;
}

.mat-mdc-tab-ripple.mat-mdc-tab-ripple {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
}

.mat-mdc-tab {
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-decoration: none;
  background: none;
  height: var(--mat-tab-container-height, 48px);
  font-family: var(--mat-tab-label-text-font, var(--mat-sys-title-small-font));
  font-size: var(--mat-tab-label-text-size, var(--mat-sys-title-small-size));
  letter-spacing: var(--mat-tab-label-text-tracking, var(--mat-sys-title-small-tracking));
  line-height: var(--mat-tab-label-text-line-height, var(--mat-sys-title-small-line-height));
  font-weight: var(--mat-tab-label-text-weight, var(--mat-sys-title-small-weight));
}
.mat-mdc-tab.mdc-tab {
  flex-grow: 0;
}
.mat-mdc-tab .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-active-indicator-color, var(--mat-sys-primary));
  border-top-width: var(--mat-tab-active-indicator-height, 2px);
  border-radius: var(--mat-tab-active-indicator-shape, 0);
}
.mat-mdc-tab:hover .mdc-tab__text-label {
  color: var(--mat-tab-inactive-hover-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab:focus .mdc-tab__text-label {
  color: var(--mat-tab-inactive-focus-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active .mdc-tab__text-label {
  color: var(--mat-tab-active-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active .mdc-tab__ripple::before,
.mat-mdc-tab.mdc-tab--active .mat-ripple-element {
  background-color: var(--mat-tab-active-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active:hover .mdc-tab__text-label {
  color: var(--mat-tab-active-hover-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active:hover .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-active-hover-indicator-color, var(--mat-sys-primary));
}
.mat-mdc-tab.mdc-tab--active:focus .mdc-tab__text-label {
  color: var(--mat-tab-active-focus-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active:focus .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-active-focus-indicator-color, var(--mat-sys-primary));
}
.mat-mdc-tab.mat-mdc-tab-disabled {
  opacity: 0.4;
  pointer-events: none;
}
.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__content {
  pointer-events: none;
}
.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__ripple::before,
.mat-mdc-tab.mat-mdc-tab-disabled .mat-ripple-element {
  background-color: var(--mat-tab-disabled-ripple-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-tab .mdc-tab__ripple::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  pointer-events: none;
  background-color: var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab .mdc-tab__text-label {
  color: var(--mat-tab-inactive-label-text-color, var(--mat-sys-on-surface));
  display: inline-flex;
  align-items: center;
}
.mat-mdc-tab .mdc-tab__content {
  position: relative;
  pointer-events: auto;
}
.mat-mdc-tab:hover .mdc-tab__ripple::before {
  opacity: 0.04;
}
.mat-mdc-tab.cdk-program-focused .mdc-tab__ripple::before, .mat-mdc-tab.cdk-keyboard-focused .mdc-tab__ripple::before {
  opacity: 0.12;
}
.mat-mdc-tab .mat-ripple-element {
  opacity: 0.12;
  background-color: var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab-group.mat-mdc-tab-group-stretch-tabs > .mat-mdc-tab-header .mat-mdc-tab {
  flex-grow: 1;
}

.mat-mdc-tab-group {
  display: flex;
  flex-direction: column;
  max-width: 100%;
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination {
  background-color: var(--mat-tab-background-color);
}
.mat-mdc-tab-group.mat-tabs-with-background.mat-primary > .mat-mdc-tab-header .mat-mdc-tab .mdc-tab__text-label {
  color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background.mat-primary > .mat-mdc-tab-header .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary) > .mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab__text-label {
  color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary) > .mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-focus-indicator::before, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-focus-indicator::before {
  border-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-ripple-element, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mdc-tab__ripple::before, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-ripple-element, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mdc-tab__ripple::before {
  background-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron {
  color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header {
  flex-direction: column-reverse;
}
.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header .mdc-tab-indicator__content--underline {
  align-self: flex-start;
}

.mat-mdc-tab-body-wrapper {
  position: relative;
  overflow: hidden;
  display: flex;
  transition: height 500ms cubic-bezier(0.35, 0, 0.25, 1);
}
.mat-mdc-tab-body-wrapper._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
`],encapsulation:2})}return i})(),In=class{index;tab};var ca=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=j({type:i});static \u0275inj=V({imports:[ne]})}return i})();var So=["mat-internal-form-field",""],Eo=["*"],la=(()=>{class i{labelPosition="after";static \u0275fac=function(t){return new(t||i)};static \u0275cmp=v({type:i,selectors:[["div","mat-internal-form-field",""]],hostAttrs:[1,"mdc-form-field","mat-internal-form-field"],hostVars:2,hostBindings:function(t,n){t&2&&k("mdc-form-field--align-end",n.labelPosition==="before")},inputs:{labelPosition:"labelPosition"},attrs:So,ngContentSelectors:Eo,decls:1,vars:0,template:function(t,n){t&1&&(Y(),N(0))},styles:[`.mat-internal-form-field {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}
.mat-internal-form-field > label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
  order: 0;
}
[dir=rtl] .mat-internal-form-field > label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
}

.mdc-form-field--align-end > label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
  order: -1;
}
[dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
}
`],encapsulation:2,changeDetection:0})}return i})();var Ao=["input"],Po=["label"],Fo=["*"],Fn={color:"accent",clickAction:"check-indeterminate",disabledInteractive:!1},Oo=new E("mat-checkbox-default-options",{providedIn:"root",factory:()=>Fn}),X=(function(i){return i[i.Init=0]="Init",i[i.Checked=1]="Checked",i[i.Unchecked=2]="Unchecked",i[i.Indeterminate=3]="Indeterminate",i})(X||{}),On=class{source;checked},fe=(()=>{class i{_elementRef=l(B);_changeDetectorRef=l(ee);_ngZone=l(ae);_animationsDisabled=te();_options=l(Oo,{optional:!0});focus(){this._inputElement.nativeElement.focus()}_createChangeEvent(e){let t=new On;return t.source=this,t.checked=e,t}_getAnimationTargetElement(){return this._inputElement?.nativeElement}_animationClasses={uncheckedToChecked:"mdc-checkbox--anim-unchecked-checked",uncheckedToIndeterminate:"mdc-checkbox--anim-unchecked-indeterminate",checkedToUnchecked:"mdc-checkbox--anim-checked-unchecked",checkedToIndeterminate:"mdc-checkbox--anim-checked-indeterminate",indeterminateToChecked:"mdc-checkbox--anim-indeterminate-checked",indeterminateToUnchecked:"mdc-checkbox--anim-indeterminate-unchecked"};ariaLabel="";ariaLabelledby=null;ariaDescribedby;ariaExpanded;ariaControls;ariaOwns;_uniqueId;id;get inputId(){return`${this.id||this._uniqueId}-input`}required=!1;labelPosition="after";name=null;change=new A;indeterminateChange=new A;value;disableRipple=!1;_inputElement;_labelElement;tabIndex;color;disabledInteractive;_onTouched=()=>{};_currentAnimationClass="";_currentCheckState=X.Init;_controlValueAccessorChangeFn=()=>{};_validatorChangeFn=()=>{};constructor(){l(dt).load(pt);let e=l(new it("tabindex"),{optional:!0});this._options=this._options||Fn,this.color=this._options.color||Fn.color,this.tabIndex=e==null?0:parseInt(e)||0,this.id=this._uniqueId=l(G).getId("mat-mdc-checkbox-"),this.disabledInteractive=this._options?.disabledInteractive??!1}ngOnChanges(e){e.required&&this._validatorChangeFn()}ngAfterViewInit(){this._syncIndeterminate(this.indeterminate)}get checked(){return this._checked}set checked(e){e!=this.checked&&(this._checked=e,this._changeDetectorRef.markForCheck())}_checked=!1;get disabled(){return this._disabled}set disabled(e){e!==this.disabled&&(this._disabled=e,this._changeDetectorRef.markForCheck())}_disabled=!1;get indeterminate(){return this._indeterminate()}set indeterminate(e){let t=e!=this._indeterminate();this._indeterminate.set(e),t&&(e?this._transitionCheckState(X.Indeterminate):this._transitionCheckState(this.checked?X.Checked:X.Unchecked),this.indeterminateChange.emit(e)),this._syncIndeterminate(e)}_indeterminate=Q(!1);_isRippleDisabled(){return this.disableRipple||this.disabled}_onLabelTextChange(){this._changeDetectorRef.detectChanges()}writeValue(e){this.checked=!!e}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorChangeFn=e}_transitionCheckState(e){let t=this._currentCheckState,n=this._getAnimationTargetElement();if(!(t===e||!n)&&(this._currentAnimationClass&&n.classList.remove(this._currentAnimationClass),this._currentAnimationClass=this._getAnimationClassForCheckStateTransition(t,e),this._currentCheckState=e,this._currentAnimationClass.length>0)){n.classList.add(this._currentAnimationClass);let o=this._currentAnimationClass;this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{n.classList.remove(o)},1e3)})}}_emitChangeEvent(){this._controlValueAccessorChangeFn(this.checked),this.change.emit(this._createChangeEvent(this.checked)),this._inputElement&&(this._inputElement.nativeElement.checked=this.checked)}toggle(){this.checked=!this.checked,this._controlValueAccessorChangeFn(this.checked)}_handleInputClick(){let e=this._options?.clickAction;!this.disabled&&e!=="noop"?(this.indeterminate&&e!=="check"&&Promise.resolve().then(()=>{this._indeterminate.set(!1),this.indeterminateChange.emit(!1)}),this._checked=!this._checked,this._transitionCheckState(this._checked?X.Checked:X.Unchecked),this._emitChangeEvent()):(this.disabled&&this.disabledInteractive||!this.disabled&&e==="noop")&&(this._inputElement.nativeElement.checked=this.checked,this._inputElement.nativeElement.indeterminate=this.indeterminate)}_onInteractionEvent(e){e.stopPropagation()}_onBlur(){Promise.resolve().then(()=>{this._onTouched(),this._changeDetectorRef.markForCheck()})}_getAnimationClassForCheckStateTransition(e,t){if(this._animationsDisabled)return"";switch(e){case X.Init:if(t===X.Checked)return this._animationClasses.uncheckedToChecked;if(t==X.Indeterminate)return this._checked?this._animationClasses.checkedToIndeterminate:this._animationClasses.uncheckedToIndeterminate;break;case X.Unchecked:return t===X.Checked?this._animationClasses.uncheckedToChecked:this._animationClasses.uncheckedToIndeterminate;case X.Checked:return t===X.Unchecked?this._animationClasses.checkedToUnchecked:this._animationClasses.checkedToIndeterminate;case X.Indeterminate:return t===X.Checked?this._animationClasses.indeterminateToChecked:this._animationClasses.indeterminateToUnchecked}return""}_syncIndeterminate(e){let t=this._inputElement;t&&(t.nativeElement.indeterminate=e)}_onInputClick(){this._handleInputClick()}_onTouchTargetClick(){this._handleInputClick(),this.disabled||this._inputElement.nativeElement.focus()}_preventBubblingFromLabel(e){e.target&&this._labelElement.nativeElement.contains(e.target)&&e.stopPropagation()}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=v({type:i,selectors:[["mat-checkbox"]],viewQuery:function(t,n){if(t&1&&oe(Ao,5)(Po,5),t&2){let o;I(o=D())&&(n._inputElement=o.first),I(o=D())&&(n._labelElement=o.first)}},hostAttrs:[1,"mat-mdc-checkbox"],hostVars:16,hostBindings:function(t,n){t&2&&(Ct("id",n.id),R("tabindex",null)("aria-label",null)("aria-labelledby",null),ke(n.color?"mat-"+n.color:"mat-accent"),k("_mat-animation-noopable",n._animationsDisabled)("mdc-checkbox--disabled",n.disabled)("mat-mdc-checkbox-disabled",n.disabled)("mat-mdc-checkbox-checked",n.checked)("mat-mdc-checkbox-disabled-interactive",n.disabledInteractive))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],ariaExpanded:[2,"aria-expanded","ariaExpanded",S],ariaControls:[0,"aria-controls","ariaControls"],ariaOwns:[0,"aria-owns","ariaOwns"],id:"id",required:[2,"required","required",S],labelPosition:"labelPosition",name:"name",value:"value",disableRipple:[2,"disableRipple","disableRipple",S],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?void 0:Le(e)],color:"color",disabledInteractive:[2,"disabledInteractive","disabledInteractive",S],checked:[2,"checked","checked",S],disabled:[2,"disabled","disabled",S],indeterminate:[2,"indeterminate","indeterminate",S]},outputs:{change:"change",indeterminateChange:"indeterminateChange"},exportAs:["matCheckbox"],features:[re([{provide:ui,useExisting:Xn(()=>i),multi:!0},{provide:hi,useExisting:i,multi:!0}]),xe],ngContentSelectors:Fo,decls:15,vars:23,consts:[["checkbox",""],["input",""],["label",""],["mat-internal-form-field","",3,"click","labelPosition"],[1,"mdc-checkbox"],["aria-hidden","true",1,"mat-mdc-checkbox-touch-target",3,"click"],["type","checkbox",1,"mdc-checkbox__native-control",3,"blur","click","change","checked","indeterminate","disabled","id","required","tabIndex"],["aria-hidden","true",1,"mdc-checkbox__ripple"],["aria-hidden","true",1,"mdc-checkbox__background"],["focusable","false","viewBox","0 0 24 24",1,"mdc-checkbox__checkmark"],["fill","none","d","M1.73,12.91 8.1,19.28 22.79,4.59",1,"mdc-checkbox__checkmark-path"],[1,"mdc-checkbox__mixedmark"],["mat-ripple","","aria-hidden","true",1,"mat-mdc-checkbox-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-label",3,"for"]],template:function(t,n){if(t&1&&(Y(),r(0,"div",3),u("click",function(c){return n._preventBubblingFromLabel(c)}),r(1,"div",4,0)(3,"div",5),u("click",function(){return n._onTouchTargetClick()}),s(),r(4,"input",6,1),u("blur",function(){return n._onBlur()})("click",function(){return n._onInputClick()})("change",function(c){return n._onInteractionEvent(c)}),s(),F(6,"div",7),r(7,"div",8),Ft(),r(8,"svg",9),F(9,"path",10),s(),Kn(),F(10,"div",11),s(),F(11,"div",12),s(),r(12,"label",13,2),N(14),s()()),t&2){let o=tt(2);g("labelPosition",n.labelPosition),d(4),k("mdc-checkbox--selected",n.checked),g("checked",n.checked)("indeterminate",n.indeterminate)("disabled",n.disabled&&!n.disabledInteractive)("id",n.inputId)("required",n.required)("tabIndex",n.disabled&&!n.disabledInteractive?-1:n.tabIndex),R("aria-label",n.ariaLabel||null)("aria-labelledby",n.ariaLabelledby)("aria-describedby",n.ariaDescribedby)("aria-checked",n.indeterminate?"mixed":null)("aria-controls",n.ariaControls)("aria-disabled",n.disabled&&n.disabledInteractive?!0:null)("aria-expanded",n.ariaExpanded)("aria-owns",n.ariaOwns)("name",n.name)("value",n.value),d(7),g("matRippleTrigger",o)("matRippleDisabled",n.disableRipple||n.disabled)("matRippleCentered",!0),d(),g("for",n.inputId)}},dependencies:[wt,la],styles:[`.mdc-checkbox {
  display: inline-block;
  position: relative;
  flex: 0 0 18px;
  box-sizing: content-box;
  width: 18px;
  height: 18px;
  line-height: 0;
  white-space: nowrap;
  cursor: pointer;
  vertical-align: bottom;
  padding: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  margin: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
}
.mdc-checkbox:hover > .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:hover > .mat-mdc-checkbox-ripple > .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-pressed-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-pressed-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-hover-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-hover-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-focus-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-focus-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-pressed-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-pressed-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control {
  position: absolute;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
  z-index: 1;
  width: var(--mat-checkbox-state-layer-size, 40px);
  height: var(--mat-checkbox-state-layer-size, 40px);
  top: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
  right: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
  left: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
}

.mdc-checkbox--disabled {
  cursor: default;
  pointer-events: none;
}

.mdc-checkbox__background {
  display: inline-flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-radius: 2px;
  background-color: transparent;
  pointer-events: none;
  will-change: background-color, border-color;
  transition: background-color 90ms cubic-bezier(0.4, 0, 0.6, 1), border-color 90ms cubic-bezier(0.4, 0, 0.6, 1);
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  border-color: var(--mat-checkbox-unselected-icon-color, var(--mat-sys-on-surface-variant));
  top: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  left: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
}

.mdc-checkbox__native-control:enabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:enabled:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox--disabled .mdc-checkbox__background {
  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}
@media (forced-colors: active) {
  .mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
  .mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-unselected-hover-icon-color, var(--mat-sys-on-surface));
  background-color: transparent;
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox__native-control:focus:focus:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-unselected-focus-icon-color, var(--mat-sys-on-surface));
}

.mdc-checkbox__native-control:focus:focus:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
    border-color: GrayText;
  }
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}

.mdc-checkbox__checkmark {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 180ms cubic-bezier(0.4, 0, 0.6, 1);
  color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__checkmark {
    color: CanvasText;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
  color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
    color: GrayText;
  }
}

.mdc-checkbox__checkmark-path {
  transition: stroke-dashoffset 180ms cubic-bezier(0.4, 0, 0.6, 1);
  stroke: currentColor;
  stroke-width: 3.12px;
  stroke-dashoffset: 29.7833385;
  stroke-dasharray: 29.7833385;
}

.mdc-checkbox__mixedmark {
  width: 100%;
  height: 0;
  transform: scaleX(0) rotate(0deg);
  border-width: 1px;
  border-style: solid;
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
  border-color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__mixedmark {
    margin: 0 1px;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
  border-color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
    border-color: GrayText;
  }
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,
.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,
.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,
.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background {
  animation-duration: 180ms;
  animation-timing-function: linear;
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-unchecked-checked-checkmark-path 180ms linear;
  transition: none;
}

.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-checked-unchecked-checkmark-path 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark {
  animation: mdc-checkbox-checked-indeterminate-checkmark 90ms linear;
  transition: none;
}
.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-checked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark {
  animation: mdc-checkbox-indeterminate-checked-checkmark 500ms linear;
  transition: none;
}
.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-checked-mixedmark 500ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear;
  transition: none;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path {
  stroke-dashoffset: 0;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transition: opacity 180ms cubic-bezier(0, 0, 0.2, 1), transform 180ms cubic-bezier(0, 0, 0.2, 1);
  opacity: 1;
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(-45deg);
}

.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(0deg);
  opacity: 1;
}

@keyframes mdc-checkbox-unchecked-checked-checkmark-path {
  0%, 50% {
    stroke-dashoffset: 29.7833385;
  }
  50% {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark {
  0%, 68.2% {
    transform: scaleX(0);
  }
  68.2% {
    animation-timing-function: cubic-bezier(0, 0, 0, 1);
  }
  100% {
    transform: scaleX(1);
  }
}
@keyframes mdc-checkbox-checked-unchecked-checkmark-path {
  from {
    animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
    opacity: 1;
    stroke-dashoffset: 0;
  }
  to {
    opacity: 0;
    stroke-dashoffset: -29.7833385;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-checkmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(45deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-checkmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(45deg);
    opacity: 0;
  }
  to {
    transform: rotate(360deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(-45deg);
    opacity: 0;
  }
  to {
    transform: rotate(0deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(315deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark {
  0% {
    animation-timing-function: linear;
    transform: scaleX(1);
    opacity: 1;
  }
  32.8%, 100% {
    transform: scaleX(0);
    opacity: 0;
  }
}
.mat-mdc-checkbox {
  display: inline-block;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-touch-target,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__native-control,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__ripple,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-ripple::before,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-checkbox label {
  cursor: pointer;
}
.mat-mdc-checkbox .mat-internal-form-field {
  color: var(--mat-checkbox-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-checkbox-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-checkbox-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-checkbox-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-checkbox-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-checkbox-label-text-weight, var(--mat-sys-body-medium-weight));
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive input {
  cursor: default;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled label {
  cursor: default;
  color: var(--mat-checkbox-disabled-label-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-checkbox.mat-mdc-checkbox-disabled label {
    color: GrayText;
  }
}
.mat-mdc-checkbox label:empty {
  display: none;
}
.mat-mdc-checkbox .mdc-checkbox__ripple {
  opacity: 0;
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple,
.mdc-checkbox__ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-checkbox .mat-mdc-checkbox-ripple:not(:empty),
.mdc-checkbox__ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-mdc-checkbox-ripple .mat-ripple-element {
  opacity: 0.1;
}

.mat-mdc-checkbox-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-checkbox-touch-target-size, 48px);
  width: var(--mat-checkbox-touch-target-size, 48px);
  transform: translate(-50%, -50%);
  display: var(--mat-checkbox-touch-target-display, block);
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple::before {
  border-radius: 50%;
}

.mdc-checkbox__native-control:focus-visible ~ .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2,changeDetection:0})}return i})(),we=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=j({type:i});static \u0275inj=V({imports:[fe,ne]})}return i})();var Rn=new E("CdkAccordion"),da=(()=>{class i{_stateChanges=new O;_openCloseAllActions=new O;id=l(G).getId("cdk-accordion-");multi=!1;openAll(){this.multi&&this._openCloseAllActions.next(!0)}closeAll(){this._openCloseAllActions.next(!1)}ngOnChanges(e){this._stateChanges.next(e)}ngOnDestroy(){this._stateChanges.complete(),this._openCloseAllActions.complete()}static \u0275fac=function(t){return new(t||i)};static \u0275dir=P({type:i,selectors:[["cdk-accordion"],["","cdkAccordion",""]],inputs:{multi:[2,"multi","multi",S]},exportAs:["cdkAccordion"],features:[re([{provide:Rn,useExisting:i}]),xe]})}return i})(),ma=(()=>{class i{accordion=l(Rn,{optional:!0,skipSelf:!0});_changeDetectorRef=l(ee);_expansionDispatcher=l(qt);_openCloseAllSubscription=ie.EMPTY;closed=new A;opened=new A;destroyed=new A;expandedChange=new A;id=l(G).getId("cdk-accordion-child-");get expanded(){return this._expanded}set expanded(e){if(this._expanded!==e){if(this._expanded=e,this.expandedChange.emit(e),e){this.opened.emit();let t=this.accordion?this.accordion.id:this.id;this._expansionDispatcher.notify(this.id,t)}else this.closed.emit();this._changeDetectorRef.markForCheck()}}_expanded=!1;get disabled(){return this._disabled()}set disabled(e){this._disabled.set(e)}_disabled=Q(!1);_removeUniqueSelectionListener=()=>{};constructor(){}ngOnInit(){this._removeUniqueSelectionListener=this._expansionDispatcher.listen((e,t)=>{this.accordion&&!this.accordion.multi&&this.accordion.id===t&&this.id!==e&&(this.expanded=!1)}),this.accordion&&(this._openCloseAllSubscription=this._subscribeToOpenCloseAllActions())}ngOnDestroy(){this.opened.complete(),this.closed.complete(),this.destroyed.emit(),this.destroyed.complete(),this._removeUniqueSelectionListener(),this._openCloseAllSubscription.unsubscribe()}toggle(){this.disabled||(this.expanded=!this.expanded)}close(){this.disabled||(this.expanded=!1)}open(){this.disabled||(this.expanded=!0)}_subscribeToOpenCloseAllActions(){return this.accordion._openCloseAllActions.subscribe(e=>{this.disabled||(this.expanded=e)})}static \u0275fac=function(t){return new(t||i)};static \u0275dir=P({type:i,selectors:[["cdk-accordion-item"],["","cdkAccordionItem",""]],inputs:{expanded:[2,"expanded","expanded",S],disabled:[2,"disabled","disabled",S]},outputs:{closed:"closed",opened:"opened",destroyed:"destroyed",expandedChange:"expandedChange"},exportAs:["cdkAccordionItem"],features:[re([{provide:Rn,useValue:void 0}])]})}return i})(),pa=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=j({type:i});static \u0275inj=V({})}return i})();var Ro=["body"],Bo=["bodyWrapper"],Lo=[[["mat-expansion-panel-header"]],"*",[["mat-action-row"]]],No=["mat-expansion-panel-header","*","mat-action-row"];function Ho(i,a){}var Vo=[[["mat-panel-title"]],[["mat-panel-description"]],"*"],zo=["mat-panel-title","mat-panel-description","*"];function jo(i,a){i&1&&(st(0,"span",1),Ft(),st(1,"svg",2),Lt(2,"path",3),yt()())}var Bn=new E("MAT_ACCORDION"),ua=new E("MAT_EXPANSION_PANEL"),qo=(()=>{class i{_template=l(Ce);_expansionPanel=l(ua,{optional:!0});constructor(){}static \u0275fac=function(t){return new(t||i)};static \u0275dir=P({type:i,selectors:[["ng-template","matExpansionPanelContent",""]]})}return i})(),ha=new E("MAT_EXPANSION_PANEL_DEFAULT_OPTIONS"),Ln=(()=>{class i extends ma{_viewContainerRef=l(Bt);_animationsDisabled=te();_document=l(de);_ngZone=l(ae);_elementRef=l(B);_renderer=l(et);_cleanupTransitionEnd;get hideToggle(){return this._hideToggle||this.accordion&&this.accordion.hideToggle}set hideToggle(e){this._hideToggle=e}_hideToggle=!1;get togglePosition(){return this._togglePosition||this.accordion&&this.accordion.togglePosition}set togglePosition(e){this._togglePosition=e}_togglePosition;afterExpand=new A;afterCollapse=new A;_inputChanges=new O;accordion=l(Bn,{optional:!0,skipSelf:!0});_lazyContent;_body;_bodyWrapper;_portal;_headerId=l(G).getId("mat-expansion-panel-header-");constructor(){super();let e=l(ha,{optional:!0});this._expansionDispatcher=l(qt),e&&(this.hideToggle=e.hideToggle)}_hasSpacing(){return this.accordion?this.expanded&&this.accordion.displayMode==="default":!1}_getExpandedState(){return this.expanded?"expanded":"collapsed"}toggle(){this.expanded=!this.expanded}close(){this.expanded=!1}open(){this.expanded=!0}ngAfterContentInit(){this._lazyContent&&this._lazyContent._expansionPanel===this&&this.opened.pipe(he(null),le(()=>this.expanded&&!this._portal),ve(1)).subscribe(()=>{this._portal=new We(this._lazyContent._template,this._viewContainerRef)}),this._setupAnimationEvents()}ngOnChanges(e){this._inputChanges.next(e)}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTransitionEnd?.(),this._inputChanges.complete()}_containsFocus(){if(this._body){let e=this._document.activeElement,t=this._body.nativeElement;return e===t||t.contains(e)}return!1}_transitionEndListener=({target:e,propertyName:t})=>{e===this._bodyWrapper?.nativeElement&&t==="grid-template-rows"&&this._ngZone.run(()=>{this.expanded?this.afterExpand.emit():this.afterCollapse.emit()})};_setupAnimationEvents(){this._ngZone.runOutsideAngular(()=>{this._animationsDisabled?(this.opened.subscribe(()=>this._ngZone.run(()=>this.afterExpand.emit())),this.closed.subscribe(()=>this._ngZone.run(()=>this.afterCollapse.emit()))):setTimeout(()=>{let e=this._elementRef.nativeElement;this._cleanupTransitionEnd=this._renderer.listen(e,"transitionend",this._transitionEndListener),e.classList.add("mat-expansion-panel-animations-enabled")},200)})}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=v({type:i,selectors:[["mat-expansion-panel"]],contentQueries:function(t,n,o){if(t&1&&De(o,qo,5),t&2){let c;I(c=D())&&(n._lazyContent=c.first)}},viewQuery:function(t,n){if(t&1&&oe(Ro,5)(Bo,5),t&2){let o;I(o=D())&&(n._body=o.first),I(o=D())&&(n._bodyWrapper=o.first)}},hostAttrs:[1,"mat-expansion-panel"],hostVars:4,hostBindings:function(t,n){t&2&&k("mat-expanded",n.expanded)("mat-expansion-panel-spacing",n._hasSpacing())},inputs:{hideToggle:[2,"hideToggle","hideToggle",S],togglePosition:"togglePosition"},outputs:{afterExpand:"afterExpand",afterCollapse:"afterCollapse"},exportAs:["matExpansionPanel"],features:[re([{provide:Bn,useValue:void 0},{provide:ua,useExisting:i}]),U,xe],ngContentSelectors:No,decls:9,vars:4,consts:[["bodyWrapper",""],["body",""],[1,"mat-expansion-panel-content-wrapper"],["role","region",1,"mat-expansion-panel-content",3,"id"],[1,"mat-expansion-panel-body"],[3,"cdkPortalOutlet"]],template:function(t,n){t&1&&(Y(Lo),N(0),r(1,"div",2,0)(3,"div",3,1)(5,"div",4),N(6,1),K(7,Ho,0,0,"ng-template",5),s(),N(8,2),s()()),t&2&&(d(),R("inert",n.expanded?null:""),d(2),g("id",n.id),R("aria-labelledby",n._headerId),d(4),g("cdkPortalOutlet",n._portal))},dependencies:[ce],styles:[`.mat-expansion-panel {
  box-sizing: content-box;
  display: block;
  margin: 0;
  overflow: hidden;
}
.mat-expansion-panel.mat-expansion-panel-animations-enabled {
  transition: margin 225ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-expansion-panel {
  position: relative;
  background: var(--mat-expansion-container-background-color, var(--mat-sys-surface));
  color: var(--mat-expansion-container-text-color, var(--mat-sys-on-surface));
  border-radius: var(--mat-expansion-container-shape, 12px);
}
.mat-expansion-panel:not([class*=mat-elevation-z]) {
  box-shadow: var(--mat-expansion-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
}
.mat-accordion .mat-expansion-panel:not(.mat-expanded), .mat-accordion .mat-expansion-panel:not(.mat-expansion-panel-spacing) {
  border-radius: 0;
}
.mat-accordion .mat-expansion-panel:first-of-type {
  border-top-right-radius: var(--mat-expansion-container-shape, 12px);
  border-top-left-radius: var(--mat-expansion-container-shape, 12px);
}
.mat-accordion .mat-expansion-panel:last-of-type {
  border-bottom-right-radius: var(--mat-expansion-container-shape, 12px);
  border-bottom-left-radius: var(--mat-expansion-container-shape, 12px);
}
@media (forced-colors: active) {
  .mat-expansion-panel {
    outline: solid 1px;
  }
}

.mat-expansion-panel-content-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  grid-template-columns: 100%;
}
.mat-expansion-panel-animations-enabled .mat-expansion-panel-content-wrapper {
  transition: grid-template-rows 225ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-expansion-panel.mat-expanded > .mat-expansion-panel-content-wrapper {
  grid-template-rows: 1fr;
}
@supports not (grid-template-rows: 0fr) {
  .mat-expansion-panel-content-wrapper {
    height: 0;
  }
  .mat-expansion-panel.mat-expanded > .mat-expansion-panel-content-wrapper {
    height: auto;
  }
}
@media print {
  .mat-expansion-panel-content-wrapper {
    height: 0;
  }
  .mat-expansion-panel.mat-expanded > .mat-expansion-panel-content-wrapper {
    height: auto;
  }
}

.mat-expansion-panel-content {
  display: flex;
  flex-direction: column;
  overflow: visible;
  min-height: 0;
  visibility: hidden;
}
.mat-expansion-panel-animations-enabled .mat-expansion-panel-content {
  transition: visibility 190ms linear;
}
.mat-expansion-panel.mat-expanded > .mat-expansion-panel-content-wrapper > .mat-expansion-panel-content {
  visibility: visible;
}
.mat-expansion-panel-content {
  font-family: var(--mat-expansion-container-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-expansion-container-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-expansion-container-text-weight, var(--mat-sys-body-large-weight));
  line-height: var(--mat-expansion-container-text-line-height, var(--mat-sys-body-large-line-height));
  letter-spacing: var(--mat-expansion-container-text-tracking, var(--mat-sys-body-large-tracking));
}

.mat-expansion-panel-body {
  padding: 0 24px 16px;
}

.mat-expansion-panel-spacing {
  margin: 16px 0;
}
.mat-accordion > .mat-expansion-panel-spacing:first-child, .mat-accordion > *:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing {
  margin-top: 0;
}
.mat-accordion > .mat-expansion-panel-spacing:last-child, .mat-accordion > *:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing {
  margin-bottom: 0;
}

.mat-action-row {
  border-top-style: solid;
  border-top-width: 1px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 16px 8px 16px 24px;
  border-top-color: var(--mat-expansion-actions-divider-color, var(--mat-sys-outline));
}
.mat-action-row .mat-button-base,
.mat-action-row .mat-mdc-button-base {
  margin-left: 8px;
}
[dir=rtl] .mat-action-row .mat-button-base,
[dir=rtl] .mat-action-row .mat-mdc-button-base {
  margin-left: 0;
  margin-right: 8px;
}
`],encapsulation:2,changeDetection:0})}return i})();var Nn=(()=>{class i{panel=l(Ln,{host:!0});_element=l(B);_focusMonitor=l(Tt);_changeDetectorRef=l(ee);_parentChangeSubscription=ie.EMPTY;constructor(){l(dt).load(pt);let e=this.panel,t=l(ha,{optional:!0}),n=l(new it("tabindex"),{optional:!0}),o=e.accordion?e.accordion._stateChanges.pipe(le(c=>!!(c.hideToggle||c.togglePosition))):Et;this.tabIndex=parseInt(n||"")||0,this._parentChangeSubscription=Pe(e.opened,e.closed,o,e._inputChanges.pipe(le(c=>!!(c.hideToggle||c.disabled||c.togglePosition)))).subscribe(()=>this._changeDetectorRef.markForCheck()),e.closed.pipe(le(()=>e._containsFocus())).subscribe(()=>this._focusMonitor.focusVia(this._element,"program")),t&&(this.expandedHeight=t.expandedHeight,this.collapsedHeight=t.collapsedHeight)}expandedHeight;collapsedHeight;tabIndex=0;get disabled(){return this.panel.disabled}_toggle(){this.disabled||this.panel.toggle()}_isExpanded(){return this.panel.expanded}_getExpandedState(){return this.panel._getExpandedState()}_getPanelId(){return this.panel.id}_getTogglePosition(){return this.panel.togglePosition}_showToggle(){return!this.panel.hideToggle&&!this.panel.disabled}_getHeaderHeight(){let e=this._isExpanded();return e&&this.expandedHeight?this.expandedHeight:!e&&this.collapsedHeight?this.collapsedHeight:null}_keydown(e){switch(e.keyCode){case 32:case 13:Ne(e)||(e.preventDefault(),this._toggle());break;default:this.panel.accordion&&this.panel.accordion._handleHeaderKeydown(e);return}}focus(e,t){e?this._focusMonitor.focusVia(this._element,e,t):this._element.nativeElement.focus(t)}ngAfterViewInit(){this._focusMonitor.monitor(this._element).subscribe(e=>{e&&this.panel.accordion&&this.panel.accordion._handleHeaderFocus(this)})}ngOnDestroy(){this._parentChangeSubscription.unsubscribe(),this._focusMonitor.stopMonitoring(this._element)}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=v({type:i,selectors:[["mat-expansion-panel-header"]],hostAttrs:["role","button",1,"mat-expansion-panel-header","mat-focus-indicator"],hostVars:13,hostBindings:function(t,n){t&1&&u("click",function(){return n._toggle()})("keydown",function(c){return n._keydown(c)}),t&2&&(R("id",n.panel._headerId)("tabindex",n.disabled?-1:n.tabIndex)("aria-controls",n._getPanelId())("aria-expanded",n._isExpanded())("aria-disabled",n.panel.disabled),Oe("height",n._getHeaderHeight()),k("mat-expanded",n._isExpanded())("mat-expansion-toggle-indicator-after",n._getTogglePosition()==="after")("mat-expansion-toggle-indicator-before",n._getTogglePosition()==="before"))},inputs:{expandedHeight:"expandedHeight",collapsedHeight:"collapsedHeight",tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:Le(e)]},ngContentSelectors:zo,decls:5,vars:3,consts:[[1,"mat-content"],[1,"mat-expansion-indicator"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 -960 960 960","aria-hidden","true","focusable","false"],["d","M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"]],template:function(t,n){t&1&&(Y(Vo),st(0,"span",0),N(1),N(2,1),N(3,2),yt(),x(4,jo,3,0,"span",1)),t&2&&(k("mat-content-hide-toggle",!n._showToggle()),d(4),y(n._showToggle()?4:-1))},styles:[`.mat-expansion-panel-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 24px;
  border-radius: inherit;
}
.mat-expansion-panel-animations-enabled .mat-expansion-panel-header {
  transition: height 225ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-expansion-panel-header::before {
  border-radius: inherit;
}
.mat-expansion-panel-header {
  height: var(--mat-expansion-header-collapsed-state-height, 48px);
  font-family: var(--mat-expansion-header-text-font, var(--mat-sys-title-medium-font));
  font-size: var(--mat-expansion-header-text-size, var(--mat-sys-title-medium-size));
  font-weight: var(--mat-expansion-header-text-weight, var(--mat-sys-title-medium-weight));
  line-height: var(--mat-expansion-header-text-line-height, var(--mat-sys-title-medium-line-height));
  letter-spacing: var(--mat-expansion-header-text-tracking, var(--mat-sys-title-medium-tracking));
}
.mat-expansion-panel-header.mat-expanded {
  height: var(--mat-expansion-header-expanded-state-height, 64px);
}
.mat-expansion-panel-header[aria-disabled=true] {
  color: var(--mat-expansion-header-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-expansion-panel-header:not([aria-disabled=true]) {
  cursor: pointer;
}
.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover {
  background: var(--mat-expansion-header-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
@media (hover: none) {
  .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover {
    background: var(--mat-expansion-container-background-color, var(--mat-sys-surface));
  }
}
.mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-keyboard-focused, .mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-program-focused {
  background: var(--mat-expansion-header-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
}
.mat-expansion-panel-header._mat-animation-noopable {
  transition: none;
}
.mat-expansion-panel-header:focus, .mat-expansion-panel-header:hover {
  outline: none;
}
.mat-expansion-panel-header.mat-expanded:focus, .mat-expansion-panel-header.mat-expanded:hover {
  background: inherit;
}
.mat-expansion-panel-header.mat-expansion-toggle-indicator-before {
  flex-direction: row-reverse;
}
.mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator {
  margin: 0 16px 0 0;
}
[dir=rtl] .mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator {
  margin: 0 0 0 16px;
}

.mat-content {
  display: flex;
  flex: 1;
  flex-direction: row;
  overflow: hidden;
}
.mat-content.mat-content-hide-toggle {
  margin-right: 8px;
}
[dir=rtl] .mat-content.mat-content-hide-toggle {
  margin-right: 0;
  margin-left: 8px;
}
.mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle {
  margin-left: 24px;
  margin-right: 0;
}
[dir=rtl] .mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle {
  margin-right: 24px;
  margin-left: 0;
}

.mat-expansion-panel-header-title {
  color: var(--mat-expansion-header-text-color, var(--mat-sys-on-surface));
}

.mat-expansion-panel-header-title,
.mat-expansion-panel-header-description {
  display: flex;
  flex-grow: 1;
  flex-basis: 0;
  margin-right: 16px;
  align-items: center;
}
[dir=rtl] .mat-expansion-panel-header-title,
[dir=rtl] .mat-expansion-panel-header-description {
  margin-right: 0;
  margin-left: 16px;
}
.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-title,
.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-description {
  color: inherit;
}

.mat-expansion-panel-header-description {
  flex-grow: 2;
  color: var(--mat-expansion-header-description-color, var(--mat-sys-on-surface-variant));
}

.mat-expansion-panel-animations-enabled .mat-expansion-indicator {
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-expansion-panel-header.mat-expanded .mat-expansion-indicator {
  transform: rotate(180deg);
}
.mat-expansion-indicator::after {
  border-style: solid;
  border-width: 0 2px 2px 0;
  content: "";
  padding: 3px;
  transform: rotate(45deg);
  vertical-align: middle;
  color: var(--mat-expansion-header-indicator-color, var(--mat-sys-on-surface-variant));
  display: var(--mat-expansion-legacy-header-indicator-display, none);
}
.mat-expansion-indicator svg {
  width: 24px;
  height: 24px;
  margin: 0 -8px;
  vertical-align: middle;
  fill: var(--mat-expansion-header-indicator-color, var(--mat-sys-on-surface-variant));
  display: var(--mat-expansion-header-indicator-display, inline-block);
}

@media (forced-colors: active) {
  .mat-expansion-panel-content {
    border-top: 1px solid;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}
`],encapsulation:2,changeDetection:0})}return i})();var ba=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275dir=P({type:i,selectors:[["mat-panel-title"]],hostAttrs:[1,"mat-expansion-panel-header-title"]})}return i})(),_a=(()=>{class i extends da{_keyManager;_ownHeaders=new Rt;_headers;hideToggle=!1;displayMode="default";togglePosition="after";ngAfterContentInit(){this._headers.changes.pipe(he(this._headers)).subscribe(e=>{this._ownHeaders.reset(e.filter(t=>t.panel.accordion===this)),this._ownHeaders.notifyOnChanges()}),this._keyManager=new jt(this._ownHeaders).withWrap().withHomeAndEnd()}_handleHeaderKeydown(e){this._keyManager.onKeydown(e)}_handleHeaderFocus(e){this._keyManager.updateActiveItem(e)}ngOnDestroy(){super.ngOnDestroy(),this._keyManager?.destroy(),this._ownHeaders.destroy()}static \u0275fac=(()=>{let e;return function(n){return(e||(e=ye(i)))(n||i)}})();static \u0275dir=P({type:i,selectors:[["mat-accordion"]],contentQueries:function(t,n,o){if(t&1&&De(o,Nn,5),t&2){let c;I(c=D())&&(n._headers=c)}},hostAttrs:[1,"mat-accordion"],hostVars:2,hostBindings:function(t,n){t&2&&k("mat-accordion-multi",n.multi)},inputs:{hideToggle:[2,"hideToggle","hideToggle",S],displayMode:"displayMode",togglePosition:"togglePosition"},exportAs:["matAccordion"],features:[re([{provide:Bn,useExisting:i}]),U]})}return i})(),fa=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=j({type:i});static \u0275inj=V({imports:[pa,Ee,ne]})}return i})();function ga(i){return Error(`Unable to find icon with the name "${i}"`)}function Wo(){return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.")}function va(i){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${i}".`)}function xa(i){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${i}".`)}var Ae=class{url;svgText;options;svgElement=null;constructor(a,e,t){this.url=a,this.svgText=e,this.options=t}},Ca=(()=>{class i{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass=["material-icons","mat-ligature-font"];constructor(e,t,n,o){this._httpClient=e,this._sanitizer=t,this._errorHandler=o,this._document=n}addSvgIcon(e,t,n){return this.addSvgIconInNamespace("",e,t,n)}addSvgIconLiteral(e,t,n){return this.addSvgIconLiteralInNamespace("",e,t,n)}addSvgIconInNamespace(e,t,n,o){return this._addSvgIconConfig(e,t,new Ae(n,null,o))}addSvgIconResolver(e){return this._resolvers.push(e),this}addSvgIconLiteralInNamespace(e,t,n,o){let c=this._sanitizer.sanitize(rt.HTML,n);if(!c)throw xa(n);let h=mt(c);return this._addSvgIconConfig(e,t,new Ae("",h,o))}addSvgIconSet(e,t){return this.addSvgIconSetInNamespace("",e,t)}addSvgIconSetLiteral(e,t){return this.addSvgIconSetLiteralInNamespace("",e,t)}addSvgIconSetInNamespace(e,t,n){return this._addSvgIconSetConfig(e,new Ae(t,null,n))}addSvgIconSetLiteralInNamespace(e,t,n){let o=this._sanitizer.sanitize(rt.HTML,t);if(!o)throw xa(t);let c=mt(o);return this._addSvgIconSetConfig(e,new Ae("",c,n))}registerFontClassAlias(e,t=e){return this._fontCssClassesByAlias.set(e,t),this}classNameForFontAlias(e){return this._fontCssClassesByAlias.get(e)||e}setDefaultFontSetClass(...e){return this._defaultFontSetClass=e,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(e){let t=this._sanitizer.sanitize(rt.RESOURCE_URL,e);if(!t)throw va(e);let n=this._cachedIconsByUrl.get(t);return n?ge(Jt(n)):this._loadSvgIconFromConfig(new Ae(e,null)).pipe(Pt(o=>this._cachedIconsByUrl.set(t,o)),ot(o=>Jt(o)))}getNamedSvgIcon(e,t=""){let n=ya(t,e),o=this._svgIconConfigs.get(n);if(o)return this._getSvgFromConfig(o);if(o=this._getIconConfigFromResolvers(t,e),o)return this._svgIconConfigs.set(n,o),this._getSvgFromConfig(o);let c=this._iconSetConfigs.get(t);return c?this._getSvgFromIconSetConfigs(e,c):Vn(ga(n))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear()}_getSvgFromConfig(e){return e.svgText?ge(Jt(this._svgElementFromConfig(e))):this._loadSvgIconFromConfig(e).pipe(ot(t=>Jt(t)))}_getSvgFromIconSetConfigs(e,t){let n=this._extractIconWithNameFromAnySet(e,t);if(n)return ge(n);let o=t.filter(c=>!c.svgText).map(c=>this._loadSvgIconSetFromConfig(c).pipe($n(h=>{let W=`Loading icon set URL: ${this._sanitizer.sanitize(rt.RESOURCE_URL,c.url)} failed: ${h.message}`;return this._errorHandler.handleError(new Error(W)),ge(null)})));return jn(o).pipe(ot(()=>{let c=this._extractIconWithNameFromAnySet(e,t);if(!c)throw ga(e);return c}))}_extractIconWithNameFromAnySet(e,t){for(let n=t.length-1;n>=0;n--){let o=t[n];if(o.svgText&&o.svgText.toString().indexOf(e)>-1){let c=this._svgElementFromConfig(o),h=this._extractSvgIconFromSet(c,e,o.options);if(h)return h}}return null}_loadSvgIconFromConfig(e){return this._fetchIcon(e).pipe(Pt(t=>e.svgText=t),ot(()=>this._svgElementFromConfig(e)))}_loadSvgIconSetFromConfig(e){return e.svgText?ge(null):this._fetchIcon(e).pipe(Pt(t=>e.svgText=t))}_extractSvgIconFromSet(e,t,n){let o=e.querySelector(`[id="${t}"]`);if(!o)return null;let c=o.cloneNode(!0);if(c.removeAttribute("id"),c.nodeName.toLowerCase()==="svg")return this._setSvgAttributes(c,n);if(c.nodeName.toLowerCase()==="symbol")return this._setSvgAttributes(this._toSvgElement(c),n);let h=this._svgElementFromString(mt("<svg></svg>"));return h.appendChild(c),this._setSvgAttributes(h,n)}_svgElementFromString(e){let t=this._document.createElement("DIV");t.innerHTML=e;let n=t.querySelector("svg");if(!n)throw Error("<svg> tag not found");return n}_toSvgElement(e){let t=this._svgElementFromString(mt("<svg></svg>")),n=e.attributes;for(let o=0;o<n.length;o++){let{name:c,value:h}=n[o];c!=="id"&&t.setAttribute(c,h)}for(let o=0;o<e.childNodes.length;o++)e.childNodes[o].nodeType===this._document.ELEMENT_NODE&&t.appendChild(e.childNodes[o].cloneNode(!0));return t}_setSvgAttributes(e,t){return e.setAttribute("fit",""),e.setAttribute("height","100%"),e.setAttribute("width","100%"),e.setAttribute("preserveAspectRatio","xMidYMid meet"),e.setAttribute("focusable","false"),t&&t.viewBox&&e.setAttribute("viewBox",t.viewBox),e}_fetchIcon(e){let{url:t,options:n}=e,o=n?.withCredentials??!1;if(!this._httpClient)throw Wo();if(t==null)throw Error(`Cannot fetch icon from URL "${t}".`);let c=this._sanitizer.sanitize(rt.RESOURCE_URL,t);if(!c)throw va(t);let h=this._inProgressUrlFetches.get(c);if(h)return h;let C=this._httpClient.get(c,{responseType:"text",withCredentials:o}).pipe(ot(W=>mt(W)),Qn(()=>this._inProgressUrlFetches.delete(c)),Un());return this._inProgressUrlFetches.set(c,C),C}_addSvgIconConfig(e,t,n){return this._svgIconConfigs.set(ya(e,t),n),this}_addSvgIconSetConfig(e,t){let n=this._iconSetConfigs.get(e);return n?n.push(t):this._iconSetConfigs.set(e,[t]),this}_svgElementFromConfig(e){if(!e.svgElement){let t=this._svgElementFromString(e.svgText);this._setSvgAttributes(t,e.options),e.svgElement=t}return e.svgElement}_getIconConfigFromResolvers(e,t){for(let n=0;n<this._resolvers.length;n++){let o=this._resolvers[n](t,e);if(o)return Qo(o)?new Ae(o.url,null,o.options):new Ae(o,null)}}static \u0275fac=function(t){return new(t||i)(xt(di,8),xt(mi),xt(de,8),xt(Ot))};static \u0275prov=Fe({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();function Jt(i){return i.cloneNode(!0)}function ya(i,a){return i+":"+a}function Qo(i){return!!(i.url&&i.options)}var Uo=["*"],Go=new E("MAT_ICON_DEFAULT_OPTIONS"),Zo=new E("mat-icon-location",{providedIn:"root",factory:()=>{let i=l(de),a=i?i.location:null;return{getPathname:()=>a?a.pathname+a.search:""}}}),ka=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],Xo=ka.map(i=>`[${i}]`).join(", "),Ko=/^url\(['"]?#(.*?)['"]?\)$/,Ke=(()=>{class i{_elementRef=l(B);_iconRegistry=l(Ca);_location=l(Zo);_errorHandler=l(Ot);_defaultColor;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;inline=!1;get svgIcon(){return this._svgIcon}set svgIcon(e){e!==this._svgIcon&&(e?this._updateSvgIcon(e):this._svgIcon&&this._clearSvgElement(),this._svgIcon=e)}_svgIcon;get fontSet(){return this._fontSet}set fontSet(e){let t=this._cleanupFontValue(e);t!==this._fontSet&&(this._fontSet=t,this._updateFontIconClasses())}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(e){let t=this._cleanupFontValue(e);t!==this._fontIcon&&(this._fontIcon=t,this._updateFontIconClasses())}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName=null;_svgNamespace=null;_previousPath;_elementsWithExternalReferences;_currentIconFetch=ie.EMPTY;constructor(){let e=l(new it("aria-hidden"),{optional:!0}),t=l(Go,{optional:!0});t&&(t.color&&(this.color=this._defaultColor=t.color),t.fontSet&&(this.fontSet=t.fontSet)),e||this._elementRef.nativeElement.setAttribute("aria-hidden","true")}_splitIconName(e){if(!e)return["",""];let t=e.split(":");switch(t.length){case 1:return["",t[0]];case 2:return t;default:throw Error(`Invalid icon name: "${e}"`)}}ngOnInit(){this._updateFontIconClasses()}ngAfterViewChecked(){let e=this._elementsWithExternalReferences;if(e&&e.size){let t=this._location.getPathname();t!==this._previousPath&&(this._previousPath=t,this._prependPathToReferences(t))}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear()}_usingFontIcon(){return!this.svgIcon}_setSvgElement(e){this._clearSvgElement();let t=this._location.getPathname();this._previousPath=t,this._cacheChildrenWithExternalReferences(e),this._prependPathToReferences(t),this._elementRef.nativeElement.appendChild(e)}_clearSvgElement(){let e=this._elementRef.nativeElement,t=e.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();t--;){let n=e.childNodes[t];(n.nodeType!==1||n.nodeName.toLowerCase()==="svg")&&n.remove()}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let e=this._elementRef.nativeElement,t=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(n=>n.length>0);this._previousFontSetClass.forEach(n=>e.classList.remove(n)),t.forEach(n=>e.classList.add(n)),this._previousFontSetClass=t,this.fontIcon!==this._previousFontIconClass&&!t.includes("mat-ligature-font")&&(this._previousFontIconClass&&e.classList.remove(this._previousFontIconClass),this.fontIcon&&e.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon)}_cleanupFontValue(e){return typeof e=="string"?e.trim().split(" ")[0]:e}_prependPathToReferences(e){let t=this._elementsWithExternalReferences;t&&t.forEach((n,o)=>{n.forEach(c=>{o.setAttribute(c.name,`url('${e}#${c.value}')`)})})}_cacheChildrenWithExternalReferences(e){let t=e.querySelectorAll(Xo),n=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let o=0;o<t.length;o++)ka.forEach(c=>{let h=t[o],C=h.getAttribute(c),W=C?C.match(Ko):null;if(W){let Me=n.get(h);Me||(Me=[],n.set(h,Me)),Me.push({name:c,value:W[1]})}})}_updateSvgIcon(e){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),e){let[t,n]=this._splitIconName(e);t&&(this._svgNamespace=t),n&&(this._svgName=n),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(n,t).pipe(ve(1)).subscribe(o=>this._setSvgElement(o),o=>{let c=`Error retrieving icon ${t}:${n}! ${o.message}`;this._errorHandler.handleError(new Error(c))})}}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=v({type:i,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(t,n){t&2&&(R("data-mat-icon-type",n._usingFontIcon()?"font":"svg")("data-mat-icon-name",n._svgName||n.fontIcon)("data-mat-icon-namespace",n._svgNamespace||n.fontSet)("fontIcon",n._usingFontIcon()?n.fontIcon:null),ke(n.color?"mat-"+n.color:""),k("mat-icon-inline",n.inline)("mat-icon-no-color",n.color!=="primary"&&n.color!=="accent"&&n.color!=="warn"))},inputs:{color:"color",inline:[2,"inline","inline",S],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],ngContentSelectors:Uo,decls:1,vars:0,template:function(t,n){t&1&&(Y(),N(0))},styles:[`mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
  color: var(--mat-icon-color, inherit);
}

.mat-icon {
  -webkit-user-select: none;
  user-select: none;
  background-repeat: no-repeat;
  display: inline-block;
  fill: currentColor;
  height: 24px;
  width: 24px;
  overflow: hidden;
}
.mat-icon.mat-icon-inline {
  font-size: inherit;
  height: inherit;
  line-height: inherit;
  width: inherit;
}
.mat-icon.mat-ligature-font[fontIcon]::before {
  content: attr(fontIcon);
}

[dir=rtl] .mat-icon-rtl-mirror {
  transform: scale(-1, 1);
}

.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon {
  display: block;
}
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon {
  margin: auto;
}
`],encapsulation:2,changeDetection:0})}return i})(),Ye=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=j({type:i});static \u0275inj=V({imports:[ne]})}return i})();var nn=(i,a)=>a.id;function Yo(i,a){i&1&&(r(0,"p",4),m(1,"No actions unlocked."),s())}function Jo(i,a){if(i&1&&(r(0,"span",6),m(1),s()),i&2){let e=a.$implicit;d(),f(e)}}function er(i,a){if(i&1&&(r(0,"span",6),m(1),s()),i&2){let e=a.$implicit;d(),f(e)}}function tr(i,a){if(i&1&&(r(0,"div",9)(1,"div",10)(2,"span",11),m(3),s(),w(4,er,2,1,"span",6,q),s(),r(6,"p",12),m(7),s()()),i&2){let e=a.$implicit;d(3),f(e.name),d(),M(e.tags),d(3),f(e.description)}}function nr(i,a){if(i&1&&(r(0,"div",8),w(1,tr,8,2,"div",9,nn),s()),i&2){p();let e=J(8);d(),M(e)}}function ir(i,a){if(i&1&&(r(0,"mat-expansion-panel")(1,"mat-expansion-panel-header")(2,"mat-panel-title",5),m(3),w(4,Jo,2,1,"span",6,q),s()(),r(6,"p",7),m(7),s(),Re(8),x(9,nr,3,0,"div",8),s()),i&2){let e=a.$implicit,t=p(3);d(3),nt(" ",e.name," "),d(),M(e.tags),d(3),f(e.description),d();let n=Be(p().unlockedUpgrades(t,e));d(),y(n.length>0?9:-1)}}function ar(i,a){if(i&1&&(r(0,"mat-accordion"),w(1,ir,10,4,"mat-expansion-panel",null,nn),s()),i&2){p();let e=J(0);d(),M(e)}}function or(i,a){if(i&1&&(Re(0),x(1,Yo,2,0,"p",4)(2,ar,3,0,"mat-accordion")),i&2){let e=p(),t=J(0),n=Be(p().visibleActions(e,t));d(),y(n.length===0?1:2)}}function rr(i,a){if(i&1&&(r(0,"span",6),m(1),s()),i&2){let e=a.$implicit;d(),f(e)}}function sr(i,a){if(i&1){let e=T();r(0,"mat-checkbox",21),u("change",function(n){let o=b(e).$implicit,c=p().$implicit,h=p(3);return _(h.onActionCheckboxChange(c.id,o,n.checked))}),s()}if(i&2){let e=a.$implicit,t=p().$implicit,n=p(2),o=p();g("checked",o.getActionCount(n,t.id)>=e)("disabled",t.tags.includes("innate"))}}function cr(i,a){if(i&1&&(r(0,"span",6),m(1),s()),i&2){let e=a.$implicit;d(),f(e)}}function lr(i,a){if(i&1){let e=T();r(0,"mat-checkbox",21),u("change",function(n){let o=b(e).$implicit,c=p().$implicit,h=p(2).$implicit,C=p(3);return _(C.onUpgradeCheckboxChange(h.id,c.id,o,n.checked))}),s()}if(i&2){let e=a.$implicit,t=p().$implicit,n=p(2).$implicit,o=p(2),c=p();g("checked",c.getUpgradeCount(o,n.id,t.id)>=e)("disabled",!n.tags.includes("innate")&&c.getActionCount(o,n.id)===0)}}function dr(i,a){if(i&1&&(r(0,"div",22)(1,"div",15)(2,"div",10)(3,"span",11),m(4),s(),w(5,cr,2,1,"span",6,q),s(),r(7,"p",12),m(8),s()(),r(9,"div",18),w(10,lr,1,2,"mat-checkbox",19,q),s()()),i&2){let e=a.$implicit,t=p(5);d(4),f(e.name),d(),M(e.tags),d(3),f(e.description),d(2),M(t.range(e.maxTimes))}}function mr(i,a){if(i&1&&(r(0,"div",20),w(1,dr,12,2,"div",22,nn),s()),i&2){let e=p().$implicit;d(),M(e.upgrades)}}function pr(i,a){if(i&1&&(r(0,"div",13)(1,"div",14)(2,"div",15)(3,"div",16)(4,"span",17),m(5),s(),w(6,rr,2,1,"span",6,q),s(),r(8,"p",7),m(9),s()(),r(10,"div",18),w(11,sr,1,2,"mat-checkbox",19,q),s()(),x(13,mr,3,0,"div",20),s()),i&2){let e=a.$implicit,t=p(3);d(5),f(e.name),d(),M(e.tags),d(3),f(e.description),d(2),M(t.range(e.maxTimes)),d(2),y(e.upgrades.length>0?13:-1)}}function ur(i,a){if(i&1&&(r(0,"div",3),w(1,pr,14,3,"div",13,nn),s()),i&2){p();let e=J(0);d(),M(e)}}function hr(i,a){if(i&1){let e=T();Re(0),r(1,"div",0)(2,"div",1)(3,"button",2),u("click",function(){b(e);let n=p();return _(n.toggleEditMode())}),r(4,"mat-icon"),m(5),s()()(),x(6,or,3,2)(7,ur,3,0,"div",3),s()}if(i&2){let e=p();Be(e.actionsForCategory()),d(3),g("title",e.editMode?"Done editing":"Edit actions"),d(2),f(e.editMode?"check":"add"),d(),y(e.editMode?7:6)}}var tn=class i{svc=l(pe);staticData=l(me);category=kt.required();character=ue(this.svc.character$);actionsForCategory=se(()=>this.staticData.getActions().filter(a=>a.attributeCategory===this.category()));editMode=!1;toggleEditMode(){this.editMode=!this.editMode}visibleActions(a,e){return e.filter(t=>t.tags.includes("innate")||this.getActionCount(a,t.id)>0)}unlockedUpgrades(a,e){return e.upgrades.filter(t=>this.getUpgradeCount(a,e.id,t.id)>0)}getActionCount(a,e){return a.unlockedActions.find(t=>t.actionId===e)?.count??0}getUpgradeCount(a,e,t){let n=`${e}:${t}`;return a.unlockedActions.find(o=>o.actionId===n)?.count??0}range(a){return Array.from({length:a},(e,t)=>t+1)}onActionCheckboxChange(a,e,t){this.svc.setActionCount(a,t?e:e-1)}onUpgradeCheckboxChange(a,e,t,n){this.svc.setUpgradeCount(a,e,n?t:t-1)}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=v({type:i,selectors:[["app-attribute-tab"]],inputs:{category:[1,"category"]},decls:1,vars:1,consts:[[1,"tab-body"],[1,"tab-toolbar"],["mat-icon-button","",3,"click","title"],[1,"edit-list"],[1,"empty-state"],[1,"panel-title"],[1,"action-tags"],[1,"action-description"],[1,"unlocked-upgrades"],[1,"upgrade-entry"],[1,"upgrade-name-row"],[1,"upgrade-name"],[1,"upgrade-description"],[1,"edit-action"],[1,"edit-action-row"],[1,"edit-action-info"],[1,"edit-action-name-row"],[1,"action-name"],[1,"edit-checkboxes"],[3,"checked","disabled"],[1,"edit-upgrades"],[3,"change","checked","disabled"],[1,"edit-upgrade-row"]],template:function(e,t){if(e&1&&x(0,hr,8,4,"div",0),e&2){let n;y((n=t.character())?0:-1,n)}},dependencies:[$,He,we,fe,fa,_a,Ln,Nn,ba,Ye,Ke],styles:[".tab-body[_ngcontent-%COMP%]{padding:0 0 16px}.tab-toolbar[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;padding:4px 8px 0}.empty-state[_ngcontent-%COMP%]{padding:24px 16px;color:var(--mat-sys-on-surface-variant)}.action-tags[_ngcontent-%COMP%]{display:inline-block;margin-left:8px;padding:1px 6px;border-radius:4px;font-size:.7rem;font-style:normal;font-weight:500;letter-spacing:.04em;text-transform:uppercase;background:var(--mat-sys-secondary-container);color:var(--mat-sys-on-secondary-container);vertical-align:middle}.panel-title[_ngcontent-%COMP%]{display:flex;align-items:center}.action-description[_ngcontent-%COMP%]{margin:0 0 8px;color:var(--mat-sys-on-surface-variant)}.unlocked-upgrades[_ngcontent-%COMP%]{border-left:2px solid var(--mat-sys-outline-variant);margin-left:8px;padding-left:12px;display:flex;flex-direction:column;gap:8px}.upgrade-entry[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:2px}.upgrade-name-row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px;flex-wrap:wrap}.upgrade-name[_ngcontent-%COMP%]{font-weight:500;font-size:.875rem}.upgrade-description[_ngcontent-%COMP%]{margin:0;font-size:.875rem;color:var(--mat-sys-on-surface-variant)}.edit-list[_ngcontent-%COMP%]{display:flex;flex-direction:column}.edit-action[_ngcontent-%COMP%]{border-bottom:1px solid var(--mat-sys-outline-variant);padding:12px 16px}.edit-action-row[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:16px}.edit-action-info[_ngcontent-%COMP%]{flex:1;min-width:0}.edit-action-name-row[_ngcontent-%COMP%]{display:flex;align-items:center;margin-bottom:4px}.action-name[_ngcontent-%COMP%]{font-weight:500}.edit-checkboxes[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px;flex-shrink:0;padding-top:2px}.edit-upgrades[_ngcontent-%COMP%]{margin-top:8px;margin-left:16px;border-left:2px solid var(--mat-sys-outline-variant);padding-left:12px;display:flex;flex-direction:column;gap:8px}.edit-upgrade-row[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:16px}"]})};function br(i,a){i&1&&(r(0,"mat-error"),m(1,"Title is required"),s())}var an=class i{dialogRef=l(be);fb=l(xi);form=this.fb.group({title:["",bi.required],description:[""],tags:[""],equipped:[!1]});onAdd(){if(this.form.invalid)return;let{title:a,description:e,tags:t,equipped:n}=this.form.getRawValue(),o=(t??"").split(",").map(c=>c.trim()).filter(c=>c.length>0);this.dialogRef.close({title:a,description:e??"",tags:o,equipped:n})}onCancel(){this.dialogRef.close()}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=v({type:i,selectors:[["app-add-equipment"]],decls:26,vars:3,consts:[["mat-dialog-title",""],[3,"formGroup"],["appearance","outline",1,"full-width"],["matInput","","formControlName","title"],["matInput","","formControlName","description","rows","3","cdkTextareaAutosize",""],["matInput","","formControlName","tags"],["formControlName","equipped"],["align","end"],["mat-button","",3,"click"],["mat-raised-button","","color","primary",3,"click","disabled"]],template:function(e,t){if(e&1&&(r(0,"h2",0),m(1,"Add Equipment"),s(),r(2,"mat-dialog-content")(3,"form",1)(4,"mat-form-field",2)(5,"mat-label"),m(6,"Title"),s(),F(7,"input",3),x(8,br,2,0,"mat-error"),s(),r(9,"mat-form-field",2)(10,"mat-label"),m(11,"Description"),s(),F(12,"textarea",4),s(),r(13,"mat-form-field",2)(14,"mat-label"),m(15,"Tags"),s(),F(16,"input",5),r(17,"mat-hint"),m(18,"Comma-separated (e.g. ranged, piercing)"),s()(),r(19,"mat-checkbox",6),m(20,"Equipped"),s()()(),r(21,"mat-dialog-actions",7)(22,"button",8),u("click",function(){return t.onCancel()}),m(23,"Cancel"),s(),r(24,"button",9),u("click",function(){return t.onAdd()}),m(25," Add "),s()()),e&2){let n;d(3),g("formGroup",t.form),d(5),y((n=t.form.get("title"))!=null&&n.touched&&((n=t.form.get("title"))!=null&&n.hasError("required"))?8:-1),d(16),g("disabled",t.form.invalid)}},dependencies:[yi,fi,ct,lt,_i,vi,gi,$,Z,we,fe,Xe,Ue,Ze,Ge,je,ze,Ve,Pi,Ai,$e,qe,Fi],styles:[".full-width[_ngcontent-%COMP%]{width:100%;margin-bottom:8px}"]})};var _r=(i,a)=>a.key,fr=(i,a)=>a.id;function gr(i,a){if(i&1){let e=T();r(0,"div",1)(1,"input",5),u("blur",function(n){let o=b(e).$implicit,c=p(2);return _(c.onBonusBlur(o.key,n))}),s(),r(2,"span",6),m(3),s()()}if(i&2){let e=a.$implicit,t=p(2);d(),g("value",t.equipmentBonuses()[e.key]),d(2),f(e.label)}}function vr(i,a){i&1&&(r(0,"p",4),m(1,"No equipment. Click + to add an item."),s())}function xr(i,a){if(i&1&&(r(0,"span",14),m(1),s()),i&2){let e=a.$implicit;d(),f(e)}}function yr(i,a){if(i&1){let e=T();r(0,"div",19)(1,"span",21),m(2,"Delete this item?"),s(),r(3,"button",22),u("click",function(){b(e);let n=p(2).$implicit,o=p(3);return _(o.confirmDelete(n.id))}),m(4,"Delete"),s(),r(5,"button",23),u("click",function(){b(e);let n=p(5);return _(n.cancelDelete())}),m(6,"Cancel"),s()()}}function Cr(i,a){if(i&1){let e=T();r(0,"div",20)(1,"button",24),u("click",function(){b(e);let n=p(2).$implicit,o=p(3);return _(o.requestDelete(n.id))}),r(2,"mat-icon"),m(3,"delete"),s()()()}}function kr(i,a){if(i&1&&(r(0,"div",17)(1,"p",18),m(2),s(),x(3,yr,7,0,"div",19)(4,Cr,4,0,"div",20),s()),i&2){let e=p().$implicit,t=p(3);d(2),f(e.description),d(),y(t.confirmDeleteId===e.id?3:4)}}function Tr(i,a){if(i&1){let e=T();r(0,"div",10)(1,"div",11),u("click",function(){let n=b(e).$implicit,o=p(3);return _(o.toggleExpanded(n.id))}),r(2,"span",12)(3,"span",13),m(4),s(),w(5,xr,2,1,"span",14,q),s(),r(7,"span",15),u("click",function(n){return n.stopPropagation()}),r(8,"mat-checkbox",16),u("change",function(n){let o=b(e).$implicit,c=p(3);return _(c.svc.updateEquipmentEquipped(o.id,n.checked))}),s()()(),x(9,kr,5,2,"div",17),s()}if(i&2){let e=a.$implicit,t=p(3);k("item-card--expanded",t.expandedId===e.id),d(4),f(e.title),d(),M(e.tags),d(3),g("checked",e.equipped),d(),y(t.expandedId===e.id?9:-1)}}function wr(i,a){if(i&1&&(r(0,"div",7)(1,"span"),m(2,"Title"),s(),r(3,"span"),m(4,"Equipped"),s()(),r(5,"div",8),w(6,Tr,10,5,"div",9,fr),s()),i&2){let e=p();d(6),M(e.equipment)}}function Mr(i,a){if(i&1){let e=T();r(0,"div",0),w(1,gr,4,2,"div",1,_r),s(),r(3,"div",2)(4,"button",3),u("click",function(){b(e);let n=p();return _(n.openAddDialog())}),r(5,"mat-icon"),m(6,"add"),s()()(),x(7,vr,2,0,"p",4)(8,wr,8,0)}if(i&2){let e=p();d(),M(e.bonusFields),d(6),y(a.equipment.length===0?7:8)}}var on=class i{svc=l(pe);dialog=l(_e);character=ue(this.svc.character$);expandedId=null;confirmDeleteId=null;bonusFields=[{key:"strength",label:"STR"},{key:"dexterity",label:"DEX"},{key:"stamina",label:"STA"},{key:"intelligence",label:"INT"},{key:"willpower",label:"WIL"},{key:"spirit",label:"SPI"},{key:"genericSpellPower",label:"POW"},{key:"moveSpeed",label:"MOV"},{key:"maxWounds",label:"WND"}];equipmentBonuses=se(()=>this.character()?.equipmentBonuses??{strength:0,dexterity:0,stamina:0,intelligence:0,willpower:0,spirit:0,genericSpellPower:0,moveSpeed:0,maxWounds:0});onBonusBlur(a,e){let t=+e.target.value;if(isNaN(t))return;let n=this.equipmentBonuses();this.svc.updateEquipmentBonuses(vt(H({},n),{[a]:t}))}toggleExpanded(a){this.expandedId=this.expandedId===a?null:a,this.confirmDeleteId!==a&&(this.confirmDeleteId=null)}requestDelete(a){this.confirmDeleteId=a}cancelDelete(){this.confirmDeleteId=null}confirmDelete(a){this.svc.deleteEquipment(a),this.expandedId=null,this.confirmDeleteId=null}openAddDialog(){this.dialog.open(an,{width:"420px"}).afterClosed().subscribe(e=>{e&&this.svc.addEquipment(e.title,e.description,e.tags,e.equipped)})}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=v({type:i,selectors:[["app-equipment-tab"]],decls:1,vars:1,consts:[[1,"bonus-row"],[1,"bonus-field"],[1,"tab-toolbar"],["mat-icon-button","","title","Add equipment",3,"click"],[1,"empty-state"],["type","number","min","0",1,"bonus-input",3,"blur","value"],[1,"bonus-label"],[1,"equipment-header"],[1,"item-list"],[1,"item-card",3,"item-card--expanded"],[1,"item-card"],[1,"item-row",3,"click"],[1,"col-name-wrap"],[1,"item-name"],[1,"action-tags"],[1,"item-checkbox-wrap",3,"click"],[3,"change","checked"],[1,"item-expanded"],[1,"item-full-description"],[1,"confirm-delete"],[1,"item-expanded-actions"],[1,"confirm-text"],["mat-button","","color","warn",3,"click"],["mat-button","",3,"click"],["mat-icon-button","","title","Delete item",3,"click"]],template:function(e,t){if(e&1&&x(0,Mr,9,1),e&2){let n;y((n=t.character())?0:-1,n)}},dependencies:[$,Z,He,we,fe,Ye,Ke],styles:[".bonus-row[_ngcontent-%COMP%]{display:flex;gap:8px;padding:8px 16px;border-bottom:1px solid var(--mat-sys-outline-variant);flex-wrap:wrap}.bonus-field[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:2px}.bonus-input[_ngcontent-%COMP%]{width:48px;text-align:center;border:1px solid var(--mat-sys-outline);border-radius:4px;padding:4px;font-size:.875rem;background:transparent;color:inherit}.bonus-input[_ngcontent-%COMP%]:focus{outline:none;border-color:var(--mat-sys-primary)}.bonus-label[_ngcontent-%COMP%]{font-size:.75rem;color:var(--mat-sys-on-surface-variant);font-weight:600;letter-spacing:.04em}.tab-toolbar[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;padding:4px 8px 0}.empty-state[_ngcontent-%COMP%]{padding:24px 16px;color:var(--mat-sys-on-surface-variant)}.equipment-header[_ngcontent-%COMP%], .item-row[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 120px;align-items:center;gap:8px}.equipment-header[_ngcontent-%COMP%]{padding:6px 16px;border-bottom:2px solid var(--mat-sys-outline-variant);font-size:.8125rem;font-weight:600;color:var(--mat-sys-on-surface-variant);text-transform:uppercase;letter-spacing:.04em}.item-list[_ngcontent-%COMP%]{display:flex;flex-direction:column}.item-card[_ngcontent-%COMP%]{border-bottom:1px solid var(--mat-sys-outline-variant)}.item-card--expanded[_ngcontent-%COMP%]{background:var(--mat-sys-surface-variant)}.item-row[_ngcontent-%COMP%]{padding:12px 16px;cursor:pointer;-webkit-user-select:none;user-select:none}.item-row[_ngcontent-%COMP%]:hover{background:color-mix(in srgb,var(--mat-sys-on-surface) 4%,transparent)}.col-name-wrap[_ngcontent-%COMP%]{display:flex;align-items:center;min-width:0;gap:4px;overflow:hidden}.item-name[_ngcontent-%COMP%]{font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex-shrink:1}.action-tags[_ngcontent-%COMP%]{flex-shrink:0;padding:1px 6px;border-radius:4px;font-size:.7rem;font-weight:500;letter-spacing:.04em;text-transform:uppercase;background:var(--mat-sys-secondary-container);color:var(--mat-sys-on-secondary-container)}.item-expanded[_ngcontent-%COMP%]{padding:0 16px 12px}.item-full-description[_ngcontent-%COMP%]{margin:0 0 8px;white-space:pre-wrap;word-break:break-word}.expanded-meta[_ngcontent-%COMP%]{display:grid;grid-template-columns:80px 1fr;gap:2px 8px;margin-bottom:8px;font-size:.875rem}.meta-label[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant)}.item-expanded-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}.confirm-delete[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;justify-content:flex-end}.confirm-text[_ngcontent-%COMP%]{font-size:.875rem;color:var(--mat-sys-error)}"]})};var Ir=(i,a)=>a.id;function Dr(i,a){i&1&&(r(0,"p",4),m(1,"No maneuvers found."),s())}function Sr(i,a){if(i&1){let e=T();r(0,"div",9),u("click",function(){let n=b(e).$implicit,o=p(2);return _(o.selectedManeuverId.set(n.id))}),r(1,"span",10),m(2),s(),r(3,"span",11),m(4),s()()}if(i&2){let e=a.$implicit,t=p(2);k("maneuver-option--selected",t.selectedManeuverId()===e.id),d(2),f(e.name),d(2),f(e.attribute)}}function Er(i,a){if(i&1&&w(0,Sr,5,4,"div",8,Ir),i&2){let e=p();M(e.filteredManeuvers())}}var rn=class i{dialogRef=l(be);staticData=l(me);data=l(It);searchText=Q("");selectedManeuverId=Q(null);filteredManeuvers=se(()=>this.staticData.getManeuvers().filter(a=>!this.data.addedManeuverIds.includes(a.id)).filter(a=>a.name.toLowerCase().includes(this.searchText().toLowerCase())));onAdd(){let a=this.selectedManeuverId();a&&this.dialogRef.close({maneuverId:a})}onCancel(){this.dialogRef.close()}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=v({type:i,selectors:[["app-add-maneuver"]],decls:15,vars:3,consts:[["mat-dialog-title",""],["appearance","outline",1,"search-field"],["matInput","",3,"ngModelChange","ngModel"],[1,"maneuver-list"],[1,"no-results"],["align","end"],["mat-button","",3,"click"],["mat-raised-button","","color","primary",3,"click","disabled"],[1,"maneuver-option",3,"maneuver-option--selected"],[1,"maneuver-option",3,"click"],[1,"maneuver-name"],[1,"maneuver-meta"]],template:function(e,t){e&1&&(r(0,"h2",0),m(1,"Add Maneuver"),s(),r(2,"mat-dialog-content")(3,"mat-form-field",1)(4,"mat-label"),m(5,"Search maneuvers"),s(),r(6,"input",2),u("ngModelChange",function(o){return t.searchText.set(o)}),s()(),r(7,"div",3),x(8,Dr,2,0,"p",4)(9,Er,2,0),s()(),r(10,"mat-dialog-actions",5)(11,"button",6),u("click",function(){return t.onCancel()}),m(12,"Cancel"),s(),r(13,"button",7),u("click",function(){return t.onAdd()}),m(14," Add "),s()()),e&2&&(d(6),g("ngModel",t.searchText()),d(2),y(t.filteredManeuvers().length===0?8:9),d(5),g("disabled",t.selectedManeuverId()===null))},dependencies:[Vt,ct,lt,Ht,$,Z,Xe,Ue,Ze,Ge,je,ze,Ve,$e,qe],styles:[".search-field[_ngcontent-%COMP%]{width:100%}.maneuver-list[_ngcontent-%COMP%]{max-height:320px;overflow-y:auto;border:1px solid var(--mat-sys-outline-variant);border-radius:4px;margin-bottom:12px}.no-results[_ngcontent-%COMP%]{padding:16px;color:var(--mat-sys-on-surface-variant);text-align:center;margin:0}.maneuver-option[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;cursor:pointer;border-bottom:1px solid var(--mat-sys-outline-variant)}.maneuver-option[_ngcontent-%COMP%]:last-child{border-bottom:none}.maneuver-option[_ngcontent-%COMP%]:hover{background:color-mix(in srgb,var(--mat-sys-on-surface) 4%,transparent)}.maneuver-option--selected[_ngcontent-%COMP%]{background:color-mix(in srgb,var(--mat-sys-primary) 12%,transparent)}.maneuver-name[_ngcontent-%COMP%]{font-weight:500}.maneuver-meta[_ngcontent-%COMP%]{font-size:.875rem;color:var(--mat-sys-on-surface-variant)}"]})};var Ar=()=>[],Pr=(i,a)=>a.maneuverId;function Fr(i,a){i&1&&(r(0,"p",2),m(1,"No maneuvers. Click + to add one."),s())}function Or(i,a){if(i&1&&(r(0,"span",10),m(1),s()),i&2){let e=a.$implicit;d(),f(e)}}function Rr(i,a){if(i&1&&(r(0,"span",17),m(1,"Duration"),s(),r(2,"span"),m(3),s()),i&2){p(3);let e=J(0);d(3),f(e.duration)}}function Br(i,a){if(i&1&&(r(0,"p",15),m(1),s(),r(2,"div",16)(3,"span",17),m(4,"Range"),s(),r(5,"span"),m(6),s(),x(7,Rr,4,1),s()),i&2){p(2);let e=J(0);d(),f(e.description),d(5),f(e.range),d(),y(e.duration?7:-1)}}function Lr(i,a){if(i&1){let e=T();r(0,"div",13)(1,"span",18),m(2,"Delete this maneuver?"),s(),r(3,"button",19),u("click",function(){b(e);let n=p(2).$implicit,o=p(3);return _(o.confirmDelete(n.maneuverId))}),m(4,"Delete"),s(),r(5,"button",20),u("click",function(){b(e);let n=p(5);return _(n.cancelDelete())}),m(6,"Cancel"),s()()}}function Nr(i,a){if(i&1){let e=T();r(0,"div",14)(1,"button",21),u("click",function(){b(e);let n=p(2).$implicit,o=p(3);return _(o.requestDelete(n.maneuverId))}),r(2,"mat-icon"),m(3,"delete"),s()()()}}function Hr(i,a){if(i&1&&(r(0,"div",12),x(1,Br,8,3),x(2,Lr,7,0,"div",13)(3,Nr,4,0,"div",14),s()),i&2){let e=p().$implicit,t=J(0),n=p(3);d(),y(t?1:-1),d(),y(n.confirmDeleteId===e.maneuverId?2:3)}}function Vr(i,a){if(i&1){let e=T();Re(0),r(1,"div",6)(2,"div",7),u("click",function(){let n=b(e).$implicit,o=p(3);return _(o.toggleExpanded(n.maneuverId))}),r(3,"span",8)(4,"span",9),m(5),s(),w(6,Or,2,1,"span",10,q),s(),r(8,"span",11),m(9),s()(),x(10,Hr,4,2,"div",12),s()}if(i&2){let e=a.$implicit,t=p(3),n=Be(t.getManeuver(e));d(),k("item-card--expanded",t.expandedId===e.maneuverId),d(4),f((n==null?null:n.name)??e.maneuverId),d(),M((n==null?null:n.tags)??Nt(6,Ar)),d(3),f(n==null?null:n.attribute),d(),y(t.expandedId===e.maneuverId?10:-1)}}function zr(i,a){if(i&1&&(r(0,"div",3)(1,"span"),m(2,"Name"),s(),r(3,"span"),m(4,"Attribute"),s()(),r(5,"div",4),w(6,Vr,11,7,"div",5,Pr),s()),i&2){let e=p();d(6),M(e.maneuvers)}}function jr(i,a){if(i&1){let e=T();r(0,"div",0)(1,"button",1),u("click",function(){b(e);let n=p();return _(n.openAddDialog())}),r(2,"mat-icon"),m(3,"add"),s()()(),x(4,Fr,2,0,"p",2)(5,zr,8,0)}i&2&&(d(4),y(a.maneuvers.length===0?4:5))}var sn=class i{svc=l(pe);staticData=l(me);dialog=l(_e);character=ue(this.svc.character$);expandedId=null;confirmDeleteId=null;getManeuver(a){return this.staticData.getManeuverById(a.maneuverId)}toggleExpanded(a){this.expandedId=this.expandedId===a?null:a,this.confirmDeleteId!==a&&(this.confirmDeleteId=null)}requestDelete(a){this.confirmDeleteId=a}cancelDelete(){this.confirmDeleteId=null}confirmDelete(a){this.svc.deleteManeuver(a),this.expandedId=null,this.confirmDeleteId=null}openAddDialog(){let a=this.character();if(!a)return;let e=a.maneuvers.map(n=>n.maneuverId);this.dialog.open(rn,{width:"460px",data:{addedManeuverIds:e}}).afterClosed().subscribe(n=>{n&&this.svc.addManeuver(n.maneuverId)})}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=v({type:i,selectors:[["app-maneuvers-tab"]],decls:1,vars:1,consts:[[1,"tab-toolbar"],["mat-icon-button","","title","Add maneuver",3,"click"],[1,"empty-state"],[1,"maneuver-header"],[1,"item-list"],[1,"item-card",3,"item-card--expanded"],[1,"item-card"],[1,"item-row",3,"click"],[1,"col-name-wrap"],[1,"item-name"],[1,"action-tags"],[1,"col-attribute"],[1,"item-expanded"],[1,"confirm-delete"],[1,"item-expanded-actions"],[1,"item-full-description"],[1,"expanded-meta"],[1,"meta-label"],[1,"confirm-text"],["mat-button","","color","warn",3,"click"],["mat-button","",3,"click"],["mat-icon-button","","title","Delete maneuver",3,"click"]],template:function(e,t){if(e&1&&x(0,jr,6,1),e&2){let n;y((n=t.character())?0:-1,n)}},dependencies:[$,Z,He,Ye,Ke],styles:[".maneuver-header[_ngcontent-%COMP%], .item-row[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 120px;align-items:center;gap:8px}.tab-toolbar[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;padding:4px 8px 0}.empty-state[_ngcontent-%COMP%]{padding:24px 16px;color:var(--mat-sys-on-surface-variant)}.maneuver-header[_ngcontent-%COMP%]{padding:6px 16px;border-bottom:2px solid var(--mat-sys-outline-variant);font-size:.8125rem;font-weight:600;color:var(--mat-sys-on-surface-variant);text-transform:uppercase;letter-spacing:.04em}.item-list[_ngcontent-%COMP%]{display:flex;flex-direction:column}.item-card[_ngcontent-%COMP%]{border-bottom:1px solid var(--mat-sys-outline-variant)}.item-card--expanded[_ngcontent-%COMP%]{background:var(--mat-sys-surface-variant)}.item-row[_ngcontent-%COMP%]{padding:12px 16px;cursor:pointer;-webkit-user-select:none;user-select:none}.item-row[_ngcontent-%COMP%]:hover{background:color-mix(in srgb,var(--mat-sys-on-surface) 4%,transparent)}.col-name-wrap[_ngcontent-%COMP%]{display:flex;align-items:center;min-width:0;gap:4px;overflow:hidden}.item-name[_ngcontent-%COMP%]{font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex-shrink:1}.action-tags[_ngcontent-%COMP%]{flex-shrink:0;padding:1px 6px;border-radius:4px;font-size:.7rem;font-weight:500;letter-spacing:.04em;text-transform:uppercase;background:var(--mat-sys-secondary-container);color:var(--mat-sys-on-secondary-container)}.col-attribute[_ngcontent-%COMP%]{font-size:.875rem;color:var(--mat-sys-on-surface-variant);white-space:nowrap}.item-expanded[_ngcontent-%COMP%]{padding:0 16px 12px}.item-full-description[_ngcontent-%COMP%]{margin:0 0 8px;white-space:pre-wrap;word-break:break-word}.expanded-meta[_ngcontent-%COMP%]{display:grid;grid-template-columns:80px 1fr;gap:2px 8px;margin-bottom:8px;font-size:.875rem}.meta-label[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant)}.item-expanded-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}.confirm-delete[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;justify-content:flex-end}.confirm-text[_ngcontent-%COMP%]{font-size:.875rem;color:var(--mat-sys-error)}"]})};var qr=(i,a)=>a.id;function $r(i,a){i&1&&(r(0,"p",4),m(1,"No spells found."),s())}function Wr(i,a){if(i&1){let e=T();r(0,"div",10),u("click",function(){let n=b(e).$implicit,o=p(2);return _(o.selectedSpellId.set(n.id))}),r(1,"span",11),m(2),s(),r(3,"span",12),m(4),s()()}if(i&2){let e=a.$implicit,t=p(2);k("spell-option--selected",t.selectedSpellId()===e.id),d(2),f(e.name),d(2),ai("",e.school," \xB7 ",t.displayLevel(e.level))}}function Qr(i,a){if(i&1&&w(0,Wr,5,5,"div",9,qr),i&2){let e=p();M(e.filteredSpells())}}var cn=class i{dialogRef=l(be);staticData=l(me);data=l(It);searchText=Q("");selectedSpellId=Q(null);prepared=!1;filteredSpells=se(()=>this.staticData.getSpells().filter(a=>!this.data.addedSpellIds.includes(a.id)).filter(a=>a.name.toLowerCase().includes(this.searchText().toLowerCase())));displayLevel(a){return a===0?"Cantrip":String(a)}onAdd(){let a=this.selectedSpellId();a&&this.dialogRef.close({spellId:a,prepared:this.prepared})}onCancel(){this.dialogRef.close()}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=v({type:i,selectors:[["app-add-spell"]],decls:17,vars:4,consts:[["mat-dialog-title",""],["appearance","outline",1,"search-field"],["matInput","",3,"ngModelChange","ngModel"],[1,"spell-list"],[1,"no-results"],[3,"ngModelChange","ngModel"],["align","end"],["mat-button","",3,"click"],["mat-raised-button","","color","primary",3,"click","disabled"],[1,"spell-option",3,"spell-option--selected"],[1,"spell-option",3,"click"],[1,"spell-name"],[1,"spell-meta"]],template:function(e,t){e&1&&(r(0,"h2",0),m(1,"Add Spell"),s(),r(2,"mat-dialog-content")(3,"mat-form-field",1)(4,"mat-label"),m(5,"Search spells"),s(),r(6,"input",2),u("ngModelChange",function(o){return t.searchText.set(o)}),s()(),r(7,"div",3),x(8,$r,2,0,"p",4)(9,Qr,2,0),s(),r(10,"mat-checkbox",5),si("ngModelChange",function(o){return ri(t.prepared,o)||(t.prepared=o),o}),m(11,"Prepared"),s()(),r(12,"mat-dialog-actions",6)(13,"button",7),u("click",function(){return t.onCancel()}),m(14,"Cancel"),s(),r(15,"button",8),u("click",function(){return t.onAdd()}),m(16," Add "),s()()),e&2&&(d(6),g("ngModel",t.searchText()),d(2),y(t.filteredSpells().length===0?8:9),d(2),oi("ngModel",t.prepared),d(5),g("disabled",t.selectedSpellId()===null))},dependencies:[Vt,ct,lt,Ht,$,Z,we,fe,Xe,Ue,Ze,Ge,je,ze,Ve,$e,qe],styles:[".search-field[_ngcontent-%COMP%]{width:100%}.spell-list[_ngcontent-%COMP%]{max-height:320px;overflow-y:auto;border:1px solid var(--mat-sys-outline-variant);border-radius:4px;margin-bottom:12px}.no-results[_ngcontent-%COMP%]{padding:16px;color:var(--mat-sys-on-surface-variant);text-align:center;margin:0}.spell-option[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;cursor:pointer;border-bottom:1px solid var(--mat-sys-outline-variant)}.spell-option[_ngcontent-%COMP%]:last-child{border-bottom:none}.spell-option[_ngcontent-%COMP%]:hover{background:color-mix(in srgb,var(--mat-sys-on-surface) 4%,transparent)}.spell-option--selected[_ngcontent-%COMP%]{background:color-mix(in srgb,var(--mat-sys-primary) 12%,transparent)}.spell-name[_ngcontent-%COMP%]{font-weight:500}.spell-meta[_ngcontent-%COMP%]{font-size:.875rem;color:var(--mat-sys-on-surface-variant)}"]})};var Ur=()=>[],Gr=(i,a)=>a.spellId;function Zr(i,a){i&1&&(r(0,"p",2),m(1,"No spells. Click + to add one."),s())}function Xr(i,a){if(i&1&&(r(0,"span",12),m(1),s()),i&2){let e=a.$implicit;d(),f(e)}}function Kr(i,a){if(i&1&&(r(0,"span",22),m(1,"Duration"),s(),r(2,"span"),m(3),s()),i&2){p(3);let e=J(0);d(3),f(e.duration)}}function Yr(i,a){if(i&1&&(r(0,"span",22),m(1,"Damage Type"),s(),r(2,"span"),m(3),s()),i&2){p(3);let e=J(0);d(3),f(e.damageType)}}function Jr(i,a){if(i&1&&(r(0,"p",20),m(1),s(),r(2,"div",21)(3,"span",22),m(4,"Range"),s(),r(5,"span"),m(6),s(),x(7,Kr,4,1),x(8,Yr,4,1),s()),i&2){p(2);let e=J(0);d(),f(e.description),d(5),f(e.range),d(),y(e.duration?7:-1),d(),y(e.damageType?8:-1)}}function es(i,a){if(i&1){let e=T();r(0,"div",18)(1,"span",23),m(2,"Delete this spell?"),s(),r(3,"button",24),u("click",function(){b(e);let n=p(2).$implicit,o=p(3);return _(o.confirmDelete(n.spellId))}),m(4,"Delete"),s(),r(5,"button",25),u("click",function(){b(e);let n=p(5);return _(n.cancelDelete())}),m(6,"Cancel"),s()()}}function ts(i,a){if(i&1){let e=T();r(0,"div",19)(1,"button",26),u("click",function(){b(e);let n=p(2).$implicit,o=p(3);return _(o.requestDelete(n.spellId))}),r(2,"mat-icon"),m(3,"delete"),s()()()}}function ns(i,a){if(i&1&&(r(0,"div",17),x(1,Jr,9,4),x(2,es,7,0,"div",18)(3,ts,4,0,"div",19),s()),i&2){let e=p().$implicit,t=J(0),n=p(3);d(),y(t?1:-1),d(),y(n.confirmDeleteId===e.spellId?2:3)}}function is(i,a){if(i&1){let e=T();Re(0),r(1,"div",8)(2,"div",9),u("click",function(){let n=b(e).$implicit,o=p(3);return _(o.toggleExpanded(n.spellId))}),r(3,"span",10)(4,"span",11),m(5),s(),w(6,Xr,2,1,"span",12,q),s(),r(8,"span",13),m(9),s(),r(10,"span",14),m(11),s(),r(12,"span",15),u("click",function(n){return n.stopPropagation()}),r(13,"mat-checkbox",16),u("change",function(n){let o=b(e).$implicit,c=p(3);return _(c.svc.updateSpellPrepared(o.spellId,n.checked))}),s()()(),x(14,ns,4,2,"div",17),s()}if(i&2){let e=a.$implicit,t=p(3),n=Be(t.getSpell(e));d(),k("item-card--expanded",t.expandedId===e.spellId),d(4),f((n==null?null:n.name)??e.spellId),d(),M((n==null?null:n.tags)??Nt(8,Ur)),d(3),f(n==null?null:n.school),d(2),f(n!=null?t.displayLevel(n.level):""),d(2),g("checked",e.prepared),d(),y(t.expandedId===e.spellId?14:-1)}}function as(i,a){if(i&1&&(r(0,"p",3),m(1),s(),r(2,"div",4)(3,"span"),m(4,"Name"),s(),r(5,"span"),m(6,"School"),s(),r(7,"span"),m(8,"Level"),s(),r(9,"span",5),m(10,"Prepared"),s()(),r(11,"div",6),w(12,is,15,9,"div",7,Gr),s()),i&2){let e=p(),t=p();d(),nt("",t.preparedCount(e.spells)," spell(s) prepared"),d(11),M(t.sortedSpells(e.spells))}}function os(i,a){if(i&1){let e=T();r(0,"div",0)(1,"button",1),u("click",function(){b(e);let n=p();return _(n.openAddDialog())}),r(2,"mat-icon"),m(3,"add"),s()()(),x(4,Zr,2,0,"p",2)(5,as,14,1)}i&2&&(d(4),y(a.spells.length===0?4:5))}var ln=class i{svc=l(pe);staticData=l(me);dialog=l(_e);character=ue(this.svc.character$);expandedId=null;confirmDeleteId=null;getSpell(a){return this.staticData.getSpellById(a.spellId)}sortedSpells(a){return[...a].sort((e,t)=>{let n=this.staticData.getSpellById(e.spellId),o=this.staticData.getSpellById(t.spellId),c=(n?.school??"").localeCompare(o?.school??"");return c!==0?c:(n?.level??0)-(o?.level??0)})}preparedCount(a){return a.filter(e=>e.prepared).length}displayLevel(a){return a===0?"Cantrip":String(a)}toggleExpanded(a){this.expandedId=this.expandedId===a?null:a,this.confirmDeleteId!==a&&(this.confirmDeleteId=null)}requestDelete(a){this.confirmDeleteId=a}cancelDelete(){this.confirmDeleteId=null}confirmDelete(a){this.svc.deleteSpell(a),this.expandedId=null,this.confirmDeleteId=null}openAddDialog(){let a=this.character();if(!a)return;let e=a.spells.map(n=>n.spellId);this.dialog.open(cn,{width:"480px",data:{addedSpellIds:e}}).afterClosed().subscribe(n=>{n&&this.svc.addSpell(n.spellId,n.prepared)})}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=v({type:i,selectors:[["app-spells-tab"]],decls:1,vars:1,consts:[[1,"tab-toolbar"],["mat-icon-button","","title","Add spell",3,"click"],[1,"empty-state"],[1,"prepared-count"],[1,"spell-header"],[1,"col-prepared"],[1,"item-list"],[1,"item-card",3,"item-card--expanded"],[1,"item-card"],[1,"spell-row",3,"click"],[1,"col-name-wrap"],[1,"item-name"],[1,"action-tags"],[1,"col-category"],[1,"col-level"],[1,"col-prepared",3,"click"],[3,"change","checked"],[1,"item-expanded"],[1,"confirm-delete"],[1,"item-expanded-actions"],[1,"item-full-description"],[1,"expanded-meta"],[1,"meta-label"],[1,"confirm-text"],["mat-button","","color","warn",3,"click"],["mat-button","",3,"click"],["mat-icon-button","","title","Delete spell",3,"click"]],template:function(e,t){if(e&1&&x(0,os,6,1),e&2){let n;y((n=t.character())?0:-1,n)}},dependencies:[$,Z,He,we,fe,Ye,Ke],styles:[".spell-header[_ngcontent-%COMP%], .spell-row[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 100px 80px 80px;align-items:center;gap:8px}.tab-toolbar[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;padding:4px 8px 0}.empty-state[_ngcontent-%COMP%]{padding:24px 16px;color:var(--mat-sys-on-surface-variant)}.prepared-count[_ngcontent-%COMP%]{margin:4px 16px 8px;font-size:.875rem;color:var(--mat-sys-on-surface-variant)}.spell-header[_ngcontent-%COMP%]{padding:6px 16px;border-bottom:2px solid var(--mat-sys-outline-variant);font-size:.8125rem;font-weight:600;color:var(--mat-sys-on-surface-variant);text-transform:uppercase;letter-spacing:.04em}.item-list[_ngcontent-%COMP%]{display:flex;flex-direction:column}.item-card[_ngcontent-%COMP%]{border-bottom:1px solid var(--mat-sys-outline-variant)}.item-card--expanded[_ngcontent-%COMP%]{background:var(--mat-sys-surface-variant)}.spell-row[_ngcontent-%COMP%]{padding:10px 16px;cursor:pointer;-webkit-user-select:none;user-select:none}.spell-row[_ngcontent-%COMP%]:hover{background:color-mix(in srgb,var(--mat-sys-on-surface) 4%,transparent)}.col-name-wrap[_ngcontent-%COMP%]{display:flex;align-items:center;min-width:0;gap:4px;overflow:hidden}.item-name[_ngcontent-%COMP%]{font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex-shrink:1}.action-tags[_ngcontent-%COMP%]{flex-shrink:0;padding:1px 6px;border-radius:4px;font-size:.7rem;font-weight:500;letter-spacing:.04em;text-transform:uppercase;background:var(--mat-sys-secondary-container);color:var(--mat-sys-on-secondary-container)}.col-category[_ngcontent-%COMP%], .col-level[_ngcontent-%COMP%]{font-size:.875rem;color:var(--mat-sys-on-surface-variant);white-space:nowrap}.item-expanded[_ngcontent-%COMP%]{padding:0 16px 12px}.item-full-description[_ngcontent-%COMP%]{margin:0 0 8px;white-space:pre-wrap;word-break:break-word}.expanded-meta[_ngcontent-%COMP%]{display:grid;grid-template-columns:80px 1fr;gap:2px 8px;margin-bottom:8px;font-size:.875rem}.meta-label[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant)}.item-expanded-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}.confirm-delete[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;justify-content:flex-end}.confirm-text[_ngcontent-%COMP%]{font-size:.875rem;color:var(--mat-sys-error)}"]})};function rs(i,a){if(i&1&&(r(0,"div",5),F(1,"app-dice-tooltip",6),s()),i&2){let e=p(2);Oe("left",e.tooltipState.x,"px")("top",e.tooltipState.y,"px"),d(),g("score",e.tooltipState.score)("baseDice",5)}}function ss(i,a){if(i&1){let e=T();r(0,"div",9),u("mouseenter",function(n){b(e);let o=p().$implicit,c=p(),h=p();return _(h.onScoreMouseEnter(n,h.score(c,o)))})("mouseleave",function(){b(e);let n=p(3);return _(n.tooltipState=null)}),r(1,"span",10),m(2),s(),r(3,"span",11),m(4),s()()}if(i&2){let e=p().$implicit,t=p(),n=p();d(2),f(n.score(t,e)),d(2),f(e)}}function cs(i,a){if(i&1&&(r(0,"mat-tab"),K(1,ss,5,2,"ng-template",7),F(2,"app-attribute-tab",8),s()),i&2){let e=a.$implicit;d(2),g("category",e)}}function ls(i,a){if(i&1&&(x(0,rs,2,6,"div",0),r(1,"mat-tab-group",1),w(2,cs,3,1,"mat-tab",null,q),r(4,"mat-tab",2),F(5,"app-equipment-tab"),s(),r(6,"mat-tab",3),F(7,"app-maneuvers-tab"),s(),r(8,"mat-tab",4),F(9,"app-spells-tab"),s()()),i&2){let e=p();y(e.tooltipState?0:-1),d(2),M(e.categories)}}var dn=class i{svc=l(pe);character=ue(this.svc.character$);categories=["Strength","Dexterity","Stamina","Intelligence","Willpower","Spirit"];tooltipState=null;onScoreMouseEnter(a,e){let t=a.currentTarget.getBoundingClientRect();this.tooltipState={x:t.left+t.width/2,y:t.top-6,score:e}}score(a,e){return this.svc.getAttributeScore(a,e)}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=v({type:i,selectors:[["app-tabs-container"]],decls:1,vars:1,consts:[[1,"dice-tooltip-fixed",3,"left","top"],["animationDuration","150ms"],["label","Equipment"],["label","Maneuvers"],["label","Spells"],[1,"dice-tooltip-fixed"],[3,"score","baseDice"],["mat-tab-label",""],[3,"category"],[1,"attr-tab-label",3,"mouseenter","mouseleave"],[1,"attr-score"],[1,"attr-name"]],template:function(e,t){if(e&1&&x(0,ls,10,1),e&2){let n;y((n=t.character())?0:-1,n)}},dependencies:[ca,An,Pn,sa,gt,tn,on,sn,ln],styles:[".attr-tab-label[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;padding:4px 0;min-width:64px}.attr-score[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:600;line-height:1}.attr-name[_ngcontent-%COMP%]{font-size:.7rem;text-transform:uppercase;letter-spacing:.05em;margin-top:2px}.coming-soon[_ngcontent-%COMP%]{padding:24px 16px;color:var(--mat-sys-on-surface-variant)}.dice-tooltip-fixed[_ngcontent-%COMP%]{position:fixed;transform:translate(-50%,-100%);z-index:1000;pointer-events:none}"]})};var wa=class i{static \u0275fac=function(e){return new(e||i)};static \u0275cmp=v({type:i,selectors:[["app-sheet"]],decls:2,vars:0,template:function(e,t){e&1&&F(0,"app-header")(1,"app-tabs-container")},dependencies:[Yt,dn],styles:["[_nghost-%COMP%]{display:block}"]})};export{wa as SheetComponent};
