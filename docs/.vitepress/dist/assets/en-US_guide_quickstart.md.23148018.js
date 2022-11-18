import{d as p,e as s,a as e,w as o,f as a,b as n,r as c,o as l}from"./app.9ac1a581.js";const u=a(`<h1 id="quick-start" tabindex="-1">Quick Start <a class="header-anchor" href="#quick-start" aria-hidden="true">#</a></h1><p>This section describes how to use Element Plus in your project.</p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-hidden="true">#</a></h2><h3 id="full-import" tabindex="-1">Full Import <a class="header-anchor" href="#full-import" aria-hidden="true">#</a></h3><p>If you don\u2019t care about the bundle size so much, it\u2019s more convenient to use full import.</p><div class="language-typescript"><pre><code><span class="token comment">// main.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> ElementPlus <span class="token keyword">from</span> <span class="token string">&#39;element-plus&#39;</span>
<span class="token keyword">import</span> <span class="token string">&#39;element-plus/dist/index.css&#39;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App.vue&#39;</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>ElementPlus<span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>
</code></pre></div><h4 id="volar-support" tabindex="-1">Volar support <a class="header-anchor" href="#volar-support" aria-hidden="true">#</a></h4><p>If you use volar, please add the global component type definition to <code>compilerOptions.types</code> in <code>tsconfig.json</code>.</p><div class="language-json"><pre><code><span class="token comment">// tsconfig.json</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;compilerOptions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token property">&quot;types&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;element-plus/global&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="on-demand-import" tabindex="-1">On-demand Import <a class="header-anchor" href="#on-demand-import" aria-hidden="true">#</a></h3><p>You need to use an additional plugin to import components you used.</p>`,11),r={id:"auto-import-recommend",tabindex:"-1"},i=n("Auto import "),k=n("Recommend"),d=n(),m=s("a",{class:"header-anchor",href:"#auto-import-recommend","aria-hidden":"true"},"#",-1),g=a(`<p>First you need to install <code>unplugin-vue-components</code> and <code>unplugin-auto-import</code>.</p><div class="language-shell"><pre><code><span class="token function">npm</span> <span class="token function">install</span> -D unplugin-vue-components unplugin-auto-import
</code></pre></div><p>Then add the code below into your <code>Vite</code> or <code>Webpack</code> config file.</p><h5 id="vite" tabindex="-1">Vite <a class="header-anchor" href="#vite" aria-hidden="true">#</a></h5><div class="language-ts"><pre><code><span class="token comment">// vite.config.ts</span>
<span class="token keyword">import</span> AutoImport <span class="token keyword">from</span> <span class="token string">&#39;unplugin-auto-import/vite&#39;</span>
<span class="token keyword">import</span> Components <span class="token keyword">from</span> <span class="token string">&#39;unplugin-vue-components/vite&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ElementPlusResolver <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;unplugin-vue-components/resolvers&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// ...</span>
    <span class="token function">AutoImport</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      resolvers<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">ElementPlusResolver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">Components</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      resolvers<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">ElementPlusResolver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><h5 id="webpack" tabindex="-1">Webpack <a class="header-anchor" href="#webpack" aria-hidden="true">#</a></h5><div class="language-js"><pre><code><span class="token comment">// webpack.config.js</span>
<span class="token keyword">const</span> AutoImport <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;unplugin-auto-import/webpack&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> Components <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;unplugin-vue-components/webpack&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> ElementPlusResolver <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;unplugin-vue-components/resolvers&#39;</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">AutoImport</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">resolvers</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">ElementPlusResolver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">Components</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">resolvers</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">ElementPlusResolver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><p>For more bundlers (<a href="https://rollupjs.org/" target="_blank" rel="noopener noreferrer">Rollup</a>, <a href="https://cli.vuejs.org/" target="_blank" rel="noopener noreferrer">Vue CLI</a>) and configs please reference <a href="https://github.com/antfu/unplugin-vue-components#installation" target="_blank" rel="noopener noreferrer">unplugin-vue-components</a> and <a href="https://github.com/antfu/unplugin-auto-import#install" target="_blank" rel="noopener noreferrer">unplugin-auto-import</a>.</p><h3 id="manually-import" tabindex="-1">Manually import <a class="header-anchor" href="#manually-import" aria-hidden="true">#</a></h3><p>Element Plus provides out of box <a href="https://webpack.js.org/guides/tree-shaking/" target="_blank" rel="noopener noreferrer">Tree Shaking</a> functionalities based on ES Module.</p><p>But you need install <a href="https://github.com/element-plus/unplugin-element-plus" target="_blank" rel="noopener noreferrer">unplugin-element-plus</a> for style import. And refer to the <a href="https://github.com/element-plus/unplugin-element-plus#readme" target="_blank" rel="noopener noreferrer">docs</a> for how to configure it.</p><blockquote><p>App.vue</p></blockquote><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-button</span><span class="token punctuation">&gt;</span></span>I am ElButton<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-button</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> <span class="token punctuation">{</span> ElButton <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;element-plus&#39;</span>
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span> ElButton <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><div class="language-ts"><pre><code><span class="token comment">// vite.config.ts</span>
<span class="token keyword">import</span> ElementPlus <span class="token keyword">from</span> <span class="token string">&#39;unplugin-element-plus/vite&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">ElementPlus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>You need to manually import the styles if you&#39;re using <code>unplugin-element-plus</code> and only used the component API.</p><p>Example:</p><div class="language-ts"><pre><code><span class="token keyword">import</span> <span class="token string">&#39;element-plus/es/components/message/style/css&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ElMessage <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;element-plus&#39;</span>
</code></pre></div></div><h2 id="starter-template" tabindex="-1">Starter Template <a class="header-anchor" href="#starter-template" aria-hidden="true">#</a></h2><p>We provide a <a href="https://github.com/element-plus/element-plus-vite-starter" target="_blank" rel="noopener noreferrer">Vite Template</a>. For Laravel users we have a <a href="https://github.com/element-plus/element-plus-in-laravel-starter" target="_blank" rel="noopener noreferrer">Laravel Template</a>.</p><h2 id="global-configuration" tabindex="-1">Global Configuration <a class="header-anchor" href="#global-configuration" aria-hidden="true">#</a></h2><p>When registering Element Plus, you can pass a global config object with <code>size</code> and <code>zIndex</code> to set the default <code>size</code> for form components, and <code>zIndex</code> for popup components, the default value for <code>zIndex</code> is <code>2000</code>.</p><p>Full import:</p><div class="language-ts"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> ElementPlus <span class="token keyword">from</span> <span class="token string">&#39;element-plus&#39;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App.vue&#39;</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>ElementPlus<span class="token punctuation">,</span> <span class="token punctuation">{</span> size<span class="token operator">:</span> <span class="token string">&#39;small&#39;</span><span class="token punctuation">,</span> zIndex<span class="token operator">:</span> <span class="token number">3000</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>On-demand:</p><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-config-provider</span> <span class="token attr-name">:size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>size<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:z-index</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>zIndex<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>app</span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-config-provider</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ElConfigProvider <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;element-plus&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    ElConfigProvider<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">zIndex</span><span class="token operator">:</span> <span class="token number">3000</span><span class="token punctuation">,</span>
      <span class="token literal-property property">size</span><span class="token operator">:</span> <span class="token string">&#39;small&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h2 id="using-nuxt-js" tabindex="-1">Using Nuxt.js <a class="header-anchor" href="#using-nuxt-js" aria-hidden="true">#</a></h2><p>We can also use <a href="https://v3.nuxtjs.org/" target="_blank" rel="noopener noreferrer">Nuxt.js</a>\uFF1A</p><div class="glitch-embed-wrap" style="height:420px;width:100%;"><iframe src="https://glitch.com/edit/#!/nuxt-element-plus?path=components%2FExamples.vue%3A1%3A0" alt="nuxt-element-plus on glitch" style="height:100%;width:100%;border:0;"></iframe></div><h2 id="let-s-get-started" tabindex="-1">Let&#39;s Get Started <a class="header-anchor" href="#let-s-get-started" aria-hidden="true">#</a></h2><p>You can bootstrap your project from now on. For each components usage, please refer to the individual component documentation.</p>`,28),_=`{"title":"Quick Start","description":"","frontmatter":{"title":"Quick Start","lang":"en-US"},"headers":[{"level":2,"title":"Usage","slug":"usage"},{"level":3,"title":"Full Import","slug":"full-import"},{"level":3,"title":"On-demand Import","slug":"on-demand-import"},{"level":3,"title":"Manually import","slug":"manually-import"},{"level":2,"title":"Starter Template","slug":"starter-template"},{"level":2,"title":"Global Configuration","slug":"global-configuration"},{"level":2,"title":"Using Nuxt.js","slug":"using-nuxt-js"},{"level":2,"title":"Let's Get Started","slug":"let-s-get-started"}],"relativePath":"en-US/guide/quickstart.md","lastUpdated":1646719412000}`,h={},w=Object.assign(h,{setup(f){return(v,y)=>{const t=c("el-tag");return l(),p("div",null,[u,s("h4",r,[i,e(t,{type:"primary",style:{"vertical-align":"middle"},effect:"dark",size:"small"},{default:o(()=>[k]),_:1}),d,m]),g])}}});export{_ as __pageData,w as default};
