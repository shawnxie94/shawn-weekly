import{_ as a,c as t,b as r,o as n}from"./app-BqGx6KHC.js";const i={};function o(l,e){return n(),t("div",null,e[0]||(e[0]=[r('<h1 id="肖恩技术周刊-第-7-期-fight" tabindex="-1"><a class="header-anchor" href="#肖恩技术周刊-第-7-期-fight"><span>肖恩技术周刊（第 7 期）：Fight！</span></a></h1><blockquote><p><strong>周刊内容</strong>: 对一周内阅读的资讯或技术内容精品（个人向）进行总结，分类大致包含“业界资讯”、“技术博客”、“开源项目”和“工具推荐”等。为减少阅读负担提高记忆留存率，每类下内容数一般不超过3条。<br><strong>更新时间</strong>: 周一<br><strong>历史收录</strong>: <a href="https://github.com/Xiaoxie1994/shawn-weekly" target="_blank" rel="noopener noreferrer">shawn-weekly</a> <br><strong>订阅方式</strong>: 微信公众号“<strong>肖恩聊技术</strong>”，除周刊外还有更多原创技术博文~<br><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/20241103221454.png" alt="公众号二维码" width="300"></p></blockquote><h2 id="开篇图" tabindex="-1"><a class="header-anchor" href="#开篇图"><span>开篇图</span></a></h2><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412252311207.png" alt=""></p><blockquote><p>Fight! Fight! Fight!</p></blockquote><h2 id="业界资讯" tabindex="-1"><a class="header-anchor" href="#业界资讯"><span>业界资讯</span></a></h2><h3 id="微软蓝屏-登顶微博热搜-全球多地-windows-系统崩溃-杀毒软件-crowdstrike-要背锅" tabindex="-1"><a class="header-anchor" href="#微软蓝屏-登顶微博热搜-全球多地-windows-系统崩溃-杀毒软件-crowdstrike-要背锅"><span><a href="https://m.ithome.com/html/782870.htm" target="_blank" rel="noopener noreferrer">“微软蓝屏”登顶微博热搜：全球多地 Windows 系统崩溃，杀毒软件 CrowdStrike 要背锅？</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412252311209.png" alt=""></p><blockquote><p>2024年7月19日，“<strong>微软蓝屏</strong>”成为微博热搜榜首。全球多地Windows用户遭遇系统崩溃，错误提示涉及“csagent.sys”。初步分析认为，杀毒软件CrowdStrike平台出现问题，导致新西兰、澳大利亚、日本、印度等地区用户受到影响。解决方案是进入安全模式，重命名C:\\windows\\system32\\drivers\\crowdstrike文件夹后重启。同日，微软报告Microsoft 365服务中断，影响全球企业和用户。Downdetector数据显示，日本用户报告OneDrive问题最多。</p></blockquote><h3 id="大模型集体失智-9-11和9-9哪个大-几乎全翻车了" tabindex="-1"><a class="header-anchor" href="#大模型集体失智-9-11和9-9哪个大-几乎全翻车了"><span><a href="https://www.36kr.com/p/2864588442749833" target="_blank" rel="noopener noreferrer">大模型集体失智！9.11和9.9哪个大，几乎全翻车了</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412252311210.png" alt=""></p><blockquote><p>文章讨论了主流大型AI模型在处理一个看似简单的问题——&quot;<strong>9.11和9.9哪个大</strong>&quot;时出现了集体错误。尽管问题简单，但包括GPT-4o、谷歌Gemini Advanced付费版、Claude 3.5 Sonnet在内的多个大模型都错误地认为9.11比9.9大。这一现象引起了人们的关注和讨论。</p><p>文章提到，Riley Goodside，一位专业的提示词工程师，在使用GPT-4o时发现了这个问题，并尝试询问其他大模型，结果发现大多数模型都给出了相同的错误答案。一些网友通过改变提问的顺序或方式，成功引导AI给出了正确答案，这表明AI对词序和提问方式的敏感性。</p><p>国产大模型在这个问题上的表现也参差不齐。一些模型如Kimi和ChatGLM给出了错误结论，而腾讯元宝和字节豆包则能够正确处理这个问题。文章分析了大模型出错的原因，指出可能是因为大模型以token的方式来理解文字，导致它们在处理数字时出现了误解。</p><p>此外，文章还提到了OpenAI的秘密模型&quot;草莓&quot;，据说在MATH数据集上取得了超过90%的得分，但是否能正确处理上述问题还有待验证。</p><p>总的来说，这篇文章揭示了即使是先进的大型AI模型，在处理某些问题时也可能因为理解方式的差异而出现错误，这引发了人们对AI模型准确性和可靠性的思考。</p></blockquote><h2 id="技术博客" tabindex="-1"><a class="header-anchor" href="#技术博客"><span>技术博客</span></a></h2><h3 id="图解kafka-架构设计、消息可靠、数据持久、高性能背后的底层原理" tabindex="-1"><a class="header-anchor" href="#图解kafka-架构设计、消息可靠、数据持久、高性能背后的底层原理"><span><a href="https://mp.weixin.qq.com/s/2PEYaSiKzNfB_Ijq69UOJQ" target="_blank" rel="noopener noreferrer">图解Kafka：架构设计、消息可靠、数据持久、高性能背后的底层原理</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412252311211.png" alt=""></p><blockquote><p>本文深入剖析了Apache Kafka的内部机制，从宏观架构到消息流转的细节，揭示了Kafka如何通过精心设计的系统组件和策略，实现消息的异步处理和流量管理。文章探讨了Kafka的ack策略、数据持久化技术，以及提升系统性能的关键设计，包括批量处理、压缩、PageCache和零拷贝等技术。同时，还涵盖了负载均衡和集群管理，提供了一个全面视角，理解Kafka如何满足大规模分布式系统中对消息队列的严苛要求。</p><p>Kafka由Producer、Broker、Consumer和ZooKeeper组成。Producer负责消息的创建和发送；Broker负责消息的持久化和中转；Consumer从Broker拉取并消费消息；ZooKeeper负责集群元数据管理。Kafka通过主题（Topic）、分区（Partition）、分段（Segment）和位移（Offset）等概念，优化了消息处理的并行性和可靠性。</p><p>Kafka的高可靠性体现在确保消息在传递过程中不丢失，通过ack策略、消息发送策略和Broker的异步刷盘机制，结合Replica副本机制，解决了单机故障和多副本间数据同步一致性问题。此外，Kafka的高性能探究显示，其核心在于保障系统低延迟、高吞吐地处理消息，采用异步发送、批量发送、压缩技术、PageCache机制、零拷贝、稀疏索引、Broker和数据分区以及多Reactor多线程网络模型等设计。</p><p>最后，文章还讨论了负载均衡和集群管理，Kafka通过ZooKeeper进行集群管理，实现如partition选主、broker集群管理、consumer负载均衡等功能。</p></blockquote><h3 id="一文搞懂大模型-基础知识、-llm-应用、-rag-、-agent-与未来发展" tabindex="-1"><a class="header-anchor" href="#一文搞懂大模型-基础知识、-llm-应用、-rag-、-agent-与未来发展"><span><a href="https://mp.weixin.qq.com/s/groI097gj0w7XMHIy3eERA" target="_blank" rel="noopener noreferrer">一文搞懂大模型！基础知识、 LLM 应用、 RAG 、 Agent 与未来发展</a></span></a></h3><blockquote><p>全面介绍了大型语言模型（LLM）的基础知识、应用场景、未来发展方向以及与自然语言处理（NLP）的关系。文章通过对话形式，详细解释了LLM的定义、特点、发展历史，并探讨了如何通过数据训练、持续学习等手段保证回答的准确性。同时，讨论了LLM在问答系统、文本处理、工作流等方面的应用，并介绍了RAG（检索增强生成）技术和LangChain框架在构建本地知识库中的作用。最后，文章展望了LLM的未来发展，包括多模态能力的发展和向通用人工智能（AGI）的迈进，同时指出了伴随技术进步而来的挑战和风险。</p></blockquote><h3 id="一文讲清多线程和多线程同步" tabindex="-1"><a class="header-anchor" href="#一文讲清多线程和多线程同步"><span><a href="https://mp.weixin.qq.com/s/a9BUf6N93uOw8JSAxza7cg" target="_blank" rel="noopener noreferrer">一文讲清多线程和多线程同步</a></span></a></h3><blockquote><p>本文全面介绍了<strong>多线程编程的核心技术和同步机制</strong>。多线程允许程序利用多核处理器的优势，通过并行执行任务提高性能。然而，它也引入了复杂性，尤其是在线程间共享数据时，需要同步以避免竞态条件和数据不一致。</p><p>线程是程序执行的独立流，每个线程拥有自己的执行栈和状态，但可以共享进程内的内存空间。多线程的优势在于能够提高资源利用率和执行效率，但这也要求开发者理解线程、核心、进程和协程之间的关系。</p><p>同步是多线程编程中的关键概念，它通过串行化对共享资源的访问，防止多个线程同时修改同一数据，从而避免数据竞争。文章详细介绍了多种同步机制，包括原子操作保证不可分割的操作序列，锁机制确保资源的互斥访问，条件变量允许线程在某些条件不满足时挂起等待，以及Lock-free编程，它通过非阻塞算法实现线程同步，避免了锁的开销。</p><p>文章还探讨了伪共享问题，这是由于多个线程访问同一缓存行导致的性能下降。通过增加内存填充，可以避免变量分布在同一个缓存行上，减少缓存一致性协议的开销。</p><p>最后，文章通过代码示例和模式，展示了如何在实际开发中应用这些知识，以及如何避免常见的陷阱和问题。通过这些实践，开发者可以更有效地利用多线程编程，构建高性能和高稳定性的软件系统。</p></blockquote><h2 id="开源项目" tabindex="-1"><a class="header-anchor" href="#开源项目"><span>开源项目</span></a></h2><h3 id="tabbyml-tabby" tabindex="-1"><a class="header-anchor" href="#tabbyml-tabby"><span><a href="https://github.com/TabbyML/tabby" target="_blank" rel="noopener noreferrer">TabbyML / tabby</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412252311212.gif" alt=""></p><blockquote><p><strong>Tabby</strong>是一个开源的自托管AI编码助手，提供给开发者一个不依赖于数据库管理系统或云服务的GitHub Copilot替代方案。它支持消费者级GPU，并通过OpenAPI接口易于与现有基础设施集成。最新版本引入了Answer Engine，一个为内部工程团队设计的中央知识引擎，以及VSCode 1.7中的全新聊天体验。</p></blockquote><h3 id="opendatalab-mineru" tabindex="-1"><a class="header-anchor" href="#opendatalab-mineru"><span><a href="https://github.com/opendatalab/MinerU" target="_blank" rel="noopener noreferrer">opendatalab / MinerU</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412252311213.gif" alt=""></p><blockquote><p><strong>MinerU</strong>是一个开源的一站式数据提取工具，支持从PDF、网页和电子书中提取数据并转换为Markdown格式。它基于PDF-Extract-Kit，具备多种前端模型输入支持、去除页眉页脚、保留文档结构和格式、提取图像和表格、转换公式为LaTeX格式等功能。支持CPU和GPU加速，并兼容Windows、Linux和macOS平台。</p></blockquote><h2 id="学习资源" tabindex="-1"><a class="header-anchor" href="#学习资源"><span>学习资源</span></a></h2><h3 id="krahets-hello-algo" tabindex="-1"><a class="header-anchor" href="#krahets-hello-algo"><span><a href="https://github.com/krahets/hello-algo" target="_blank" rel="noopener noreferrer">krahets / hello-algo</a></span></a></h3><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412252311214.gif" alt=""></p><blockquote><p>《Hello 算法》是一本开源免费、面向初学者的动画图解数据结构与算法教程。它采用清晰易懂的动画和图解，帮助读者平滑学习曲线，深入理解算法和数据结构。</p></blockquote><h2 id="其他值得看" tabindex="-1"><a class="header-anchor" href="#其他值得看"><span>其他值得看</span></a></h2><ul><li><a href="https://www.mittrchina.com/news/detail/13530" target="_blank" rel="noopener noreferrer">从四大趋势看芯片产业的发展</a></li></ul><p><img src="https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412252311215.png" alt=""></p><blockquote><p>本文探讨了芯片产业的四大发展趋势。首先，全球多个国家通过《芯片法案》（CHIPS Acts）投资芯片产业，以减少对中国的依赖，推动本土芯片制造能力的提升。美国、日本、欧洲和印度都推出了相应的资金支持计划。</p><p>其次，边缘运算（Edge computing）在AI领域的应用越来越受到关注，它允许AI模型在本地设备上运行，保护用户隐私并减少对云服务的依赖。美国国防部正在资助相关研究，预计2025年将有新的边缘计算芯片面世。</p><p>第三，大型科技公司如亚马逊、谷歌和微软正在进入芯片制造领域，以减少对外部供应商的依赖，提高利润率。这些企业推出了自己的AI芯片，可能对英伟达的市场地位构成挑战。最后，初创企业也积极投身于芯片创新，尽管面临英伟达等巨头的竞争，但它们通过采用新型计算技术，如量子计算、光子学和可逆计算，寻求在特定细分市场中取得突破。</p><p>整体来看，芯片产业正经历着政府支持、技术创新和市场竞争的多重影响，预示着未来将有更多的创新和变革。</p></blockquote><h3 id="科技爱好者周刊-第-309-期" tabindex="-1"><a class="header-anchor" href="#科技爱好者周刊-第-309-期"><span><a href="https://www.ruanyifeng.com/blog/2024/07/weekly-issue-309.html" target="_blank" rel="noopener noreferrer">科技爱好者周刊（第 309 期）</a></span></a></h3><blockquote><p>本期周刊聚焦了无人驾驶出租车在中国的快速发展，特别是武汉地区“萝卜快跑”公司的无人驾驶出租车服务。武汉因政策支持成为首个实现全市范围内7X24小时无人驾驶出租车运营的城市。尽管无人驾驶技术带来产业升级和国家竞争力提升，但也引发了对司机失业的担忧。文章提出几点建议，如优先发展货运无人驾驶、郊区和农村的应用等，以及政府应对措施。</p><p>周刊还涵盖了其他科技动态，例如苹果手表的新式外壳、广州建成的双头风力发电机、AI语音复制技术帮助丧失说话能力的人，以及关于拍手姿势的声学研究。此外，还介绍了一些技术工具和AI相关资源，包括在线英文词典、视频转配工具、WordPress插件等。</p></blockquote><h3 id="aigc-weekly-80" tabindex="-1"><a class="header-anchor" href="#aigc-weekly-80"><span><a href="https://quail.ink/op7418/p/aigc-weekly-80" target="_blank" rel="noopener noreferrer">AIGC Weekly #80</a></span></a></h3><blockquote><p>Anthropic公司推出了分享功能和后台功能更新，允许用户分享和重写artifacts。LLM的分布式训练取得进展，Prime Intellect发布了OpenDiLoCo框架，实现全球AI模型训练。Odysseyml致力于基于3D技术的视频生成工具。其他动态包括ComfyUI和Ollama的更新，OpenAI定义了5个AGI级别，以及多个AI相关公司的融资和产品发布信息。</p><p>产品推荐方面，Audioscribe将语音转为结构化笔记，Klipy是AI CRM平台，Writer是聊天机器人应用程序，LlamaCloud提供数据处理层，Doti是AI健康追踪器。精选文章讨论了GraphRAG架构、LLMs中的幻觉问题、ML/AI工程师招聘技巧，以及人工智能在不同领域的应用前景。</p><p>重点研究包括AuraFlow图像生成模型、FlashAttention-3加速Transformer、Paints-Undo绘画过程图生成、Meta在移动设备上运行LLM的方法、UltraPixel超大分辨率图片生成、controlnet-union开源实现，以及UltraEdit细粒度图像编辑技术。封面提示词展示了AI生成图像的风格和提示词。最后，提供了AI资讯站点和联系方式，鼓励读者分享和投稿相关内容。</p></blockquote>',39)]))}const p=a(i,[["render",o],["__file","7.html.vue"]]),h=JSON.parse('{"path":"/content/2024/7.html","title":"肖恩技术周刊（第 7 期）：Fight！","lang":"zh-CN","frontmatter":{"description":"肖恩技术周刊（第 7 期）：Fight！ 周刊内容: 对一周内阅读的资讯或技术内容精品（个人向）进行总结，分类大致包含“业界资讯”、“技术博客”、“开源项目”和“工具推荐”等。为减少阅读负担提高记忆留存率，每类下内容数一般不超过3条。 更新时间: 周一 历史收录: shawn-weekly 订阅方式: 微信公众号“肖恩聊技术”，除周刊外还有更多原创技术...","head":[["meta",{"property":"og:url","content":"https://weekly.shawnxie.top/content/2024/7.html"}],["meta",{"property":"og:site_name","content":"肖恩技术周刊"}],["meta",{"property":"og:title","content":"肖恩技术周刊（第 7 期）：Fight！"}],["meta",{"property":"og:description","content":"肖恩技术周刊（第 7 期）：Fight！ 周刊内容: 对一周内阅读的资讯或技术内容精品（个人向）进行总结，分类大致包含“业界资讯”、“技术博客”、“开源项目”和“工具推荐”等。为减少阅读负担提高记忆留存率，每类下内容数一般不超过3条。 更新时间: 周一 历史收录: shawn-weekly 订阅方式: 微信公众号“肖恩聊技术”，除周刊外还有更多原创技术..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412252311207.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-25T15:32:32.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-25T15:32:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"肖恩技术周刊（第 7 期）：Fight！\\",\\"image\\":[\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412252311207.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412252311209.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412252311210.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412252311211.png\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412252311212.gif\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412252311213.gif\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412252311214.gif\\",\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/202412252311215.png\\"],\\"dateModified\\":\\"2024-12-25T15:32:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"开篇图","slug":"开篇图","link":"#开篇图","children":[]},{"level":2,"title":"业界资讯","slug":"业界资讯","link":"#业界资讯","children":[{"level":3,"title":"“微软蓝屏”登顶微博热搜：全球多地 Windows 系统崩溃，杀毒软件 CrowdStrike 要背锅？","slug":"微软蓝屏-登顶微博热搜-全球多地-windows-系统崩溃-杀毒软件-crowdstrike-要背锅","link":"#微软蓝屏-登顶微博热搜-全球多地-windows-系统崩溃-杀毒软件-crowdstrike-要背锅","children":[]},{"level":3,"title":"大模型集体失智！9.11和9.9哪个大，几乎全翻车了","slug":"大模型集体失智-9-11和9-9哪个大-几乎全翻车了","link":"#大模型集体失智-9-11和9-9哪个大-几乎全翻车了","children":[]}]},{"level":2,"title":"技术博客","slug":"技术博客","link":"#技术博客","children":[{"level":3,"title":"图解Kafka：架构设计、消息可靠、数据持久、高性能背后的底层原理","slug":"图解kafka-架构设计、消息可靠、数据持久、高性能背后的底层原理","link":"#图解kafka-架构设计、消息可靠、数据持久、高性能背后的底层原理","children":[]},{"level":3,"title":"一文搞懂大模型！基础知识、 LLM 应用、 RAG 、 Agent 与未来发展","slug":"一文搞懂大模型-基础知识、-llm-应用、-rag-、-agent-与未来发展","link":"#一文搞懂大模型-基础知识、-llm-应用、-rag-、-agent-与未来发展","children":[]},{"level":3,"title":"一文讲清多线程和多线程同步","slug":"一文讲清多线程和多线程同步","link":"#一文讲清多线程和多线程同步","children":[]}]},{"level":2,"title":"开源项目","slug":"开源项目","link":"#开源项目","children":[{"level":3,"title":"TabbyML / tabby","slug":"tabbyml-tabby","link":"#tabbyml-tabby","children":[]},{"level":3,"title":"opendatalab / MinerU","slug":"opendatalab-mineru","link":"#opendatalab-mineru","children":[]}]},{"level":2,"title":"学习资源","slug":"学习资源","link":"#学习资源","children":[{"level":3,"title":"krahets / hello-algo","slug":"krahets-hello-algo","link":"#krahets-hello-algo","children":[]}]},{"level":2,"title":"其他值得看","slug":"其他值得看","link":"#其他值得看","children":[{"level":3,"title":"科技爱好者周刊（第 309 期）","slug":"科技爱好者周刊-第-309-期","link":"#科技爱好者周刊-第-309-期","children":[]},{"level":3,"title":"AIGC Weekly #80","slug":"aigc-weekly-80","link":"#aigc-weekly-80","children":[]}]}],"git":{"updatedTime":1735140752000},"autoDesc":true,"filePathRelative":"content/2024/7.md","excerpt":"\\n<blockquote>\\n<p><strong>周刊内容</strong>: 对一周内阅读的资讯或技术内容精品（个人向）进行总结，分类大致包含“业界资讯”、“技术博客”、“开源项目”和“工具推荐”等。为减少阅读负担提高记忆留存率，每类下内容数一般不超过3条。<br>\\n<strong>更新时间</strong>: 周一<br>\\n<strong>历史收录</strong>: <a href=\\"https://github.com/Xiaoxie1994/shawn-weekly\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">shawn-weekly</a> <br>\\n<strong>订阅方式</strong>: 微信公众号“<strong>肖恩聊技术</strong>”，除周刊外还有更多原创技术博文~<br>\\n<img src=\\"https://cdn.jsdelivr.net/gh/Xiaoxie1994/images/images/20241103221454.png\\" alt=\\"公众号二维码\\" width=\\"300\\"></p>\\n</blockquote>"}');export{p as comp,h as data};
