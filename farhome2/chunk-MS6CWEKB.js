import{$ as st,Aa as se,Ba as ce,Ca as vt,E as Ue,G as V,H as $e,J as X,K as Je,L as le,N as Y,O as Ze,P as et,R as tt,S as A,T as at,U as nt,V as it,X as rt,Y as ot,_ as lt,aa as ct,b as Ne,ba as U,d as M,da as dt,e as Ve,ea as mt,f as Le,fa as pt,g as Be,ga as ut,h as je,ha as ht,j as ze,k as We,ka as ft,l as qe,la as gt,m as Q,n as Ge,o as He,q as Ke,s as Qe,ta as _t,x as Xe,y as Ye,ya as bt}from"./chunk-5H2JWK7O.js";import{j as Fe,m as Re,n as Pe}from"./chunk-3EMAZHXA.js";import{Ab as v,Bb as ne,Cb as ie,D as ge,Eb as Oe,Fb as De,Gb as y,Hb as f,Ib as T,Jb as _,Kb as Ie,Lb as G,M as te,Mb as S,N as ae,Nb as O,O as R,Qa as m,Rb as Ee,Tb as x,Ub as Ae,V as I,Vb as d,Wb as C,X as w,Xb as H,Ya as Ce,Z as s,ca as _e,da as be,db as g,dc as re,ea as ve,eb as E,fb as j,g as F,ga as ye,ib as ke,ka as P,kc as Te,lb as Me,oc as K,pa as W,q as Z,qb as N,qc as k,rb as p,rc as oe,sb as u,ta as xe,u as fe,vb as we,wa as q,wb as Se,x as z,xb as b,y as ee,yb as o,zb as r}from"./chunk-QZESHWEQ.js";var Pt=["*"];var Nt=[[["","mat-card-avatar",""],["","matCardAvatar",""]],[["mat-card-title"],["mat-card-subtitle"],["","mat-card-title",""],["","mat-card-subtitle",""],["","matCardTitle",""],["","matCardSubtitle",""]],"*"],Vt=["[mat-card-avatar], [matCardAvatar]",`mat-card-title, mat-card-subtitle,
      [mat-card-title], [mat-card-subtitle],
      [matCardTitle], [matCardSubtitle]`,"*"],Lt=new w("MAT_CARD_CONFIG"),yt=(()=>{class n{appearance;constructor(){let e=s(Lt,{optional:!0});this.appearance=e?.appearance||"raised"}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=g({type:n,selectors:[["mat-card"]],hostAttrs:[1,"mat-mdc-card","mdc-card"],hostVars:8,hostBindings:function(t,a){t&2&&x("mat-mdc-card-outlined",a.appearance==="outlined")("mdc-card--outlined",a.appearance==="outlined")("mat-mdc-card-filled",a.appearance==="filled")("mdc-card--filled",a.appearance==="filled")},inputs:{appearance:"appearance"},exportAs:["matCard"],ngContentSelectors:Pt,decls:1,vars:0,template:function(t,a){t&1&&(T(),_(0))},styles:[`.mat-mdc-card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  border-style: solid;
  border-width: 0;
  background-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-elevated-container-elevation, var(--mat-sys-level1));
}
.mat-mdc-card::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: solid 1px transparent;
  content: "";
  display: block;
  pointer-events: none;
  box-sizing: border-box;
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
}

.mat-mdc-card-outlined {
  background-color: var(--mat-card-outlined-container-color, var(--mat-sys-surface));
  border-radius: var(--mat-card-outlined-container-shape, var(--mat-sys-corner-medium));
  border-width: var(--mat-card-outlined-outline-width, 1px);
  border-color: var(--mat-card-outlined-outline-color, var(--mat-sys-outline-variant));
  box-shadow: var(--mat-card-outlined-container-elevation, var(--mat-sys-level0));
}
.mat-mdc-card-outlined::after {
  border: none;
}

.mat-mdc-card-filled {
  background-color: var(--mat-card-filled-container-color, var(--mat-sys-surface-container-highest));
  border-radius: var(--mat-card-filled-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-filled-container-elevation, var(--mat-sys-level0));
}

.mdc-card__media {
  position: relative;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.mdc-card__media::before {
  display: block;
  content: "";
}
.mdc-card__media:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.mdc-card__media:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.mat-mdc-card-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  padding: 8px;
}

.mat-mdc-card-title {
  font-family: var(--mat-card-title-text-font, var(--mat-sys-title-large-font));
  line-height: var(--mat-card-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-size: var(--mat-card-title-text-size, var(--mat-sys-title-large-size));
  letter-spacing: var(--mat-card-title-text-tracking, var(--mat-sys-title-large-tracking));
  font-weight: var(--mat-card-title-text-weight, var(--mat-sys-title-large-weight));
}

.mat-mdc-card-subtitle {
  color: var(--mat-card-subtitle-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-card-subtitle-text-font, var(--mat-sys-title-medium-font));
  line-height: var(--mat-card-subtitle-text-line-height, var(--mat-sys-title-medium-line-height));
  font-size: var(--mat-card-subtitle-text-size, var(--mat-sys-title-medium-size));
  letter-spacing: var(--mat-card-subtitle-text-tracking, var(--mat-sys-title-medium-tracking));
  font-weight: var(--mat-card-subtitle-text-weight, var(--mat-sys-title-medium-weight));
}

.mat-mdc-card-title,
.mat-mdc-card-subtitle {
  display: block;
  margin: 0;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle {
  padding: 16px 16px 0;
}

.mat-mdc-card-header {
  display: flex;
  padding: 16px 16px 0;
}

.mat-mdc-card-content {
  display: block;
  padding: 0 16px;
}
.mat-mdc-card-content:first-child {
  padding-top: 16px;
}
.mat-mdc-card-content:last-child {
  padding-bottom: 16px;
}

.mat-mdc-card-title-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.mat-mdc-card-avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-bottom: 16px;
  object-fit: cover;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title {
  line-height: normal;
}

.mat-mdc-card-sm-image {
  width: 80px;
  height: 80px;
}

.mat-mdc-card-md-image {
  width: 112px;
  height: 112px;
}

.mat-mdc-card-lg-image {
  width: 152px;
  height: 152px;
}

.mat-mdc-card-xl-image {
  width: 240px;
  height: 240px;
}

.mat-mdc-card-subtitle ~ .mat-mdc-card-title,
.mat-mdc-card-title ~ .mat-mdc-card-subtitle,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-title-group .mat-mdc-card-title,
.mat-mdc-card-title-group .mat-mdc-card-subtitle {
  padding-top: 0;
}

.mat-mdc-card-content > :last-child:not(.mat-mdc-card-footer) {
  margin-bottom: 0;
}

.mat-mdc-card-actions-align-end {
  justify-content: flex-end;
}
`],encapsulation:2,changeDetection:0})}return n})(),xt=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275dir=j({type:n,selectors:[["mat-card-title"],["","mat-card-title",""],["","matCardTitle",""]],hostAttrs:[1,"mat-mdc-card-title"]})}return n})();var Ct=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275dir=j({type:n,selectors:[["mat-card-content"]],hostAttrs:[1,"mat-mdc-card-content"]})}return n})();var kt=(()=>{class n{align="start";static \u0275fac=function(t){return new(t||n)};static \u0275dir=j({type:n,selectors:[["mat-card-actions"]],hostAttrs:[1,"mat-mdc-card-actions","mdc-card__actions"],hostVars:2,hostBindings:function(t,a){t&2&&x("mat-mdc-card-actions-align-end",a.align==="end")},inputs:{align:"align"},exportAs:["matCardActions"]})}return n})(),Mt=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=g({type:n,selectors:[["mat-card-header"]],hostAttrs:[1,"mat-mdc-card-header"],ngContentSelectors:Vt,decls:4,vars:0,consts:[[1,"mat-mdc-card-header-text"]],template:function(t,a){t&1&&(T(Nt),_(0),ne(1,"div",0),_(2,1),ie(),_(3,2))},encapsulation:2,changeDetection:0})}return n})();var wt=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=E({type:n});static \u0275inj=I({imports:[A]})}return n})();var St=(()=>{class n{_animationsDisabled=Y();state="unchecked";disabled=!1;appearance="full";constructor(){}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=g({type:n,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(t,a){t&2&&x("mat-pseudo-checkbox-indeterminate",a.state==="indeterminate")("mat-pseudo-checkbox-checked",a.state==="checked")("mat-pseudo-checkbox-disabled",a.disabled)("mat-pseudo-checkbox-minimal",a.appearance==="minimal")("mat-pseudo-checkbox-full",a.appearance==="full")("_mat-animation-noopable",a._animationsDisabled)},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(t,a){},styles:[`.mat-pseudo-checkbox {
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox::after {
  position: absolute;
  opacity: 0;
  content: "";
  border-bottom: 2px solid currentColor;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-pseudo-checkbox._mat-animation-noopable::after {
  transition: none;
}

.mat-pseudo-checkbox-disabled {
  cursor: default;
}

.mat-pseudo-checkbox-indeterminate::after {
  left: 1px;
  opacity: 1;
  border-radius: 2px;
}

.mat-pseudo-checkbox-checked::after {
  left: 1px;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
  opacity: 1;
  box-sizing: content-box;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--mat-sys-primary));
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-pseudo-checkbox-full {
  border-color: var(--mat-pseudo-checkbox-full-unselected-icon-color, var(--mat-sys-on-surface-variant));
  border-width: 2px;
  border-style: solid;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {
  border-color: var(--mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {
  background-color: var(--mat-pseudo-checkbox-full-selected-icon-color, var(--mat-sys-primary));
  border-color: transparent;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-full-selected-checkmark-color, var(--mat-sys-on-primary));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {
  background-color: var(--mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--mat-sys-surface));
}

.mat-pseudo-checkbox {
  width: 18px;
  height: 18px;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after {
  width: 14px;
  height: 6px;
  transform-origin: center;
  top: -4.2426406871px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  top: 8px;
  width: 16px;
}

.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after {
  width: 10px;
  height: 4px;
  transform-origin: center;
  top: -2.8284271247px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  top: 6px;
  width: 12px;
}
`],encapsulation:2,changeDetection:0})}return n})();var jt=["text"],zt=[[["mat-icon"]],"*"],Wt=["mat-icon","*"];function qt(n,l){if(n&1&&v(0,"mat-pseudo-checkbox",1),n&2){let e=f();b("disabled",e.disabled)("state",e.selected?"checked":"unchecked")}}function Gt(n,l){if(n&1&&v(0,"mat-pseudo-checkbox",3),n&2){let e=f();b("disabled",e.disabled)}}function Ht(n,l){if(n&1&&(o(0,"span",4),d(1),r()),n&2){let e=f();m(),H("(",e.group.label,")")}}var me=new w("MAT_OPTION_PARENT_COMPONENT"),pe=new w("MatOptgroup");var de=class{source;isUserInput;constructor(l,e=!1){this.source=l,this.isUserInput=e}},B=(()=>{class n{_element=s(q);_changeDetectorRef=s(K);_parent=s(me,{optional:!0});group=s(pe,{optional:!0});_signalDisableRipple=!1;_selected=!1;_active=!1;_mostRecentViewValue="";get multiple(){return this._parent&&this._parent.multiple}get selected(){return this._selected}value;id=s(X).getId("mat-option-");get disabled(){return this.group&&this.group.disabled||this._disabled()}set disabled(e){this._disabled.set(e)}_disabled=W(!1);get disableRipple(){return this._signalDisableRipple?this._parent.disableRipple():!!this._parent?.disableRipple}get hideSingleSelectionIndicator(){return!!(this._parent&&this._parent.hideSingleSelectionIndicator)}onSelectionChange=new P;_text;_stateChanges=new F;constructor(){let e=s(Xe);e.load(et),e.load(Ye),this._signalDisableRipple=!!this._parent&&Me(this._parent.disableRipple)}get active(){return this._active}get viewValue(){return(this._text?.nativeElement.textContent||"").trim()}select(e=!0){this._selected||(this._selected=!0,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}deselect(e=!0){this._selected&&(this._selected=!1,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}focus(e,t){let a=this._getHostElement();typeof a.focus=="function"&&a.focus(t)}setActiveStyles(){this._active||(this._active=!0,this._changeDetectorRef.markForCheck())}setInactiveStyles(){this._active&&(this._active=!1,this._changeDetectorRef.markForCheck())}getLabel(){return this.viewValue}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!V(e)&&(this._selectViaInteraction(),e.preventDefault())}_selectViaInteraction(){this.disabled||(this._selected=this.multiple?!this._selected:!0,this._changeDetectorRef.markForCheck(),this._emitSelectionChangeEvent(!0))}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._element.nativeElement}ngAfterViewChecked(){if(this._selected){let e=this.viewValue;e!==this._mostRecentViewValue&&(this._mostRecentViewValue&&this._stateChanges.next(),this._mostRecentViewValue=e)}}ngOnDestroy(){this._stateChanges.complete()}_emitSelectionChangeEvent(e=!1){this.onSelectionChange.emit(new de(this,e))}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=g({type:n,selectors:[["mat-option"]],viewQuery:function(t,a){if(t&1&&G(jt,7),t&2){let i;S(i=O())&&(a._text=i.first)}},hostAttrs:["role","option",1,"mat-mdc-option","mdc-list-item"],hostVars:11,hostBindings:function(t,a){t&1&&y("click",function(){return a._selectViaInteraction()})("keydown",function(c){return a._handleKeydown(c)}),t&2&&(De("id",a.id),N("aria-selected",a.selected)("aria-disabled",a.disabled.toString()),x("mdc-list-item--selected",a.selected)("mat-mdc-option-multiple",a.multiple)("mat-mdc-option-active",a.active)("mdc-list-item--disabled",a.disabled))},inputs:{value:"value",id:"id",disabled:[2,"disabled","disabled",k]},outputs:{onSelectionChange:"onSelectionChange"},exportAs:["matOption"],ngContentSelectors:Wt,decls:8,vars:5,consts:[["text",""],["aria-hidden","true",1,"mat-mdc-option-pseudo-checkbox",3,"disabled","state"],[1,"mdc-list-item__primary-text"],["state","checked","aria-hidden","true","appearance","minimal",1,"mat-mdc-option-pseudo-checkbox",3,"disabled"],[1,"cdk-visually-hidden"],["aria-hidden","true","mat-ripple","",1,"mat-mdc-option-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled"]],template:function(t,a){t&1&&(T(zt),p(0,qt,1,2,"mat-pseudo-checkbox",1),_(1),o(2,"span",2,0),_(4,1),r(),p(5,Gt,1,1,"mat-pseudo-checkbox",3),p(6,Ht,2,1,"span",4),v(7,"div",5)),t&2&&(u(a.multiple?0:-1),m(5),u(!a.multiple&&a.selected&&!a.hideSingleSelectionIndicator?5:-1),m(),u(a.group&&a.group._inert?6:-1),m(),b("matRippleTrigger",a._getHostElement())("matRippleDisabled",a.disabled||a.disableRipple))},dependencies:[St,Ze],styles:[`.mat-mdc-option {
  -webkit-user-select: none;
  user-select: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  min-height: 48px;
  padding: 0 16px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  color: var(--mat-option-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-option-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-option-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-option-label-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-option-label-text-tracking, var(--mat-sys-label-large-tracking));
  font-weight: var(--mat-option-label-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-option:hover:not(.mdc-list-item--disabled) {
  background-color: var(--mat-option-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-option:focus.mdc-list-item, .mat-mdc-option.mat-mdc-option-active.mdc-list-item {
  background-color: var(--mat-option-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
  outline: 0;
}
.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) {
  background-color: var(--mat-option-selected-state-layer-color, var(--mat-sys-secondary-container));
}
.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) .mdc-list-item__primary-text {
  color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-option .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-option.mdc-list-item {
  align-items: center;
  background: transparent;
}
.mat-mdc-option.mdc-list-item--disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-option.mdc-list-item--disabled .mat-mdc-option-pseudo-checkbox, .mat-mdc-option.mdc-list-item--disabled .mdc-list-item__primary-text, .mat-mdc-option.mdc-list-item--disabled > mat-icon {
  opacity: 0.38;
}
.mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 32px;
}
[dir=rtl] .mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 16px;
  padding-right: 32px;
}
.mat-mdc-option .mat-icon,
.mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-icon,
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 0;
  margin-left: 16px;
}
.mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-left: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-right: 16px;
  margin-left: 0;
}
.mat-mdc-option .mat-mdc-option-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
.mat-mdc-option .mdc-list-item__primary-text {
  white-space: normal;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  font-family: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  margin-right: auto;
}
[dir=rtl] .mat-mdc-option .mdc-list-item__primary-text {
  margin-right: 0;
  margin-left: auto;
}
@media (forced-colors: active) {
  .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    width: 10px;
    height: 0;
    border-bottom: solid 10px;
    border-radius: 10px;
  }
  [dir=rtl] .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-option-multiple {
  --mat-list-list-item-selected-container-color: var(--mat-list-list-item-container-color, transparent);
}

.mat-mdc-option-active .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2,changeDetection:0})}return n})();function Ot(n,l,e){if(e.length){let t=l.toArray(),a=e.toArray(),i=0;for(let c=0;c<n+1;c++)t[c].group&&t[c].group===a[i]&&i++;return i}return 0}function Dt(n,l,e,t){return n<e?n:n+l>e+t?Math.max(0,n-t+l):e}var It=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=E({type:n});static \u0275inj=I({imports:[A]})}return n})();var ue=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=E({type:n});static \u0275inj=I({imports:[at,It,B,A]})}return n})();var Ut=["trigger"],$t=["panel"],Jt=[[["mat-select-trigger"]],"*"],Zt=["mat-select-trigger","*"];function ea(n,l){if(n&1&&(o(0,"span",4),d(1),r()),n&2){let e=f();m(),C(e.placeholder)}}function ta(n,l){n&1&&_(0)}function aa(n,l){if(n&1&&(o(0,"span",11),d(1),r()),n&2){let e=f(2);m(),C(e.triggerValue)}}function na(n,l){if(n&1&&(o(0,"span",5),p(1,ta,1,0)(2,aa,2,1,"span",11),r()),n&2){let e=f();m(),u(e.customTrigger?1:2)}}function ia(n,l){if(n&1){let e=Oe();o(0,"div",12,1),y("keydown",function(a){_e(e);let i=f();return be(i._handleKeydown(a))}),_(2,1),r()}if(n&2){let e=f();Ae(e.panelClass),x("mat-select-panel-animations-enabled",!e._animationsDisabled)("mat-primary",(e._parentFormField==null?null:e._parentFormField.color)==="primary")("mat-accent",(e._parentFormField==null?null:e._parentFormField.color)==="accent")("mat-warn",(e._parentFormField==null?null:e._parentFormField.color)==="warn")("mat-undefined",!(e._parentFormField!=null&&e._parentFormField.color)),N("id",e.id+"-panel")("aria-multiselectable",e.multiple)("aria-label",e.ariaLabel||null)("aria-labelledby",e._getPanelAriaLabelledby())}}var ra=new w("mat-select-scroll-strategy",{providedIn:"root",factory:()=>{let n=s(ye);return()=>_t(n)}}),oa=new w("MAT_SELECT_CONFIG"),la=new w("MatSelectTrigger"),he=class{source;value;constructor(l,e){this.source=l,this.value=e}},Tt=(()=>{class n{_viewportRuler=s(ft);_changeDetectorRef=s(K);_elementRef=s(q);_dir=s(tt,{optional:!0});_idGenerator=s(X);_renderer=s(Ce);_parentFormField=s(st,{optional:!0});ngControl=s(Ve,{self:!0,optional:!0});_liveAnnouncer=s(Ue);_defaultOptions=s(oa,{optional:!0});_animationsDisabled=Y();_popoverLocation;_initialized=new F;_cleanupDetach;options;optionGroups;customTrigger;_positions=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"}];_scrollOptionIntoView(e){let t=this.options.toArray()[e];if(t){let a=this.panel.nativeElement,i=Ot(e,this.options,this.optionGroups),c=t._getHostElement();e===0&&i===1?a.scrollTop=0:a.scrollTop=Dt(c.offsetTop,c.offsetHeight,a.scrollTop,a.offsetHeight)}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0)}_getChangeEvent(e){return new he(this,e)}_scrollStrategyFactory=s(ra);_panelOpen=!1;_compareWith=(e,t)=>e===t;_uid=this._idGenerator.getId("mat-select-");_triggerAriaLabelledBy=null;_previousControl;_destroy=new F;_errorStateTracker;stateChanges=new F;disableAutomaticLabeling=!0;userAriaDescribedBy;_selectionModel;_keyManager;_preferredOverlayOrigin;_overlayWidth;_onChange=()=>{};_onTouched=()=>{};_valueId=this._idGenerator.getId("mat-select-value-");_scrollStrategy;_overlayPanelClass=this._defaultOptions?.overlayPanelClass||"";get focused(){return this._focused||this._panelOpen}_focused=!1;controlType="mat-select";trigger;panel;_overlayDir;panelClass;disabled=!1;get disableRipple(){return this._disableRipple()}set disableRipple(e){this._disableRipple.set(e)}_disableRipple=W(!1);tabIndex=0;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties()}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1;get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next()}_placeholder;get required(){return this._required??this.ngControl?.control?.hasValidator(M.required)??!1}set required(e){this._required=e,this.stateChanges.next()}_required;get multiple(){return this._multiple}set multiple(e){this._selectionModel,this._multiple=e}_multiple=!1;disableOptionCentering=this._defaultOptions?.disableOptionCentering??!1;get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e)}_value;ariaLabel="";ariaLabelledby;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}typeaheadDebounceInterval;sortComparator;get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next()}_id;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<"u"?this._defaultOptions.panelWidth:"auto";canSelectNullableOptions=this._defaultOptions?.canSelectNullableOptions??!1;optionSelectionChanges=fe(()=>{let e=this.options;return e?e.changes.pipe(te(e),ae(()=>z(...e.map(t=>t.onSelectionChange)))):this._initialized.pipe(ae(()=>this.optionSelectionChanges))});openedChange=new P;_openedStream=this.openedChange.pipe(ee(e=>e),Z(()=>{}));_closedStream=this.openedChange.pipe(ee(e=>!e),Z(()=>{}));selectionChange=new P;valueChange=new P;constructor(){let e=s(dt),t=s(je,{optional:!0}),a=s(Q,{optional:!0}),i=s(new Te("tabindex"),{optional:!0}),c=s(bt,{optional:!0});this.ngControl&&(this.ngControl.valueAccessor=this),this._defaultOptions?.typeaheadDebounceInterval!=null&&(this.typeaheadDebounceInterval=this._defaultOptions.typeaheadDebounceInterval),this._errorStateTracker=new mt(e,this.ngControl,a,t,this.stateChanges),this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=i==null?0:parseInt(i)||0,this._popoverLocation=c?.usePopover===!1?null:"inline",this.id=this.id}ngOnInit(){this._selectionModel=new ht(this.multiple),this.stateChanges.next(),this._viewportRuler.change().pipe(R(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges())})}ngAfterContentInit(){this._initialized.next(),this._initialized.complete(),this._initKeyManager(),this._selectionModel.changed.pipe(R(this._destroy)).subscribe(e=>{e.added.forEach(t=>t.select()),e.removed.forEach(t=>t.deselect())}),this.options.changes.pipe(te(null),R(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection()})}ngDoCheck(){let e=this._getTriggerAriaLabelledby(),t=this.ngControl;if(e!==this._triggerAriaLabelledBy){let a=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?a.setAttribute("aria-labelledby",e):a.removeAttribute("aria-labelledby")}t&&(this._previousControl!==t.control&&(this._previousControl!==void 0&&t.disabled!==null&&t.disabled!==this.disabled&&(this.disabled=t.disabled),this._previousControl=t.control),this.updateErrorState())}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval),e.panelClass&&this.panelClass instanceof Set&&(this.panelClass=Array.from(this.panelClass))}ngOnDestroy(){this._cleanupDetach?.(),this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete(),this._clearFromModal()}toggle(){this.panelOpen?this.close():this.open()}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._cleanupDetach?.(),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._applyModalPanelOwnership(),this._panelOpen=!0,this._overlayDir.positionChange.pipe(ge(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled()}),this._overlayDir.attachOverlay(),this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!0)))}_trackedModal=null;_applyModalPanelOwnership(){let e=this._elementRef.nativeElement.closest('body > .cdk-overlay-container [aria-modal="true"]');if(!e)return;let t=`${this.id}-panel`;this._trackedModal&&le(this._trackedModal,"aria-owns",t),Je(e,"aria-owns",t),this._trackedModal=e}_clearFromModal(){if(!this._trackedModal)return;let e=`${this.id}-panel`;le(this._trackedModal,"aria-owns",e),this._trackedModal=null}close(){this._panelOpen&&(this._panelOpen=!1,this._exitAndDetach(),this._keyManager.withHorizontalOrientation(this._isRtl()?"rtl":"ltr"),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!1)))}_exitAndDetach(){if(this._animationsDisabled||!this.panel){this._detachOverlay();return}this._cleanupDetach?.(),this._cleanupDetach=()=>{t(),clearTimeout(a),this._cleanupDetach=void 0};let e=this.panel.nativeElement,t=this._renderer.listen(e,"animationend",i=>{i.animationName==="_mat-select-exit"&&(this._cleanupDetach?.(),this._detachOverlay())}),a=setTimeout(()=>{this._cleanupDetach?.(),this._detachOverlay()},200);e.classList.add("mat-select-panel-exit")}_detachOverlay(){this._overlayDir.detachOverlay(),this._changeDetectorRef.markForCheck()}writeValue(e){this._assignValue(e)}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next()}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return"";if(this._multiple){let e=this._selectionModel.selected.map(t=>t.viewValue);return this._isRtl()&&e.reverse(),e.join(", ")}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState()}_isRtl(){return this._dir?this._dir.value==="rtl":!1}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e))}_handleClosedKeydown(e){let t=e.keyCode,a=t===40||t===38||t===37||t===39,i=t===13||t===32,c=this._keyManager;if(!c.isTyping()&&i&&!V(e)||(this.multiple||e.altKey)&&a)e.preventDefault(),this.open();else if(!this.multiple){let D=this.selected;c.onKeydown(e);let h=this.selected;h&&D!==h&&this._liveAnnouncer.announce(h.viewValue,1e4)}}_handleOpenKeydown(e){let t=this._keyManager,a=e.keyCode,i=a===40||a===38,c=t.isTyping();if(i&&e.altKey)e.preventDefault(),this.close();else if(!c&&(a===13||a===32)&&t.activeItem&&!V(e))e.preventDefault(),t.activeItem._selectViaInteraction();else if(!c&&this._multiple&&a===65&&e.ctrlKey){e.preventDefault();let D=this.options.some(h=>!h.disabled&&!h.selected);this.options.forEach(h=>{h.disabled||(D?h.select():h.deselect())})}else{let D=t.activeItemIndex;t.onKeydown(e),this._multiple&&i&&e.shiftKey&&t.activeItem&&t.activeItemIndex!==D&&t.activeItem._selectViaInteraction()}}_handleOverlayKeydown(e){e.keyCode===27&&!V(e)&&(e.preventDefault(),this.close())}_onFocus(){this.disabled||(this._focused=!0,this.stateChanges.next())}_onBlur(){this._focused=!1,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}get empty(){return!this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next()})}_setSelectionByValue(e){if(this.options.forEach(t=>t.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)Array.isArray(e),e.forEach(t=>this._selectOptionByValue(t)),this._sortValues();else{let t=this._selectOptionByValue(e);t?this._keyManager.updateActiveItem(t):this.panelOpen||this._keyManager.updateActiveItem(-1)}this._changeDetectorRef.markForCheck()}_selectOptionByValue(e){let t=this.options.find(a=>{if(this._selectionModel.isSelected(a))return!1;try{return(a.value!=null||this.canSelectNullableOptions)&&this._compareWith(a.value,e)}catch{return!1}});return t&&this._selectionModel.select(t),t}_assignValue(e){return e!==this._value||this._multiple&&Array.isArray(e)?(this.options&&this._setSelectionByValue(e),this._value=e,!0):!1}_skipPredicate=e=>this.panelOpen?!1:e.disabled;_getOverlayWidth(e){return this.panelWidth==="auto"?(e instanceof se?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:this.panelWidth===null?"":this.panelWidth}_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck()}_initKeyManager(){this._keyManager=new $e(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?"rtl":"ltr").withHomeAndEnd().withPageUpDown().withAllowedModifierKeys(["shiftKey"]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close())}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction()})}_resetOptions(){let e=z(this.options.changes,this._destroy);this.optionSelectionChanges.pipe(R(e)).subscribe(t=>{this._onSelect(t.source,t.isUserInput),t.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus())}),z(...this.options.map(t=>t._stateChanges)).pipe(R(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next()})}_onSelect(e,t){let a=this._selectionModel.isSelected(e);!this.canSelectNullableOptions&&e.value==null&&!this._multiple?(e.deselect(),this._selectionModel.clear(),this.value!=null&&this._propagateChanges(e.value)):(a!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),t&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),t&&this.focus())),a!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next()}_sortValues(){if(this.multiple){let e=this.options.toArray();this._selectionModel.sort((t,a)=>this.sortComparator?this.sortComparator(t,a,e):e.indexOf(t)-e.indexOf(a)),this.stateChanges.next()}}_propagateChanges(e){let t;this.multiple?t=this.selected.map(a=>a.value):t=this.selected?this.selected.value:e,this._value=t,this.valueChange.emit(t),this._onChange(t),this.selectionChange.emit(this._getChangeEvent(t)),this._changeDetectorRef.markForCheck()}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let t=0;t<this.options.length;t++)if(!this.options.get(t).disabled){e=t;break}this._keyManager.setActiveItem(e)}else this._keyManager.setActiveItem(this._selectionModel.selected[0])}_canOpen(){return!this._panelOpen&&!this.disabled&&this.options?.length>0&&!!this._overlayDir}focus(e){this._elementRef.nativeElement.focus(e)}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||null,t=e?e+" ":"";return this.ariaLabelledby?t+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||"";return this.ariaLabelledby&&(e+=" "+this.ariaLabelledby),e||(e=this._valueId),e}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let t=this._elementRef.nativeElement;e.length?t.setAttribute("aria-describedby",e.join(" ")):t.removeAttribute("aria-describedby")}onContainerClick(e){let t=Qe(e);t&&(t.tagName==="MAT-OPTION"||t.classList.contains("cdk-overlay-backdrop")||t.closest(".mat-mdc-select-panel"))||(this.focus(),this.open())}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=g({type:n,selectors:[["mat-select"]],contentQueries:function(t,a,i){if(t&1&&Ie(i,la,5)(i,B,5)(i,pe,5),t&2){let c;S(c=O())&&(a.customTrigger=c.first),S(c=O())&&(a.options=c),S(c=O())&&(a.optionGroups=c)}},viewQuery:function(t,a){if(t&1&&G(Ut,5)($t,5)(ce,5),t&2){let i;S(i=O())&&(a.trigger=i.first),S(i=O())&&(a.panel=i.first),S(i=O())&&(a._overlayDir=i.first)}},hostAttrs:["role","combobox","aria-haspopup","listbox",1,"mat-mdc-select"],hostVars:21,hostBindings:function(t,a){t&1&&y("keydown",function(c){return a._handleKeydown(c)})("focus",function(){return a._onFocus()})("blur",function(){return a._onBlur()}),t&2&&(N("id",a.id)("tabindex",a.disabled?-1:a.tabIndex)("aria-controls",a.panelOpen?a.id+"-panel":null)("aria-expanded",a.panelOpen)("aria-label",a.ariaLabel||null)("aria-required",a.required.toString())("aria-disabled",a.disabled.toString())("aria-invalid",a.errorState)("aria-activedescendant",a._getAriaActiveDescendant()),x("mat-mdc-select-disabled",a.disabled)("mat-mdc-select-invalid",a.errorState)("mat-mdc-select-required",a.required)("mat-mdc-select-empty",a.empty)("mat-mdc-select-multiple",a.multiple)("mat-select-open",a.panelOpen))},inputs:{userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],panelClass:"panelClass",disabled:[2,"disabled","disabled",k],disableRipple:[2,"disableRipple","disableRipple",k],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:oe(e)],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",k],placeholder:"placeholder",required:[2,"required","required",k],multiple:[2,"multiple","multiple",k],disableOptionCentering:[2,"disableOptionCentering","disableOptionCentering",k],compareWith:"compareWith",value:"value",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],errorStateMatcher:"errorStateMatcher",typeaheadDebounceInterval:[2,"typeaheadDebounceInterval","typeaheadDebounceInterval",oe],sortComparator:"sortComparator",id:"id",panelWidth:"panelWidth",canSelectNullableOptions:[2,"canSelectNullableOptions","canSelectNullableOptions",k]},outputs:{openedChange:"openedChange",_openedStream:"opened",_closedStream:"closed",selectionChange:"selectionChange",valueChange:"valueChange"},exportAs:["matSelect"],features:[re([{provide:lt,useExisting:n},{provide:me,useExisting:n}]),xe],ngContentSelectors:Zt,decls:11,vars:10,consts:[["fallbackOverlayOrigin","cdkOverlayOrigin","trigger",""],["panel",""],["cdk-overlay-origin","",1,"mat-mdc-select-trigger",3,"click"],[1,"mat-mdc-select-value"],[1,"mat-mdc-select-placeholder","mat-mdc-select-min-line"],[1,"mat-mdc-select-value-text"],[1,"mat-mdc-select-arrow-wrapper"],[1,"mat-mdc-select-arrow"],["viewBox","0 0 24 24","width","24px","height","24px","focusable","false","aria-hidden","true"],["d","M7 10l5 5 5-5z"],["cdk-connected-overlay","","cdkConnectedOverlayHasBackdrop","","cdkConnectedOverlayBackdropClass","cdk-overlay-transparent-backdrop",3,"detach","backdropClick","overlayKeydown","cdkConnectedOverlayDisableClose","cdkConnectedOverlayPanelClass","cdkConnectedOverlayScrollStrategy","cdkConnectedOverlayOrigin","cdkConnectedOverlayPositions","cdkConnectedOverlayWidth","cdkConnectedOverlayFlexibleDimensions","cdkConnectedOverlayUsePopover"],[1,"mat-mdc-select-min-line"],["role","listbox","tabindex","-1",1,"mat-mdc-select-panel","mdc-menu-surface","mdc-menu-surface--open",3,"keydown"]],template:function(t,a){if(t&1&&(T(Jt),o(0,"div",2,0),y("click",function(){return a.open()}),o(3,"div",3),p(4,ea,2,1,"span",4)(5,na,3,1,"span",5),r(),o(6,"div",6)(7,"div",7),ve(),o(8,"svg",8),v(9,"path",9),r()()()(),ke(10,ia,3,16,"ng-template",10),y("detach",function(){return a.close()})("backdropClick",function(){return a.close()})("overlayKeydown",function(c){return a._handleOverlayKeydown(c)})),t&2){let i=Ee(1);m(3),N("id",a._valueId),m(),u(a.empty?4:5),m(6),b("cdkConnectedOverlayDisableClose",!0)("cdkConnectedOverlayPanelClass",a._overlayPanelClass)("cdkConnectedOverlayScrollStrategy",a._scrollStrategy)("cdkConnectedOverlayOrigin",a._preferredOverlayOrigin||i)("cdkConnectedOverlayPositions",a._positions)("cdkConnectedOverlayWidth",a._overlayWidth)("cdkConnectedOverlayFlexibleDimensions",!0)("cdkConnectedOverlayUsePopover",a._popoverLocation)}},dependencies:[se,ce],styles:[`@keyframes _mat-select-enter {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-select-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-select {
  display: inline-block;
  width: 100%;
  outline: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--mat-select-enabled-trigger-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-select-trigger-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-select-trigger-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-select-trigger-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-select-trigger-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-select-trigger-text-tracking, var(--mat-sys-body-large-tracking));
}

div.mat-mdc-select-panel {
  box-shadow: var(--mat-select-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
}

.mat-mdc-select-disabled {
  color: var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-select-disabled .mat-mdc-select-placeholder {
  color: var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-select-trigger {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  width: 100%;
}
.mat-mdc-select-disabled .mat-mdc-select-trigger {
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
}

.mat-mdc-select-value {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mat-mdc-select-value-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mat-mdc-select-arrow-wrapper {
  height: 24px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
}
.mat-form-field-appearance-fill .mdc-text-field--no-label .mat-mdc-select-arrow-wrapper {
  transform: none;
}

.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-invalid .mat-mdc-select-arrow,
.mat-form-field-invalid:not(.mat-form-field-disabled) .mat-mdc-form-field-infix::after {
  color: var(--mat-select-invalid-arrow-color, var(--mat-sys-error));
}

.mat-mdc-select-arrow {
  width: 10px;
  height: 5px;
  position: relative;
  color: var(--mat-select-enabled-arrow-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-form-field.mat-focused .mat-mdc-select-arrow {
  color: var(--mat-select-focused-arrow-color, var(--mat-sys-primary));
}
.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-disabled .mat-mdc-select-arrow {
  color: var(--mat-select-disabled-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-select-open .mat-mdc-select-arrow {
  transform: rotate(180deg);
}
.mat-form-field-animations-enabled .mat-mdc-select-arrow {
  transition: transform 80ms linear;
}
.mat-mdc-select-arrow svg {
  fill: currentColor;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media (forced-colors: active) {
  .mat-mdc-select-arrow svg {
    fill: CanvasText;
  }
  .mat-mdc-select-disabled .mat-mdc-select-arrow svg {
    fill: GrayText;
  }
}

div.mat-mdc-select-panel {
  width: 100%;
  max-height: 275px;
  outline: 0;
  overflow: auto;
  padding: 8px 0;
  box-sizing: border-box;
  transform-origin: top center;
  border-radius: 0 0 4px 4px;
  position: relative;
  background-color: var(--mat-select-panel-background-color, var(--mat-sys-surface-container));
}
.mat-mdc-select-panel-above div.mat-mdc-select-panel {
  border-radius: 4px 4px 0 0;
  transform-origin: bottom center;
}
@media (forced-colors: active) {
  div.mat-mdc-select-panel {
    outline: solid 1px;
  }
}

.mat-select-panel-animations-enabled {
  animation: _mat-select-enter 120ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-select-panel-animations-enabled.mat-select-panel-exit {
  animation: _mat-select-exit 100ms linear;
}

.mat-mdc-select-placeholder {
  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);
  color: var(--mat-select-placeholder-text-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-form-field:not(.mat-form-field-animations-enabled) .mat-mdc-select-placeholder, ._mat-animation-noopable .mat-mdc-select-placeholder {
  transition: none;
}
.mat-form-field-hide-placeholder .mat-mdc-select-placeholder {
  color: transparent;
  -webkit-text-fill-color: transparent;
  transition: none;
  display: block;
}

.mat-mdc-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper {
  cursor: pointer;
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mat-mdc-floating-label {
  max-width: calc(100% - 18px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label--float-above {
  max-width: calc(100% / 0.75 - 24px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-notched-outline__notch {
  max-width: calc(100% - 60px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-text-field--label-floating .mdc-notched-outline__notch {
  max-width: calc(100% - 24px);
}

.mat-mdc-select-min-line:empty::before {
  content: " ";
  white-space: pre;
  width: 1px;
  display: inline-block;
  visibility: hidden;
}

.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper {
  transform: var(--mat-select-arrow-transform, translateY(-8px));
}
`],encapsulation:2,changeDetection:0})}return n})();var Ft=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=E({type:n});static \u0275inj=I({imports:[vt,ue,A,gt,U,ue]})}return n})();var ca=(n,l)=>l.id;function da(n,l){n&1&&(o(0,"mat-error"),d(1,"Name is required"),r())}function ma(n,l){if(n&1&&(o(0,"mat-option",6),d(1),r()),n&2){let e=l.$implicit;b("value",e.id),m(),C(e.name)}}function pa(n,l){n&1&&(o(0,"mat-error"),d(1,"Species is required"),r())}function ua(n,l){if(n&1&&(o(0,"div",7)(1,"p",12),d(2),r(),o(3,"div",13)(4,"span",14),d(5,"Max Wounds"),r(),o(6,"span"),d(7),r(),o(8,"span",14),d(9,"Move Speed"),r(),o(10,"span"),d(11),r(),o(12,"span",14),d(13,"Encounter Power"),r(),o(14,"span"),d(15),r(),o(16,"span",14),d(17,"Generic Spell Power"),r(),o(18,"span"),d(19),r(),o(20,"span",14),d(21,"Allowed Attributes"),r(),o(22,"span"),d(23),r()()()),n&2){let e=l;m(2),H("",e.name," stats"),m(5),C(e.maxWounds),m(4),C(e.moveSpeed),m(4),C(e.encounterPower),m(4),C(e.genericSpellPower),m(4),C(e.allowedAttributeCategories.join(", "))}}function ha(n,l){n&1&&(o(0,"mat-error"),d(1,"Level is required"),r())}function fa(n,l){n&1&&(o(0,"mat-error"),d(1,"Level must be at least 1"),r())}function ga(n,l){if(n&1&&p(0,ha,2,0,"mat-error")(1,fa,2,0,"mat-error"),n&2){let e,t=f();u((e=t.form.get("level"))!=null&&e.hasError("required")?0:(e=t.form.get("level"))!=null&&e.hasError("min")?1:-1)}}function _a(n,l){n&1&&(o(0,"mat-error"),d(1,"XP is required"),r())}function ba(n,l){n&1&&(o(0,"mat-error"),d(1,"XP cannot be negative"),r())}function va(n,l){if(n&1&&p(0,_a,2,0,"mat-error")(1,ba,2,0,"mat-error"),n&2){let e,t=f();u((e=t.form.get("xp"))!=null&&e.hasError("required")?0:(e=t.form.get("xp"))!=null&&e.hasError("min")?1:-1)}}var Rt=class n{fb=s(He);characterService=s(Pe);router=s(Fe);staticData=s(Re);speciesList=this.staticData.getSpecies();form=this.fb.group({name:["",[M.required,M.minLength(1)]],speciesId:["",M.required],level:[1,[M.required,M.min(1)]],xp:[0,[M.required,M.min(0)]]});get selectedSpecies(){let l=this.form.get("speciesId")?.value;return l?this.staticData.getSpeciesById(l):void 0}onSubmit(){if(this.form.invalid)return;let{name:l,speciesId:e,level:t,xp:a}=this.form.getRawValue();this.characterService.createCharacter(l,e,t,a),this.router.navigate(["/sheet"])}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=g({type:n,selectors:[["app-new-character"]],decls:33,vars:7,consts:[[1,"page"],[1,"form-card"],[3,"ngSubmit","formGroup"],["appearance","outline"],["matInput","","formControlName","name"],["formControlName","speciesId"],[3,"value"],[1,"species-info"],["matInput","","type","number","formControlName","level","min","1"],["matInput","","type","number","formControlName","xp","min","0"],["align","end"],["mat-raised-button","","color","primary",3,"click","disabled"],[1,"species-info-title"],[1,"species-info-grid"],[1,"label"]],template:function(e,t){if(e&1&&(o(0,"div",0)(1,"mat-card",1)(2,"mat-card-header")(3,"mat-card-title"),d(4,"Create New Character"),r()(),o(5,"mat-card-content")(6,"form",2),y("ngSubmit",function(){return t.onSubmit()}),o(7,"mat-form-field",3)(8,"mat-label"),d(9,"Name"),r(),v(10,"input",4),p(11,da,2,0,"mat-error"),r(),o(12,"mat-form-field",3)(13,"mat-label"),d(14,"Species"),r(),o(15,"mat-select",5),we(16,ma,2,2,"mat-option",6,ca),r(),p(18,pa,2,0,"mat-error"),r(),p(19,ua,24,6,"div",7),o(20,"mat-form-field",3)(21,"mat-label"),d(22,"Level"),r(),v(23,"input",8),p(24,ga,2,1),r(),o(25,"mat-form-field",3)(26,"mat-label"),d(27,"XP"),r(),v(28,"input",9),p(29,va,2,1),r()()(),o(30,"mat-card-actions",10)(31,"button",11),y("click",function(){return t.onSubmit()}),d(32," Create Character "),r()()()()),e&2){let a,i,c,D,h;m(6),b("formGroup",t.form),m(5),u((a=t.form.get("name"))!=null&&a.touched&&((a=t.form.get("name"))!=null&&a.hasError("required"))?11:-1),m(5),Se(t.speciesList),m(2),u((i=t.form.get("speciesId"))!=null&&i.touched&&((i=t.form.get("speciesId"))!=null&&i.hasError("required"))?18:-1),m(),u((c=t.selectedSpecies)?19:-1,c),m(5),u((D=t.form.get("level"))!=null&&D.touched?24:-1),m(5),u((h=t.form.get("xp"))!=null&&h.touched?29:-1),m(2),b("disabled",t.form.invalid)}},dependencies:[Ke,ze,Ne,We,Le,Be,Ge,Q,qe,it,nt,wt,yt,kt,Ct,Mt,xt,U,ct,rt,ot,ut,pt,Ft,Tt,B],styles:[".page[_ngcontent-%COMP%]{display:flex;justify-content:center;padding:48px 16px;min-height:100vh;box-sizing:border-box}.form-card[_ngcontent-%COMP%]{width:100%;max-width:520px;height:fit-content}form[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding-top:8px}mat-form-field[_ngcontent-%COMP%]{width:100%}.species-info[_ngcontent-%COMP%]{border:1px solid var(--mat-sys-outline-variant);border-radius:8px;padding:12px 16px;margin-bottom:16px;background:var(--mat-sys-surface-variant)}.species-info-title[_ngcontent-%COMP%]{margin:0 0 8px;font-weight:500;color:var(--mat-sys-on-surface-variant)}.species-info-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:auto 1fr;gap:4px 16px}.label[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant);font-size:.875rem}"]})};export{Rt as NewCharacterComponent};
