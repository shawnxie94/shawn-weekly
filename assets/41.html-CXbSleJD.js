import{_ as a,c as n,a as t,o as r}from"./app-Ds79NNgG.js";const s={};function i(p,e){return r(),n("div",null,e[0]||(e[0]=[t('<h1 id="肖恩技术周刊-第-41-期-疲乏" tabindex="-1"><a class="header-anchor" href="#肖恩技术周刊-第-41-期-疲乏"><span>肖恩技术周刊（第 41 期）：疲乏</span></a></h1><blockquote><p><strong>周刊内容</strong>: 对一周内阅读的资讯或技术内容精品（个人向）进行总结，分类大致包含“业界资讯”、“技术博客”、“开源项目”和“学习资源”等。<br><strong>更新时间</strong>: 周一<br><strong>历史收录</strong>: <a href="https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkwODY0ODQzOQ==&amp;action=getalbum&amp;album_id=3492416248238096386#wechat_redirect" target="_blank" rel="noopener noreferrer">技术周刊合集</a> <br><strong>订阅方式</strong>: 微信公众号“<strong>肖恩聊技术</strong>”，除周刊外还有更多原创技术博文，欢迎关注👏🏻~<br><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/20241103221454.png" alt="公众号二维码" width="300"></p></blockquote><h2 id="开篇图" tabindex="-1"><a class="header-anchor" href="#开篇图"><span>开篇图</span></a></h2><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202503162321907.png" alt=""></p><p>最近有点疲乏，感觉需要一个长假期来恢复一下情绪。</p><h2 id="业界资讯" tabindex="-1"><a class="header-anchor" href="#业界资讯"><span>业界资讯</span></a></h2><h3 id="openai发布构建智能体新工具" tabindex="-1"><a class="header-anchor" href="#openai发布构建智能体新工具"><span><a href="https://openai.com/index/new-tools-for-building-agents/" target="_blank" rel="noopener noreferrer">OpenAI发布构建智能体新工具</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202503162229201.png" alt=""></p><p>OpenAI于2025年3月11日发布了一系列新工具，旨在简化智能代理（agents）的开发，帮助开发者和企业构建更可靠、高效的自主任务执行系统。新工具包括Responses API、内置工具（如网络搜索、文件搜索和计算机使用）以及Agents SDK。Responses API结合了Chat Completions的简单性和Assistants API的工具使用能力，支持开发者通过单一调用完成复杂任务。内置工具通过连接现实世界数据提升模型实用性，例如网络搜索在SimpleQA基准测试中准确率达90%。Agents SDK则用于协调单代理或多代理工作流，支持开发者快速构建和部署智能代理系统，已在Coinbase和Box等企业的实际应用中取得成功。OpenAI计划在未来继续扩展这些工具，推动智能代理在各行业的广泛应用。</p><h3 id="李飞飞团队具身智能新作-500美元-一切家务机器人帮你干" tabindex="-1"><a class="header-anchor" href="#李飞飞团队具身智能新作-500美元-一切家务机器人帮你干"><span><a href="https://m.thepaper.cn/newsDetail_forward_30373788" target="_blank" rel="noopener noreferrer">李飞飞团队具身智能新作：500美元，一切家务机器人帮你干</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202503162253061.png" alt=""></p><p>李飞飞团队推出具身智能新作BRS框架，旨在解决机器人家庭任务中的全身操作问题。研究基于Galaxea R1机器人，通过分析BEHAVIOR-1K基准测试，确定了三项关键全身控制能力：双臂协同、稳定导航和末端执行器的广泛操作性。团队提出两项创新：一是JoyLo，一种低成本全身遥操作接口，利用任天堂Joy-Con控制器实现高效全身控制，具备高数据收集效率和良好的用户体验；二是WB-VIMA学习算法，基于Transformer架构，通过自回归去噪和多模态注意力机制，解决机器人全身协调运动难题，显著提升任务成功率并减少错误。实验表明，BRS在清洁、倒垃圾等家庭任务中表现出色。该框架已开源，为家庭机器人研究提供了重要参考。</p><h2 id="技术博客" tabindex="-1"><a class="header-anchor" href="#技术博客"><span>技术博客</span></a></h2><h3 id="如何使用大型语言模型来辅助编写代码-英文" tabindex="-1"><a class="header-anchor" href="#如何使用大型语言模型来辅助编写代码-英文"><span><a href="https://simonwillison.net/2025/Mar/11/using-llms-for-code/" target="_blank" rel="noopener noreferrer">如何使用大型语言模型来辅助编写代码（英文）</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202503162227294.png" alt=""></p><p>文章中分享了使用大型语言模型（LLM）辅助编程的经验。作者认为LLM更像是高级自动补全工具，能够加速开发过程，但需要合理设定期望。LLM的训练截止日期限制了其对代码库的熟悉程度，因此开发者需选择稳定的库。上下文管理是关键，清晰的对话和指令能让LLM更好地生成代码。作者还强调测试LLM生成代码的重要性，并建议利用支持运行代码的工具来快速迭代。</p><p>通过具体案例，如使用Claude Code创建展示工具提交历史的页面，作者展示了LLM在快速开发中的优势。LLM的最大价值在于加速想法实现，帮助开发者快速尝试新方案并学习新技能。同时，LLM并不能替代人类的专业知识和直觉，而是增强现有能力的工具。作者还提到“氛围编码”的学习方式，即通过随意提出想法来快速了解LLM的能力和局限性。总之，LLM是开发者强大的辅助工具，能够提升效率并拓展知识边界。</p><h3 id="mcp-终极指南" tabindex="-1"><a class="header-anchor" href="#mcp-终极指南"><span><a href="https://guangzhengli.com/blog/zh/model-context-protocol/" target="_blank" rel="noopener noreferrer">MCP 终极指南</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202503162259713.png" alt=""></p><p>文章主要介绍了由 Anthropic 公司主导发布的 Model Context Protocol（MCP）及其在 AI 应用层开发中的重要性。过去 AI 模型与现有系统集成缓慢，而 MCP 作为一种开放、通用的协议标准，能够使 AI 模型与不同 API 和数据源无缝交互，推动了 AI 应用与现有服务的集成。文章还对比了 Function Calling、AI Agent 和 MCP 三者之间的区别，并详细阐述了 MCP 的工作原理，包括其架构中的 Hosts、Clients、Servers 等部分，以及如何通过创建 MCP Server 来实现 AI Agent 的自动化功能，最后提供了 MCP 的一些资源和使用建议。</p><h2 id="开源项目" tabindex="-1"><a class="header-anchor" href="#开源项目"><span>开源项目</span></a></h2><h3 id="mermaid-图标工具" tabindex="-1"><a class="header-anchor" href="#mermaid-图标工具"><span><a href="https://github.com/mermaid-js/mermaid" target="_blank" rel="noopener noreferrer">mermaid：图标工具</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202503162226254.png" alt=""></p><p>Mermaid 是一个基于 JavaScript 的图表工具，它允许用户通过类似 Markdown 的文本定义生成各种图表，如流程图、序列图、甘特图等。</p><h3 id="camel-多智能体开发框架" tabindex="-1"><a class="header-anchor" href="#camel-多智能体开发框架"><span><a href="https://github.com/camel-ai/camel" target="_blank" rel="noopener noreferrer">camel：多智能体开发框架</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202503162308236.png" alt=""></p><p>CAMEL是一个强大的开源框架，专注于多智能体系统的研究和开发。它提供了丰富的功能和工具，支持大规模智能体的模拟、数据生成、任务自动化和世界模拟。</p><h3 id="openmanus-通用智能体" tabindex="-1"><a class="header-anchor" href="#openmanus-通用智能体"><span><a href="https://github.com/mannaandpoem/OpenManus" target="_blank" rel="noopener noreferrer">OpenManus：通用智能体</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202503162309779.png" alt=""></p><p>Manus开源平替，通用智能体。</p><h2 id="学习资源" tabindex="-1"><a class="header-anchor" href="#学习资源"><span>学习资源</span></a></h2><h3 id="self-hosting-guide-自部署指南" tabindex="-1"><a class="header-anchor" href="#self-hosting-guide-自部署指南"><span><a href="https://github.com/mikeroyal/Self-Hosting-Guide" target="_blank" rel="noopener noreferrer">Self-Hosting-Guide：自部署指南</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202503162222519.png" alt=""></p><p>自托管指南，涵盖了从基础设置到高级应用的各个方面，包括软件和硬件选择、容器技术、CI/CD、开发工具、网络服务、云存储、数据库管理、远程访问、虚拟化、密码管理、安全措施、监控、备份、归档、家庭服务器、媒体服务器、智能家居自动化、语音助手、视频监控、文本转语音合成、视频和音频处理、播客、有声读物、健康、园艺、地图、书签、照片、过去ebin、笔记记录、时间监控、维基、游戏、基础项目等。</p><h3 id="awesome-mcp-servers-mcp-服务器集合" tabindex="-1"><a class="header-anchor" href="#awesome-mcp-servers-mcp-服务器集合"><span><a href="https://github.com/punkpeye/awesome-mcp-servers" target="_blank" rel="noopener noreferrer">awesome-mcp-servers：MCP 服务器集合</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202503162310435.png" alt=""></p><p>MCP 服务器集合。</p><h3 id="hacker-news-每日播报" tabindex="-1"><a class="header-anchor" href="#hacker-news-每日播报"><span><a href="https://github.com/ccbikai/hacker-news" target="_blank" rel="noopener noreferrer">Hacker News 每日播报</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202503162315488.png" alt=""></p><p>一个基于 AI 的 Hacker News 中文播客项目，每天自动抓取 Hacker News 热门文章，通过 AI 生成中文总结并转换为播客内容。</p>',40)]))}const o=a(s,[["render",i],["__file","41.html.vue"]]),h=JSON.parse('{"path":"/content/2025/41.html","title":"肖恩技术周刊（第 41 期）：疲乏","lang":"zh-CN","frontmatter":{"date":"2025-03-17T00:00:00.000Z","description":"肖恩技术周刊（第 41 期）：疲乏 周刊内容: 对一周内阅读的资讯或技术内容精品（个人向）进行总结，分类大致包含“业界资讯”、“技术博客”、“开源项目”和“学习资源”等。 更新时间: 周一 历史收录: 技术周刊合集 订阅方式: 微信公众号“肖恩聊技术”，除周刊外还有更多原创技术博文，欢迎关注👏🏻~ 公众号二维码 开篇图 最近有点疲乏，感觉需要一个长...","head":[["meta",{"property":"og:url","content":"https://weekly.shawnxie.top/content/2025/41.html"}],["meta",{"property":"og:site_name","content":"肖恩技术周刊"}],["meta",{"property":"og:title","content":"肖恩技术周刊（第 41 期）：疲乏"}],["meta",{"property":"og:description","content":"肖恩技术周刊（第 41 期）：疲乏 周刊内容: 对一周内阅读的资讯或技术内容精品（个人向）进行总结，分类大致包含“业界资讯”、“技术博客”、“开源项目”和“学习资源”等。 更新时间: 周一 历史收录: 技术周刊合集 订阅方式: 微信公众号“肖恩聊技术”，除周刊外还有更多原创技术博文，欢迎关注👏🏻~ 公众号二维码 开篇图 最近有点疲乏，感觉需要一个长..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202503162321907.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-16T15:23:21.000Z"}],["meta",{"property":"article:published_time","content":"2025-03-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-16T15:23:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"肖恩技术周刊（第 41 期）：疲乏\\",\\"image\\":[\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202503162321907.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202503162229201.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202503162253061.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202503162227294.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202503162259713.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202503162226254.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202503162308236.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202503162309779.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202503162222519.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202503162310435.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202503162315488.png\\"],\\"datePublished\\":\\"2025-03-17T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-16T15:23:21.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"开篇图","slug":"开篇图","link":"#开篇图","children":[]},{"level":2,"title":"业界资讯","slug":"业界资讯","link":"#业界资讯","children":[{"level":3,"title":"OpenAI发布构建智能体新工具","slug":"openai发布构建智能体新工具","link":"#openai发布构建智能体新工具","children":[]},{"level":3,"title":"李飞飞团队具身智能新作：500美元，一切家务机器人帮你干","slug":"李飞飞团队具身智能新作-500美元-一切家务机器人帮你干","link":"#李飞飞团队具身智能新作-500美元-一切家务机器人帮你干","children":[]}]},{"level":2,"title":"技术博客","slug":"技术博客","link":"#技术博客","children":[{"level":3,"title":"如何使用大型语言模型来辅助编写代码（英文）","slug":"如何使用大型语言模型来辅助编写代码-英文","link":"#如何使用大型语言模型来辅助编写代码-英文","children":[]},{"level":3,"title":"MCP 终极指南","slug":"mcp-终极指南","link":"#mcp-终极指南","children":[]}]},{"level":2,"title":"开源项目","slug":"开源项目","link":"#开源项目","children":[{"level":3,"title":"mermaid：图标工具","slug":"mermaid-图标工具","link":"#mermaid-图标工具","children":[]},{"level":3,"title":"camel：多智能体开发框架","slug":"camel-多智能体开发框架","link":"#camel-多智能体开发框架","children":[]},{"level":3,"title":"OpenManus：通用智能体","slug":"openmanus-通用智能体","link":"#openmanus-通用智能体","children":[]}]},{"level":2,"title":"学习资源","slug":"学习资源","link":"#学习资源","children":[{"level":3,"title":"Self-Hosting-Guide：自部署指南","slug":"self-hosting-guide-自部署指南","link":"#self-hosting-guide-自部署指南","children":[]},{"level":3,"title":"awesome-mcp-servers：MCP 服务器集合","slug":"awesome-mcp-servers-mcp-服务器集合","link":"#awesome-mcp-servers-mcp-服务器集合","children":[]},{"level":3,"title":"Hacker News 每日播报","slug":"hacker-news-每日播报","link":"#hacker-news-每日播报","children":[]}]}],"git":{"updatedTime":1742138601000},"autoDesc":true,"filePathRelative":"content/2025/41.md","excerpt":"\\n<blockquote>\\n<p><strong>周刊内容</strong>: 对一周内阅读的资讯或技术内容精品（个人向）进行总结，分类大致包含“业界资讯”、“技术博客”、“开源项目”和“学习资源”等。<br>\\n<strong>更新时间</strong>: 周一<br>\\n<strong>历史收录</strong>: <a href=\\"https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkwODY0ODQzOQ==&amp;action=getalbum&amp;album_id=3492416248238096386#wechat_redirect\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">技术周刊合集</a> <br>\\n<strong>订阅方式</strong>: 微信公众号“<strong>肖恩聊技术</strong>”，除周刊外还有更多原创技术博文，欢迎关注👏🏻~<br>\\n<img src=\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/20241103221454.png\\" alt=\\"公众号二维码\\" width=\\"300\\"></p>\\n</blockquote>"}');export{o as comp,h as data};
