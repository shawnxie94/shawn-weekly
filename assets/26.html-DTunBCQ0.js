import{_ as a,c as t,b as i,o as r}from"./app-p5s5Y6oB.js";const n={};function s(l,e){return r(),t("div",null,e[0]||(e[0]=[i('<h1 id="肖恩技术周刊-第-26-期-无痛写作" tabindex="-1"><a class="header-anchor" href="#肖恩技术周刊-第-26-期-无痛写作"><span>肖恩技术周刊（第 26 期）：无痛写作</span></a></h1><blockquote><p><strong>周刊内容</strong>: 对一周内阅读的资讯或技术内容精品（个人向）进行总结，分类大致包含“业界资讯”、“技术博客”、“开源项目”和“学习资料”等。<br><strong>更新时间</strong>: 周一<br><strong>历史收录</strong>: <a href="https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkwODY0ODQzOQ==&amp;action=getalbum&amp;album_id=3492416248238096386#wechat_redirect" target="_blank" rel="noopener noreferrer">技术周刊合集</a> <br><strong>订阅方式</strong>: 微信公众号“<strong>肖恩聊技术</strong>”，除周刊外还有更多原创技术博文，欢迎关注👏🏻~<br><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/20241103221454.png" alt="公众号二维码" width="300"></p></blockquote><h2 id="开篇图" tabindex="-1"><a class="header-anchor" href="#开篇图"><span>开篇图</span></a></h2><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012306767.png" alt=""></p><p>写作相关的工具，这几个月可没少折腾。先是选了一个好用的笔记工具 Obsidian，并自建了图床解决了图片管理问题。写作时是舒坦了，但写作后除了push到Github外还需要手动发布到公众号和个人博客，还是比较痛苦。博客由于调整格式太麻烦，最近都放弃同步了。</p><p>那如何解决这最后一环真正实现无痛写作呢？当然是基于Github变更能自动发布最好啦。这一周重新了解了一下静态网站建站工具和托管平台，之前逮到一个能用就咔咔搞了，也没有详细对比过，才发现原来静态博客除了域名不需要花一分就能搭建。接着也粗略了解了GitHub Actions，可以结合微信的API实现文章自动发布到草稿箱。是时候补齐写作工作流的最后一环，实现真正的无痛写作啦！</p><h2 id="内容速览" tabindex="-1"><a class="header-anchor" href="#内容速览"><span>内容速览</span></a></h2><blockquote><p><strong>业界资讯</strong></p><ul><li>Chrome 牵头成立「浏览器选择联盟」，目标是 “反 Microsoft Edge”</li><li>Deno 请求美国专利商标局撤销 Oracle 的 “JavaScript” 商标</li><li>开源压缩软件 7-Zip 被曝严重安全漏洞</li></ul><p><strong>技术博客</strong></p><ul><li>代码千行不如架构图一张！论契约平台的设计与思考</li><li>基于Redis内核的热key统计实现方案</li></ul><p><strong>开源项目</strong></p><ul><li>screenshot-to-code：截图生成前端代码</li><li>rewrite：自动化代码重构工具</li><li>marker：PDF快速转换成Markdown、JSON和HTML格式</li></ul><p><strong>学习资料</strong></p><ul><li>NVIDIA 新开发者福利：600元AI课程免费学，还有机会获得NVIDIA培训证书</li><li>看见概率论：交互式学习概率论</li></ul><p><strong>随便看看</strong></p><ul><li>连接全球的海底光缆有多脆弱？</li><li>1个数据集的100种可视化效果</li></ul></blockquote><h2 id="业界资讯" tabindex="-1"><a class="header-anchor" href="#业界资讯"><span>业界资讯</span></a></h2><h3 id="chrome-牵头成立「浏览器选择联盟」-目标是-反-microsoft-edge" tabindex="-1"><a class="header-anchor" href="#chrome-牵头成立「浏览器选择联盟」-目标是-反-microsoft-edge"><span><a href="https://www.oschina.net/news/322571/chrome-browserchoicealliance" target="_blank" rel="noopener noreferrer">Chrome 牵头成立「浏览器选择联盟」，目标是 “反 Microsoft Edge”</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012226457.png" alt=""></p><p>浏览器选择联盟是一个由Chrome、Opera、Vivaldi等浏览器联合成立的组织，旨在反对Microsoft Edge在Windows平台的垄断行为。该联盟强调用户应有权选择自己偏好的浏览器，并列举了Microsoft Edge的多项不正当竞争手段，如在下载第三方浏览器时弹出安全警告、更改默认浏览器时设置障碍，以及在用户搜索其他浏览器时诱导用户切换到Edge。联盟官网提供了更多相关信息，旨在维护浏览器市场的公平竞争和用户选择权。</p><h3 id="deno-请求美国专利商标局撤销-oracle-的-javascript-商标" tabindex="-1"><a class="header-anchor" href="#deno-请求美国专利商标局撤销-oracle-的-javascript-商标"><span><a href="https://www.oschina.net/news/322147/deno-v-oracle-javascript-trademark" target="_blank" rel="noopener noreferrer">Deno 请求美国专利商标局撤销 Oracle 的 “JavaScript” 商标</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012226523.png" alt=""></p><p>Deno Land 向美国专利商标局提交申请，要求撤销 Oracle 对 &quot;JavaScript&quot; 商标的所有权，以消除社区使用该名称的法律障碍。Deno 创始人 Ryan Dahl 认为，撤销商标将使会议和规范能直接使用 &quot;JavaScript&quot; 名称，社区也不必担心法律威胁。请愿基于三个主张：JavaScript 是通用名称，Oracle 提交欺诈性证据续展商标，以及 Oracle 已放弃使用该商标。Dahl 希望 Oracle 承认 &quot;JavaScript&quot; 属于全球社区，否则将通过法律途径证明 Oracle 未按法律要求使用商标。Oracle 需在 2025 年 1 月 4 日前回应，否则 Deno 可能默认胜诉，诉讼过程将公开透明。</p><h3 id="开源压缩软件-7-zip-被曝严重安全漏洞" tabindex="-1"><a class="header-anchor" href="#开源压缩软件-7-zip-被曝严重安全漏洞"><span><a href="https://www.oschina.net/news/322575/7-zip-vulnerability-arbitrary-code" target="_blank" rel="noopener noreferrer">开源压缩软件 7-Zip 被曝严重安全漏洞</a></span></a></h3><p>开源压缩软件7-Zip被发现存在严重安全漏洞CVE-2024-11477，该漏洞允许远程攻击者在用户解压缩Zstandard格式文件时执行恶意代码。漏洞由Zstandard解压缩实现中的数据验证不当引起，可能导致整数下溢，从而使攻击者能在当前进程上下文中执行代码。受影响的系统可能被执行任意代码、获取登录用户权限甚至完全绕过系统。Zstandard格式在Linux环境中广泛应用。7-Zip已在24.07版本中修复此问题，建议用户手动更新至最新版本以保护系统安全。</p><h2 id="技术博客" tabindex="-1"><a class="header-anchor" href="#技术博客"><span>技术博客</span></a></h2><h3 id="代码千行不如架构图一张-论契约平台的设计与思考" tabindex="-1"><a class="header-anchor" href="#代码千行不如架构图一张-论契约平台的设计与思考"><span><a href="https://mp.weixin.qq.com/s/tvfqfEddey_G4pJX9_XbYQ" target="_blank" rel="noopener noreferrer">代码千行不如架构图一张！论契约平台的设计与思考</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012221756.png" alt=""></p><p>本文讨论了软件开发中沟通不畅导致的常见问题，并提出了契约式设计作为解决方案。文章通过实际案例分析了文档更新不及时、变更通知不到位、错误码不明确等问题，并强调了信息有效传递的重要性。契约式设计通过明确责任和义务，帮助系统更好地沟通，降低系统熵，提高软件可靠性。文章还讨论了如何利用AI技术辅助契约式设计，以及契约在研发流程中的广义应用。</p><p>文章指出，在软件开发过程中，沟通不畅会导致文档更新不及时、服务变更未知情、错误码含义不明确等问题，严重影响研发效率和软件质量。这些问题的根源在于信息传递的不顺畅和责任划分的不明确。契约式设计通过在系统间明确责任和义务，帮助降低系统熵，提高软件的可靠性和稳定性。这种设计方法不仅适用于技术层面，还可以扩展到整个研发流程，包括业务建模、分析和设计阶段。</p><p>文章还提到了防御性编程的重要性，并提出了利用AI技术辅助契约式设计，以减少重复工作，提高开发效率。通过AI技术，可以自动生成和维护契约文档，确保文档的及时更新和准确性，从而提高团队间的沟通效率。</p><p>总之，契约式设计是一种有效的沟通工具，可以帮助团队明确责任，提高软件的可靠性和稳定性。通过结合AI技术，契约式设计可以进一步优化研发流程，提高开发效率。</p><h3 id="基于redis内核的热key统计实现方案" tabindex="-1"><a class="header-anchor" href="#基于redis内核的热key统计实现方案"><span><a href="https://mp.weixin.qq.com/s/RWQzLZq6X7B5ThaKX6U4SQ" target="_blank" rel="noopener noreferrer">基于Redis内核的热key统计实现方案</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012220215.png" alt=""></p><p>本文讨论了Redis中的热key问题及其对性能的影响，并介绍了几种常见的热key探测方法。热key是指访问频率极高的key，可能导致CPU资源占用高，影响Redis性能。常见的探测方法包括使用Redis-cli的hotkeys参数、monitor命令统计、Redis节点抓包分析以及Client/Proxy端收集，但这些方法各有局限性。</p><p>得物技术提出了一种基于Redis内核的热key统计方案，该方案实时性强，信息详细，支持订阅与查询功能，有效解决了热key探测的难点。方案包含热key统计和通知模块，能在Redis-server端实现。热key统计模块基于LRU队列，统计key每秒访问次数，超过阈值则判定为热key，同时区分读热key与写热key。热key通知模块提供读热key、写热key、热key失效三个订阅通道，Redis-server会主动向订阅通道广播热key消息。此外，还支持热key记录查询与重置命令，允许查询和重置读命令和写命令的热key日志。这一方案为热key探测提供了一种新的解决方案，有助于提高Redis的性能和稳定性。</p><h2 id="开源项目" tabindex="-1"><a class="header-anchor" href="#开源项目"><span>开源项目</span></a></h2><h3 id="screenshot-to-code" tabindex="-1"><a class="header-anchor" href="#screenshot-to-code"><span><a href="https://github.com/abi/screenshot-to-code" target="_blank" rel="noopener noreferrer">screenshot-to-code</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012231166.png" alt=""></p><p>screenshot-to-code通过AI将截图、草图和Figma设计转换成干净、功能性的前端代码。目前支持Claude Sonnet 3.5和GPT-4o模型。</p><h3 id="rewrite" tabindex="-1"><a class="header-anchor" href="#rewrite"><span><a href="https://github.com/openrewrite/rewrite" target="_blank" rel="noopener noreferrer">rewrite</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012234100.png" alt=""></p><p>OpenRewrite是一个开源的自动化代码重构工具，它通过修改Lossless Semantic Trees (LSTs)并重新打印源代码来工作，保持代码原始格式。它最初支持Java，但正在扩展对更多语言和框架的支持。开发者可以创建和运行自己的重构食谱，以获得想要的重构效果。</p><h3 id="marker" tabindex="-1"><a class="header-anchor" href="#marker"><span><a href="https://github.com/VikParuchuri/marker" target="_blank" rel="noopener noreferrer">marker</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012230300.png" alt=""></p><p>marker能够将PDF文件快速且准确地转换成Markdown、JSON和HTML格式。</p><h2 id="学习资源" tabindex="-1"><a class="header-anchor" href="#学习资源"><span>学习资源</span></a></h2><h3 id="nvidia-新开发者福利-600元ai课程免费学-还有机会获得nvidia培训证书" tabindex="-1"><a class="header-anchor" href="#nvidia-新开发者福利-600元ai课程免费学-还有机会获得nvidia培训证书"><span><a href="https://www.solidot.org/story?sid=79898" target="_blank" rel="noopener noreferrer">NVIDIA 新开发者福利：600元AI课程免费学，还有机会获得NVIDIA培训证书</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012235780.png" alt=""></p><p>NVIDIA为新开发者提供免费学习价值600元的AI在线课程，并有机会获得官方培训证书。课程覆盖生成式AI、大语言模型、图形仿真、加速计算、数据科学和深度学习等五大领域，提供云端实验环境和实践机会，助力专业技能提升。</p><h3 id="git-cheat-sheet" tabindex="-1"><a class="header-anchor" href="#git-cheat-sheet"><span><a href="https://wizardzines.com/git-cheat-sheet.pdf" target="_blank" rel="noopener noreferrer">git-cheat-sheet</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012221429.png" alt=""></p><p>速查Git命令。</p><h3 id="看见概率论" tabindex="-1"><a class="header-anchor" href="#看见概率论"><span><a href="https://probability.visualized.fun/" target="_blank" rel="noopener noreferrer">看见概率论</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012223637.png" alt=""></p><p>交互式学习平台，通过直观演示和实际案例，使概率论的学习变得有趣和易于理解。平台涵盖了大数定理、贝叶斯定理、凯利公式等核心概念，并提供了经典概率趣题的互动演示。</p><h2 id="随便看看" tabindex="-1"><a class="header-anchor" href="#随便看看"><span>随便看看</span></a></h2><h3 id="连接全球的海底光缆有多脆弱" tabindex="-1"><a class="header-anchor" href="#连接全球的海底光缆有多脆弱"><span><a href="https://www.163.com/dy/article/JI2HH3730514R9OJ.html" target="_blank" rel="noopener noreferrer">连接全球的海底光缆有多脆弱？</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012225857.png" alt=""></p><p>全球互联网依赖海底光缆传输95%以上的数据，这些光缆总长140万公里，对现代通信至关重要。尽管海底光缆技术不断进步，它们每年仍会发生约150-200起损坏事件，主要因人类活动导致。</p><p>中国华海通信技术有限公司已成为全球海底光缆行业的领先企业之一。尽管海底光缆的维护和修复技术已相当成熟，但部分国家仍对中国的海底光缆工程进行无端抹黑，以国家安全为由进行阻挠。美国在全球监控网络中扮演着关键角色，试图排除中国在全球海底光缆项目中的影响。海底光缆不仅是技术成就，也是国际政治和经济竞争的焦点。</p><h3 id="_1个数据集的100种可视化效果" tabindex="-1"><a class="header-anchor" href="#_1个数据集的100种可视化效果"><span><a href="https://100.datavizproject.com/" target="_blank" rel="noopener noreferrer">1个数据集的100种可视化效果</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012223207.png" alt=""></p><p>文章从单一数据集中创造100个不同的可视化效果，展示了数据可视化的多样性和复杂性。</p>',56)]))}const p=a(n,[["render",s],["__file","26.html.vue"]]),h=JSON.parse('{"path":"/content/2024/26.html","title":"肖恩技术周刊（第 26 期）：无痛写作","lang":"zh-CN","frontmatter":{"description":"肖恩技术周刊（第 26 期）：无痛写作 周刊内容: 对一周内阅读的资讯或技术内容精品（个人向）进行总结，分类大致包含“业界资讯”、“技术博客”、“开源项目”和“学习资料”等。 更新时间: 周一 历史收录: 技术周刊合集 订阅方式: 微信公众号“肖恩聊技术”，除周刊外还有更多原创技术博文，欢迎关注👏🏻~ 公众号二维码 开篇图 写作相关的工具，这几个月...","head":[["meta",{"property":"og:url","content":"https://weekly.shawnxie.top/content/2024/26.html"}],["meta",{"property":"og:site_name","content":"肖恩技术周刊"}],["meta",{"property":"og:title","content":"肖恩技术周刊（第 26 期）：无痛写作"}],["meta",{"property":"og:description","content":"肖恩技术周刊（第 26 期）：无痛写作 周刊内容: 对一周内阅读的资讯或技术内容精品（个人向）进行总结，分类大致包含“业界资讯”、“技术博客”、“开源项目”和“学习资料”等。 更新时间: 周一 历史收录: 技术周刊合集 订阅方式: 微信公众号“肖恩聊技术”，除周刊外还有更多原创技术博文，欢迎关注👏🏻~ 公众号二维码 开篇图 写作相关的工具，这几个月..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012306767.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-24T12:48:32.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-24T12:48:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"肖恩技术周刊（第 26 期）：无痛写作\\",\\"image\\":[\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012306767.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012226457.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012226523.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012221756.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012220215.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012231166.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012234100.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012230300.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012235780.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012221429.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012223637.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012225857.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412012223207.png\\"],\\"dateModified\\":\\"2024-12-24T12:48:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"开篇图","slug":"开篇图","link":"#开篇图","children":[]},{"level":2,"title":"内容速览","slug":"内容速览","link":"#内容速览","children":[]},{"level":2,"title":"业界资讯","slug":"业界资讯","link":"#业界资讯","children":[{"level":3,"title":"Chrome 牵头成立「浏览器选择联盟」，目标是 “反 Microsoft Edge”","slug":"chrome-牵头成立「浏览器选择联盟」-目标是-反-microsoft-edge","link":"#chrome-牵头成立「浏览器选择联盟」-目标是-反-microsoft-edge","children":[]},{"level":3,"title":"Deno 请求美国专利商标局撤销 Oracle 的 “JavaScript” 商标","slug":"deno-请求美国专利商标局撤销-oracle-的-javascript-商标","link":"#deno-请求美国专利商标局撤销-oracle-的-javascript-商标","children":[]},{"level":3,"title":"开源压缩软件 7-Zip 被曝严重安全漏洞","slug":"开源压缩软件-7-zip-被曝严重安全漏洞","link":"#开源压缩软件-7-zip-被曝严重安全漏洞","children":[]}]},{"level":2,"title":"技术博客","slug":"技术博客","link":"#技术博客","children":[{"level":3,"title":"代码千行不如架构图一张！论契约平台的设计与思考","slug":"代码千行不如架构图一张-论契约平台的设计与思考","link":"#代码千行不如架构图一张-论契约平台的设计与思考","children":[]},{"level":3,"title":"基于Redis内核的热key统计实现方案","slug":"基于redis内核的热key统计实现方案","link":"#基于redis内核的热key统计实现方案","children":[]}]},{"level":2,"title":"开源项目","slug":"开源项目","link":"#开源项目","children":[{"level":3,"title":"screenshot-to-code","slug":"screenshot-to-code","link":"#screenshot-to-code","children":[]},{"level":3,"title":"rewrite","slug":"rewrite","link":"#rewrite","children":[]},{"level":3,"title":"marker","slug":"marker","link":"#marker","children":[]}]},{"level":2,"title":"学习资源","slug":"学习资源","link":"#学习资源","children":[{"level":3,"title":"NVIDIA 新开发者福利：600元AI课程免费学，还有机会获得NVIDIA培训证书","slug":"nvidia-新开发者福利-600元ai课程免费学-还有机会获得nvidia培训证书","link":"#nvidia-新开发者福利-600元ai课程免费学-还有机会获得nvidia培训证书","children":[]},{"level":3,"title":"git-cheat-sheet","slug":"git-cheat-sheet","link":"#git-cheat-sheet","children":[]},{"level":3,"title":"看见概率论","slug":"看见概率论","link":"#看见概率论","children":[]}]},{"level":2,"title":"随便看看","slug":"随便看看","link":"#随便看看","children":[{"level":3,"title":"连接全球的海底光缆有多脆弱？","slug":"连接全球的海底光缆有多脆弱","link":"#连接全球的海底光缆有多脆弱","children":[]},{"level":3,"title":"1个数据集的100种可视化效果","slug":"_1个数据集的100种可视化效果","link":"#_1个数据集的100种可视化效果","children":[]}]}],"git":{"updatedTime":1735044512000,"contributors":[{"name":"xiexiao6","username":"xiexiao6","email":"xiexiao6@jd.com","commits":1,"url":"https://github.com/xiexiao6"},{"name":"Shawn Xie","username":"Shawn Xie","email":"xiexiao064@gmail.com","commits":2,"url":"https://github.com/Shawn Xie"}]},"autoDesc":true,"filePathRelative":"content/2024/26.md","excerpt":"\\n<blockquote>\\n<p><strong>周刊内容</strong>: 对一周内阅读的资讯或技术内容精品（个人向）进行总结，分类大致包含“业界资讯”、“技术博客”、“开源项目”和“学习资料”等。<br>\\n<strong>更新时间</strong>: 周一<br>\\n<strong>历史收录</strong>: <a href=\\"https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkwODY0ODQzOQ==&amp;action=getalbum&amp;album_id=3492416248238096386#wechat_redirect\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">技术周刊合集</a> <br>\\n<strong>订阅方式</strong>: 微信公众号“<strong>肖恩聊技术</strong>”，除周刊外还有更多原创技术博文，欢迎关注👏🏻~<br>\\n<img src=\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/20241103221454.png\\" alt=\\"公众号二维码\\" width=\\"300\\"></p>\\n</blockquote>"}');export{p as comp,h as data};
